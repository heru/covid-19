import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loading: false,
    geojson: [],
    tulungagung: [],
    trenggalek: []
  },
  getters: {
    tulungagung: state => state.tulungagung,
    trenggalek: state => state.trenggalek,
    geojson: state => state.geojson,
    loading: state => state.loading
  },
  mutations: {
    setLoading(state) {
      state.loading = !state.loading
    },
    setDataTulungagung(state, data){
      state.tulungagung = data
    },
    setDataTrenggalek(state, data) {
      state.trenggalek = data
    },
    setGeojson(state, data) {
      state.geojson = data
    }
  },
  actions: {
    loadDataTulungagung({commit}){
      commit('setLoading')
      fetch(
        'https://raw.githubusercontent.com/heru/geodata/master/data_tulungagung.json',
        {
          cache: 'no-store'
        }
      ).then(resp => {
        if(resp.status != 200) {
          return;
        }
        resp.json().then(data => {
          commit('setDataTulungagung', data)
          commit('setLoading')
        })        
      })      
    },
    loadDataTrenggalek({commit}){
      commit('setLoading')
      fetch(
        'https://raw.githubusercontent.com/heru/geodata/master/data_trenggalek.json',
        {
          cache: 'no-store'
        }
      ).then(resp => {
        if(resp.status != 200) {
          return;
        }
        resp.json().then(data => {
          commit('setDataTrenggalek', data)
          commit('setLoading')
        })        
      })      
    },
    loadMap({commit}){
      commit('setLoading')
      fetch('https://raw.githubusercontent.com/heru/geodata/master/tatgk.geojson').then(response => {
        if(response.status != 200) {
          return;
        }
        response.json().then(data => {          
          commit('setGeojson', data)
          commit('setLoading')
        })        
      })      
    }
  }
})
store.dispatch('loadDataTulungagung')
store.dispatch('loadDataTrenggalek')
store.dispatch('loadMap')
export default store