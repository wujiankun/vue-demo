import Vue from 'vue'
import Router from 'vue-router'
import Loading from '@/components/Loading'
import Home from '@/views/Home'
// import Login from '@/views/Login/Login'
import Main from '@/views/Main/Main'

import User from '@/views/System/user'
import Adduser from '@/views/System/addEditUser'
import Role from '@/views/System/role'
import Addrole from '@/views/System/addEditRole'

import Personalinfo from '@/views/Person/personalInfo'
import Resetpassword from '@/views/Person/resetPassword'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      components: {
        default: Main
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          components: {
            default: Home
          }
        },
        {
          path: '/person/personalinfo',
          name: '/person/personalinfo',
          components: {
            default: Personalinfo
          }
        },
        {
          path: '/person/resetpassword',
          name: '/person/resetpassword',
          components: {
            default: Resetpassword
          }
        },
        {
          path: '/system/user',
          name: '/system/user',
          components: {
            default: User
          }
        },
        {
          path: '/system/addEditUser/:id?',
          name: '/system/addEditUser',
          components: {
            default: Adduser
          }
        },
        {
          path: '/system/role',
          name: '/system/role',
          components: {
            default: Role
          }
        },
        {
          path: '/system/addEditRole/:id?',
          name: '/system/addEditRole',
          components: {
            default: Addrole
          }
        }
      ]
    },
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home
      }
      // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})

router.options.routes.forEach(item => {
  item.components.Loading = Loading
  if (item.name === 'Login') {
    return false
  }
})
export default router
