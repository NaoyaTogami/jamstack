<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card flat>
                    <v-card-title class="title">{{ tags.contents[0].name }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutter>
            <v-col cols="12" class="py-0">
                <v-breadcrumbs :items="breadcrumbs" class="pa-0" exact>
                    <template v-slot:item="{ item }">
                      <v-breadcrumbs-item
                        :to="item.to"
                        :disabled="item.disabled"
                        exact
                        nuxt
                      >
                          <v-icon>{{ item.icon }}</v-icon>
                        <span class="d-none d-md-flex">{{ item.now }}</span>
                        <span>{{ item.text }}</span>
                      </v-breadcrumbs-item>
                    </template>
                </v-breadcrumbs>
            </v-col>
        </v-row>
        <v-row>
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
                    v-for="category in services"
                    :key="category.id"
                > 
                    
                    <v-card v-for="service in category.contents" :key="service.id">
                        <v-divider></v-divider>
                        <v-card-title>{{ service.name }}</v-card-title>
                        <v-card-text>{{ service.content }}</v-card-text>
                        
                        <v-data-iterator
                            :items="service.plan"
                            :items-per-page="5"
                            hide-default-footer
                        >
                            <template v-slot:default="props">
                            <v-container fluid>
                           <v-row>
                               <v-col
                                v-for="plan in props.items"
                                :key="plan.name"
                                cols="12"
                                sm="12"
                                md="4"
                                lg="4"
                               >
                                   <v-card outlined>
                                       <v-card-title>{{ plan.name }}</v-card-title>
                                       <v-divider></v-divider>
                                       <v-list>
                                           <v-list-item>
                                                <span class="title">{{ plan.price }}</span>
                                                <span class="caption">{{ plan.unit }}</span>
                                           </v-list-item>
                                           <v-list-item class="body-2">
                                               {{ plan.note }}
                                           </v-list-item>
                                       </v-list>
                                   </v-card>
                               </v-col>
                           </v-row>
                           </v-container>
                           </template>
                        </v-data-iterator>
                        
                    </v-card>
                    
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
            items: [],
            tags:{},
            headers: [
              {
                text: '名前',
                value: 'name'
              },
              { text: '価格', 
                value: 'price' 
              },
              { text: '', 
                value: 'unit' 
              },
              { text: '備考', 
                value: 'note' 
              },
            ],
        }
    },
    async asyncData ({ app, params }) {
        var tag = await app.$axios.$get(`https://appo.microcms.io/api/v1/groups?filters=param[equals]${params.id}`, {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        const response = await app.$axios.$get(`https://appo.microcms.io/api/v1/services?filters=tag[contains]${tag.contents[0].id}`, {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        return {
            items: response.contents,
            tags: tag
        }
    },
    computed: {
        categories () {
            let res = this.items.map(x => x.category.name)
            res = [...new Set(res)]
            var res2 = []
            res.forEach((x, i) => {
                res2 = [...res2, {id: i, name: x}]
            })
            return res2
        },
        services () {
            var categories =  [...this.categories]
            var items = [...this.items]
            var res = {}
            categories.forEach((x, i) => {
                res[x.name] = {id: i, contents: items.filter(y => y.category.name == x.name)}
            })
            return res
        },
        breadcrumbs () {
            return [
                {text: 'ホーム', icon: 'mdi-home', disabled: false, to: '/'},
                {text: 'サービス', icon: 'mdi-handshake', disabled: false, to: '/service'},
                {now: this.tags.contents[0].name, icon: this.tags.contents[0].icon, disabled: true, to: `/service/${this.$route.params.id}`},
                ]
        }
    }
}
</script>