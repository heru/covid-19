<template>
    <v-container fluid>
        <v-row>            
            <v-col cols="12">
                <info-kabupaten 
                  :kota="`Kab. Tulungagung`"
                  :tanggal="tulungagung.tanggal"
                  :data="tulungagung.data"
                >
                </info-kabupaten>
            </v-col>
            <v-col cols="12">
                <info-kabupaten 
                  :kota="`Kab. Trenggalek`"
                  :tanggal="trenggalek.tanggal"
                  :data="trenggalek.data"
                >
                </info-kabupaten>
            </v-col>
            <v-col cols="12">
                <info-kabupaten 
                  :kota="`Kab. Blitar`"
                  :tanggal="blitar.tanggal"
                  :data="blitar.data"
                >
                </info-kabupaten>
            </v-col>
            <v-col cols="12">
                <info-kabupaten 
                  :kota="`Kota Blitar`"
                  :tanggal="kotablitar.tanggal"
                  :data="kotablitar.data"
                >
                </info-kabupaten>
            </v-col>
            <v-col cols="12">
                <info-kabupaten 
                  :kota="`Kab. Kediri`"
                  :tanggal="kediri.tanggal"
                  :data="kediri.data"
                >
                </info-kabupaten>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
const InfoKabupaten = () => import(/* webpackPrefetch: true */ './InfoKabupaten')

export default {
  name: 'Info',
  components: {
    InfoKabupaten
  },
  computed: {
    ...mapGetters([
      'tulungagung',
      'trenggalek',
      'blitar',
      'kotablitar',
      'kediri'
    ])
  }
}
</script>