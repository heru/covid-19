<template>
  <v-card>
    <v-card-title>
        Informasi {{ kota }}
    </v-card-title>
    <v-card-subtitle>Update data {{ tanggal }}</v-card-subtitle>
    <v-card-text>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Kecamatan</th>
                    <th class="text-left">ODP</th>
                    <th class="text-left">PDP</th>
                    <th class="text-left">Confirm</th>
                    <th class="text-left">OTG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item.kecamatan">
                        <td>{{ item.kecamatan }}</td>
                        <td>{{ item.odp }}</td>
                        <td>{{ item.pdp }}</td>
                        <td>{{ item.positif }}</td>
                        <td>{{ item.otg }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card-text>
</v-card>
</template>
<script>
export default {
  name: "InfoKabupaten",
  props: [
    'kota',
    'tanggal',
    'data'
  ]
}
</script>