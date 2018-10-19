<template>
  <div class="answer-completed">
    <img src="../assets/huojiangye_bg.png" alt="" class="class_bg1" v-if="score.prize || (score.prize && score.prize.exchange_at)">
    <img src="../assets/weihuojiang.png" alt="" class="class_bg2" v-if="score.code == 101 || score.code == 102">
    <div class="main-content">
      <div class="page-top">
        <div class="award-tips" ><div>奖品有限 先到先得</div></div>
        <div class="score">{{score.score}}分</div>
        <!-- 获奖的字 -->
        
        <div class="congratulate">{{score.code == 102 ? "很遗憾您未获得学霸级称号" : "恭喜您获得学霸级称号"}}</div>
        
        <!-- 未获奖 -->
        <div class="award" v-if='score.code == 102'><img src="../assets/873870645647190313.png" alt=""></div>
        <!-- 获奖 -->
        <div class="award" v-if='score.prize && !score.prize.exchange_at'><img src="../assets/youhuiquan_img_yihexiao.png" alt=""></div>
        <!-- 核销 -->
        <div class="award" v-if='score.prize && score.prize.exchange_at'><img src="../assets/youhuiquan_img_weihexiao.png" alt=""></div>
        <!-- 无库存 -->
        <div class="award" v-if='score.code == 101'><img src="../assets/21993166781330284.png" alt=""></div>
        <div class="award-code" v-if="score.prize && score.prize.token">核销码: {{score.prize.token}}</div>
        <div class="back-home"><img src="../assets/btn_fanhuishouye.png" alt="" @click="backHome"></div>
      </div>
      <div class="slid-down"><img src="../assets/btn_shanghua.png" alt=""></div>
      <div class="slid-down-text">上滑查看正确答案</div>
      <div class="right-answer">
        <div class="answer-item" v-for='(item, index) in questionsRight' :key='item.id'>
          <div class="answer-title">{{index + 1}}、{{item.title}}</div>
          <div class="answer-right">
            <div><img src="../assets/icn_answer.png" alt=""></div>
            <div>{{item.answer}}.{{item.option}} </div>
          </div>
          <div class="clip-img" v-if='index != questionsRight.length -1'><img src="../assets/divider_answer.png" alt=""></div>
        </div>
      </div>
      <div class="bottom-line"></div>
    </div>
    <div class="login-modal-box" v-if='showAnswerModal'>
      <div class="login-modal">
        <div class="login-modal-bg"></div>
        <div class="close-login-modal"><img src="../assets/btn_close.png" alt="" @click="lookScore"></div>
        <div class="login-form">
          <div>感谢您在百忙之中抽出时间参与本次活动！</div>
          <div>点击下面 <span>“查看成绩”</span> 按钮查看本次成绩</div>
        </div>
        <div class="login-btn"><img src="../assets/btn_chakanchengji.png" alt="" @click="lookScore"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'answerCompleted',
  data () {
    return {
      class_bg: 'class_bg1',
      questionsRight: [],
      showAnswerModal: true,
      score: {},

    }
  },
  created() {
    if (this.$route.query.showModal) {
      this.showAnswerModal = false
    };
    this.getData()
    this.lookResult()
  },
  mounted() {
    // document.getElementsByClassName('page-top')[0].style.height = window.innerHeight - 80+ 'px' 
  },
  methods: {
    getData() {
      this.$axios.lookRightAnswer().then(res => {
        this.questionsRight = res

      })
    },
    lookResult() {
      this.$axios.lookResult().then(res => {
        this.score = res
      })
    },
    lookScore() {
      this.showAnswerModal = false
    },
    backHome() {
      this.$router.push({
        name: 'indexHome',query: {showModal: true}
      })
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.answer-completed {
  position: relative;
}

.main-content {
  position: relative;
  z-index: 999;
}

.class_bg1, .class_bg2 {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 888;
}

.award-tips {
  font-size: 24px;
  color: #463339;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.award-tips > div {
  margin: 60px 50px 0 0;
}

.score {
  font-size:131px;
  font-weight:bold;
  color:rgba(150,30,34,1);
  text-align: center;
  margin-top: 86px;
}

.congratulate {
  font-size:24px;
  font-weight:bold;
  color:rgba(70,51,57,1);
  margin-top: 25px;
  text-align: center;
}

.award {
  margin-top: 50px;
  height: 300px;
}

.award img {
  width: 540px;
  height: 300px;
  display: block;
  margin: auto;
}

.award-code {
  font-size:30px;
  font-weight:bold;
  color:rgba(70,51,57,1);
  text-align: center;
  margin-top: 20px;
}

.back-home {
  margin: 60px;
}

.back-home img {
  width: 480px;
  height: 96px;
  display: block;
  margin: auto;
}

.slid-down img {
  width: 38px;
  height: 36px;
  margin: auto;
  display: block;
}

.slid-down-text {
  color:rgba(70,51,57,1);
  font-size:24px;
  text-align: center;
  margin-top: 20px;
}

.right-answer {
  width:630px;
  border: 4px solid rgba(150,30,34,1);
  border-radius:20px;
  margin: 20px auto 60px;
  padding: 48px 0;
  height: 460px;
  overflow-y: scroll;
}

.right-answer::-webkit-scrollbar {
  display: none;
}

.answer-item {
  padding: 0 43px;
}

.answer-title {
  color: #463339;
  font-size: 30px;
  font-weight: 600;
}

.answer-right {
  display: flex;
  align-items: center;
  font-size: 30px;
  color: #E9BE3A;
  margin-top: 20px;
}

.answer-right img {
  width: 30px;
  height: 32px;
  margin-right: 10px;
}

.clip-img img {
  width:534px;
  height:4px;
  display: block;
  margin: 40px 0;
}

.bottom-line {
  height: 1px
}

.login-modal-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 9998;
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
  z-index: 9999;
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
  margin-top: 116px;
}

.login-form > div{
  width: 380px;
  margin: auto;
  text-align: center;
  font-size: 32px;
  color: #463339;
}

.login-form > div:nth-child(2){
  margin: 40px auto 50px;
}

.login-form > div:nth-child(2) span {
  color: #971E23;
}

.login-btn img {
  display: block;
  margin: auto;
  width:360px;
  height: 86px;
}


</style>
