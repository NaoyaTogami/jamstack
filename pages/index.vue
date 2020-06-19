<template>
    <div>
        <v-img
            src="https://images.microcms-assets.io/protected/ap-northeast-1:6a6c77df-2a2c-483f-a92c-0a629af9314b/service/appo/media/background.jpg"
            height="100vh"
            alt=""
        >
        </v-img>
        {{ menu }}
        <v-container :style="style">
            <v-row>
                <template v-for="content in homeContents">
                    <v-col
                        :cols="content.xs"
                        :sm="content.sm"
                        :md="content.md"
                    >
                        <v-card :color="color.content.bg">
                            <v-sheet tile :color="color.content.title.bg">
                                <v-card-title
                                    :class="`font-weight-black ${color.content.title.txt}`"
                                >
                                    {{ content.title }}
                                </v-card-title>
                            </v-sheet>
                            
                            <v-divider></v-divider>
    
                            <Change :posts="content" :color="color" /> 
    
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                
                                <v-btn
                                    :to="`/${content.params}/`"
                                    :class="`${color.content.txt}`"
                                    nuxt
                                    text
                                >
                                    もっと見る
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Change from '~/components/change.vue';
import { mapGetters } from 'vuex'

export default {
    components: {
        Change
    },
    async asyncData({ $axios, store }) {
        const url = process.env.NODE_ENV === 'development' ? '' : 'https://festive-mahavira-a47ac7.netlify.app'
        var data = await $axios.$get(`${url}/_nuxt/api/datas.json`)
            store.commit('setMenu', data.menu)
            store.commit('setContents', data.contents)
            return {
                menu: data.menu,
                contents: data.contents
            }
      },
    data() {
        return {
            news: [],
            events: [],
            color: {
                content: {
                    bg: 'homeContentBg',
                    txt: 'homeContentTxt--text',
                    title: {bg: 'homeContentTitleBg', txt: 'homeContentTitleTxt--text'}
                },
                post: {
                    bg: 'homePostBg',
                    txt: 'homePostTxt--text',
                    title: {bg: 'homePostTitleBg', txt: 'homePostTitleTxt--text'},
                    sub: {txt: 'homePostSubTxt--text'}
                    
                },
                item: {
                    bg: 'homeItemBg',
                    title: {bg: 'homeItemTitleBg', txt: 'homeItemTitleTxt--text'}
                }
            }
        }
    },
    computed: {
        ...mapGetters(['homeContents']),
        style () {
            if (this.$vuetify.breakpoint.mdAndUp) {
                return 'margin-top:64px;margin-bottom:64px;'
            }
            else {
                return 'margin-top:56px;margin-bottom:56px;'
            }
        }
    }
}
</script>
