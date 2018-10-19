<template>
  <div class="answer-page">
    <div class="answer-page-bg">
      <img src="../assets/datiye_bg.png" alt="" class="answer-bg-img" >
      <div class="question-detail-box">
        <div class="question-title">{{questionIndex + 1}}、{{thisQuestion.title}}</div>
        <div class="radio-question" v-if='thisQuestion.type == "single"'>
          <div class="radio-select-item" v-for="(item, index) in thisQuestion.option" :key='index'>
            <div class="radio-item">{{index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}}.{{item.content}}</div>
            <div @click="selectThis(index)" v-if='selectIndex !== index' class="select-btn"><img src="../assets/btn_unselected.png" alt=""></div>
            <div v-if='selectIndex === index' class="select-btn"><img src="../assets/btn_selected.png" alt=""></div>
          </div>
        </div>
        <div class="text-question" v-if='thisQuestion.type == "blank"'>
          <div><textarea placeholder="填写 (限100字)" maxlength="100" v-model="content"></textarea></div>
        </div>
      </div>
      <div class="next-problem" v-if='questionIndex != questions.length - 1'><img src="../assets/next_problem.png" alt="" @click="nextProblem(thisQuestion.id, thisQuestion.type)"></div>
      <div class="next-problem" v-if='questionIndex == questions.length - 1'><img src="../assets/btn_submit.png" alt="" @click="nextProblem(thisQuestion.id, thisQuestion.type)"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'answerPage',
  data () {
    return {
      questions: [],
      thisQuestion: {},
      questionIndex: 0,
      selectIndex: null,
      answers: [],
      content: ''
    }
  },
  created() {
    const query = this.$route.query;
    this.name = query.name
    this.phone = query.phone
    this.id = query.id
    this.getData()
    
  },
  methods: {
    getData() {
      this.$axios.getQuestions().then(res => {
        this.questions = res
        this.thisQuestion = this.questions[this.questionIndex]
      })
    },
    selectThis(index) {
      this.selectIndex = index
    },
    // 判断是否答完题
    nextProblem(id, type) {
      if (this.questionIndex < this.questions.length - 1 ) {

        if (type === 'single' && this.selectIndex === null) {
          window.alert = function(name){
              var iframe = document.createElement("IFRAME");
              iframe.style.display="none";
              iframe.setAttribute("src", 'data:text/plain,');
              document.documentElement.appendChild(iframe);
              window.frames[0].window.alert(name);
              iframe.parentNode.removeChild(iframe);
            };
            alert('请选择答案')
        } else if (type === 'single' && this.selectIndex !== null) {
          this.answers.push({
            id: id, answer: this.selectIndex == 0 ? 'A' : this.selectIndex == 1 ? 'B' : this.selectIndex == 2 ? 'C' : 'D'
          })
          this.questionIndex = this.questionIndex + 1
          this.thisQuestion = this.questions[this.questionIndex]
          this.selectIndex = null
        } else if(type === 'blank') {
          if (this.content.trim()) {
              this.answers.push({
              id: id, answer: this.content 
            })
            this.questionIndex = this.questionIndex + 1
            this.thisQuestion = this.questions[this.questionIndex]
            this.selectIndex = null
          } else {
            window.alert = function(name){
              var iframe = document.createElement("IFRAME");
              iframe.style.display="none";
              iframe.setAttribute("src", 'data:text/plain,');
              document.documentElement.appendChild(iframe);
              window.frames[0].window.alert(name);
              iframe.parentNode.removeChild(iframe);
            };
            alert('内容不能为空')
          }
        }
      } else {
        if (type === 'single' && this.selectIndex === null) {
          window.alert = function(name){
              var iframe = document.createElement("IFRAME");
              iframe.style.display="none";
              iframe.setAttribute("src", 'data:text/plain,');
              document.documentElement.appendChild(iframe);
              window.frames[0].window.alert(name);
              iframe.parentNode.removeChild(iframe);
            };
            alert('请选择答案')
        } else if (type === 'single' && this.selectIndex !== null) {
          this.answers.push({
            id: id, answer: this.selectIndex == 0 ? 'A' : this.selectIndex == 1 ? 'B' : this.selectIndex == 2 ? 'C' : 'D'
          })
        } else if(type === 'blank'){
          if (this.content.trim()) {
              this.answers.push({
              id: id, answer: this.content 
            })
          } else {
            window.alert = function(name){
              var iframe = document.createElement("IFRAME");
              iframe.style.display="none";
              iframe.setAttribute("src", 'data:text/plain,');
              document.documentElement.appendChild(iframe);
              window.frames[0].window.alert(name);
              iframe.parentNode.removeChild(iframe);
            };
            alert('内容不能为空')
          }
        }
        this.submitAnswers()
        
      }
    },
    

    submitAnswers() {
      const answers = this.answers
      const data = {
        name: this.name,
        phone: this.phone,
        answers: []
      }
      answers.forEach((item,index) => {
        data.answers.push({
          id: item.id, answer: item.answer
        })
      })

      this.$axios.submitAnswers({
          method: 'post',
          data: data
        }).then(res => {
          let token = null
          if (res.token) {
            token = res.token
          };
          this.$router.push({
            name: 'answerCompleted'
          })
        })
    }
  }
}
</script>

<style>
.answer-page {
  position: relative;
}

.answer-page-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.answer-bg-img {
  width: 100%;
  height: 100%;
}

.next-problem {
  position: absolute;
  width: 480px;
  bottom: 68px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
}

.next-problem img {
  width: 480px;
  height: 96px;
}

.question-detail-box {
  position: absolute;
  z-index: 998;
  top: 480px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 542px;
}

.question-title {
  font-size: 30px;
  color: #463339;
  font-weight: 600;
  margin-bottom: 40px;
}

.radio-select-item {
  padding: 0 30px;
  display: flex;
  align-items: center;
  font-size: 30px;
  color: #463339;
  height: 80px;
  border-radius:10px;
  border: 2px solid rgba(70,51,57,1);
  margin-bottom: 30px;
  justify-content: space-between;
}

.select-btn {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.select-btn img {
  width: 100%;
  height: 100%;
}

.text-question {
  width: 100%;
  height: 204px;
  background:rgba(255,252,238,1);
  border: 2px solid rgba(70,51,57,1);
  border-radius:10px; 
}

.text-question > div {
  height: 100%;
  margin: 20px;
  background:rgba(255,252,238,1);
  height: 184px;
}

.text-question textarea {
  width: 100%;
  height: 100%;
  border: 0;
  outline: medium;
  background:rgba(255,252,238,1);
  resize: none;
  font-size: 30px;
}

.text-question textarea::placeholder {
  color: #BBBBBB;
}





</style>
