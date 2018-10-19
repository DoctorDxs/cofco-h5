import Vue from 'vue'
import Router from 'vue-router'
import indexHome from '@/pages/index'
import answerPage from '@/pages/answerPage'
import answerCompleted from '@/pages/answerCompleted'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexHome',
      component: indexHome
    },
    {
      path: '/answerPage',
      name: 'answerPage',
      component: answerPage
    },
    {
      path: '/answerCompleted',
      name: 'answerCompleted',
      component: answerCompleted
    }
  ]
})
