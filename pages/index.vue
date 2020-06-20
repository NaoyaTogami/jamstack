<template>
    <div>
        <v-img
            :src="bgImg"
            height="100vh"
            alt=""
        >
        </v-img>
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
    async asyncData ({ payload, store }) {
        if(payload){
            var res = {
                menu: payload.menu,
                contents: payload.contents
            }
            store.commit('setMenu', res.menu)
            store.commit('setContents', res.contents)
            return res
        }
        else{
            await store.dispatch('getContents')
            return {
                menu: store.state.menu,
                contents: store.state.contents
            }
        } 
    },
    data() {
        return {
            bgImg: require("@/assets/background.jpg"),
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
