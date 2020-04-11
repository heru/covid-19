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
          :to="item.path"
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
      <v-toolbar-title>COVID-19 Tulungagung - Trenggalek</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view></router-view>      
    </v-content>
    <v-footer
      color="cyan"
      app
    >
      <v-spacer />
      <a href="https://github.com/heru/covid-19" style="text-decoration: none">
        <span class="white--text">&copy; 2020 </span> github.com/heru/covid-19
      </a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-home', path: { name: 'Home'} },
        { title: 'About', icon: 'mdi-account', path: { name: 'About'} }
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
