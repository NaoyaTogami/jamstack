<template>
    <v-container :style="style">
        {{ post }}
    </v-container>
</template>

<script>
import Post from '~/components/post.vue';

export default {
    components: {
        Post
    },
    async asyncData ({ payload, store }) {
        return {
            menu: payload.menu,
            contents: payload.contents
        }
    },
    data() {
        return {
            color: {
                bg:'postBg',
                title: {bg: 'postTitleBg', txt: 'postTitleTxt--text'},
                item: {
                    bg: 'postItemBg',
                    title: {bg: 'postItemTitleBg', txt: 'postItemTitleTxt--text'}
                }
            }
        }
    },
    computed: {
        post () {
            var routing =  this.contents.map(x => {
                return x.content.map(y=>{
                    if (y.params == this.$route.params.category && y.id == this.$route.params.id) {
                        return y
                    }
                })
                .flat()
            })
            .flat()
            routing =  routing.filter(z => z).flat()
            return routing[0]
        },
        post () {
            var routing =  this.contents.map(x => {
                return x.content.map(y=>{
                    if (y.params == this.$route.params.category && y.id == this.$route.params.id) {
                        return y
                    }
                })
                .flat()
            })
            .flat()
            routing =  routing.filter(x => x).flat()
            return routing[0]
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