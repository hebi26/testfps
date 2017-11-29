var left = -100;
var transition = false;
var counter = 0;
var posX;
var posY;
var i;
//=================================
//====================================
//function canvas animation
//===================================


//=======================================
$(document).ready(function(){
//===========================================
// iCI SCRIPT DANIM SI CANVAS
//===========================================

    var baseWidth  = $(window).width();         //on recuperer largeur de la fenetre
    // console.log(baseWidth);

    $(window).mousemove(function(e){            //au mousemove
        posX = (e.pageX);                       //on recup position curseur X Y
        posY = (e.pageY);
        // console.log(posX, posY);
        calcPosX(posX, baseWidth);              // on appele la fonction calcul
    });

    $(".box").click(function () {

        // console.log(posX, posY);
        counter++;
        var boxid = $(this).attr('id');   //ON RECUP ATTR ID
        fire(boxid);
    });

    $('#box3').hover(function() {
        timerShip3();
    });

        //==============FUNCTION CALCUL % POS===================================//

    function calcPosX(posX, baseWidth) {
        var posXpercent = (posX * 100) / baseWidth;         //calcul posX en %
        // console.log(posXpercent);

        if(posXpercent < 5){                                // si le curseur est a gauche
            // calcLeft();
            moveLeft(posXpercent);                          //on appele function moveleft
        }
        else if(posXpercent > 95){                          //si cureseur a droite
            // calcLeft();
            moveRight(posXpercent);                         //on appele moveright
        }
    }
//=========FUNCTION MOVMENT LEFT================//

    function moveLeft(){
        if( left < 0 && !transition) {
            transition = true;
            left += 100;
            $(".mainbox").css({
                left: left + "%" });
            setInterval();
        }
    }
//=========FUNCTION MOVMENT RIGHT================//
    function  moveRight() {

        if(left > -200 && !transition) {
            transition = true;
            left -= 100;
            $(".mainbox").css({
                left: left + "%" });
            setInterval();
        }
    }
//===========FUNCTION SET INTERVAL POUR L'ENCHAINEMENT DE SLIDE=========//
    function setInterval(){
        setTimeout(function(){
            transition = false;
        }, 800);
    }

//==========FUNCTION FIRE=========+//
    function fire(boxid) {

        var player = document.getElementById("soundFire");
        player.pause();
        player.currentTime = 0;
        player.play();


        $('#' + boxid).append('<div class="bullet" id="bullet' + counter + '"></div>');
        var bX = 25;
        var bY = 25;
        $("#bullet" + counter).css({
            left: posX - bX + "px",
            top: posY - bY + "px"
        });
        $('.bullet').animate({height: '0px', width: '0px'}, "slow");

        $('.target, .ship').click(function (e) {                    //QUAND ON CLIQUE SUR UNE CIBLE
            var targetid = $(this).attr('id');
            var boxlayoutid = $(this).parent().attr('id');
            i = parseInt(/\d/.exec(targetid));
            var nposX = (e.pageX);
            var nposY = (e.pageY);


            setTimeout(function () {                        //ON APPEL EFUNCTION EXPLODE APRES 1S
                explode(targetid, boxlayoutid, nposX, nposY, i);
            }, 1000);

        });
    }

    //==========PARALLAX=========================
    //=========FUNCTION EXPLODE==========================

    function explode(targetid, boxlayoutid, nposX, nposY, i) {
        var player = document.getElementById("soundExplode");
        player.pause();
        player.currentTime = 0;
        player.play();

        $("#"+boxlayoutid).append('<img class="touch" src="img/explode1.png">');
        var bX = 150;
        var bY = 150;
        $(".touch").css({
            left: nposX - bX + "px",
            top: nposY - bY + "px"
        });
        $('.touch').fadeOut(500);
        $("#"+targetid).fadeOut(1000);

        setTimeout(function () {                        //ON APPEL EFUNCTION EXPLODE APRES 500mS
            $("#infos"+i).fadeIn(2000);
        }, 500);
    }

    //========FUNCTION ANIM TEXTE=====//
    //========FUNCTION ANIM SAPCESHIP

    function timerShip3(){
        setTimeout(function(){
        $(".ship3").animate({width: "300px", height: "300px"}, 500)}, 500);

        setTimeout(function(){
            $(".ship2").animate({width: "200px", height: "200px"}, 500)}, 1000);
    }

});