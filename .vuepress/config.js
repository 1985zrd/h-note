const path = require('path')
const fs = require('fs')

const resolve = (...args) => {
	return path.resolve(__dirname, ...args)
}

/**
 * 传入文件名字，将会读取文件夹名字
 * @param {String} dirname 
 * 示例：getFile('Vue')
 */
function getFile (dirname) {
	let arr = fs.readdirSync(resolve('..', dirname))
	// 去除README和文件夹
	arr = arr.filter(item => (!item.includes('README') && item.includes('.')))
	return arr.map(item => item.replace(/\.md/, ''))
}

// test和link中间的需要填写一样
const webItems = [
	{text:'app',link:'/app/'},
	{text:'es6',link: '/es6/'},
	{text:'html5、css3',link:'/html5、css3/'},
	{text:'Javascript',link:'/Javascript/'},
	{text:'React',link:'/React/'},
	{text:'Server',link:'/Server/'},
	{text:'Typescript',link:'/Typescript/'},
	{text:'Vue',link:'/Vue/'},
	{text:'Webpack',link:'/Webpack/'},
	{text:'其他框架',link:'/其他框架/'}
]

let sidebar = webItems.reduce((p, c)=>{
  p[c.link] = [{
    title: c.text,
    collapsable: false,
    children: getFile(c.text)
  }]
  return p
}, {})
// console.log(sidebar, 'sidebar')
module.exports = {
    title: '前端学习圈',
		description: '一位不知名的初级菜鸟',
		// theme: require.resolve('./theme/'),
		head: [
			['link', { rel: 'icon', type: "image/x-icon", href: '/favicon.ico' }],
			['link', { rel: 'manifest', href: '/manifest.json' }],
			['meta', { name: 'theme-color', content: '#3eaf7c' }],
			['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
			['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
			['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
			['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
			['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
			['meta', { name: 'msapplication-TileColor', content: '#000000' }]
		],
		plugins: {
			'@vuepress/pwa': {
				serviceWorker: true,
				updatePopup: true
			},
			'@vssue/vuepress-plugin-vssue': {
				// 设置 `platform` 而不是 `api`
				platform: 'github',
				locale: 'zh-CN',
	
				// 其他的 Vssue 配置
				owner: 'heny',
				repo: 'h-note',
				clientId: 'c46829deab38f2de6c89',
				clientSecret: '76a940144230049a7533df93f56940a20d400b22',
			},
		},
    themeConfig:{
			repo: 'heny/h-note',
			repoLabel: 'GitHub',
			docsBranch: 'master',
			editLinks: true,
			editLinkText: '在GitHub上编辑此页',
			lastUpdated: '上次更新：', // 前缀使用
			smoothScroll: true,
			algolia: {
				apiKey: '5afb4b8f5b191b92841aed8afa044013',
				indexName: 'heny_h-note'
			},
			nav:[
				{ text: 'home', link:'/' },
				{ text: 'web前端', items: webItems },
				{
					text: '功能', 
					items: [
						{text: '自定义页面', link: '/custom/'},
						{text: '消息传输站', link: 'https://chat.heny.vip'}
					]
				}
			],
			sidebarDepth: 2,  //仅支持h2和h3标题
			sidebar
    }
}
// https://zhb333.github.io/readme-blog/2020/03/21/vuepress%E5%BC%80%E5%8F%91%E9%9D%99%E6%80%81%E5%8D%9A%E5%AE%A2/
