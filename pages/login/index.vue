<template>
   <div class="login">
         <el-form label-width="80px" :inline="true"
            :label-position="labelPosition"
            :model="user"
            status-icon
            :rules="rules"
            ref="user"
            class="login_form">
            <el-form-item prop="userAccout" label="账号">
                <el-input
                    type="text"
                    v-model="user.userAccout"
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
            <el-form-item prop="code" label="验证码" 
                    style="width:230px">
                <el-input 
                    type="text"
                    v-model="user.code"
                     autocomplete="off"
                     clearable style="width:150px"> 
                </el-input>                
            </el-form-item>
             <div @click="changeImgCode()" style="width: 100px; height: 40px;    display: inline-block;">
                <el-image 
                  :src="src" fit="fill" style="width: 100px; height: 40px">
                </el-image> 
            </div>
            <el-form-item>
                <div style="margin-left: 84px;">
                    <el-button
                    type="primary"
                    :loading="loading"
                    @click.prevent="submitForm('user')" >
                    登录</el-button>
                <el-button @click.prevent="resetForm('user')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>         
    </div>   
</template>
<script>
export default {
    data () {
        var checkAccout = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'))                                      
            } else {
                callback()
            }
        }
        var checkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        var checkCode=(rule,value,callback)=>{
            if (value === '') {
                callback(new Error('请输入验证码'))
            } else {
                callback()
            }
        }
        return {
            labelPosition: 'right',
            user: {
                userAccout: '',
                pass: '',
                code:''
            },
            src:'https://localhost:5001/Login/GetImageCode',                
            color1: '#409EFF',
            loading: false,                    
            rules: {
                userAccout: [{ validator: checkAccout, trigger: 'blur' }],
                pass: [{ validator: checkPass, trigger: 'blur' }],
                code:[{ validator: checkCode, trigger: 'blur' }]
            }
        }
    },
    mounted(){
        this.changeImgCode();
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
        }
    }
}
</script>

<style scoped>
  .login{
      width: 400px;
  }
</style>
