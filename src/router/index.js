import Vue from 'vue'
import Router from 'vue-router'
import FaturaList from '@/components/FaturaList'
import CreateFatura from '@/components/CreateFatura'
import EditFatura from '@/components/EditFatura'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FaturaList',
      component: FaturaList
    },
    {
      path: '/add-fatura',
      name: 'CreateFatura',
      component: CreateFatura
    },
    {
      path: '/edit-fatura/:id',
      name: 'EditFatura',
      component: EditFatura
    }
  ]
})
