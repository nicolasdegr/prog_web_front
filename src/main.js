import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Importeer de store

Vue.config.productionTip = false;

new Vue({
    router, // Gebruik de router
    store, // Gebruik de store
    render: h => h(App), // Render de hoofdapplicatie component
}).$mount('#app'); // Monteer de applicatie op het element met id 'app'
