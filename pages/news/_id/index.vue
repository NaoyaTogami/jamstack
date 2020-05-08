<template>
    <div>
        <div>{{ item.title }}</div>
        <div v-html="item.content"></div>
        <table>
            <tr v-for="row in table" :key="row.th">
                <th>{{ row.th }}</th>
                <td>{{ row.td }}</td>
            </tr>
        </table>
        <v-btn to="/" nuxt>戻る</v-btn>
    </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      table:[]
    }
  },
  async asyncData ({ app, params }) {
    const response = await app.$axios.$get(`https://appo.microcms.io/api/v1/news/${params.id}`, {
      headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
    })
    return {
      item: response,
      table: [response.tr1,response.tr2]
    }
  }
}
</script>