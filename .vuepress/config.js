const path = require('path')
const fs = require('fs')

const resolve = (...args) => {
	return path.resolve(__dirname, ...args)
}

/**
 * 传入数组跟过虑tag
 * @param {String} dirname 
 * @param {String} tag 
 * 示例：getFile('Vue')
 */
function getFile (dirname) {
	let arr = fs.readdirSync(resolve('..', dirname))
	// 去除README和文件夹
	arr = arr.filter(item => (!item.includes('README') && item.includes('.')))
	return arr.map(item => item.replace(/\.md/, ''))
}

module.exports = {
    title: '前端学习圈',
    description: '一位小菜鸡',
		head: [
			['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./favicon.ico` }]
		],
    themeConfig:{
			repo: 'https://github.com/heny/h-note',
			repoLabel: 'GitHub',
			lastUpdated: '上次更新：', // 前缀使用
			nav:[
				{text:'home',link:'/'},
				{
					text:'web前端',
					items:[
						{text:'app',link:'/app/'},
						{text:'es6',link: '/es6/'},
						{text:'html5、css3',link:'/html5、css3/'},
						{text:'Javascript',link:'/Javascript/'},
						{text:'React',link:'/React/'},
						{text:'Server',link:'/Server/'},
						{text:'Typescript',link:'/Typescript/'},
						{text:'Vue',link:'/Vue/'},
						{text:'webpack',link:'/webpack/'},
						{text:'其他框架',link:'/其他框架/'}
					]
				},
				{
					text: '功能', 
					items: [
						{text: '自定义页面', link: '/custom/'},
						{text: '消息传输站', link: 'https://chat.heny.vip'}
					]
				}
			],
			sidebarDepth: 2,  //仅支持h2和h3标题
			sidebar: {
				'/Vue/':[{
					title: 'Vue文件',
					collapsable: false,
					children:getFile('Vue')
				}],
				'/Typescript/':[{
					title:'Typescript',
					collapsable: false,
					children:getFile('Typescript')
				}],
				'/app/':[{
					title:'app',
					collapsable: false,
					children:getFile('app')
				}],
				'/es6/':[{
					title:'es6',
					collapsable: false,
					children:getFile('es6')
				}],
				'/html5、css3/':[{
					title:'html5、css3',
					collapsable: false,
					children:getFile('html5、css3')
				}],
				'/Javascript/':[{
					title:'Javascript',
					collapsable: false,
					children:getFile('Javascript')
				}],
				'/React/':[{
					title:'React',
					collapsable: false,
					children:getFile('React')
				}],
				'/Server/':[{
					title:'Server',
					collapsable: false,
					children:getFile('Server')
				}],
				'/webpack/':[{
					title:'webpack',
					collapsable: false,
					children:getFile('webpack')
				}],
				'/其他框架/':[{
					title:'其他框架',
					collapsable: false,
					children:getFile('其他框架')
				}]
			}
    }
}