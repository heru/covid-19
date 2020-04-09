import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loading: false,
    geojson: [],
    data: []
  },
  getters: {
    data: state => state.data,
    geojson: state => state.geojson,
    loading: state => state.loading
  },
  mutations: {
    setLoading(state) {
      state.loading = !state.loading
    },
    setData(state, data){
      state.data = data
    },
    setGeojson(state, data) {
      state.geojson = data
    }
  },
  actions: {
    loadData({commit}){
      commit('setLoading')
      fetch(
        'https://raw.githubusercontent.com/heru/geodata/master/data.json',
        {
          cache: 'no-store'
        }
      ).then(resp => {
        if(resp.status != 200) {
          return;
        }
        resp.json().then(data => {
          const geo = data
          commit('setData', geo)
          commit('setLoading')
        })        
      })      
    },
    loadMap({commit}){
      commit('setLoading')
      fetch('https://raw.githubusercontent.com/heru/geodata/master/trenggalek.geojson').then(response => {
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
store.dispatch('loadData')
store.dispatch('loadMap')
export default store