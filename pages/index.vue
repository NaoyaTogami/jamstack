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
                <template v-for="posts in homeContents">
                    <v-col
                        :cols="(posts.menu.xs)? posts.menu.xs : 12"
                        :sm="(posts.menu.sm)? posts.menu.sm : 12"
                        :md="(posts.menu.md)? posts.menu.md : 12"
                    >
                        <v-card :color="color.content.bg">
                            <v-sheet tile :color="color.content.title.bg">
                                <v-card-title
                                    :class="`font-weight-black ${color.content.title.txt}`"
                                >
                                    {{ posts.menu.title }}
                                </v-card-title>
                            </v-sheet>
                            
                            <v-divider></v-divider>
    
                            <Change :posts="posts" :color="color" /> 
    
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                
                                <v-btn
                                    :to="`/${posts.menu.params}/`"
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
                <v-col
                    cols="12"
                >
                    <v-card :color="color.content.bg">
                        <v-sheet tile :color="color.content.title.bg">
                            <v-card-title
                                :class="`font-weight-black ${color.content.title.txt}`"
                            >
                                サービス
                            </v-card-title>
                        </v-sheet>
                        
                        <v-divider></v-divider>
                        
                        <v-card-actions>
                            <v-row>
                                <v-col
                                    v-for="tag in tags"
                                    :key="tag.id"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-btn
                                        :to="`/service/${tag.params}`"
                                        class="font-weight-bold"
                                        block
                                        nuxt
                                    >
                                        {{ tag.name }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Change from '~/components/change.vue';
import { mapState } from 'vuex'

export default {
    components: {
        Change
    },
    async asyncData ({ payload, store }) {
        if(payload){
            store.commit('setMenu', payload.menu)
            return {contents: payload.contents}
        }
        else{
            await store.dispatch('getContents')
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
            },
            tags: [
                {id: 0, name: 'オリエンテーリング関係者向け', params: 'orienteer'},
                {id: 1, name: 'イベント主催者向け', params: 'organizer'},
                {id: 2, name: '企業向け', params: 'company'},
                {id: 3, name: '行政向け', params: 'gov'},
                {id: 4, name: '教育機関向け', params: 'education'}
                
            ]
        }
    },
    computed: {
        ...mapState(['contents']),
        style () {
            if (this.$vuetify.breakpoint.mdAndUp) {
                return 'margin-top:64px;margin-bottom:64px;'
            }
            else {
                return 'margin-top:56px;margin-bottom:56px;'
            }
        },
        homeContents () {
            var contents = this.contents
            var posts = {}
            var res = {}
            contents = contents.filter(x => x.menu.home)
            return contents
        }
    }
}
</script>
