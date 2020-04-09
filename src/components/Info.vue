<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        Informasi Tiap Kecamatan 
                    </v-card-title>
                    <v-card-subtitle>Update data {{ data.tanggal }}</v-card-subtitle>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">Kecamatan</th>
                                <th class="text-left">ODP</th>
                                <th class="text-left">PDP</th>
                                <th class="text-left">Confirm</th>
                                </tr>
                            </thead>
                            <tbody v-if="data">
                                <tr v-for="item in data.data" :key="item.kecamatan">
                                    <td>{{ item.kecamatan }}</td>
                                    <td>{{ item.odp }}</td>
                                    <td>{{ item.pdp }}</td>
                                    <td>{{ item.positif }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Info',
  computed: {
    ...mapGetters([
      'data'
    ])
  }
}
</script>