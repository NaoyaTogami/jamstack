<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card flat>
                    <v-card-title class="title px-2">
                        {{ item.title }}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <template v-for="content in contents">
                <v-col
                  v-if="content.params === 'title'"
                  :cols="content.xs"
                  :sm="content.sm"
                  :md="content.md"
                  class="align-self-center"
                >
                  <div v-html="content.content" class="title mx-2"></div>
                  <v-divider class="mx-2"></v-divider>
                </v-col>
                <v-col
                  v-if="content.params === 'content'"
                  :cols="content.xs"
                  :sm="content.sm"
                  :md="content.md"
                  class="align-self-center"
                >
                  <div v-html="content.content" class="mx-2"></div>
                </v-col>
                <v-col
                    v-if="content.params === 'image'"
                    :cols="content.xs"
                    :sm="content.sm"
                    :md="content.md"
                    class="align-self-center"
                >
                    <v-img :src="content.content" class="mx-2"></v-img>  
                </v-col>
                <v-col
                    v-if="content.params === 'table'"
                    :cols="content.xs"
                    :sm="content.sm"
                    :md="content.md"
                    class="align-self-center"
                >
                    <v-row class="mx-2" no-gutters>
                        <v-col cols="auto">
                            <v-simple-table>
                                <template v-slot:default>
                                    <table v-html="content.content"></table>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    v-if="content.params === 'tableGrow'"
                    :cols="content.xs"
                    :sm="content.sm"
                    :md="content.md"
                    class="align-self-center"
                >
                    <v-simple-table>
                        <template v-slot:default>
                            <table v-html="content.content"></table>
                        </template>
                    </v-simple-table>
                </v-col>
            </template>
        </v-row> 
    </v-container>
</template>

<script>
export default {
    layout: 'test',
    data() {
        return {
        }
    },
    async asyncData ({ app, params }) {
        var item = await app.$axios.$get(`https://appo.microcms.io/api/v1/content/${params.id}`, {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        return {
            item: item,
        }
    },
    computed: {
        contents () {
            var res = []
            this.item.content.filter(x => {
                if (x.item.params.includes('image')) {
                    res = [...res, {
                        params: x.item.params,
                        content: x.content.slice(13, x.content.length - 10),
                        xs: (x.xs)? x.xs : 12,
                        sm: (x.sm)? x.sm : 12,
                        md: (x.md)? x.md : 12
                    }]  
                }
                else {
                    res = [...res, {
                        params: x.item.params,
                        content: x.content,
                        xs: (x.xs)? x.xs : 12,
                        sm: (x.sm)? x.sm : 12,
                        md: (x.md)? x.md : 12
                    }]
                }
            })
            return res
        }
    }
}
</script>