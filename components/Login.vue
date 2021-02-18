<template>
    <el-tabs id="login"
        v-model="activeName" 
        @tab-click="handleClick">
        <el-tab-pane 
            label="登录" 
            name="first">
            <div style="width:520px;height:270px;margin:auto">
                <el-form  
                    :label-position="labelPosition"
                    :model="user"
                    status-icon
                    :rules="rules"                   
                    ref="user">                    
                    <el-form-item 
                        prop="userAccount" 
                        label="账号">
                        <el-input 
                            type="text"
                            v-model="user.userAccount"
                            autocomplete="off"
                            prefix-icon="el-icon-s-custom"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass" label="密码">
                        <el-input
                            type="password"
                            prefix-icon="el-icon-s-goods"
                            v-model="user.userPass"
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
                            clearable style="width:330px"> 
                        </el-input>   
                        <div @click="changeImgCode()" 
                            style="width: 100px; 
                            height: 40px;    
                            display: inline-block;
                            position: absolute;
                            left: 390px;">
                            <el-image  class="codeIage"
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
                            登录</el-button>
                        <el-button style="margin-left: 70px;"
                            @click.prevent="resetForm('user')">
                            重置</el-button>
                        </div>
                    </el-form-item>
                </el-form> 
            </div>        
        </el-tab-pane>
        <el-tab-pane 
            label="注册" 
            name="second">
             <SignUp></SignUp>
        </el-tab-pane>
    </el-tabs>  
</template>
<script>
import signUp from '../components/SignUp' 
import emp from '~/store/emptyVue'
export default {     
    components:{
        SignUp:signUp,
    },
    data () {
        var checkAccout = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'))                                      
            } else {
                callback()
            }
        }
        var checkPass = (rule, value, callback) => {
            if(this.user.userAccount!==''){
                if (value === '') {
                callback(new Error('请输入密码'))
                } else {
                callback()
                }
            }           
        }
        var checkCode=(rule,value,callback)=>{
            if(this.user.userAccount!==''
            ||this.user.userPass!==''){//this.user.pass!==''){
                if (value === '') {
                callback(new Error('请输入验证码'))
                } else {
                    callback()
                }
            } 
        }
        return {
            activeName:'first',
            labelPosition: 'right',
            user: {
                userAccount: '',
                //pass: '',
                userPass:'',
                IP:'',
                Address:'',
                code:''
            },
            src:'https://localhost:5001/Login/GetImageCode?'+Math.ceil(Math.random()*10),                
            color1: '#409EFF',
            loading: false,                    
            rules: {
                userAccount: [{ validator: checkAccout, trigger: 'blur' }],
              //  pass: [{ validator: checkPass, trigger: 'blur' }],
                userPass: [{ validator: checkPass, trigger: 'blur' }],
                code:[{ validator: checkCode, trigger: 'blur' }]
            }
        }
    },
    mounted(){
        emp.$on("UPorInMethods",activeName=>{
            this.activeName=activeName     
            if( this.activeName=='first')
               this.changeImgCode()
            else     
              emp.$emit('SignUp',this.activeName)   
        })
       // this.changeImgCode();
    },
    async created (){
       try {
        let res = await this.GetIP()
        this.user.IP=res       
       } catch (err) {
        console.log(err)//1902a62a6409d4d3ecdd26032724e7df
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
        //    console.log(res)
           this.src=res.config.url+`?`+num
           })
        },
        async submitForm (formName) {  
            this.user.IP=await this.GetIP()    
            this.$refs[formName].validate(valid => {
                if (valid) { 
                    let token=window.sessionStorage.getItem('tosken')
                    if(token!=''
                        ||token==null||
                        token==undefined
                        ||token=='undefined')
                    {                          
                        this.$axios({
                           method: 'post'
                          ,url:'https://localhost:5001/Controllers/Login'
                          ,params:{...this.user}
                         })
                        .then(res=>{ 
                            console.log(res)                                            
                            if(res.data[0].msg=='OK'){                              
                             token=res.data[0].data[0].token                      
                             window.sessionStorage.setItem('tosken', token) //window.localStorage.setItem('token', token)
                             window.sessionStorage.setItem('User', res.data[0].data[0].U_Name) 
                             window.sessionStorage.setItem('ICO', res.data[0].data[0].U_ICO) 
                             this.$message({
                                message: '登录成功',
                                center: true
                             })
                              console.log(window.sessionStorage.getItem('tosken'));
                              emp.$emit('UserICOShow',true,res.data[0].data[0].U_ICO,res.data[0].data[0].U_Name);
                              emp.$emit('Login',false)  
                              this.$router.push({ name: 'find'})    
                            }
                            else{
                                console.log(window.sessionStorage.getItem('tosken'));
                                this.$message({
                                    message: '账号或密码错误',
                                    center: true
                                })
                            }
                        })           
                        .catch(err=>{
                            console.log(Ip);
                        })
                    }       
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
        GetIP(){
            return new Promise((resolve, reject)=>{
                this.$axios({
                method: 'get',               
                url:'https://v6r.ipip.net/?format=callback',                            
                })
                .then(res=>{
                    console.log(res)
                    resolve(res.data.split('\'')[1])  
                 })
            })            
        },      
        handleClick(tab, event){
            if(tab.name=='first'){               
                this.changeImgCode()
            }
            else{                
                emp.$emit('SignUp',this.activeName)
            } 
        }

    }
}
</script>

<style>
  #login{
    width: 560px;
    /* border: 4px solid #f4f4f5; */
    /* margin-left: 120px;
    margin-bottom: 120px; */
  }
 #login .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav #tab-first
 {
    margin-left: 65px;
  }
 #login .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__active-bar{
     left: 60px;
 }
  #login .el-tabs__content #pane-first div .el-form .el-form-item{
      margin-bottom: 32px;
  }
 #login .el-tabs__content #pane-first div .el-form .el-form-item .el-form-item__content .el-input{
    width: 440px;
    margin-left: 15px;
 }
 #login .el-tabs__content #pane-first div .el-form .codes .el-form-item__content .el-input{
    margin-left: 0;
 }
#login .el-tabs__content #pane-first div .el-form .el-form-item .el-form-item__content .el-form-item__error{
    left: 65px;
 } 
.codeIage .el-image__inner {
    height: 40px;
}
</style>
