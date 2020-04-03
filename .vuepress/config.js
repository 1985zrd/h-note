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
		head: [
			['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./favicon.ico` }]
		],
    themeConfig:{
			repo: 'https://github.com/heny/h-note',
			repoLabel: 'GitHub',
			lastUpdated: '上次更新：', // 前缀使用
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