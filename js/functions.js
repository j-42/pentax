$(function() {


    var getCurentImageWidth = 0;
    function resizeImgs(){
        // Formatage des images au ratio
        $('img.bg').each(function(){
            var src = $(this).data("src");
            var ratioContainer = ($(this).parent().width()) / ($(this).parent().height());
            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.indexOf('604.1') == -1) {
                $(this).attr("src", src);
                $(this).addClass("safari");
            }
            if(!isFinite(ratioContainer) || ratioContainer == 0){
                return;
            }
            // landscape ratio
            if (ratioContainer >= 1.5){
                 src = "imgs/" + src + "-l.jpg";
                $(this).attr("src", src);
                $(this).addClass("landscape").removeClass("portrait");
            }
            // square landscape
            else if (ratioContainer < 1.5 && ratioContainer >= 1) {
                src = "imgs/" + src + "-sq.jpg";
                $(this).attr("src", src);
                $(this).addClass("landscape").removeClass("portrait");
            }
            // square portrait
            else if (ratioContainer < 1 && ratioContainer >= 0.75) {
                src = "imgs/" + src + "-sq.jpg";
                $(this).attr("src", src);
                $(this).addClass("portrait").removeClass("landscape").removeClass("safari");
            }
            // portrait
            else if (ratioContainer < 0.75){
                src = "imgs/" + src + "-p.jpg";
                $(this).attr("src", src);
                $(this).addClass("portrait").removeClass("landscape");
            }
        })
    }


    // Animation Decouvrir niv-0 gamme-progressifs
    $("#gamme-progressifs, #gamme-unifocaux").click(function(){
         if($(this).hasClass('main')){
            return;
        } else {
            changeStage(this);    
        }
        //resizeImgs();
    });

   function changeStage(element){
        var getShrink = $(element).attr('data-shrink');
        var getTarget = $(element).attr('data-target');
        var getSrc = $(element).attr('id'); 
        $("a.btn").css("display","none");
        $(element).addClass('main');
        $("#" + getShrink).addClass("shrink-x");
        $(".third").addClass("half").removeClass("third");
        $(element).children().last().addClass("shrink-y");
        $("#pentax-nav").load(getTarget + ".html");
        $("#pentax-nav").addClass( getSrc + " gamme");
         $("#back").addClass("stretch-x");
         $("#back").fadeIn();  
    }

    // Queries menu retour
    function resizeBacknav(){
        if ($(window).width() >= 978){
            $("#back").removeClass("mobile");
            $("#back").addClass("desktop");
        } else {
            $("#back").addClass("mobile");
            $("#back").removeClass("desktop");
        }
    }

    resizeBacknav();
    // Ouverture menu retour
    $(".btn").click(function(){
        $("#back").addClass("stretch-x");
        // Menu horizontal ou vertical
        $("#back").fadeIn();

    });






    // Animation Retour
        $("#back").click(function(){
            $(this).removeClass("stretch-x");
            $("a.btn").fadeTo(500,1);
            $("#gamme-unifocaux").removeClass("shrink-x");
            $(".content").removeClass("shrink-y");
            $("#pentax-nav").load("nav-0.html");
            $("#pentax-nav").removeClass("gamme gamme-progressifs gamme-unifocaux");
            $("article").removeClass("shrink-x");
            $(".half").addClass("third").removeClass("half");
            $("article").removeClass("main");
            //resizeImgs();
        });








    $(window).resize(function() {
        resizeImgs();
        resizeBacknav();
    });

    $(document).ready(function() {
        // Formatage des images au ratio - Affichage
        resizeImgs();
        $("#pentax").fadeTo(500,1);
    });


}); // ---------------- FONCTION GLOBALE  ----------------- //