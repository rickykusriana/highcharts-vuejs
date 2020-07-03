import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

import wordCloud from 'highcharts/modules/wordcloud'
// import noData from 'highcharts/modules/no-data-to-display'
// import darkUnica from "highcharts/themes/dark-unica";

// darkUnica(Highcharts);
// noData(Highcharts)
wordCloud(Highcharts)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(HighchartsVue)

new Vue({
    render: h => h(App),
}).$mount('#app')