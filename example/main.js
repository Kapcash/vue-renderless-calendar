import Vue from 'vue';
import App from './App.vue';
import { RenderlessCalendar } from '../lib';
import { RenderlessCalendarBis } from '../libBis';

Vue.config.productionTip = false;

Vue.component('RenderlessCalendar', RenderlessCalendar);
Vue.component('RenderlessCalendarBis', RenderlessCalendarBis);

new Vue({
  render: h => h(App)
}).$mount('#app');
