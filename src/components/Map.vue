<template>
    <v-card class="ma-5">
      <v-card-title>
        <h5 v-if="!loading">Update tanggal {{ data.tanggal }}</h5>
        <h5 v-if="loading">Loading map</h5>
      </v-card-title>
      <v-card-subtitle v-if="!loading">
        Klik masing-masing wilayah untuk melihat detail
      </v-card-subtitle>
      <v-card-text>
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="loading"
          center
        ></v-progress-circular>     
        <l-map :zoom="zoom" :center="center" id="map" v-if="!loading" style="z-index: 0;">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-geo-json
              v-if="show"
              :geojson="geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
        </l-map>
      </v-card-text>
    </v-card>
</template>
<style>
#map{
  width: 100%;
  height: 100%;
  min-height: 450px;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet"
import { mapGetters } from 'vuex'

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    // LMarker
  },
  data () {
    return {
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 10,
      center: [-8.107913,111.904103],
      bounds: null,
      enableTooltip: true,
      fillColor: '#e4ce7f',
      show: true
    }
  },
  computed: {
    ...mapGetters([
      'geojson',
      'data',
      'loading'
    ]),
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction() {
      const fillColor = this.fillColor
      return () => {
        return {
          weight: 2,
          color: '#ECEFF1',
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        }
      }
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {}
      }
      return (feature, layer) => {
        const keyword = feature.properties.KECAMATAN
        const data = this.data.data
        
        data.find((el) => {  
          if(el.kecamatan == keyword) {
            const pdp = el.pdp
            const odp = el.odp
            const positif = el.positif
            const otg = el.otg
            if(positif > 0) {
              layer.setStyle({
                color: '#FFFFFF',
                fillColor: '#FF0000'
              })
            }
            layer.bindTooltip(
                `<div>Kecamatan : ${feature.properties.KECAMATAN} </div>
                <div>PDP : ${pdp}</div>
                <div>ODP : ${odp}</div>
                <div>Positif: ${positif}</div>
                <div>OTG : ${otg}`,
                { permanent: false, sticky: true }
            )
          }
        })
      }
    }
  }
}
</script>