<template>
    <v-card class="ma-5">
      <v-card-title>
        <span v-if="loading">Loading data ...</span>
        <span v-if="!loading">Sebaran COVID-19</span>
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
            <!-- <l-geo-json
              v-if="show"
              :geojson="ponorogo_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            -->
            <l-geo-json
              v-if="show"
              :geojson="tulungagung_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="trenggalek_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="kediri_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="blitar_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="nganjuk_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="kotakediri_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="kotablitar_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="pacitan_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="madiun_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
            <l-geo-json
              v-if="show"
              :geojson="kotamadiun_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json> -->
        </l-map>
      </v-card-text>
      <v-card-text>
        <p>Sumber data :<br/>
        DINAS Kesehatan Kab. Tulungagung tanggal {{ tulungagung.tanggal }} <br/>
        DINAS Kesehatan Kab. Trenggalek {{ trenggalek.tanggal }}</p>
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
import { data, geojson } from '@/store'

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
        zoom: 9,
        center: [-8.00013,111.700103],
        bounds: null,
        enableTooltip: true,
        fillColor: '#e4ce7f',
        show: true,
        kabupaten_list: geojson
    }
  },
  computed: {
    ...mapGetters([
      ...data,
      ...geojson,
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
        let data = []
        let color = '#FFFFFF'
        switch(feature.properties.KABUPATEN) {          
          case 'TULUNGAGUNG':
            data = this.tulungagung.data
            break
          case 'TRENGGALEK':
            data = this.trenggalek.data
            color = '#000000'
            break
          case 'PONOROGO':
            data = this.ponorogo.data
            color = '#FFFFFF'
            break
          case 'KEDIRI':
          case 'BLITAR':
          case 'KOTA KEDIRI':
          case 'KOTA BLITAR':
          case 'MADIUN':
          case 'KOTA MADIUN':
          case 'PACITAN':
          case 'NGANJUK':
            data = null
            color = '#FFFFFF'
            break
          default:
            break
        }
        if(null != data) {
          data.find((el) => {  
            if(el.kecamatan == keyword) {
              const pdp = el.pdp
              const odp = el.odp
              const positif = el.positif
              const otg = el.otg
              let fillColor = '#e4ce7f'
              if(positif > 0) {
                fillColor = '#FF0000'
              } 

              layer.setStyle({
                color: color,
                fillColor: fillColor
                // fillOpacity: 0.09,
              })
              layer.bindTooltip(
                  `<div>Kabupaten : ${feature.properties.KABUPATEN} </div>
                  <div>Kecamatan : ${feature.properties.KECAMATAN} </div>
                  <div>PDP : ${pdp}</div>
                  <div>ODP : ${odp}</div>
                  <div>Positif: ${positif}</div>
                  <div>OTG : ${otg}`,
                  { permanent: false, sticky: true }
              )
            }
          })
        } else {
          layer.setStyle({
            color: '#000000',
            fillColor: '#ECEFF1',
            // fillOpacity: 0.09,
          })
          layer.bindTooltip(
            `<div>Kabupaten : ${feature.properties.KABUPATEN} </div>
            <div>Kecamatan : ${feature.properties.KECAMATAN} </div>
            <div>LUAS : ${feature.properties.LUAS_KM2}</div>
            `,
            { permanent: false, sticky: true }
          )
        }         
      }
    }
  }
}
</script>