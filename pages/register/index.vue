<template>
  <div>
    <div class="hotpost">
      <div class="top">
        <el-form
          :model="searchForm"
          :inline="true"
          ref="searchForm"
          label-width="100px"
        >
          <el-form-item label="标签名称:" prop="labelName">
            <el-input
              v-model="searchForm.labelName"
              placeholder="请输入标签名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间:" prop="CreateTime">
            <el-date-picker
              style="width:300px"
              v-model="searchForm.CreateTime" 
              type="daterange" 
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              @change="changeDate">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="线上状态:" prop="Status">
            <el-select
              v-model="searchForm.Status"
              style="width: 80px"
              @change="selectStatus"
            >
              <el-option
                v-for="item in AllStatus"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="置顶状态:" prop="IsOverHead">
            <el-select
              v-model="searchForm.IsOverHead"
              style="width: 100px"
              @change="selectIsOverHead"
            >
              <el-option
                v-for="item in AllIsOverHead"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('searchForm')">重置</el-button>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="margin: 0px 30px 10px" @click="addPage"
          >新增标签</el-button
        >
      </div>
      <el-table style="width: 100%" :data="PageConfigure" row-key="CreateTime">
        <el-table-column label="序号" width="80" align="center" type="index" sortable>
        </el-table-column>
        <el-table-column label="标签名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.LabelName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="链接关键词" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.KeyWord}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章数"
          width="100"
          prop="ArticleNum"
          align="center"
        >
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="200" prop="CreateTime" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.CreateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="线上状态" width="100" align="center" prop="Status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              class="SwitchStatus"
              @change="changeStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作" align="center">
          <template slot-scope="scope">
            <span
              class="backSpan IsOverHead"
              @click="changeHtoLabel(scope.row)"
              :style="{ color: scope.row.IsOverHead ? '#ff3333' : '#5fb878' }"
            >
              {{ scope.row.IsOverHead ? "取消置顶" : "置顶" }}
            </span>
            <span
              class="backSpan"
              @click="eduit(scope.row)"
              style="color: #409eff"
            >
              编辑
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="task-list-page" v-if="PageConfigure !== ''">
        <el-pagination
          @current-change="OnCurrentPageChanged"
          @size-change="handleSizeChange"
          :current-page="Params.PageIndex"
          :page-sizes="[10, 20, 30, 40, 50, 60]"
          layout="prev, pager, next,sizes,jumper,total"
          :page-size="Params.PageSize"
          background
          :total="Params.TotalCount"
        >
        </el-pagination>
      </div>
      <!-- 编辑 -->
      <div class="formdia">
        <el-dialog :visible.sync="dialogFormVisible" custom-class="edit-form">
          <span class="isedit">
            {{ IsEdit ? "编辑标签" : "新增标签" }}
          </span>
          <el-form :model="Rowcontent" :rules="rules" ref="editForm">
            <el-form-item
              label="标签名称:"
              :label-width="formLabelWidth"
              prop="LabelName"
            >
               <el-input
                style="width: 340px"
                v-model="Rowcontent.LabelName"
                placeholder="请输入标签名称，不能超过20个字"
                maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="链接关键词:"
              :label-width="formLabelWidth"
              prop="KeyWord"
            >
               <el-input
                style="width: 340px"
                type="textarea"
                :rows="3"
                v-model="Rowcontent.KeyWord"
                placeholder="请输入链接关键词，不能超过50个字"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-form>
              
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button 
                :disabled="isDisabled"
                @click="submitForm('editForm')"
                > 确定 </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import Sortable from "sortablejs";
