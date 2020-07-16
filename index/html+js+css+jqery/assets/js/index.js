//有几个导航栏目
var count=$('.aiming-point').length;
//所有栏目元素距离文本顶部的距离
var arr=[];
var activeA=null;
arrVal();
//监听滚动条
$(window).bind("scroll", function(){
  if(activeA || $('.public-more').attr('is')=='true'){
    activeA=null;
    return false;
  }
  let active=activeVal($(this).scrollTop());
  console.log(active);
  if($(window).width()>750){
    $('.public-header-nav>div>a').removeClass("active-nav-a");
    $('.public-header-nav>div>a').removeClass("active-nav-a-wap");
    $('.public-header-nav>div>a').eq(active).addClass("active-nav-a");
  }else{
    $('.public-header-nav>div>a').removeClass("active-nav-a-wap");
    $('.public-header-nav>div>a').removeClass("active-nav-a");
    $('.public-header-nav>div>a').eq(active).addClass("active-nav-a-wap");
  }
});
function activeVal(a){
  for(let j=1;j<arr.length;j++){
    if(a<arr[j]){
      return j-1;
    }
  }
}
//点击更多
var scrollTop='';
$('.public-more').on('click',function(){
  activeA=true;
  if($(this).attr('is')=='false' || $(this).attr('is')==undefined){
    scrollTop=$(window).scrollTop();
    $(this).attr({'src':'images/delete.png','is':'true'});
    $('.public-header-nav').show(300);
    //禁止页面滚动
    $('body,html').addClass('no-rolling');
  }else{
    $(this).attr({'src':'images/more.png','is':'false'});
    $('.public-header-nav').hide(300);
    //解除页面滚动
    $('body,html').removeClass('no-rolling');
    $('body,html').scrollTop(scrollTop);
  }
})
//点击导航链接
$('.public-header-nav>div>a').on('click',function(){
  activeA=true;
  //解除页面滚动
  $('body,html').removeClass('no-rolling');
  $('.public-more').attr({'src':'images/more.png','is':'false'});
  $('.public-header-nav').hide(300);
  $('body,html').animate({ scrollTop: arr[$(this).index()] }, 800);
  if($(window).width()<=750){
    $('.public-header-nav>div>a').removeClass("active-nav-a-wap");
    $('.public-header-nav>div>a').eq($(this).index()).addClass("active-nav-a-wap");
  }
})
//屏幕的宽
let screenW=$(window).width();
//屏幕的高
let screenH=$(window).height();
$(window).resize(function() {  
  //当屏幕宽度和高度都改变了表示屏幕有改变，可兼容ios
  if($(window).width()!=screenW && $(window).height()!=screenH){
    $('body,html').removeClass('no-rolling');
    screenW=$(window).width();
    screenH=$(window).height();
    //当页面改变时重新获取元素距离文本顶部的距离
    arr=[];
    arrVal();
  }
});  
//获取乱码元素距离文本顶部的值
function arrVal() {
  for(let i=0;i<count;i++){
    arr.push(parseInt($('.aiming-point').eq(i).offset().top-64));
  }
  arr[arr.length-1]=parseInt($(document.body).height()-$(window).height()-50);
  arr.push(1000000);
  $(window).scrollTop(0);
  if($(window).width()>750){
    $('.public-header-nav>div>a').removeClass("active-nav-a");
    $('.public-header-nav>div>a').removeClass("active-nav-a-wap");
    $('.public-header-nav>div>a').eq(0).addClass("active-nav-a");
  }else{
    $('.public-header-nav>div>a').removeClass("active-nav-a-wap");
    $('.public-header-nav>div>a').removeClass("active-nav-a");
    $('.public-header-nav>div>a').eq(0).addClass("active-nav-a-wap");
  }
  $('.public-more').attr({'src':'images/more.png','is':'false'});
  $('.public-header-nav').hide();
}