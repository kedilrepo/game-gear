<template>
  <section>
    <div class="background">
      <div class="content">
        <v-container fluid>
          <div class="title">
            <h1>{{ jsonAsJson.tableName }}</h1>
          </div>
          <v-simple-table max-height="400px">
            <template v-slot:default>
              <thead>
                <th
                  class="text-left"
                  v-for="title in transformed.columnTitles"
                  :key="title.id"
                >
                  <component :is="title.name" />
                </th>
              </thead>
              <tbody>
                <tr v-for="(row, index) in transformed.rows" :key="index">
                  <td
                    v-for="(title, index) in transformed.columnTitles"
                    :key="index"
                  >
                    <component :is="row[title.id]" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    json: String
  },
  computed: {
    jsonAsJson: function() {
      return JSON.parse(this.json);
    },
    transformed() {
      let parsedJSON = JSON.parse(this.json);
      parsedJSON.columnTitles.forEach(title => {
        title["name"] = { template: `<div>${title["name"]}</div>` };
        return title;
      });
      parsedJSON.rows.forEach(row => {
        parsedJSON.columnTitles.forEach(title => {
          row[title.id] = {
            template: `<div>${row[title.id]}</div>`
          };
        });
      });
      return parsedJSON;
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
