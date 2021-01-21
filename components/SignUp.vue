<template>
  <div style="width:520px;height:320px;margin:auto" id="sign_Up">
    <el-form  
      :label-position="labelPosition"
      :model="user"
      status-icon
      :rules="rules"                   
      ref="user">                    
      <el-form-item  prop="userEmail"  label="邮箱">
        <el-input 
          type="text"
          v-model="user.userEmail"
          autocomplete="off"
          prefix-icon="el-icon-s-custom"
          clearable>
      </el-input>
      </el-form-item>
      <el-form-item prop="pass" label="密码">
          <el-input
            type="password"
            prefix-icon="el-icon-s-goods"
            v-model="user.pass"
            autocomplete="off"
            show-password>
          </el-input>
      </el-form-item>
      <el-form-item prop="cimpass" label="确认密码">
          <el-input
            type="password"
            prefix-icon="el-icon-s-goods"
            v-model="user.cimpass"
            autocomplete="off"
            show-password>
          </el-input>
      </el-form-item>
      <el-form-item class="codes"
        prop="code" 
        label="验证码" 
        style="width:500px">
        <el-input 
          type="text"
          v-model="user.code"
          autocomplete="off"
          clearable style="width:310px"> 
        </el-input>   
        <div @click="changeImgCode()" 
          style="width: 100px; 
          height: 40px;    
          display: inline-block;
          position: absolute;
          left: 390px;">
        <el-image class="codeIage"
          :src="src" fit="fill"                            
          style="width: 100px; height: 40px">
        </el-image> 
      </div>             
      </el-form-item>               
      <el-form-item>
        <div style="margin-left: 100px;">
          <el-button
            type="primary"
            :loading="loading"
            @click.prevent="submitForm('user')" >
            注册</el-button>
          <el-button style="margin-left: 70px;"
              @click.prevent="resetForm('user')">
            重置</el-button>
        </div>
      </el-form-item>
    </el-form> 
  </div>
</template>

<script>
    export default {
      data(){
        var checkEmail = (rule, value, callback) => {
           if (value === '') {
                callback(new Error('请输入邮箱'))                                      
            } else {
                callback()
            }
        }
        var checkPass=(rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请输入密码'));
            }else{
                if (this.user.pass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        }
        var checkcimpass=(rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }else if(value!== this.user.pass){
                 callback(new Error('两次输入密码不一致!'));
            }else {
                callback();
            }
        }
        var checkCode=(rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请输入验证码'))
            } else {
                callback()
            }
        }
        return{
            labelPosition: 'right',
            user: {
                userEmail: '',
                pass: '',
                cimpass:'',
                code:''
            },
            src:'https://localhost:5001/Login/GetImageCode',                
            color1: '#409EFF',
            loading: false,
            rules: {
                userEmail: [{ validator: checkEmail, trigger: 'blur' }],
                pass: [{ validator: checkPass, trigger: 'blur' }],
                cimpass:[{ validator: checkcimpass, trigger: 'blur' }],
                code:[{ validator: checkCode, trigger: 'blur' }]
            }
        }
      },
      methods:{
          //获取图片验证码
        changeImgCode(){          
            this.$axios({
                method: 'get',
                url:'https://localhost:5001/Login/GetImageCode',
                dataType: "json"
            }).then(res => { 
               var num= Math.ceil(Math.random()*10);
                console.log(res)
                this.src=res.config.url+`?`+num
            })
        },
        //提交表格
        submitForm (formName) {                
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(valid)
                    return true
                }else {                         
                // 没有输入数据进入===> valid 为false
                return false
                }
            })                
        },
        resetForm (formName) {
            this.loading = false
            this.$refs[formName].resetFields()
        },
        handleClick(tab, event){

        }
      }
    }
</script>

<style>   
    #sign_Up .el-form .el-form-item .el-form-item__label{
        width: 70px;
    }
    #sign_Up .el-form .el-form-item .el-form-item__content .el-input{
        width: 400px;       
    }
    #sign_Up .el-form .el-form-item .el-form-item__content .el-form-item__error{
        left: 80px;
    }
    .codeIage .el-image__inner {
        height: 40px;
    }
</style>
