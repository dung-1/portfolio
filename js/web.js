$(document).ready(function() {
    callAJAX('web');
})
window.onload = () => {
    $('#portfolio-menu').addClass('active');
}
/*******************
******* NAV ********
*******************/
var hamberger = $('#hamberger');
var navOverlay = $('#nav-overlay');
var navBar = $('#nav-bar');
var navMain = $('#nav');
hamberger.click(() => {
    var x = window.matchMedia("(max-width: 720px)")
    if (x.matches) {
        hamberger.toggleClass('active');
        navOverlay.toggleClass('active');
        if (navOverlay.hasClass('active')) {
            navBar.addClass('active');
            $('.nav-bar-item').addClass('mobileActive');
            $('.nav-bar-social-item').addClass('mobileActive');
        } else {
            navBar.removeClass('active');
            $('.nav-bar-item').removeClass('mobileActive');
            $('.nav-bar-social-item').removeClass('mobileActive');
        }
    }
})
window.addEventListener('scroll',function(){
    if (window.pageYOffset > 0) {
        navMain.addClass('scroll');
    } else {
        navMain.removeClass('scroll');
    }
})
/***********************
******* SECTION ********
***********************/
var sectionWrapper = $('section');
window.addEventListener('scroll',() => {
    var offsetY = window.pageYOffset;
    var innerHeight = window.innerHeight;
    sectionWrapper.each((index,ele) => {
        if((offsetY + innerHeight - 250) > ele.offsetTop) {
            ele.classList.add('active');
        }
    })
})
/********************
******* AJAX ********
*********************/
var $portfolioWrapper = $('#portfolio-menu-wrapper');
var itemHolder = [];
var currentItemNum = 0;
function createItemGalery(url) {
    var $portfolioItem = document.createElement('div');

    $portfolioItem.classList.add('portfolio-menu-item');
    $portfolioItem.innerHTML = `
        <img src="${url}" alt="logo">
    `;
    $portfolioWrapper.append($portfolioItem);
    setTimeout(function(){
        $('.portfolio-menu-item').addClass('show');
    },500)
}
function callAJAX(filter) {
    $.ajax({
        url : "../json/data.json",
        success : function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].filter == filter) {
                    itemHolder.push(data[i].url + "/" + data[i].name + data[i].type);
                }
                if (i == (data.length - 1)) {
                    for (var j = 0; itemHolder.length <= 3 ? j < itemHolder.length  : j < 3; j++) {
                        createItemGalery(itemHolder[j]);
                        currentItemNum = $('.portfolio-menu-item').length;
                    }
                }           
            }
        }
    })
}
var $showMoreBtn = $('#showmore-btn');

$showMoreBtn.click(() => {
    if (currentItemNum >= itemHolder.length) {
        $showMoreBtn.addClass('disable');
        $showMoreBtn.html("<span>That's all I have now</span>");
    }
    for (var i = currentItemNum; (currentItemNum + 3) > itemHolder.length ? i < itemHolder.length : i < (currentItemNum + 3); i++ ) {
        createItemGalery(itemHolder[i]);
    }
    currentItemNum = $('.portfolio-menu-item').length;
})