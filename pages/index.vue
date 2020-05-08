<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div v-for="item in items" :key="item.id">
      <nuxt-link :to="{name: 'news-id', params: {id: item.id}}">{{ item.title }}</nuxt-link>
      <div v-html="item.content"></div>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  async asyncData ({ app }) {
    const response = await app.$axios.$get('https://appo.microcms.io/api/v1/news', {
      headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
    })
    return {
      items: response.contents
    }
  }
}
</script>
