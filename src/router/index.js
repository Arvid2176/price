import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PersonStaticPage from '../page/PersonStaticPage.vue'
import EntStaticPage from '../page/EntStaticPage.vue'
import NotFound from '../page/404.vue'
import Home from '../page/Home.vue'

Vue.use(Router)

export default new Router({
  routes:[
    // {

    // path: '/login',
    // component: Login,
    // name: '',
    // hidden: true
// },
// {
//     path: '/HelloWorld',
//     component: HelloWorld,
//     name: '',
//     hidden: true
// },
{
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
},
 {
    path: '/',
    component: Home,
    name: '统计',
    iconCls: 'ios-home',
    leaf: true, //只有一个节点
    children: [
        { path: '/', component: PersonStaticPage, name: '个人统计' }
    ]
},
{
    path: '/',
    component: Home,
    name: '主页',
    iconCls: 'stats-bars',
    leaf: true, //只有一个节点
    children: [
        { path: '/ent', component:EntStaticPage, name: '企业统计' }
    ]
},
{
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
}
]
})
