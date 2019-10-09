<template>
  <div class="onlineService">
    <p>{{$t('homePage.onlineService.title')}}</p>
    <!-- <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             label-position="right">
      <el-form-item label="用户登陆ID"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="房间号"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户手机号"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="报修类型"
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请选择报修类型"
                   class="selectStyle">
          <el-option label="网络故障"
                     value="shanghai"></el-option>
          <el-option label="环境恶劣"
                     value="beijing"></el-option>
          <el-option label="水电供应"
                     value="beijing"></el-option>
          <el-option label="其他"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细说明"
                    prop="desc">
        <el-input type="textarea"
                  v-model="ruleForm.desc"
                  class="textStyle"
                  maxlength="100"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="紧急处理"
                    prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <!-- <el-form-item label="活动时间"
                    required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.date1"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line"
                :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间"
                            v-model="ruleForm.date2"
                            style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送"
                    prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质"
                    prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动"
                       name="type"></el-checkbox>
          <el-checkbox label="地推活动"
                       name="type"></el-checkbox>
          <el-checkbox label="线下主题活动"
                       name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光"
                       name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源"
                    prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> 
       <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item> 
    </el-form>-->
    <el-button type="primary"
               @click="addUser"
               class="addApplication">{{$t('homePage.onlineService.addApplication')}}</el-button>
    <el-table :data="form"
              stripe
              border
              v-loading="loading"
              :default-sort="{prop: 'Id', order: 'ascending'}"
              :element-loading-text='`${$t("manage.loadingText")}`'
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              style="width: 100%; margin-top:20px;">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username"
                       :label='`${$t("opinionManage.userName")}`'
                       sortable>
      </el-table-column>
      <el-table-column prop="phone"
                       :label='`${$t("opinionManage.phone")}`'
                       sortable></el-table-column>
      <el-table-column prop="type"
                       :label='`${$t("opinionManage.type")}`'
                       sortable></el-table-column>
      <el-table-column prop="content"
                       :label='`${$t("opinionManage.content")}`'
                       sortable></el-table-column>
      <el-table-column prop="require"
                       :label='`${$t("opinionManage.require")}`'
                       sortable></el-table-column>
      <el-table-column prop="emergency_degree"
                       :label='`${$t("opinionManage.emergencyDegree")}`'
                       sortable></el-table-column>
      <el-table-column prop="date"
                       :label='`${$t("opinionManage.date")}`'
                       sortable></el-table-column>
      <el-table-column fixed="right"
                       :label='`${$t("repairManage.status")}`'>
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="scope.row.status == 0"
                     @click.native="clickReply(scope.$index, scope.row)">{{$t("opinionManage.noReply")}}</el-button>
          <span type="text"
                v-else
                class="processed">{{$t("opinionManage.replied")}}</span>
          <el-button @click="deleteRow(scope.$index, scope.row)"
                     type="text"
                     size="small"
                     v-if="scope.row.status == 1"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserOpinionInfo } from '../../service/user/userOnlineService';
import showMessageBox from "../../mixin/showMessageBox"
export default {
  name: "userOnlineService",
  data () {
    return {
      form: [],
      loading: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
    };
  },
  mixins: [showMessageBox],
  mounted () {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);
    this.getAllOpinionInfo();
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    //get all repair info
    async getAllOpinionInfo () {
      const self = this;
      const loginid = sessionStorage.getItem("userLoginId");
      const response = await getUserOpinionInfo(self, loginid);
      console.log(response + loginid);
      // if (_.isEmpty(response)) {
      //   self.showErrorMessageBox();
      // } else {
      //   self.form = response;
      // }
    },
    // 点击回复
    async clickReply (index, row) {
      const self = this;
      self.updateReplyFormVisible = true;
      self.updateReplyForm = Object.assign({}, row);
    },

    //点击添加用户
    addUser () {

    },
    //单个移除
    deleteRow (index, rows) {
      // const self = this;
      // self
      //   .$confirm(
      //     this.$t("manage.confirm.deleteAdmin"),
      //     this.$t("manage.confirm.warning"),
      //     {
      //       confirmButtonText: this.$t("button.ok"),
      //       cancelButtonText: this.$t("button.cancel"),
      //       type: "warning"
      //     }
      //   )
      //   .then(async () => {
      //     const str = [];
      //     const id = rows.id;
      //     str.push(id);
      //     const response = await deleteUser(self, str);
      //     if (_.isEqual(response.data, "fail to delete user")) {
      //       self.showErrorMessageBox();
      //     } else {
      //       self.getUserData();
      //       self.showSuccessMessageBox();
      //     }
      //   })
      //   .catch(() => {
      //     self.showCancelMessageBox();
      //   });
    },
  }
}
</script>

<style lang="scss" scoped>
.onlineService {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  // border: 1px solid red;
  // .inputWidth {
  //   width: 55% !important;
  // }
  p {
    font-size: 20px;
  }
  .demo-ruleForm {
    border: 1px solid rgb(58, 55, 247);
    width: 60%;
    height: 70%;
    margin: 0 auto;
    label {
      width: 90px;
      color: #a4a6a8;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 15x;
      // width: 50%;
      .el-form-item__content {
        margin: 0 !important;
      }
    }
    .inputWidth {
      widows: 95% !important;
    }
    .selectStyle {
      float: left;
      margin-left: 8px;
    }
    .textStyle {
      width: 95%;
    }
  }
}
.el-form-item__content {
  margin-left: 120px !important;
}

.addApplication {
  float: left;
  margin-left: 16px;
  margin-bottom: 16px;
  background: white;
  color: #3a3838;
  border-color: #3a3838;
  padding: 8px;
}
</style>