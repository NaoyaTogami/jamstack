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
