<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item
          v-for="menu in menus"
          :key="menu.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="gotoAbout"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <Map/>
      </v-container>      
    </v-content>
    <v-footer class="secondary" app dark>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon>mdi-favorite</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="https://github.com/heru" target="_blank">Heru Eko Susanto</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Map from './components/Map';

export default {
  name: 'App',

  components: {
    Map,
  },

  data: () => ({
    menus: [
      { title: 'Dashboard', icon: 'dashboard' },
      { title: 'Account', icon: 'account_box' },
      { title: 'Admin', icon: 'gavel' },
    ],
  }),
  methods: {
    gotoAbout: () => {
      this.$router.push({name: 'About'})
    }
  }
};
</script>
