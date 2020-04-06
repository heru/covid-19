<template>
    <div class="map">
        <!-- <button class="btn" @click="download" v-if="!loading">download</button> -->
        <div v-if="loading">Loading map, please wait ...</div>
        <!-- <div v-if="!loading">
          {{ geojson }}
        </div> -->
        <div style="width: 100%; height: 900px;" v-if="!loading">
            <l-map :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-geo-json
                  v-if="show"
                  :geojson="geojson"
                  :options="options"
                  :options-style="styleFunction"
                />
                 <l-marker :lat-lng="marker" />
            </l-map>
        </div>
    </div>
</template>
<script>
import { latLng } from "leaflet"
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet"
// import fs from "fs";

// fs.readFile("../assets/batas_kecamatan.geojson", "utf8",  (err, data)  => {
//     if (err) throw err;
//     const json = JSON.parse(data);
// });
// const json = require('../assets/batas_kecamatan.geojson')

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data () {
    return {
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 11,
        center: [-8.297913,111.824103],
        bounds: null,
        loading: false,
        geojson: null,
        enableTooltip: true,
        fillColor: '#e4ce7f',
        show: true,
        marker: latLng(-8.196913, 111.824103)
    }
  },
  methods: {
    download() {
      
      var a = document.createElement("a");
      const geo = this.geojson
      var file = new Blob([geo], {type: 'text/plain'});
      a.href = URL.createObjectURL(file);
      a.download = "tulungagung.geojson";
      a.click();
    }
  },
  computed: {
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
         if(feature.properties.KECAMATAN == "CAMPUR DARAT") {
            layer.setStyle({
              color: '#FF0000',
              fillColor: '#FF0000',
              // fillOpacity: 0.09,
            })
         }
         layer.bindTooltip(
            "<div>Kecamatan :" +
            feature.properties.KECAMATAN +
            "</div><div>PDP :" +
            feature.properties.LUAS_KM2 + 
            "</div>",
            { permanent: false, sticky: true }
         )
       }
    }
  },
  async created() {
    this.loading = true
    const response = await fetch('https://raw.githubusercontent.com/heru/geodata/master/tulungagung.geojson')
    const data = await response.json()
    this.geojson = data
    this.loading = false
  }
}
</script>