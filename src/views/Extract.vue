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
    const response = await fetch('https://raw.githubusercontent.com/heru/geodata/master/batas_kecamatan.geojson')
    const data = await response.json()
    const geo = {
      type: 'FeatureCollection',
      name: undefined,
      layerType: undefined,
      features: data.features.filter((feature) => {
        return feature.properties.KABUPATEN == "TULUNGAGUNG" || feature.properties.KABUPATEN == "TRENGGALEK"
      })
    }
    this.geojson = geo
    this.loading = false
  }
}
</script>