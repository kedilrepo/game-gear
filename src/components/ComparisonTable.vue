<template>
  <div class="background">
    <div class="content">
      <v-container fluid>
        <div class="title">
          <h1>{{ jsonAsJson.tableName }}</h1>
        </div>
        <v-simple-table height="400px">
          <template v-slot:default>
            <thead>
              <th class="text-left" v-for="title in jsonAsJson.columnTitles" :key="title.id">
                <span v-html="title.name" />
              </th>
            </thead>
            <tbody>
              <tr v-for="(row, index) in jsonAsJson.rows" :key="index">
                <td v-for="(title, index) in jsonAsJson.columnTitles" :key="index">
                  <span v-html="row[title.id]" />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    json: String
  },
  computed: {
    jsonAsJson: function() {
      return JSON.parse(this.json);
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>