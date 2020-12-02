/* 是否手机号码*/
export function validatePhone(rule, value,callback) {
    const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      if ((!reg.test(value)) && value != '') {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback();
      }
    }
  }

  /* 是否邮箱*/
export function validateEMail(rule, value,callback) {
    const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else{
      if (!reg.test(value)){
        callback(new Error('请输入正确的邮箱地址'));
      } else {
        callback();
      }
    }
}


// export function validatePassword(rule, value,callback){
//   console.log("新密码密码-------"+value+"--"+this.userInfo.confirmPassword);
//   if(value==''||value==undefined||value==null){
//     callback();
//   }else{
//     if (this.userInfo.confirmPassword !== '') {
//       this.$refs.userInfo.validateField('confirmPassword');
//     }
//     callback();
//   }  
// }

// export function validateConfirmPass(rule, value,callback){
//   console.log("确认密码-------"+value);
//   if(value==''||value==undefined||value==null){
//       callback();
//   }else{
//       if(this.userInfo.password!=value){
//           callback(new Error('两次密码不匹配'));
//       }else{
//           callback(); 
//       }
//   }
// }
