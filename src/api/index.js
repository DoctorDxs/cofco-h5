import axios from 'axios'

// 封装请求 及 配置
const fetch = function(url, options) {
  axios.defaults.headers = {
    "Content-Type": "application/json",

    "Accept": "application/json"
  };
  axios.defaults.withCredentials = true;
  if (/$http/.test(url)) {
    url = url
  } else {
    axios.defaults.baseURL = 'http://activity.17link.cc/';
  }
  
  return new Promise((resolve, reject) => {
    axios(url ,options)
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  login(params) {
    return fetch('api/auth/login', params)
  },

  // getSign() {
  //   return fetch('api/jssdk?url=http://activity.17link.cc/destory')
  // },
  getInfo() {
    // localStorage.getItem(id)
    return fetch('api/activity/2?api_token=' + localStorage.getItem('api_token'))
  },
  
  getQuestions() {
    return fetch('api/activity/2/question?api_token=' + localStorage.getItem('api_token'))
  },
  submitAnswers(params) {
    return fetch('api/activity/2/question?api_token=' + localStorage.getItem('api_token'), params)
  },
  lookRightAnswer() {
    return fetch('api/activity/2/question/answer?api_token=' + localStorage.getItem('api_token'))
  },
  lookResult() {
    return fetch('/api/activity/2/result?api_token=' + localStorage.getItem('api_token'))
  }
}
