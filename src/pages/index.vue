<template>
  <div class="index-home">
    <div class="bg-img-box">
      <img src="../assets/home_bg.png" alt="" class="bg-img">
      <img src="../assets/btn_start.png" alt="" class="start-btn" @click="startAnswer" v-if='!info.is_sign && showBtn'>
      <img src="../assets/btn_chakanjieguo.png" alt="" class="start-btn" @click="lookResult" v-if='info.is_sign && showBtn'>
    </div>
    <!--  -->
    <div class="login-modal-box" v-if='loginModal && showModal'>
      <div class="login-modal">
        <div class="login-modal-bg"></div>
        <div class="login-title">登录</div>
        <div class="close-login-modal"><img src="../assets/btn_close.png" alt="" @click="login"></div>
        <div class="login-form">
          <div class="login-input">
            <img src="../assets/icon_name.png" alt=""><span></span><input type="text" placeholder="请输入您的姓名" v-model="name">
          </div>
          <div class="login-input">
            <img src="../assets/icon_phone.png" alt=""><span></span><input type="text" placeholder="请输入您的手机号" v-model="phone">
          </div>
        </div>
        <div class="login-btn"><img src="../assets/btn_login.png" alt="" @click="login"></div>
      </div>
    </div>


    <div class="lead-bg" v-if="leadModal && showModal">
      <div class="lead-modal">
        <img src="../assets/yindaoye_bg.png" alt="" class="lead-modal-bg">
        <div class="close-btn"><img src="../assets/btn_close2.png" alt="" @click="Ikonw"></div>
        <div class="click-me-start"><img src="../assets/btn_dianwokaishi.png" alt="" @click="Ikonw"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexHome',
  data () {
    return {
      leadModal: true,
      loginModal: false,
      name: '',
      phone: '',
      canStart: false,
      id: '',
      info: {},
      showModal: true,
      showBtn: false
    }
  },
  created() {
    let showModal = this.$route.query.showModal || false
    if (showModal) {
      this.leadModal = false
      this.showBtn = true
      this.showModal = false
      this.info.is_sign = true
    } else {
      this.leadModal = true
      this.showModal = true
    };
    
  },
  methods: {
    getData() {
      this.$axios.getInfo().then((res) => {
        this.info = res
        this.showBtn = true
      })
    },
    Ikonw() {
      this.leadModal = false
      this.loginModal = true
    },
    lookResult() {
      this.$router.push({
        name: 'answerCompleted',query: {showModal: true}
      })
    },
    userLogin(data) {
      this.$axios.login({
          method: 'post',
          data: data
        }).then(res => {
          if (res.status == 200) {
            localStorage.setItem('api_token', res.api_token)
            this.getData()
          }
        })
    },
    login() {
      if (!this.name.trim()) {
        window.alert = function(name){
          var iframe = document.createElement("IFRAME");
          iframe.style.display="none";
          iframe.setAttribute("src", 'data:text/plain,');
          document.documentElement.appendChild(iframe);
          window.frames[0].window.alert(name);
          iframe.parentNode.removeChild(iframe);
        };
        this.canStart = false
        alert('请填写您的姓名')
      } else if (!this.phone.trim()) {
        window.alert = function(name){
          var iframe = document.createElement("IFRAME");
          iframe.style.display="none";
          iframe.setAttribute("src", 'data:text/plain,');
          document.documentElement.appendChild(iframe);
          window.frames[0].window.alert(name);
          iframe.parentNode.removeChild(iframe);
        };
        this.canStart = false
        alert('请填写您的手机号码')
      } else if  (!this.phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        window.alert = function(name){
          var iframe = document.createElement("IFRAME");
          iframe.style.display="none";
          iframe.setAttribute("src", 'data:text/plain,');
          document.documentElement.appendChild(iframe);
          window.frames[0].window.alert(name);
          iframe.parentNode.removeChild(iframe);
        };
        this.canStart = false
        alert('请填写正确手机号码')
        
      } else {
        this.userLogin({'phone': this.phone})
        this.loginModal = false
        this.canStart = true
      }
      
    },
    startAnswer() {
      if (this.canStart) {
        this.$router.push({
          name: 'answerPage',query: {name: this.name, phone: this.phone}
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-home {
  position: relative;
}

.bg-img-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.bg-img {
  width: 100%;
  height: 100%;
}

.start-btn {
  width: 480px;
  height: 96px;
  position: absolute;
  bottom: 70px;
  right: 0;
  left: 0;
  margin: auto;
}

.login-modal-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
}

.login-modal {
  width: 590px;
  height: 494px;
  background-color: #fff;
  border-radius: 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}

.login-modal-bg {
  position: absolute;
  background: url('../assets/login_bg.png') no-repeat;
  height: 96px;
  width: 100%;
  background-size: cover;
  top: 0;
  left: 0;
}

.login-title {
  text-align: center;
  position: relative;
  color: #463339;
  font-size: 48px;
  margin-top: 50px;
  font-weight:bold;
}

.close-login-modal {
  position: absolute;
  top: 10px;
  right: 30px;
}

.close-login-modal img {
  width: 26px;
  height: 25px;
}

.login-form {
  padding:  40px;
}

.login-input {
  display: flex;
  align-items: center;
  height:86px;
  width: 510px;
  background:rgba(245,245,245,1);
  border-radius: 10px;
}

.login-input input {
  border: 0;
  outline: medium;
  background:rgba(245,245,245,1);
  height: 100%;
  font-size: 30px;
  font-weight: 400;
  width: 360px;
}

.login-input span {
  width: 2px;
  height: 40px;
  border-radius: 1px;
  background:rgba(70,51,57,1);
  margin-right: 60px;
  flex-shrink: 0;
}

.login-input:nth-child(1) {
  margin-bottom: 30px;
}

.login-input:nth-child(1) > img {
  width:38px;
  height:42px;
  margin: 0 20px;
  flex-shrink: 0;
}

.login-input:nth-child(2) > img {
  width:31px;
  height:44px;
  margin: 0 20px;
  flex-shrink: 0;
}

.login-btn img {
  display: block;
  margin: auto;
  width:360px;
  height: 86px;
}

.lead-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  top: 0;
  left: 0;
}

.i-konw {
  background: #fff;
  margin-top: 400px;
}

.lead-modal {
  width: 601px;
  height: 908px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.lead-modal-bg {
  width: 601px;
  height: 908px;
}

.close-btn {
  position: absolute;
  width: 54px;
  height: 54px;
  top: -32px;
  right: 10px;
}

.close-btn img {
  width: 54px;
  height: 54px;
}


.click-me-start {
  position: absolute;
  bottom: 45px;
  left: 0;
  right: 0;
  margin: auto;
}

.click-me-start img {
  width: 300px;
  height: 86px;
  display: block;
  margin: auto;
}

.lead-text {
  position: absolute;
  top: 75px;
  width: 430px;
  height: 478px;
  overflow-y: scroll;
  right: 0;
  left: 0;
  margin: auto;
}

.lead-title {
  font-size:46px;
  font-family:MicrosoftYaHei-Bold;
  font-weight:bold;
  color:rgba(70,51,57,1);
  text-align: center;
}

.lead-tips img {
  width:230px;
  height:32px;
  display: block;
  margin: 10px auto 0;
  
}

.lead-tips {
  position: relative;
}

.lead-tips span {
  display: block;
  position: absolute;
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size:24px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  top: 0
}

.lead-content {
  color: #463339;
  font-size: 28px;
  font-family: FZYiHei-M20S;
  text-indent: 40px;
  margin-top: 36px;
  font-weight: 600;
  text-align: justify;
}
</style>
