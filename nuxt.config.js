import colors from 'vuetify/es5/util/colors'
const axios = require("axios"); 

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/moment-filter.js',
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        ['@nuxtjs/moment', ['ja']],
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: 'https://appo.microcms.io/'
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
    customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                  primary: colors.blue.darken2,
                  accent: colors.grey.darken3,
                  secondary: colors.amber.darken3,
                  info: colors.teal.lighten1,
                  warning: colors.amber.base,
                  error: colors.deepOrange.accent4,
                  success: colors.green.accent3
                },
                light: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                    headerBg: colors.blue.darken2,
                    headerTxt: '#ffffff',
                    footerBg: colors.amber.darken3,
                    footerTxt: '#ffffff',
                    tabBg: colors.amber.darken3,
                    tabTxt: colors.teal.lighten1,
                    homeBg: colors.amber.base,
                    homeContentBg: colors.grey.darken3,
                    homeContentTxt: colors.amber.darken3,
                    homeContentTitleBg: colors.blue.darken2,
                    homeContentTitleTxt: colors.green.accent3,
                    homePostBg: colors.green.accent3,
                    homePostTxt: colors.teal.lighten1,
                    homePostTitleBg: colors.deepOrange.accent4,
                    homePostTitleTxt: colors.grey.darken3,
                    homePostSubTxt: colors.amber.darken3,
                    homeItemBg: colors.deepOrange.accent4,
                    homeItemTitleBg: colors.green.accent3,
                    homeItemTitleTxt: colors.blue.darken2,
                    listBg: colors.amber.base,
                    listTitleBg: colors.deepOrange.accent4,
                    listTitleTxt: colors.blue.darken2,
                    listPostBg: colors.green.accent3,
                    listPostTxt: colors.deepOrange.accent4,
                    listPostTitleBg: colors.grey.darken3,
                    listPostTitleTxt: colors.amber.darken3,
                    listPostSubTxt: colors.amber.base,
                    listItemBg: colors.green.accent3,
                    listItemTitleBg: colors.blue.darken2,
                    listItemTitleTxt: colors.grey.darken3,
                    postBg: colors.amber.darken3,
                    postTitleBg: colors.teal.lighten1,
                    postTitleTxt: colors.amber.base,
                    postItemBg: colors.deepOrange.accent4,
                    postItemTitleBg: colors.green.accent3,
                    postItemTitleTxt: colors.blue.darken2,
                }
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    },
    generate: {
        routes() {
            return axios.get('https://appo.microcms.io/api/v1/content', {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            .then(res=>{
                var contents = []
                var menu = []
                var posts = []
                var post = {}
                var items = []
                var content = ''
                var category = ''
                var color = ''
                var filterdPosts = []
                
                posts = res.data.contents.map((y, i) => {
                    post = {}
                    items = y.content.map((z, j) => {
                        content = z.content
                        if (z.item === 'i') {
                            content = content.slice(13, content.length - 10)
                        }
                        return {
                            id: j,
                            type: z.item,
                            xs: (z.xs)? z.xs : 12,
                            sm: (z.sm)? z.sm : 12,
                            md: (z.md)? z.md : 12,
                            content: content
                        }
                    })
                    if(y.category) {
                        category = y.category.name
                        color = y.category.color
                    }
                    else {
                        category = ''
                        color = ''
                    }
                    post = {
                        id: y.id,
                        params: y.menu.params,
                        date: (y.date)? y.date : y.createdAt,
                        title: y.title,
                        overview: y.overview,
                        category: category,
                        color: category,
                        content: items
                    }
                    menu = [...menu, y.menu]
                    return post
                })
                
                menu = [...new Set(menu)]
                
                contents = menu.map(p => {
                    filterdPosts = posts.filter(q => q.params == p.params)
                    return {
                        title: p.title,
                        params: p.params,
                        layout: p.layout,
                        headerNav: p.headerNav,
                        home: p.home,
                        footerNav: p.footerNav,
                        listItems: (p.listItems)? p.listItems : 0,
                        number: (p.number)? p.number : 3, 
                        xs: (p.xs)? p.xs : 12,
                        sm: (p.sm)? p.sm : 12,
                        md: (p.md)? p.md : 12,
                        tab: p.tab,
                        content: filterdPosts
                    }
                })
                
                var route = []
                var routing = []
                route = contents.map(a => {
                    routing = a.content.map(b=>{
                        return {
                            route: `/${b.params}/${b.id}`,
                            payload: contents
                        }
                    })
                    .flat()
                    return [
                        {
                            route: `/${a.params}`,
                            payload: contents
                        },
                        ...routing
                    ]
                })
                .flat()
                
                route = [
                    {
                        route: '/',
                        payload: contents
                    },
                    ...route
                ]
                
                return route
            })
            
    
        }
    }
}
