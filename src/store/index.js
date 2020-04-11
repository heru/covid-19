import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loading: false,
    ponorogo_geojson: [],
    ponorogo: [],
    kediri_geojson: [],
    kediri: [],
    blitar_geojson: [],
    blitar: [],
    kotakediri_geojson: [],
    kotakediri: [],
    kotablitar_geojson: [],
    kotablitar: [],
    nganjuk_geojson: [],
    nganjuk: [],
    tulungagung_geojson: [],
    tulungagung: [],
    trenggalek_geojson: [],
    trenggalek: [],
    pacitan_geojson: [],
    pacitan: [],
    madiun_geojson: [],
    madiun: [],
    kotamadiun_geojson: [],
    kotamadiun: [],
  },
  getters: {
    tulungagung: state => state.tulungagung,
    tulungagung_geojson: state => state.tulungagung_geojson,
    trenggalek: state => state.trenggalek,
    trenggalek_geojson: state => state.trenggalek_geojson,
    ponorogo: state => state.ponorogo,
    ponorogo_geojson: state => state.ponorogo_geojson,
    kediri: state => state.kediri,
    kediri_geojson: state => state.kediri_geojson,    
    kotakediri: state => state.kotakediri,
    kotakediri_geojson: state => state.kotakediri_geojson,
    blitar: state => state.blitar,
    blitar_geojson: state => state.blitar_geojson,
    kotablitar: state => state.kotablitar,
    kotablitar_geojson: state => state.kotablitar_geojson,
    nganjuk: state => state.nganjuk,
    nganjuk_geojson: state => state.nganjuk_geojson,
    pacitan: state => state.pacitan,
    pacitan_geojson: state => state.pacitan_geojson,
    madiun: state => state.madiun,
    madiun_geojson: state => state.madiun_geojson,
    kotamadiun: state => state.kotamadiun,
    kotamadiun_geojson: state => state.kotamadiun_geojson,
    loading: state => state.loading
  },
  mutations: {
    setLoading(state) {
      state.loading = !state.loading
    },
    set_data_tulungagung(state, data){
      state.tulungagung = data
    },
    set_data_trenggalek(state, data) {
      state.trenggalek = data
    },
    set_data_ponorogo(state, data) {
      state.ponorogo = data
    },
    set_geojson_kediri(state, data) {
      state.kediri_geojson = data
    },
    set_geojson_blitar(state, data){
      state.blitar_geojson = data
    },
    set_geojson_kotakediri(state, data) {
      state.kotakediri_geojson = data
    },
    set_geojson_kotablitar(state, data){
      state.kotablitar_geojson = data
    },
    set_geojson_nganjuk(state, data) {
      state.nganjuk_geojson = data
    },
    set_geojson_ponorogo(state, data) {
      state.ponorogo_geojson = data
    },
    set_geojson_madiun(state, data) {
      state.madiun_geojson = data
    },
    set_geojson_kotamadiun(state, data) {
      state.kotamadiun_geojson = data
    },
    set_geojson_pacitan(state, data) {
      state.pacitan_geojson = data
    },
    set_geojson_trenggalek(state, data) {
      state.trenggalek_geojson = data
    },
    set_geojson_tulungagung(state, data) {
      state.tulungagung_geojson = data
    }
  },
  actions: {
    async loadData({commit}, kabupaten){
      commit('setLoading')
      await fetch(
        `https://raw.githubusercontent.com/heru/geodata/master/data/data_${kabupaten}.json`,
        {
          cache: 'no-store'
        }
      ).then(resp => {
        if(resp.status != 200) {
          return;
        }
        resp.json().then(data => {
          commit(`set_data_${kabupaten}`, data)
          commit('setLoading')
        })        
      })      
    },
    async loadMap({commit}, kabupaten){
      commit('setLoading')
      await fetch(`https://raw.githubusercontent.com/heru/geodata/master/${kabupaten}.geojson`).then(response => {
        if(response.status != 200) {
          return;
        }
        response.json().then(data => {          
          commit(`set_geojson_${kabupaten}`, data)
          commit('setLoading')
        })        
      })      
    }
  }
})
export const data = ['tulungagung', 'trenggalek']
export const geojson = [
  'tulungagung_geojson', 
  'trenggalek_geojson', 
  'kediri_geojson', 
  'kotakediri_geojson', 
  'blitar_geojson', 
  'kotablitar_geojson', 
  'nganjuk_geojson',
  'madiun_geojson',
  'kotamadiun_geojson',
  'pacitan_geojson'
]
export const daerah = ['pacitan','tulungagung', 'ponorogo', 'trenggalek', 
  'blitar', 'kediri', 'nganjuk', 'kotakediri', 'kotablitar', 'madiun', 'kotamadiun']
daerah.forEach((kab) => {
  store.dispatch('loadMap', kab)
})
data.forEach((kab) => {
  store.dispatch('loadData', kab)
})

export default store