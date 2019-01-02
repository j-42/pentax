$(function() {

    var getCurentImageWidth = 0;

    function resizeImgs(){

        // Formatage des images au ratio
        $('.image-container.bg').each(function(){
            var src = $(this).data("src");
            var ratioContainer = ($(this).parent().width()) / ($(this).parent().height());


            if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('604.1') === -1) {
                $(this).attr("src", src);
                $(this).addClass("safari");
            }
            if(!isFinite(ratioContainer) || ratioContainer === 0){
                return;
            }

            // landscape ratio
            if (ratioContainer >= 1.5){
                src = "assets/img/" + src + "-l.png";
                $(this).css("background-image", "url('"+src+"')");

                $(this).attr("src", src);
                $(this).addClass("landscape").removeClass("portrait");
            }
            // square landscape
            else if (ratioContainer < 1.5 && ratioContainer >= 1) {
                src = "assets/img/" + src + "-sq.png";
                $(this).css("background-image", "url('"+src+"')");
                $(this).addClass("landscape").removeClass("portrait");
            }
            // square portrait
            else if (ratioContainer < 1 && ratioContainer >= 0.5) {
                src = "assets/img/" + src + "-sq.png";
                $(this).css("background-image", "url('"+src+"')");
                $(this).addClass("portrait").removeClass("landscape").removeClass("safari");
            }
            // portrait
            else if (ratioContainer < 0.5){
                src = "assets/img/" + src + "-p.png";
                $(this).css("background-image", "url('"+src+"')");
                $(this).addClass("portrait").removeClass("landscape");
            }
        });
    }





    // Animation Decouvrir niv-0 gammes
    $("article").each(function(){

      $(this).click(function(){
        if($(this).hasClass('main')){
           return;
       } else {
         $("article").removeClass('main').addClass();
         $(this).addClass('main');

        $("article:not(.main)").addClass("shrink-x");

         var getTarget = $(this).attr('data-target');
         var getSrc = $(this).attr('id');

         $("a.btn").css("display","none");

         $(".quarter").addClass("half").removeClass("quarter");

         $(this).children().last().addClass("shrink-y");

         $("#pentax-nav").load(getTarget + ".html");
         $("#pentax-nav").addClass( getSrc + " gamme");
         $("#back").addClass("stretch-x");
         $("#back").fadeIn();
       }
       //resizeImgs();
     });
    });



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
        setTimeout(resizeImgs, 100);
        // Menu horizontal ou vertical
        $("#back").fadeIn();

    });


    // Animation Retour
        $("#back").click(function(){
            $(this).removeClass("stretch-x");
            $("a.btn").fadeTo(500,1);
            $("article").removeClass("shrink-x");
            $(".content").removeClass("shrink-y");
            $("#pentax-nav").load("nav-0.html");

            $("#pentax-nav").attr("class", "quarter");
            $("article").removeClass("shrink-x");
            $(".half").addClass("quarter").removeClass("half");
            $("article").removeClass("main");

            setTimeout(resizeImgs, 1000);

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
