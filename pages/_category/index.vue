<template>
    <v-container :style="style">
        {{ payload }}
        <v-sheet tile :color="color.bg" v-if="posts.menu.layout=='s'">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card flat tile :color="color.title.bg">
                        <v-card-title :class="`title px-2 ${color.title.txt}`">
                            {{ posts.content[0].title }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <Post :post="posts.content[0].content" :color="color" />
        </v-sheet>
        <v-sheet tile :color="color.bg" v-else>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card
                        flat
                        tile
                        :color="color.title.bg"
                    >
                        <v-card-title
                            :class="`title px-2 ${color.title.txt}`"
                        >
                            {{ posts.menu.title }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
    
            <v-row no-gutters>
                <v-col cols="12">
                    <component
                        :is="(posts.tab)? 'Tab' : 'Normal'"
                        :postsGroups="(posts.tab)? tab : normal"
                        :color="color"
                    >
                    </component>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script>
import Post from '~/components/post.vue';
import Normal from '~/components/normal.vue';
import Tab from '~/components/tab.vue';

export default {
    components: {
        Post,
        Normal,
        Tab
    },
    async asyncData ({ app, payload, store, params }) {
        if(payload){
            store.commit('setMenu', payload)
        }
        else{
            var menu = await app.$axios.$get(`https://appo.microcms.io/api/v1/menu?filters=params[equals]${params.category}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            menu = menu.contents[0]
            let posts = await app.$axios.$get(`https://appo.microcms.io/api/v1/content?filters=menu[equals]${menu.id}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            return {
                posts: {
                    menu: menu,
                    content: posts.contents
                }
            }
        } 
    },
    data() {
        return {
            color: {
                bg: 'listBg',
                title: {bg: 'listTitleBg', txt: 'listTitleTxt--text'},
                post: {
                    bg: 'listPostBg',
                    txt: 'listPostTxt--text',
                    title: {bg: 'listPostTitleBg', txt: 'listPostTitleTxt--text'},
                    sub: {txt: 'listPostSubTxt--text'}
                    
                },
                item: {
                    bg: 'listItemBg',
                    title: {bg: 'listItemTitleBg', txt: 'listItemTitleTxt--text'}
                }
            }
        }
    },
    computed: {
        categories () {
            var categories = this.posts.content.map(x => x.category)
            categories = [...new Set(categories)]
            return categories
        },
        normal () {
            var posts = this.posts
            posts.categories = this.categories
            return posts
        },
        tab () {
            var postsGroup = {}
            var posts = this.posts
            
            return this.categories.map(x => {
                postsGroup = posts
                postsGroup.content = posts.content.filter(y => y.category.name == x.name)
                postsGroup.category = x
                return postsGroup
            })
        },
        style () {
            if (this.$vuetify.breakpoint.mdAndUp) {
                return 'margin-top:64px;'
            }
            else {
                return 'margin-top:56px;'
            }
        }
    }
}
</script>
