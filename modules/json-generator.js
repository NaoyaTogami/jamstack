module.exports = function generateModule(moduleOptions) {
  this.nuxt.hook('build:before', async ({ app }) => {

    var res = await app.axios.get('https://appo.microcms.io/api/v1/content', {
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
            color: color,
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

    // JSONを生成
    this.options.build.plugins.push({
        apply(compiler) {
            compiler.plugin('emit', (compilation, cb) => {
                compilation.assets[`api/datas.json`] = {
                    source: () =>
                      JSON.stringify({ menu: menu, contents: contents }),
                    size: () => {}
                }
                cb()
            })
        }
    })

    // link rel="prefetch"にJSONを追加
    const url = this.options.dev ? '' : 'https://festive-mahavira-a47ac7.netlify.app'
    this.options.head.link = [
      ...this.options.head.link,
      {
        rel: 'prefetch',
        href: `${url}/_nuxt/api/datas.json`,
        as: 'fetch'
      }
    ]
  })
}