export function configRouter (router) {
  // normal routes
  router.map({
    '/dashboard': {
      component: require('./components/Dashboard.vue')
    },
    '/templates': {
      component: require('./components/templates/Templates.vue')
    },
    '/templates/:templateUuid': {
      component: require('./components/templates/Template.vue'),
      subRoutes: {
        'edit': {
          component: require('./components/templates/Template.vue')
        }
      }
    }
  })
  // redirect
  router.redirect({
    '/': '/dashboard'
  })
}
