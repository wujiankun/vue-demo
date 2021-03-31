<template>
  <div id="login">
    <div class="login-box">
      <div class="login-logo">
        <div class="login-body">
          <h2 class="login-title">互联网仲裁系统</h2>
          <el-form ref="form" :model="formLogin" label-width="0px" class="login-form">
            <el-form-item class="loginW" label="" width="100">
              <el-input
                placeholder="请输入用户名称"
                prefix-icon="iconfont  icon-collection-weibiaoti1"
                @keyup.native.enter="submit"
                v-model="formLogin.workNumber">
              </el-input>
            </el-form-item>
            <el-form-item label="" class="loginW">
              <el-input
                type="password"
                placeholder="请输入密码"
                prefix-icon="iconfont  icon-collection-ai241"
                @keyup.native.enter="submit"
                v-model="formLogin.password">
              </el-input>
            </el-form-item>
            <div class="codeCon">
              <el-input
                prefix-icon="iconfont  icon-collection-ai241"
                v-model="formLogin.verifyCode"
                style="width: 50%;float: left;margin-right: 10px;height: 32px;"
              >
              </el-input>
              <!--<input type="text" id="input" v-model="formLogin.verifyCode"/>-->
              <img ref="picture" v-show="showPicture" :src="actionUrl" @click="changeCode">
              <span v-show="!showPicture" style="color:red">请勿频繁刷新验证码，请1分钟后重试</span>
            </div>
            <el-form-item class="msgStyle" label="">
              {{msg}}
            </el-form-item>
            <el-form-item class="msgStyle" label="">
              <el-checkbox v-model="checked">Remember me</el-checkbox>
            </el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Utils from '@/utils/utils.js'
import {
  login,
  generateVerifyCode
} from '@/services/LoginService'

export default {
  name: 'Login',
  data () {
    return {
      validateShow: true,
      formLogin: {
        workNumber: '',
        password: '',
        verifyCode: '',
        sessionId: ''
      },
      timestamp: +new Date(),
      checked: null,
      msg: '',
      showPicture: true,
      sessionId: this.guid(),
      actionUrl: ''
    }
  },
  watch: {
    timestamp: function () {
      this.generateVerifyCode()
    }
  },
  mounted () {
    this.isSession()
    this.getlocalStorage()
    this.changeCode()
  },
  methods: {
    generateVerifyCode () {
      const data = {
        sessionId: this.guid(),
        timestamp: this.timestamp
      }
      generateVerifyCode(data).then(res => {
        if (res.code === 0) {
          const image = res.data.image
          this.actionUrl = 'data:image/png;base64,' + image
          this.$refs.picture.setAttribute('src', this.actionUrl)
        } else {
          this.showPictureErrorHandler()
        }
      })
    },
    guidOne () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    guid () {
      return (this.guidOne() + this.guidOne() + '-' + this.guidOne() + '-' + this.guidOne() + '-' + this.guidOne() + '-' + this.guidOne() + this.guidOne() + this.guidOne())
    },
    isSession () {
      if (localStorage.getItem('sessionId')) {
        this.formLogin.sessionId = localStorage.getItem('sessionId')
        this.sessionId = localStorage.getItem('sessionId')
      } else {
        this.formLogin.sessionId = this.sessionId = this.guid()
        localStorage.setItem('sessionId', this.guid())
      }
    },
    showPictureErrorHandler () {
      this.showPicture = false
    },
    getlocalStorage () {
      if (localStorage.getItem('sitePassword')) {
        this.formLogin.password = Utils.decrypt(localStorage.getItem('sitePassword'))
      }
      this.formLogin.workNumber = localStorage.getItem('siteWorkNumber') // 保存到保存数据的地方

      this.checked = localStorage.getItem('siteChecked') === 'true'
    },
    changeCode () {
      this.timestamp = +new Date()
    },
    submit () {
      const self = this
      localStorage.setItem('siteWorkNumber', self.formLogin.workNumber)
      if (self.checked === true) {
        localStorage.setItem('sitePassword', Utils.encrypt(self.formLogin.password))
        localStorage.setItem('siteChecked', self.checked)
      } else {
        localStorage.removeItem('sitePassword')
        localStorage.setItem('siteChecked', self.checked)
      }
      login(this.formLogin).then(res => {
        if (!res) return
        if (res.code === 0) {
          // @todo: 当前为本地存储的解决方式，以后换为vuex。
          localStorage.setItem('ifLookMobile', res.data.ifLookMobile)
          localStorage.setItem('Authorization', `Bearer ${res.data.token}`)
          localStorage.setItem('siteName', res.data.userName)
          this.$router.push('/home')
          // this.changeCode();
          if (res.data.firstLogin) {
            this.$message.success('首次登陆，建议修改密码！')
          }
        } else {
          this.msg = res.msg
          this.changeCode()
        }
      })
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $blue-color: #6392fe;
  #login {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: hidden;
    background: #d2d6de;
    display: flex;
    justify-content: center;

    .loginW {
      width: 100% !important;
    }

    .login-form .el-button {
      width: 100%;
      border-color: #6392fe;
      background-color: #6392fe;
      font-size: 18px;
    }

    .login-title {
      text-align: center;
      font-weight: 700;
      color: #6392fe;
      margin-bottom: 50px;
      font-size: 30px;
    }

    .login-body {
      margin: 0 auto;
      width: 270px;
    }

    .login-box {
      position: absolute;
      top: 20%;
      border-width: 0px;
      width: 420px;
      height: 410px;
      background: inherit;
      padding-top: 40px;
      background-color: rgba(255, 255, 255, 1);
      border: none;
      border-radius: 10px;
      -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
      -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
      font-family: '微软雅黑 Bold', '微软雅黑';
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      color: #999999;
      text-align: left;
      line-height: 20px;
    }

    .login-form .el-input:focus {
      border: solid 5px #6392fe;
      outline: none;
    }

    .pass-body {
      margin-top: 40px;
    }

    .msgStyle {
      color: red;
    }

    .el-form-item__content {
      line-height: 23px;
    }

    .codeCon {
      height: 40px;
      display: block;
      margin-bottom: 20px;
    }
  }

</style>
