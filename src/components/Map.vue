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
          <l-control-scale 
            position="bottomleft" 
            :imperial="false" 
            :metric="true"
          >
          </l-control-scale>
          <l-control-layers></l-control-layers>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Peta Dasar"
          >
            <l-tile-layer 
              :url="url" 
              :attribution="attribution"
            >
            </l-tile-layer>
          </l-layer-group>
          
          
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kab. Tulungagung"
          >
            <l-geo-json
              v-if="show"
              :geojson="tulungagung_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kab. Trenggalek"
          >
            <l-geo-json
              v-if="show"
              :geojson="trenggalek_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kab. Kediri"
          >
            <l-geo-json
              v-if="show"
              :geojson="kediri_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kab. Blitar"
          >
            <l-geo-json
              v-if="show"
              :geojson="blitar_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kab. Nganjuk"
          >
            <l-geo-json
              v-if="show"
              :geojson="nganjuk_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kota Kediri"
          >
            <l-geo-json
              v-if="show"
              :geojson="kotakediri_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kota Blitar"
          >
            <l-geo-json
              v-if="show"
              :geojson="kotablitar_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kab. Pacitan"
          >
            <l-geo-json
              v-if="show"
              :geojson="pacitan_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kab. Madiun"
          >
            <l-geo-json
              v-if="show"
              :geojson="madiun_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
          <l-layer-group
            :visible="show"
            layerType="overlay"
            name="Kota Madiun"
          >
            <l-geo-json
              v-if="show"
              :geojson="kotamadiun_geojson"
              :options="options"
              :options-style="styleFunction"
            >
            </l-geo-json>
          </l-layer-group>
        </l-map>
      </v-card-text>
      <v-card-text>
        <p>Sumber data (berubah sewaktu-waktu sesuai pengumuman dari masing-masing kabupaten/kota):<br/>
        DINAS Kesehatan Kab. Tulungagung tanggal {{ tulungagung.tanggal }} <br/>
        DINAS Kesehatan Kab. Trenggalek {{ trenggalek.tanggal }} <br/>
        DINAS Kesehatan Kab. Pacitan {{ pacitan.tanggal }}<br/>
        DINAS Kesehatan Kab. Blitar {{ blitar.tanggal }} <br/>
        DINAS Kesehatan Kota Blitar {{ kotablitar.tanggal }} <br/>
        DINAS Kesehatan Kab. Kediri {{ kediri.tanggal }}
        </p>
      </v-card-text>
    </v-card>
</template>
<style scoped>
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
import { 
  LMap, 
  LTileLayer, 
  LGeoJson, 
  LControlLayers,
  LControlScale,
  LLayerGroup 
} from "vue2-leaflet"
import { mapGetters } from 'vuex'
import { data, geojson } from '@/store'

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LControlLayers,
    LLayerGroup,
    LControlScale
  },
  data () {
    return {
        url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:'© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        landScapeUrl: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
        landAttribution: '&copy <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors <a href="http://thunderforest.com/">Thunderforest</a>',
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
            break
          case 'PONOROGO':
            data = this.ponorogo.data
            break
          case 'PACITAN':
            data = this.pacitan.data
            break
          case 'BLITAR':
            data = this.blitar.data
            break
          case 'KEDIRI':  
            data = this.kediri.data
            break    
          case 'KOTA BLITAR':    
            data = this.kotablitar.data
            break
          case 'KOTA KEDIRI':          
          case 'MADIUN':
          case 'KOTA MADIUN':          
          case 'NGANJUK':
            data = null
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
              let fillOpacity = 0.9

              if(positif > 0) {
                fillColor = '#FF0000'
              } else if (pdp == 0) {
                fillColor = '#32CD32'
              } else if(pdp > 0) {
                fillColor = '#FFE866'
              }

              layer.setStyle({
                color: color,
                fillColor: fillColor,
                fillOpacity: fillOpacity,
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
            color: '#FFFFFF',
            fillColor: '#e4ce7f',
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