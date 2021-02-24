<template>
    <div class="user" > 
        <div class="wing_side">
            <div class="kg_uc_avatar_area">
                <div class="kg_uc_avatar_cover">
                    <el-image :src="ruleForm1.ICO" :alt="ruleForm1.name"></el-image>
                </div>
                <div class="kg_uc_avatar_txt">
                    <p align="center">{{ruleForm1.name}}</p>
                    <p align="center">(帐号:{{ruleForm1.userAccount}})</p>
                </div>
            </div>
        </div>
        <el-tabs style="width:1175px" type="border-card" 
            v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="修改头像"
                 name="ICO">
              <div class="icoALL">
                <div class="userico">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="imageSrc"
                        fit="fit">
                    </el-image>
                    <el-button 
                        class="checked" type="primary"
                        @click="ModifyUICO(imageSrc)">
                        选择</el-button>
                </div> 
                <div v-for="(item,index) in ImageUrl" 
                    class="userico" :key="index">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="item.url"
                        fit="fit">
                        </el-image>
                    <el-button type="primary"
                    @click="ModifyUICO(item.url)">选择</el-button>
                </div>  
              </div>
            </el-tab-pane>
            <el-tab-pane label="编辑资料" name="edit">
                <el-form style="text-align:left"
                    :model="ruleForm1" 
                    status-icon 
                    :rules="rules1" 
                    ref="ruleForm1" 
                    label-width="100px">
                    <el-form-item label="账号:"  >                                              
                       <p> {{ruleForm1.userAccount}}</p>
                    </el-form-item>
                    <el-form-item label="昵称：" >                                                
                        <el-input 
                            type="text" 
                            v-model="ruleForm1.name"                           
                            autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="性别" > 
                        <el-radio-group v-model="ruleForm1.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                            <el-radio label="保密"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item  label="生日">
                        <el-date-picker                            
                            type="date" 
                            placeholder="选择日期" 
                            format="yyyy-MM-dd" 
                            value-format="yyyy-MM-dd"
                            v-model="ruleForm1.birthday"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="电话:"  >                                              
                      <el-input 
                            type="text" 
                            v-model="ruleForm1.tel"                           
                            autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" >                                                
                        <el-input 
                            type="text" 
                            v-model="ruleForm1.email"                           
                            autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item 
                        label="邮箱验证码" prop="code">                      
                        <el-input v-model="ruleForm1.code"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitEditForm('ruleForm1')">提交</el-button>
                        <el-button @click="resetEditForm('ruleForm1')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" 
                name="changePass">
                <el-form :model="ruleForm"
                     status-icon :rules="rules" 
                     ref="ruleForm" label-width="100px">
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱验证码" prop="code">
                        <el-input v-model="ruleForm.code"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>          
        </el-tabs>
    </div>
