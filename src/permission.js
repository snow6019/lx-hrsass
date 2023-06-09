import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      NProgress.done()
      next({ path: '/' })
    } else {
      if (Object.keys(store.state.user.userInfo).length <= 0) {
        store.dispatch('user/getUserInfo').then(() => {
          // NProgress.done()
          next()
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      NProgress.done()
      next()
    } else {
      NProgress.done()
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
