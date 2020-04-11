<template>
    <v-container
      fluid
    >
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              GeoJson Extractor
            </v-card-title>

            <v-card-text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loading"
                center
                >
              </v-progress-circular>
              <p v-if="!loading">
                {{ geojson }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
export default {
  name: 'Extract',
  data() {
    return {
      geojson: [],
      loading: true
    }
  },
  async created() {
    this.loading = true
    const response = await fetch('https://raw.githubusercontent.com/heru/geodata/master/master/batas_kecamatan.geojson')
    const data = await response.json()
    // const kabupaten_list = ['TULUNGAGUNG', 'TRENGGALEK', 'KEDIRI', 'PONOROGO', 'NGANJUK']
    // const kabupaten_list = ['PONOROGO']
    const ref = 'PONOROGO'
    const geo = {
      type: 'FeatureCollection',
      name: undefined,
      layerType: undefined,
      features: data.features.filter((feature) => {
        const kabupaten = feature.properties.KABUPATEN
        // return kabupaten_list.includes(kabupaten)
        return kabupaten == ref
      })
    }
    this.geojson = geo
    this.loading = false
  }
}
</script>