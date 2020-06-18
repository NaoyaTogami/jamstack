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
    async getApi ({ commit }) {
        var data = await this.$axios.$get('https://appo.microcms.io/api/v1/content', {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        
        var contents = []
        var menu = []
        var posts = []
        var post = {}
        var items = []
        var content = ''
        var category = ''
        var color = ''
        var filterdPosts = []
        
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
        
        commit('setMenu', menu)
        
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