import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date',dateFilter)
Vue.filter('currency',currencyFilter)
Vue.component('Loader',Loader)

firebase.initializeApp({
  apiKey: "AIzaSyDE6Xv-iCa2Ar9lmCbRY7YWVrTWsc0XoSA",
  authDomain: "vue-crm-ssystem.firebaseapp.com",
  databaseURL: "https://vue-crm-ssystem.firebaseio.com",
  projectId: "vue-crm-ssystem",
  storageBucket: "vue-crm-ssystem.appspot.com",
  messagingSenderId: "703189302739",
  appId: "1:703189302739:web:79519abf0c70fd14358326",
  measurementId: "G-1VLTJE8W9H"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({ 
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


