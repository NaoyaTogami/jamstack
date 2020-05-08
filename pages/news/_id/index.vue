<template>
    <div>
        <div>{{ item.title }}</div>
        <div v-html="item.content"></div>
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
  }
}
</script>