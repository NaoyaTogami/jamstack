import axios from 'axios'

module.exports = function generateModule(moduleOptions) {
  this.nuxt.hook('build:before', async ({ app }) => {

    var res = await axios.get('https://appo.microcms.io/api/v1/content', {
        headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
    })
    
    var contents = []
    var menu = res.data
    

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