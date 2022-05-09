import { createRouter, createWebHistory } from 'vue-router'
const ReportsPage = () => import(/* webpackChunkName: "reports" */ '@/pages/ReportsPage.vue')

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "main" */ '@/pages/DashboardPage.vue'),
    meta: {
      i18nPath: 'dashboard.meta'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '@/pages/ProjectsPage.vue'),
    meta: {
      i18nPath: 'projects.meta'
    }
  },
  {
    path: '/gateways',
    name: 'Gateways',
    component: () => import(/* webpackChunkName: "gateways" */ '@/pages/GatewaysPage.vue'),
    meta: {
      i18nPath: 'gateways.meta'
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    props: true,
    component: ReportsPage,
    meta: {
      i18nPath: 'reports.meta.default'
    },
    children: [
      {
        path: 'time/:startDate?/:endDate?',
        name: 'Reports.Time',
        props: true,
        component: ReportsPage
      }, {
        path: 'project/:projectId?',
        name: 'Reports.Project',
        props: true,
        component: ReportsPage,
        meta: {
          i18nPath: 'reports.meta.project'
        },
        children: [{
          path: 'time/:startDate?/:endDate?',
          name: 'Reports.Project.Time',
          props: true,
          component: ReportsPage
        }]
      },
      {
        path: 'gateway/:gatewayId?',
        name: 'Reports.Gateway',
        props: true,
        component: ReportsPage,
        meta: {
          i18nPath: 'reports.meta.gateway'
        },
        children: [{
          path: 'time/:startDate?/:endDate?',
          name: 'Reports.Gateway.Time',
          props: true,
          component: ReportsPage
        }]
      },
      {
        path: 'project/:projectId?/gateway/:gatewayId?',
        name: 'Reports.Project.Gateway',
        props: true,
        component: ReportsPage,
        children: [{
          path: 'time/:startDate?/:endDate?',
          name: 'Reports.Project.Gateway.Time',
          props: true,
          component: ReportsPage
        }]
      }
    ]
  },
  {
    path: '/legal',
    component: () => import(/* webpackChunkName: "legal" */ '@/pages/LegalPage.vue'),
    children: [{
      name: 'Terms',
      path: 'terms',
      component: () => import(/* webpackChunkName: "legal" */ '@/components/legal/Terms.vue'),
      meta: {
        i18nPath: 'terms.meta'
      }
    }, {
      name: 'Privacy',
      path: 'privacy',
      component: () => import(/* webpackChunkName: "legal" */ '@/components/legal/Privacy.vue'),
      meta: {
        i18nPath: 'privacy.meta'
      }
    }]
  },
  {
    path: '/transaction/:transactionId',
    name: 'TransactionDetails',
    props: true,
    component: () => import(/* webpackChunkName: "transactions" */ '@/pages/TransactionsPage.vue'),
    meta: {
      i18nPath: 'transactions.meta'
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "main" */ '@/pages/AccountPage.vue'),
    meta: {
      i18nPath: 'account.meta'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
