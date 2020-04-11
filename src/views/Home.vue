<template>
  <v-container
    class="fill-height"
    fluid>
    <v-row dense>
      <v-col cols="12" xl="6" md="12" sm="12" xs="12">
        <Map></Map>
      </v-col>
      <v-col cols="12">
        <Info></Info>
      </v-col>
    </v-row>        
  </v-container>
</template>

<script>
// @ is an alias to /src
const Map = () => import('@/components/Map')
const Info = () => import('@/components/Info')

export default {
  name: 'Home',
  components: {
    Map,
    Info
  }
}
</script>