export default {
  data() {
    var LabelNameRules = (rule, value, callback) => {
      if (/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)) {
        callback();
      } else {
        callback(new Error("名称只允许输入汉字、数字或字母"));
      }
    };
    var KeyWordRules = (rule, value, callback) => {
      if (/^[0-9a-zA-Z]*$/g.test(value)) {
        callback();
      } else {
        callback(new Error("链接关键词只允许输入数字或字母"));
      }
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      Rowcontent: {
        Id: "",
        LabelName: "",
        KeyWord: "",
        ArticleNum: "",
        CreateTime: "",
        Status: "",
        IsOverHead:"",
      },
      rules: {
        LabelName: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          { validator: LabelNameRules, trigger: "blur" },
        ],
        KeyWord: [
          { required: true, message: "请输入链接关键词", trigger: "blur" },
          { validator: KeyWordRules, trigger: "blur" },
        ],
      },
      //列表分页数据
      PageConfigure: [],
      Params: {
        PageIndex: 1,
        PageSize: 10,
        TotalCount: 0,
        TotalPage: 0,
      },
      IsApp: false,
      IsEdit: false,
      pageconfigID: "",
      pageName: "",
      deleteStatus: false,
      isDisabled: false,
      searchForm: { 
        labelName:'',
        CreateTime:[],
        Status:'',
        IsOverHead:''
      },
      //查询数据
      searchContent: {},
      //线上状态
      AllStatus: [
        { value:'',label:'全部'},
        { value:'1',label:'显示'},
        { value:'0',label:'隐藏'},
      ],
      //置顶状态
      AllIsOverHead: [
        { value:'',label:'全部'},
        { value:'1',label:'已置顶'},
        { value:'0',label:'未置顶'},
      ],
       //解决重复点击问题
      isDisabled: false,
    };
  },
  created() {
    this.searchDate();
  },
  mounted() { },
  methods: {
    //获取数据
    searchDate() {
        var _this = this;
        this.$get(this.$api.SearchHotLabel, {
          ..._this.Params,
        }).then((res) => {
          console.log(res);
          _this.PageConfigure = res.Data;
          console.log(this.PageConfigure);
          _this.Params.TotalCount = res.TotalNumber;
          _this.Params.TotalPage = res.TotalPage;
        });
    },
    changeDate(val){  console.log(val);  if(val == null) {val = "0"}  console.log(val); },
    search(){
      var _this = this;
      if (this.searchForm.Status.trim()!='' &&_this.searchForm.Status!=null) {
        _this.searchContent.status = this.searchForm.Status
      }
      if (this.searchForm.IsOverHead.trim()!='' &&_this.searchForm.IsOverHead!=null) {
        _this.searchContent.isTop = this.searchForm.IsOverHead
      }
      if ( _this.searchForm.labelName!=null && _this.searchForm.labelName.trim()!='') {
        _this.searchContent.labelName = this.searchForm.labelName      
      }
      if ( _this.searchForm.CreateTime.length!=0 &&_this.searchForm.CreateTime.length!='') {
        console.log(_this.searchForm.CreateTime.length)
        _this.searchContent.startTime = this.searchForm.CreateTime[0];
        _this.searchContent.endTime = this.searchForm.CreateTime[1];   
      }
      this.$get(this.$api.SearchHotLabel,{ ...this.searchContent})
      .then((res)=>{
         console.log(res);
         _this.PageConfigure = res.Data;
         _this.searchContent = {};
      });
       
    },
    selectStatus(val) {
      var _this = this;
      _this.searchForm.Status =val;
      
    },
    selectIsOverHead(val){
      var _this = this;
      _this.searchForm.IsOverHead =val;
    },

    //设置线上状态
    changeStatus(row){
      // console.log(row.Id,row.Status);
      this.$post(this.$api.EnableHotLabel+'?id='+row.Id+'&status='+row.Status
      ).then((res) => {
        if (res.IsSuccess) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: "800",
          });
        }
      });
    },

    //设置置顶状态
    changeHtoLabel(row){
      // console.log(row.IsOverHead);
      let top;
      row.IsOverHead == true ? ( top = 0 ):( top = 1 )
      this.$post(this.$api.OverheadHotLabel+'?id='+row.Id+'&isTop='+top
      ).then((res) => {
        if (res.IsSuccess) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: "800",
          });
          this.searchDate();
        }
      });
    },

    //新增
    addPage() {
      this.IsEdit = false;
      this.dialogFormVisible = true;
      this.Rowcontent.Id = 0;
      this.Rowcontent.LabelName = "";
      this.Rowcontent.KeyWord = "";
      this.Rowcontent.ArticleNum = 0;
      this.Rowcontent.CreateTime = new Date();
      this.Rowcontent.Status = "0";
      this.Rowcontent.IsOverHead = "true";
    },
    //编辑
    eduit(val) {
      this.IsEdit = true;
      this.dialogFormVisible = true;
      console.log(val);
      this.Rowcontent.Id = val.Id;
      this.Rowcontent.LabelName = val.LabelName;
      this.Rowcontent.KeyWord = val.KeyWord;
      this.Rowcontent.ArticleNum = val.ArticleNum;
      this.Rowcontent.CreateTime = val.CreateTime;
      this.Rowcontent.Status = val.Status;
      this.Rowcontent.IsOverHead = val.IsOverHead;
    },
    //新增、编辑的提交
    entime() {
      setTimeout(() => {
        this.isDisabled = false;
      }, 500);
    },
    submitForm(editForm) {
      this.isDisabled = true;
      this.entime();
      var _this = this;
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          if (this.IsEdit) {
            console.log("编辑");
            console.log(this.Rowcontent);
            let val = this.Rowcontent;
            this.$post(this.$api.UpdateHotLabel+'?id='+val.Id+'&labelName='+val.LabelName+'&keyWord='+val.KeyWord)
            .then((res) => {
                if (res.IsSuccess) {
                  _this.$message({
                    message: "编辑成功",
                    type: "success",
                    duration: "1500",
                  });
                  _this.searchDate();
                }
              })
              .catch((err) => {
                console.log(err);
              });
            this.dialogFormVisible = false;
          } else {
            console.log("新增");
            console.log(this.Rowcontent);
            this.$post(this.$api.AddHotLabel, this.Rowcontent)
              .then((res) => {
                if (res.IsSuccess) {
                  _this.$message({
                    message: "新增成功",
                    type: "success",
                    duration: "1500",
                  });
                  _this.searchDate();
                }
              })
              .catch((err) => {
                console.log(err);
              });
            this.dialogFormVisible = false;
          }
        } else {
          this.$message({
            message: "请完善信息",
            type: "warning",
            duration: "1500",
          });
        }
      });
    },
    //获取分页
    OnCurrentPageChanged(val) {
      this.Params.PageIndex = val;
      console.log(this.Params.PageIndex);
      this.searchDate();
    },
    handleSizeChange(val) {
      this.Params.PageSize = val;
      console.log(val);
      this.searchDate();
    },
    //重置查询
    resetForm(searchForm) {
      this.$refs[searchForm].resetFields();
    },
  },
};
</script>
<style lang="stylus" scoped>
/deep/.has-gutter tr {
  th {
    background: #e6e6e6;
    color: #303133;
  }

  td {
    text-align: center;
  }
}

