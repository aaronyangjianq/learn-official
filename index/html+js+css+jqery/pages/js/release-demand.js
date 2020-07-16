
  //上传文件改变会调用这方法，直接在html绑定事件这样删除元素重新绑定可以保证每次删除添加事件还是可以正常使用
  function uploadFile(_this){
    let num=$(_this)[0].files.length;
    for(let i=0;i<num;i++){
      fileUrl($(_this)[0].files[i]);
    }
    $('#img-upload').remove();
    $('#div-file').append('<input type ="file" name="file" onchange="uploadFile(this)" id="img-upload"  multiple hidden style="display:none"/>');
    $('#file-container').empty();
    fileArr.length=0;
  }
  //点击上传图片按钮
  $('#my-img').on('click',function(){
    $('#img-upload').click();
  })
  //点击删除上传文件
  function imgCloseClick(_this){
    let index=$(_this).parent().parent().index();
    $(_this).parent().remove();
    fileArr.splice(index,1);
  }
  //大小换算
  function kbmg(size){
    if(size<1024){
      return size+'B'
    }else if(size<1024*1024){
      return (size/1024).toFixed(2)+'KB'
    }else if(size<1024*1024*1024){
      return (size/1024/1024).toFixed(2)+'MB'
    }else if(size<1024*1024*1024*1024){
      return (size/1024/1024/1024).toFixed(2)+'GB'
    }
  }
  let fileArr=[];
  function fileUrl(file){
    // console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      //e.target.result就是图像的base64编码
      let fileHtml=`<div>
                      <p>
                        <label style="color:#333">${file.name}</label>
                        <span style="color:#999;margin-left:16px">大小：${kbmg(file.size)}</span>
                        <img onclick="imgCloseClick(this)" src="../images/delete-file.png"  style="width:24px;margin-left:20px;" />
                      </p>
                    </div>`
      $('#file-container').append(fileHtml);
      let obj={
        name:file.name,
        size:file.size,
        base64:e.target.result
      }
      fileArr.push(obj);
    }
  }
  $('.menu-bar>li').on('click',function(){
    $('.menu-bar>li').removeClass('menu-bar-active');
    $(this).addClass('menu-bar-active');
  })
  function list(){
    location.href="list.html"
  }
  //点击发送验证码
  function sendCodeClick(_this){
    let countDown=$('#count-down');
    countDown.show();
    $(_this).hide();
    let time=59;
    var interval=setInterval(()=>{
      if(time<=0){
        clearInterval(interval);
        countDown.text('60s').hide();
        $(_this).show();
        return;
      }
      let timeVal=time<10?'0'+time--+'s':time--+'s';
      countDown.text(timeVal);
    },1000);
}
//验证表单
function formCheck(){
  console.log(document.form);
  let form=document.form;
  let projectNaeme=form.project_naeme.value;
  let category=form.category.value;
  let money=form.money.value;
  let day=form.day.value;
  let describe=form.describe.value;
  let url1=form.url1.value;
  let url2=form.url2.value;
  let userName=form.user_name.value;
  let email=form.email.value;
  let phone=form.phone.value;
  let phoneCode=form.phone_code.value;
  console.log(projectNaeme);
  console.log(category);
  console.log(money);
  console.log(day);
  console.log(describe);
  console.log(url1);
  console.log(url2);
  console.log(userName);
  console.log(email);
  console.log(phone);
  console.log(phoneCode);
  var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
  var emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if(projectNaeme.trim()==''){
    toast('请填写项目名称');
    return false;
  }else if(money.trim()==''){
    toast('请填写项目名预算');
    return false;
  }else if(day.trim()==''){
    toast('请填写期望天数');
    return false;
  }else if(describe.trim()==''){
    toast('请填写项目描述');
    return false;
  }else if(userName.trim()==''){
    toast('请填写您的姓名');
    return false;
  }else if(email.trim()==''){
    toast('请填写邮箱');
    return false;
  }else if(!emailReg.test(email)){
    toast("请填写正确邮箱格式");
    return false;
  }else if(phone.trim()==''){
    toast('请填写手机号码');
    return false;
  }else if (!phoneReg.test(phone)) {
    toast('请填写填写正确的手机号码');
    return false;
  }else if(phoneCode.trim()==''){
    toast('请填写手机验证码');
    return false;
  }
  alert('提交中');
}
//弹窗提示
function toast(val){
  clearTimeout(window.toastClear);
  $('.toast span').show();
  $('.toast span').text(val);
  window.toastClear=setTimeout(()=>{
    $('.toast span').hide();
  },1500);    
}
