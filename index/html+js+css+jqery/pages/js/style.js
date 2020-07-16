$('.header-nav-right>img').on('click',function(){
  let menu=$('.header-nav-right-content');
  if(menu.css('display')==='none'){
    menu.show(300);
    $('.header-nav-right>img').attr('src','../../images/delete.png');
  }else{
    menu.hide(300);
    $('.header-nav-right>img').attr('src','../../images/more.png');
  }
})
//点击logo
function homeClick(){
  location.href='index.html';
}