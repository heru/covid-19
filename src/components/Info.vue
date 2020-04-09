<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        Informasi Kab. Tulungagung
                    </v-card-title>
                    <v-card-subtitle>Update data {{ tulungagung.tanggal }}</v-card-subtitle>
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
                            <tbody v-if="tulungagung">
                                <tr v-for="item in tulungagung.data" :key="item.kecamatan">
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
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        Informasi Kab. Trenggalek
                    </v-card-title>
                    <v-card-subtitle>Update data {{ trenggalek.tanggal }}</v-card-subtitle>
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
                            <tbody v-if="trenggalek">
                                <tr v-for="item in trenggalek.data" :key="item.kecamatan">
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
      'tulungagung',
      'trenggalek'
    ])
  }
}
</script>