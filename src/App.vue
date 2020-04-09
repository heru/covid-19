<template>
  <v-app style="z-index: 9998">
    <v-navigation-drawer
      v-model="drawer"
      app
      dark      
      color="secondary"
      style="z-index: 9999"  
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="show"></v-app-bar-nav-icon>
      <v-toolbar-title>COVID-19 Tulungagung (un official)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
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
    </v-content>
    <v-footer
      color="cyan"
      app
    >
      <v-spacer />
      <a href="https://github.com/heru/covid-19">
        <span class="white--text">&copy; 2019 </span> Heru Eko Susanto
      </a>
    </v-footer>
  </v-app>
</template>

<script>
import Map from './components/Map';
import Info from '@/components/Info'

export default {
  name: 'App',
  components: {
    Map,
    Info
  },
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-home' },
        // { title: 'About', icon: 'mdi-about' }
      ],
      drawer: null
    }
  },
  methods: {
    show(){
      this.drawer = !this.drawer
    }
  }
};
</script>
