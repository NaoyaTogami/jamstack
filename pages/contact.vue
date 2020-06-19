<template>
    <client-only>
        <v-container :style="style">
            <v-sheet tile :color="color.bg">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card flat tile :color="color.title.bg">
                            <v-card-title :class="`title px-2 ${color.title.txt}`">
                                お問い合わせ
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <v-form name="contact" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="contact">
                    <v-text-field
                        v-model="name"
                        label="名前"
                        name="name"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="メールアドレス"
                        name="email"
                    ></v-text-field>
                    <v-textarea
                        v-model="content"
                        label="内容"
                        name="content"
                        outlined
                    ></v-textarea>
                    <v-btn type="submit">送信</v-btn>
                </v-form>
            </v-sheet>
        </v-container>
    </client-only>
</template>

<script>
export default {
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
                bg:'postBg',
                title: {bg: 'postTitleBg', txt: 'postTitleTxt--text'},
            },
            name: '',
            email: '',
            content: '' 
        }
    },
    computed: {
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