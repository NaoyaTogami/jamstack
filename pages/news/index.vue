<template>
    <div>
        <div>{{ item.title }}</div>
        <div v-html="item.content"></div>
        <table v-if="item.plan">
          <thead>
            <th>プラン</th>
            <th>料金</th>
          </thead>
          <tbody>
            <tr v-for="plan in item.plan" :key="plan.td1">
              <td>{{ plan.td1 }}</td>
              <td>{{ plan.td2 | addComma }}</td>
            </tr>
          </tbody>
        </table>
        <v-btn to="/" nuxt>戻る</v-btn>
    </div>
</template>

<script>
export default {
  data() {
    return {
      item: {}
    }
  },
  async asyncData ({ app, params }) {
    const response = await app.$axios.$get(`https://appo.microcms.io/api/v1/news/${params.id}`, {
      headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
    })
    return {
      item: response
    }
  },
  filters: {
    addComma (value) {
      return value.toLocaleString();
    }
  }
}
</script>