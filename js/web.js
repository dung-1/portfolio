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
function createProjectCard(project) {
    var $card = document.createElement('div');
    $card.classList.add('portfolio-project-card');
    $card.innerHTML = `
        <div class="project-image">
            <img src="${project.url}/${project.name}${project.type}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h2 class="project-title">${project.title}</h2>
            <div class="project-date">
                <span>${project.startDate} - ${project.endDate}</span>
            </div>
            <p class="project-desc">${project.description.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    $portfolioWrapper.append($card);
}
function getCurrentLang() {
    const lang = window.location.pathname.split('/')[1];
    if (["vi", "en", "jp"].includes(lang)) return lang;
    return "vi";
}
function callAJAX(filter) {
    const lang = getCurrentLang();
    $.ajax({
        url : `../json/data.${lang}.json`,
        success : function(data) {
            $portfolioWrapper.empty();
            itemHolder = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].filter == filter) {
                    itemHolder.push(data[i]);
                }
            }
            // Hiển thị tất cả dự án (hoặc bạn có thể phân trang)
            for (var j = 0; j < itemHolder.length; j++) {
                createProjectCard(itemHolder[j]);
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

$(document).ready(function() {
    $('.lang-btn').click(function() {
        const lang = $(this).data('lang');
        // Lấy tên file hiện tại
        const file = window.location.pathname.split('/').pop() || 'index.html';
        // Chuyển sang thư mục ngôn ngữ mới
        window.location.pathname = `/${lang}/${file}`;
    });

    // Đánh dấu nút ngôn ngữ đang chọn
    const currentLang = window.location.pathname.split('/')[1] || 'vi';
    $(`.lang-btn[data-lang="${currentLang}"]`).addClass('active');
});
document.addEventListener('DOMContentLoaded', function () {
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});