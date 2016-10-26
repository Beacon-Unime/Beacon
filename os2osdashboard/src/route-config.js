export function configRouter (router) {
  // normal routes
  router.map({
    '/dashboard': {
      component: require('./components/Dashboard.vue')
    },
    '/dashboard/:templateUuid': {
      component: require('./components/Dashboard.vue')
    },
    '/login': {
      component: require('./components/Login.vue')
    },
    '/logout': {
      component: require('./components/Login.vue')
    },
    '/templates': {
      component: require('./components/templates/Templates.vue')
    },
    '/templates/create': {
      component: require('./components/templates/TemplateCreate.vue')
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
