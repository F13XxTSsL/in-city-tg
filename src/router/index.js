import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/client-fixation',
      name: 'clientFixationView',
      component: () => import('../views/ClientFixationView.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/how-fixation',
      name: 'howFixationView',
      component: () => import('../views/HowFixationView.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/my-profile',
      name: 'myProfileView',
      component: () => import('../views/MyProfile.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/login',
      name: 'AuthView',
      component: () => import('../views/LoginView.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/my-clients',
      name: 'myClientsView',
      component: () => import('../views/MyClients.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/select-curator',
      name: 'SelectCuratorView',
      component: () => import('../views/SelectCuratorView.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/objects',
      name: 'ObjectsView',
      component: () => import('../views/ObjectsView.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/blocked',
      name: 'BlockedView',
      component: () => import('../views/BlockedView.vue'),
      meta: { transition: 'slide-right' },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const agent = JSON.parse(localStorage.getItem('agent'))

  if (agent.status === 'BLOCKED' && to.path === '/') {
    next({ path: '/blocked' })
  } else if (agent.status !== 'BLOCKED' && to.path === '/blocked') {
    next({path: '/'})
  } else {
    next()
  }
})

router.afterEach((to, from) => {



  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
