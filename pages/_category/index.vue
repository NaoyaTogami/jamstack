<template>
    <v-container :style="style">
        <v-sheet tile :color="color.bg" v-if="posts.layout=='s'">
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
                            {{ posts.title }}
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
    async asyncData ({ payload, store, params }) {
        if(payload){
            var test = {
                menu: payload.menu,
                contents: payload.contents
            }
            store.commit('setMenu', test.menu)
            store.commit('setContents', test.contents)
            return test
        }
        else{
            return {
                menu: store.state.menu,
                contents: store.state.contents
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
        posts () {
            var posts = this.contents.filter(x => x.params == this.$route.params.category)
            return posts[0]
        },
        categories () {
            var categories = this.posts.content.map(x => x.category)
            categories = [...new Set(categories)]
            return categories
        },
        normal () {
            return {
                layout: this.posts.layout,
                listItems: this.posts.listItems,
                content: this.posts.content,
                categories: this.categories
            }
        },
        tab () {
            var postsGroups = []
            var postsGroup = {}
            var posts = this.posts
            var categories = this.categories
            
            postsGroups = categories.map((x, i) => {
                postsGroup = {
                    layout: posts.layout,
                    listItems: posts.listItems,
                    content: posts.content.filter(y => y.category == x)
                }
                return {
                    id: i,
                    category: x,
                    content: postsGroup
                }
            })
            
            return postsGroups
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
