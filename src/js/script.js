//TODO: Refactor to a module pattern for the whole slider

$(function () {
    var width = 600;
    var aniSpeed = 1000;
    var delay = 3000;
    
    var $slider = $('.slider ul');


    var myInt;
    
    var $slides = $slider.find('li');
    var slideIndex = 0;
    
    var first = $slider.find('li:first').clone();
    var last = $slider.find('li:last').clone();
    first.appendTo($slider);    
    last.prependTo($slider);
    $slider.css({'margin-left': -width});
    
    function createTracker() {
        $('.slider').after("<div id='tracker'></div>");
        for(i = 0; i < $slides.length; i++)
        {
            $('#tracker').append("<div class='slide-tracker-" + i + "'></div>");
        }
        
        $('.slide-tracker-0').addClass('active');
    }
    
    function createButtons(){
        $('.slider').append("<div id='leftButton'><</div>");
        $('.slider').append("<div id='rightButton'>></div>");
        $('#leftButton').on('click', shiftLeft);
        $('#rightButton').on('click', shiftRight);
    }
    
    //TODO: DRY this
    function shiftLeft() {
        $slider.animate({'margin-left': '+=' + width}, aniSpeed, function(){
            slideIndex--;
            $('.active').removeClass('active');
            $('.slide-tracker-' + slideIndex).addClass('active');
            
            if(slideIndex === -1) {
                $slider.css({'margin-left': (-width * $slides.length)});
                slideIndex = $slides.length - 1;
                $('.slide-tracker-' + slideIndex).addClass('active');
            }
        });
    }
    
    function shiftRight() {
        $slider.animate({'margin-left': '-=' + width}, aniSpeed, function(){
            slideIndex++;
            $('.active').removeClass('active');
            $('.slide-tracker-' + slideIndex).addClass('active');
            
            if (slideIndex === $slides.length)
            {
                $slider.css({'margin-left': -width});
                slideIndex = 0;
                $('.slide-tracker-' + slideIndex).addClass('active');
            }  
        });
    }
    
    function startSlider() {
        myInt = setInterval(function(){ shiftRight(); }, delay);
    }
    
    function stopSlider() {
        clearInterval(myInt);
    }
    
    function slideToIndex(tracker) {
        var number = tracker.attr('class').split('-');
        number = number[number.length - 1];
        
        $slider.animate({'margin-left': '+=' + width * (slideIndex - number)}, 1000);
        $('.active').removeClass('active');
        tracker.addClass('active');
        slideIndex = number;
    }
    
    createTracker();
    createButtons();

    //TODO: clean up events, this is lazy
    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    $('#leftButton').on('mouseenter', stopSlider);
    $('#rightButton').on('mouseenter', stopSlider);
    $('[class^=slide-tracker-]').on('mouseenter', stopSlider).on('mouseleave', startSlider);;
    
    $('[class^=slide-tracker-]').click(function(){ slideToIndex($(this)); });
    
    startSlider();
});