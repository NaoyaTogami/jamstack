<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card flat>
                    <v-card-title class="title px-2">{{ menu.title }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="menu.layout.params === 'list'|| menu.layout.params === 'card'|| menu.layout.params === 'toggle'">
            <v-col cols="4">
                <v-select
                  v-model="selected"
                  :items="category"
                  item-text="name"
                  item-value="name"
                  label="カテゴリ指定"
                  multiple
                >
                </v-select>
            </v-col>
        </v-row>
        <v-row v-if="menu.layout.params === 'content'" class="justify-center">
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
        <v-row v-if="menu.layout.params === 'card'">
            <v-col
                v-for="item in items"
                :key="item.id"
                cols="12"
                sm="12"
                md="4"
                lg="4"
            >
                <v-card
                    :to="(item.content == '') ? undefined : {name: 'category-id', params: {id: item.id}}"
                    shaped
                    nuxt
                >
                    <v-card-title class="text--primary">{{ item.title }}</v-card-title>
                    <v-card-subtitle v-if="menu.listItems <= 1" class="text--primary">{{ item.createdAt | format-date }}</v-card-subtitle>
                    <template v-for="piece in item.content">
                        <v-card-text v-if="piece.item.params == 'overview'" class="text--primary" v-html="piece.content"></v-card-text>
                    </template>
                    <v-card-actions v-if="menu.listItems == 0 || menu.listItems == 2">
                        <v-chip v-if="item.category" small class="d-none d-sm-flex">{{ item.category.name }}</v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="menu.layout.params === 'list'">
            <v-col cols="12">
                <v-list class="py-0">
                    <template v-for="item in items">
                        <v-list-item
                            :key="item.id"
                            two-line
                            @click="$router.push(`/${$route.params.category}/${item.id}`)"
                            :disabled="item.content==''"
                        >
                            <v-list-item-content>
                                <v-list-item-subtitle v-if="menu.listItems <= 1" class="text--primary">{{ item.createdAt | format-date }}</v-list-item-subtitle>
                                <v-list-item-title class="text--primary">{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action v-if="menu.listItems == 0 || menu.listItems == 2">
                                <v-chip v-if="item.category" small class="d-none d-sm-flex">{{ item.category.name }}</v-chip>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider></v-divider>
                    </template>
                </v-list>
            </v-col>
        </v-row>
        <v-row v-if="menu.layout.params === 'toggle'">
            <v-col cols="12">
                <v-expansion-panels flat>
                    <v-expansion-panel
                      v-for="item in items"
                      :key="item.id"
                    >
                        <v-expansion-panel-header class="py-0 px-4">
                            <v-row no-gutters class="align-center">
                                <v-col cols="auto">
                                    <v-list-item-content>
                                        <v-list-item-subtitle  v-if="menu.listItems <= 1">{{ item.createdAt | format-date }}</v-list-item-subtitle>
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="auto">
                                    <v-chip v-if="item.category" small class="d-none d-sm-flex">{{ item.category.name }}</v-chip>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <template v-for="piece in item.content">
                                <div v-if="piece.item.params == 'overview'" v-html="piece.content"></div>
                            </template>
                        </v-expansion-panel-content>
                        <v-divider></v-divider>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row v-if="menu.layout.params === 'tab'">
            <v-col cols="12">
                <v-tabs
                    v-model="tab"
                    :vertical="$vuetify.breakpoint.xs"
                    grow
                >
                    <v-tab
                        v-for="category in categories"
                        :key="category.id"
                    >
                        {{ category.name }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="categoryItems in categoriesItems"
                        :key="categoryItems.id"
                    > 
                        <v-row>
                            <v-col>
                                <v-card v-for="item in categoryItems.contents" :key="item.id" outlined class="ma-4">
                                    <template v-for="content in item.content">
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
                                </v-card>                      
                            </v-col>
                        </v-row>  
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    layout: 'test',
    data() {
        return {
            tab: null,
            selected: '',
        }
    },
    async asyncData ({ app, params }) {
        const menu = await app.$axios.$get(`https://appo.microcms.io/api/v1/menu?filters=params[equals]${params.category}`, {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        const items = await app.$axios.$get(`https://appo.microcms.io/api/v1/content?filters=menu[equals]${menu.contents[0].id}`, {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        const category = await app.$axios.$get('https://appo.microcms.io/api/v1/category', {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        return {
            menu: menu.contents[0],
            Originaltems: items.contents,
            category: category.contents
        }
    },
    computed: {
        items () {
            if(this.selected != ''){
                return this.Originaltems.filter(x => this.selected.includes(x.category.name))
            }
            else {
                return this.Originaltems
            }
        },
        contents () {
            if(this.menu.layout.params === 'content') {
                var res = []
                this.items[0].content.filter(x => {
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
        },
        categories () {
            if(this.menu.layout.params === 'tab') {
                let res = this.items.map(x => x.category.name)
                res = [...new Set(res)]
                var res2 = []
                res.forEach((x, i) => {
                    res2 = [...res2, {id: i, name: x}]
                })
                return res2
            }
        },
        categoriesItems () {
            if(this.menu.layout.params === 'tab') {
                var res = {}
                var test = {}
                var test2 = []
                var test3 = []
                this.categories.forEach((x, i) => {
                    test = this.items.filter(y => y.category.name == x.name)
                    test2 = []
                    test.forEach((p,j) => {
                        test3 = []
                        p.content.filter(z => {
                            if (x.item.params.includes('image')) {
                                res = [...res, {
                                    params: z.item.params,
                                    content: z.content.slice(13, z.content.length - 10),
                                    xs: (x.xs)? z.xs : 12,
                                    sm: (x.sm)? z.sm : 12,
                                    md: (x.md)? z.md : 12
                                }]  
                            }
                            else {
                                res = [...res, {
                                    params: z.item.params,
                                    content: z.content,
                                    xs: (x.xs)? z.xs : 12,
                                    sm: (x.sm)? z.sm : 12,
                                    md: (x.md)? z.md : 12
                                }]
                            }
                        })
                        test2 = [...test2, {id: j, content: test3}]
                    })
                    res[x.name] = {id: i, contents: test2}
                })
                return res
            }
        }
    }
}
</script>
