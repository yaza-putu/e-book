$(document).ready(function () {
    $('#btn-menu').click(function () {
        $('.menu-display').toggle();
    });

    $("[name='my-checkbox']").bootstrapSwitch();

    $('.btn-animate').click(function(){
        $('.btn-animate').removeClass('bg-primary').addClass('bg-light').css('color','black');
        $(this).removeClass('bg-light').addClass('bg-primary').css('color','white');
    });

    $('.btn-line').click(function(){
        $('.btn-line').removeClass('bg-primary').addClass('bg-light').css('color','black');
        $(this).removeClass('bg-light').addClass('bg-primary').css('color','white');

        localStorage.removeItem('font-height');
        localStorage.setItem('font-height',$(this).data('line'));
        new startReader();
        new cekDarkMode();
    });

    $('#text-size').change(function(){
        localStorage.removeItem('text-size');
        let css = 'font-size:'+$(this).val()+'px;';
        localStorage.setItem('text-size',css);
        new startReader();
        new cekDarkMode();
    });

    $('.flip').click(function(){
        localStorage.removeItem('effect');
        localStorage.setItem('effect','flip');
        new startReader();
        new cekDarkMode();
    });
    $('.shift').click(function(){
        localStorage.removeItem('effect');
        localStorage.setItem('effect','shift');
        new startReader();
        new cekDarkMode();
    });
    $('.vertical').click(function(){
        localStorage.removeItem('effect');
        localStorage.setItem('effect','vertical');
        new startReader();
        new cekDarkMode();
    });

    $('.checkmark').click(function(){
        let currentTheme = localStorage.getItem('theme'); 
        let color = $(this).data('color');
        $(".card-reader").removeClass(currentTheme);
        $(".monelem_page").removeClass(currentTheme);    
        localStorage.setItem('theme',color);
        new startReader();         
        $(".card-reader").removeClass("dark-mode");     
        $(".monelem_page").removeClass("dark-mode")
        $(".monelem_page").addClass(color); 
        $(".card-reader").addClass(color);
    })

    // $('.checkmark').on('click', function(){
       
    // })
});

$(document).mouseup(function (e) {
    var container = $(".menu-display");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.menu-display').hide();
    }
});

function menu() {
    $('.menu-display').hide();
}

function cekDarkMode()
{
    let darkmode = localStorage.getItem('darkmode');
    let currentTheme = localStorage.getItem('theme'); 
    if (darkmode == 1) {
        $(".monelem_page").addClass("dark-mode");
        $(".monelem_page").removeClass(currentTheme);
    }else{        
        $(".monelem_page").removeClass("dark-mode");
        $(".monelem_page").addClass(currentTheme);
    }
}

function darkMode() {
    if ($(".card-reader").hasClass("dark-mode")) {
        localStorage.setItem('style','color:black !important;');
        localStorage.setItem('darkmode',0);
        let theme = localStorage.getItem('theme');
        this.startReader('','body p,body h3 {color:black}');
        $(".card-reader").removeClass("dark-mode");       
        $(".monelem_page").removeClass("dark-mode"); 
        if(theme)
        {
            $(".card-reader").addClass(theme);
            $(".monelem_page").addClass(theme);
        }else{
            $(".card-reader").removeClass(theme);
        }
    } else {
        localStorage.setItem('style','color:white !important;');
        localStorage.setItem('darkmode',1);
        let theme = localStorage.getItem('theme');
        let darkmode = localStorage.getItem('darkmode');
        this.startReader();
        $(".card-reader").addClass("dark-mode");
        $(".monelem_page").addClass("dark-mode");
        $(".card-reader").removeClass(theme);
        
    }
}

function startReader()
{
    // this takes a book objects and parses it
        let effect = localStorage.getItem('effect');
        let style  = localStorage.getItem('style');
            style = style?style:'';
        let font_height = localStorage.getItem('font-height');
            font_height = font_height?font_height:'';
        let text_size = localStorage.getItem('text-size');
            text_size = text_size?text_size:'';
        let allStyle = 'body * {'+style+font_height+text_size+'}';
        if( effect == 'vertical')
        {
            window.reader = Monocle.Reader(
                'reader',
                bookData,
                { flipper: Monocle.Flippers.Legacy, stylesheet:allStyle}
            );
        }else if(effect == 'shift'){
            window.reader = Monocle.Reader(
                'reader',
                bookData,
                { flipper: Monocle.Flippers.Scroller, stylesheet:allStyle }
            );
        }else{
            window.reader = Monocle.Reader(
                'reader',
                bookData,
                { flipper: Monocle.Flippers. Slider,stylesheet:allStyle}
            );
        }
}