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
    async getContents ({ commit }) {
        var data = await this.$axios.$get('https://appo.microcms.io/api/v1/content', {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        
        var contents = []
        var menu = []
        var posts = []
        
        posts = data.contents.map(y => {
            y.content = y.content.map(z => {
                if (z.type === 'i') {
                    z.content = z.content.slice(13, z.content.length - 10)
                }
                return z
            })
            menu = [...menu, y.menu]
            return y
        })
        
        menu = [...new Map(menu.map(x => [x.id, x])).values()]
        
        menu = menu.sort((a, b) => {
            return a.order - b.order
        })
        
        commit('setMenu', menu)
        
        contents = menu.map(p => {
            return {
                menu: p,
                content: posts.filter(q => q.menu.params == p.params)
            }
        })
        
        contents = contents.filter(m => !m.menu.original)
        
        commit('setContents', contents)
    }
}

export const getters = {
    headerMenu (state) {
        return state.menu.filter(x => x.headerNav)
    },
    footerMenu (state) {
        return state.menu.filter(x => x.footerNav)
    }
}