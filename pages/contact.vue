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
                <v-form name="contact" method="POST" netlify>
                    <v-text-field
                        v-show="false"
                        v-model="title"
                        name="form-name"
                    />
                    <v-text-field
                        v-model="name"
                        label="名前"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="メールアドレス"
                    ></v-text-field>
                    <v-textarea
                        v-model="content"
                        label="内容"
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
    data() {
        return {
            color: {
                bg:'postBg',
                title: {bg: 'postTitleBg', txt: 'postTitleTxt--text'},
            },
            title: 'contact',
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