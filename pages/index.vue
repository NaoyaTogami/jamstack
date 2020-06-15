<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" lg="6" xl="6">
                <v-card>
                    <v-card-title>今後の予定</v-card-title>
                    <v-divider></v-divider>
                    <v-list class="py-0">
                        <template v-for="item in events">
                            <v-list-item
                                :key="item.id"
                                two-line
                                @click="$router.push(`/event/${item.id}`)"
                            >
                              
                              <v-list-item-content>
                                <v-list-item-subtitle class="text--primary">{{ item.date | format-date }}</v-list-item-subtitle>
                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-chip small :color="item.type.color">{{ item.type.name }}</v-chip>
                              </v-list-item-action>
                            </v-list-item>
                            <v-divider></v-divider>
                        </template>
                    </v-list>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            to="/event"
                            nuxt
                            text
                        >
                            もっと見る
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <template v-for="content in contents">
                <v-col
                    v-if="content.params === 'list'"
                    :cols="content.xs"
                    :sm="content.sm"
                    :md="content.md"
                >
                    <v-card>
                        <v-card-title>{{ content.contents[0].menu.title }}</v-card-title>
                        <v-divider></v-divider>
                            <v-list class="py-0">
                                <template v-for="item in content.contents">
                                    <v-list-item
                                      :key="item.id"
                                      two-line
                                      @click="$router.push(`/${item.menu.params}/${item.id}`)"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-subtitle class="text--primary">{{ item.createdAt | format-date }}</v-list-item-subtitle>
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-chip small class="d-none d-sm-flex">{{ item.category.name }}</v-chip>
                                        </v-list-item-action>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </template>
                            </v-list>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    :to="`/${content.contents[0].menu.params}`"
                                    nuxt
                                    text
                                >
                                    もっと見る
                                </v-btn>
                            </v-card-actions>
                    </v-card>
                </v-col>
                <v-col
                    v-if="content.params === 'toggle'"
                    :cols="content.xs"
                    :sm="content.sm"
                    :md="content.md"
                >
                    <v-card>
                        <v-card-title>{{ content.contents[0].menu.title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-expansion-panels flat>
                            <v-expansion-panel
                                v-for="item in content.contents"
                                :key="item.id"
                            >
                                <v-expansion-panel-header class="py-0 px-4">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ item.createdAt | format-date }}</v-list-item-subtitle>
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div v-html="item.overview"></div>
                                </v-expansion-panel-content>
                                <v-divider></v-divider>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                :to="`/${content.contents[0].menu.params}`"
                                nuxt
                                text
                            >
                                もっと見る
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    layout: 'test',
    data() {
        return {
            news: [],
            events: [],
        }
    },
    async asyncData ({ app }) {
        const events = await app.$axios.$get('https://appo.microcms.io/api/v1/event?limit=3', {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        const news = await app.$axios.$get('https://appo.microcms.io/api/v1/news?limit=3', {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        return {
            events: events.contents,
            news: news.contents
        }
    },
    computed: {
        ...mapState(['contents'])
    }
}
</script>
