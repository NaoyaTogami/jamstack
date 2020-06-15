export const state = () => ({
    menu: {},
    contents: {}
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
        
        var homeContent = menu.contents.filter(x => x.home)
        var contents = []
        var data =[]
        for (let x of homeContent) {
            data = []
            data = await this.$axios.$get(`https://appo.microcms.io/api/v1/content?limit=${x.number}?filters=menu[equals]${x.id}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            contents = [...contents, {
                params: x.layout.params,
                contents: data.contents,
                xs: (x.xs)? x.xs : 12,
                sm: (x.sm)? x.sm : 12,
                md: (x.md)? x.md : 12,
                listItems: x.listItems
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
    homeContent (state) {
        return state.menu.filter(x => x.home)
    }
}