var left = -100;
var transition = false;
var counter = 0;
var posX;
var posY;
//=================================
//====================================
//function canvas animation
//===================================


//=======================================
$(document).ready(function(){
//===========================================
// iCI SCRIPT DANIM SI CANVAS
//===========================================

    var baseWidth  = $(window).width();
    // console.log(baseWidth);

    $(window).mousemove(function(e){
        posX = (e.pageX);
        posY = (e.pageY);
        console.log(posX, posY);
        calcPosX(posX, baseWidth);
    });

    function calcPosX(posX, baseWidth) {
        var posXpercent = (posX * 100) / baseWidth;
        // console.log(posXpercent);

        if(posXpercent < 5){
            // calcLeft();
            moveLeft(posXpercent);
        }
        else if(posXpercent > 95){
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
            setInterval();
        }
    }

    function  moveRight() {

        if(left > -200 && !transition) {
            transition = true;
            left -= 100;
            $(".mainbox").css({
                left: left + "%" });
            setInterval();
        }
    }

    function setInterval(){
        setTimeout(function(){
            transition = false;
        }, 800);
    }

    $(".box").click(function () {

        console.log(posX, posY);
        counter++;
        var boxid = $(this).attr('id');
        fire(boxid);
    });

    function fire(boxid) {

        $("#soundFire").get(0).play();

        $('#' + boxid).append('<div class="bullet" id="bullet' + counter + '"></div>');
        var bX = 0;
        var bY = 0;
        $("#bullet" + counter).css({
            left: posX - bX + "px",
            top: posY - bY + "px"
        });
        $('.bullet').animate({height: '0px', width: '0px'}, "slow");

        $('.target').click(function () {
            var targetid = $(this).attr('id');
            setTimeout(function () {
                explode(targetid);
            }, 1000);

        });
    }
    function explode(targetid) {
        $("#soundExplode").get(0).play();
        $("#"+targetid).css({backgroundColor: "black",
                            boxShadow: "0 0 5px red, 0 0 25px orangered, 0 0 35px gold, 0 0 40px yellow",
                            transition: 500});
        $("#"+targetid).fadeOut(1500);
    }
});