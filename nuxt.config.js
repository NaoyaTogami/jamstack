import colors from 'vuetify/es5/util/colors'
const axios = require("axios"); 

export default {
    mode: 'universal',
    dev: process.env.NODE_ENV !== 'production',
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
        '~~/font/dist/css/materialdesignicons.css'
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
        ['@nuxtjs/moment', ['ja']]
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
        defaultAssets: {
            font: false,
            icons: false
        },
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
                    footerBg: colors.blue.darken2,
                    footerTxt: '#ffffff',
                    tabBg: '#ffffff',
                    tabTxt: colors.blue.darken2,
                    homeBg:  '#ffffff',
                    homeContentBg: '#ffffff',
                    homeContentTxt: '#333333',
                    homeContentTitleBg: colors.blue.darken2,
                    homeContentTitleTxt: '#ffffff',
                    homePostBg: '#ffffff',
                    homePostTxt: '#333333',
                    homePostTitleBg: '#ffffff',
                    homePostTitleTxt: '#333333',
                    homePostSubTxt: '#333333',
                    homeItemBg: '#ffffff',
                    homeItemTitleBg: '#f2f2f2',
                    homeItemTitleTxt: '#333333',
                    listBg: '#ffffff',
                    listTitleBg: colors.blue.darken2,
                    listTitleTxt: '#ffffff',
                    listPostBg: '#f2f2f2',
                    listPostTxt: '#333333',
                    listPostTitleBg: '#f2f2f2',
                    listPostTitleTxt: '#333333',
                    listPostSubTxt: '#333333',
                    listItemBg: '#ffffff',
                    listItemTitleBg: '#f2f2f2',
                    listItemTitleTxt: '#333333',
                    postBg: '#ffffff',
                    postTitleBg: colors.blue.darken2,
                    postTitleTxt: '#ffffff',
                    postItemBg: '#ffffff',
                    postItemTitleBg: '#f2f2f2',
                    postItemTitleTxt: '#333333',
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
                var tagName = ''
                var tagParams = ''
                var filterdPosts = []
                
                posts = res.data.contents.map((y, i) => {
                    post = {}
                    items = y.content.map((z, j) => {
                        if (z.type === 'i') {
                            z.content = z.content.slice(13, z.content.length - 10)
                        }
                        return z
                    })
                    if(y.category) {
                        category = y.category.name
                        color = y.category.color
                    }
                    else {
                        category = ''
                        color = ''
                    }
                    if(y.tag) {
                        tagName = y.tag.name,
                        tagParams = y.tag.params
                    }
                    else {
                        tagName = ''
                        tagParams = ''
                    }
                    post = {
                        id: y.id,
                        params: y.menu.params,
                        date: (y.date)? y.date : y.createdAt,
                        title: y.title,
                        overview: y.overview,
                        category: category,
                        tagName: tagName,
                        tagParams: tagParams,
                        color: color,
                        content: items
                    }
                    menu = [...menu, y.menu]
                    return post
                })
                
                menu = [...new Set(menu)]
                
                menu = menu.sort((a, b) => {
                    return a.order - b.order
                })
                
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
                        original: p.original,
                        content: filterdPosts
                    }
                })
                
                var original = contents.filter(m => m.original)
                var normal = contents.filter(m => !m.original)
                
                var route = []
                var routing = []
                route = normal.map(a => {
                    routing = a.content.map(b=>{
                        return {
                            route: `/${b.params}/${b.id}`,
                            payload: {
                                contents: b,
                                menu: menu
                            }
                        }
                    })
                    .flat()
                    return [
                        {
                            route: `/${a.params}`,
                            payload: {
                                contents: contents,
                                menu: menu
                            }
                        },
                        ...routing
                    ]
                })
                .flat()
                
                route = [
                    {
                        route: '/',
                        payload: {
                            contents: contents,
                            menu: menu
                        }
                    },
                    {
                        route: '/contact',
                        payload: {
                            contents: contents,
                            menu: menu
                        }
                    },
                    ...route
                ]
                
                return route
            })
            
    
        }
    }
}
