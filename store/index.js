export const state = () => ({
    menu: {},
    contents: []
})

export const mutations = {
    setMenu (state, menu) {
        state.menu = menu
    },
    setContents (state, contents) {
        state.contents = contents
    }
}

export const actions = {
    async nuxtServerInit ({ commit }) {
        const menu = await this.$axios.$get('https://appo.microcms.io/api/v1/menu', {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
    
        commit('setMenu', menu.contents)
        
        var contents = []
        var data =[]
        var posts = []
        var post = {}
        var items = []
        var content = ''
        var category = ''
        var color = ''
        
        for (let x of menu.contents) {
            data = []
            posts = []
            data = await this.$axios.$get(`https://appo.microcms.io/api/v1/content?filters=menu[equals]${x.id}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            posts = data.contents.map((y, i) => {
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
                    params: x.params,
                    date: (y.date)? y.date : y.createdAt,
                    title: y.title,
                    overview: y.overview,
                    category: category,
                    color: category,
                    content: items
                }
                return post
            })
            contents = [...contents, {
                title: x.title,
                params: x.params,
                layout: x.layout,
                headerNav: x.headerNav,
                home: x.home,
                footerNav: x.footerNav,
                listItems: (x.listItems)? x.listItems : 0,
                number: (x.number)? x.number : 3, 
                xs: (x.xs)? x.xs : 12,
                sm: (x.sm)? x.sm : 12,
                md: (x.md)? x.md : 12,
                tab: x.tab,
                content: posts
            }]
        }

        commit('setContents', contents)
    }
}

export const getters = {
    headerMenu (state) {
        return state.menu.filter(x => x.headerNav)
    },
    footerMenu (state) {
        return state.menu.filter(x => x.footerNav)
    },
    homeContents (state) {
        var contents = state.contents
        contents = contents.filter(x => x.home)
        contents = contents.map(x => {
            return {
                title: x.title,
                params: x.params,
                layout: x.layout,
                listItems: x.listItems,
                xs: x.xs,
                sm: x.sm,
                md: x.md,
                tab: x.tab,
                content:x.content.filter((y,i) => i <= x.number-1)
            }
        })
        return contents
    }
}