</template>
<script>
export default { 
    asyncData ({ params}){
        console.log(params)
         let ac=params.active
         if(ac==='3'||ac===3)          
            return{activeName:'changePass'}           
         else if(ac==='2'||ac==='2')
            return{activeName:'edit'}
    },
    data(){
        var checkPass =(rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            else
                callback()
        }
        var checkcimpass=(rule, value, callback)=>{
            if(this.ruleForm.pass!==''){
                if(value === ''){
                    callback(new Error('请输入确认密码'));
                }
                else if(value!==this.ruleForm.pass){
                    callback(new Error('两次输入密码不一致'));
                }
                else
                  callback()
            }
        }
        var checkCode=(rule, value, callback)=>{
           if(this.ruleForm.pass!==''
            ||this.ruleForm.checkPass!==''){                 
                if (value === '') {                   
                    callback(new Error('请输入验证码'))
                } else {
                    callback()
                }
            }
        }
        //修改个人信息邮箱验证码
        var checkCode1=(rule, value, callback)=>{
            if(value==='')
             callback(new Error('请输入验证码'))
            else
             callback()
        }
        return{
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, 
                    {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                    }, 
                    {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            ICOmage:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            ImageUrl:[
                {url:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUv1Q.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUpRE.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUk3T.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUFY6.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUEQp.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUr9D.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUYmX.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUS84.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUtOG.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUJBu.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUHuz.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUlMk.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BU1RR.png'}
                ,{url:'https://s3.jpg.cm/2021/02/03/BUdu8.png'}                
            ],
            imageSrc:'https://imgessl.kugou.com/kugouicon/20100101/20100101192931478054.jpg',
            activeName:'edit', 
            ruleForm:{
                pass:'',
                checkPass: '' ,
                code:''              
            },  
            ruleForm1:{
                Id:100000000,
                ICO:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                userAccount:'admin',
                tel:'10000000000',
                email:'100000000@qq.com',
                name:'~~~~~',
                sex:'保密',
                birthday:'1979-01-01',
                code:''
            } ,
            rules1:{
                code:[
                    { validator: checkCode1, trigger: 'blur' }
                ] 
            },
            rules:{
                pass:[
                    { validator: checkPass, trigger: 'blur' }
                ],
                checkPass:[
                     { validator: checkcimpass, trigger: 'blur' }
                ],
                code:[
                    { validator: checkCode, trigger: 'blur' }
                ]                
            }    
        }  
        
    },
    mounted(){
        this.GetTokenFlage()
    },
    methods: {
        //是否登录
        GetTokenFlage(){
            if(window.sessionStorage.getItem('tosken')===null
                ||window.sessionStorage.getItem('tosken')===undefined){
               this.$message({
                message: '没有登录,返回首页',
                center: true
                })            
            }
            else{
                this.$axios({
                    url:'https://localhost:5001/Login/UserInfo',
                    method: 'post',
                    // params:{email:''},
                })
                .then(res=>{
                    console.log(res);
                    if(res.data[0].msg==='OK'&&
                        (res.data[0].status==='200'
                        ||res.data[0].status===200))
                    {
                        let data=res.data[0].data[0]
                        this.ICOmage=data.U_ICO
                        this.ruleForm1.userAccount=data.U_Account
                        this.ruleForm1.tel=data.U_Tel                         
                        this.ruleForm1.email=data.U_Email
                        this.ruleForm1.name=data.U_Name
                        this.ruleForm1.sex=data.U_Sex
                        this.ruleForm1.birthday=data.U_Birthday
                        this.ruleForm1.ICO=data.U_ICO
                        this.ruleForm1.Id=data.U_Id                       
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            }
         },
         //修改头像
         ModifyUICO(urlICO){           
            this.ICOmage=urlICO
            this.ruleForm1.ICO=urlICO
            this.ModifyPass()
         },
        //重置修改
        resetEditForm(formName){
            this.$refs[formName].resetFields();
        },
        //修改个人信息
        submitEditForm(formName){
            console.log(this.ruleForm1)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ModifyPass()
                  }else{                     
                      return false;
                }
            }) 
        },
        ModifyPass(){
            this.$axios({            
                url:'https://localhost:5001/Login/ModifyUserDetail'
                ,params:JSON.parse(JSON.stringify(this.ruleForm1))
                ,method:'post'
            })
            .then(res=>{
                console.log(res)
                if(res.data.msg==='OK')
                {
                    this.$message({
                        message: '信息'+res.data.data,
                        center: true
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        //修改密码
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        url:'https://localhost:5001/Login/ModifyUserPass'
                       ,method: 'post',
                        params:{password:this.ruleForm.pass,},
                    })
                    .then(res=>{
                       //console.log(res);
                       if(res.data[0].msg==='OK'){
                           this.$message({
                            message: '密码'+res.data[0].data,
                            center: true
                            })
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                } else {                   
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(tab, event){
            console.log(tab.name);
        }
    }
    
}
</script>
<style lang="stylus" scoped>
    .el-form{
        text-align:left
    }
    .el-input{
        width 60%
    }
   .wing_side{    
    width: 180px;
    background: #e2f4ff;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 40px;
    height: 720px;
    -webkit-box-shadow: inset -3px 0 3px #e1e1e1;
    -moz-box-shadow: inset -3px 0 3px #e1e1e1;
    box-shadow: inset -3px 0 3px #e1e1e1;
    float: left;  
    .kg_uc_avatar_cover{
        width: 165px;
        height: 165px;
        padding: 6px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        background: #fff;
        -webkit-box-shadow: 0 0 5px #ccc;
        -moz-box-shadow: 0 0 5px #ccc;
        box-shadow: 0 0 5px #ccc;
        border-radius: 6px;     
        .el-image{
            height: 178px;
            width: 178px;
        }   
    }
    .kg_uc_avatar_txt{
        color: #7b7b7b;
        line-height: 1.8;
    }
   }
   .icoALL{
       text-align :left;
       margin :0;
       padding :0;
       .userico{
         display :inline-block;
         .checked{
             display: inline;
         }
        }
   }    
</style>