.hotpost {
  background: #fff;
  padding: 10px 10px;
  border-radius: 10px;

  .top {
    padding-left: 10px;
  }

  .backSpan {
    padding: 0px 10px;
    cursor: pointer;
  }
  .task-list-page {
    margin-top: 10px;
  }
  /deep/.SwitchStatus {
    .el-switch__label{
      position absolute
      display none
    }
    .el-switch__core:after{
      left 4px
    }
    /*打开时文字位置设置*/
    .el-switch__label--right {
        z-index: 1;
        right: 25px;  
        color #fff
    }
    /*关闭时文字位置设置*/
    .el-switch__label--left {
      z-index: 1;
      left: 25px;  
      color #606266
    }
    /*显示文字*/
    .el-switch__label.is-active {
      display: block;
    }
  }
  //打开时按钮位置
  /deep/.SwitchStatus.el-switch.is-checked .el-switch__core::after{
    left 100%
    margin-left -20px
  }

  /deep/.SwitchStatus.el-switch .el-switch__core,.el-switch .el-switch__label {
      width: 70px !important;    /*开关按钮的宽度大小*/
  }
}

/* 编辑框样式 */
/deep/.edit-form {
  span.isedit {
    position: absolute;
    top: 10px;
    left: 210px;
    font-size: 22px;
    color: #fff;
  }

  width: 500px;

  .el-dialog__header {
    height: 50px;
    text-align: center;
    background-color: #409eff;

    .el-dialog__title {
      font-size: 22px;
      color: #fff;
    }

    .el-dialog__headerbtn {
      display: none;
    }
  }

  .el-form-item .el-textarea__inner {
    resize: none;
  }

  .el-dialog__body {
    padding-bottom: 5px !important;
  }

  .dialog-footer {
    text-align: center;

    .el-button {
      background-color: #fff;
      color: #606266;
      border: 1px solid #dcdfe6;
    }

    .el-button:hover {
      background-color: #409eff;
      border-color: #409eff;
      color: #fff;
    }
  }
}
</style>