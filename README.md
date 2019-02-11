# fe-mapp

> A Vue.js project

## Build Setup

``` bash 
# install dependencies
npm install

# 运行
npm run dev

# 测试
npm run build:dev
# 预发布
npm run build:prep
# 发布
npm run build:prod

#  调起大熊
@click="greatbear"
#  打电话
@click="call"
```

#  git 提交
  feat：新功能（feature）   
  fix：修补bug    
  docs：文档（documentation）    
  style： 格式（不影响代码运行的变动）    
  refactor：重构（即不是新增功能，也不是修改bug的代码变动）    
  test：增加测试    
  chore：构建过程或辅助工具的变动    
#  navigation

方法: [ on | once | off ]    

事件类型: [ forward | back | replace | refresh | reset ]    

参数( to | from ) 的属性:    
```js  
this.$navigation.on('back', (to, from) => {
  console.log('back to', to, 'from ', from)
})
````

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


