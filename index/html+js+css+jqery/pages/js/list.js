$('.menu-bar>span').on('click',function(){
  $('.menu-bar>span').removeClass('menu-bar-active');
  $(this).addClass('menu-bar-active');
})
function release(){
  location.href="release-demand.html"
}