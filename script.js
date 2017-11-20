var left = -100;
var transition = false;

$(document).ready(function(){

    var baseWidth  = $(window).width();
    console.log(baseWidth);

    $(window).mousemove(function(e){
        var posX = (e.pageX);
        var posY = (e.pageY);
        console.log(posX, posY);


        calcPosX(posX, baseWidth);

    });

    function calcPosX(posX, baseWidth) {
        var posXpercent = (posX * 100) / baseWidth;
        console.log(posXpercent);

        if(posXpercent < 10){
            // calcLeft();
            moveLeft(posXpercent);
        }
        else if(posXpercent > 90){
            // calcLeft();
            moveRight(posXpercent);

        }
    }

    function moveLeft(){


        if( left < 0 && !transition) {
            transition = true;
            left += 100;
            $(".mainbox").css({
                left: left + "%" });
            fadeBox();

            setInterval();

        }
    }

    function  moveRight() {


        if(left > -200 && !transition) {

            transition = true;
            left -= 100;
            $(".mainbox").css({
                left: left + "%" });
            fadeBox();

            setInterval();


        }
    }

    function setInterval(){
        setTimeout(function(){
            transition = false;
        }, 800);
    }

    function fadeBox(){
        $(".mainbox").hide();
        $(".mainbox").fadeIn(1000);
    }


});

