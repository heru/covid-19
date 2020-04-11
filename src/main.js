import Vue from 'vue'
import App from './App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'

import { LMap, LTileLayer, LMarker, LLayerGroup, LControlScale, LControlLayers } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-control-layers', LControlLayers)
Vue.component('l-layer-group', LLayerGroup)
Vue.component('l-control-scale', LControlScale)

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
