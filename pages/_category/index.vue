<template>
    <v-container :style="style">
        {{ posts }}
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
    async asyncData ({ payload }) {
            return {
                menu: payload.menu,
                contents: payload.contents
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
