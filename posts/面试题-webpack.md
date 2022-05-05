---
title: 面试题-webpack
date: '2022-04-28'
tags: ["面试题"]
published: true
---

## webpack
webpack 中的这种万物皆模块的理念实际上的蛮值得我们思考的，因为他确实打破了我们传统中在页面去引入各种各样资源的这种固化思维，让我们可以在业务代码中去载入一切所需资源，这样真正意义上让 js 去驱动一切，那如果之前保守饱受维护这些资源的痛苦，那你一定要去尝试这种方式；

### 1. webpack 的构建流程？
从入口文件出发，根据代码中出现的 import 或者 require 之类的语句解析，推断出来这个文件所依赖的一些资源模块，再分别去解析每个资源模块的依赖，最终形成整个项目中所有用到的文件之间的一个依赖关系树
webpack 会递归的遍历这个依赖树，读到每个文件，需要交给 loader 的就交给 loader 翻译，最后输出；
1. webpack cli 启动打包流程
2. 载入核心模块，创建 Compiler 对象
3. 使用 Compiler 对象开始编译整个项目
4. 从入口文件开始，解析模块依赖，形成依赖关系树
5. 递归依赖树，把递归到的模块交给对应 Loader 去处理
6. 合并 Loader 处理完的结果，将打包结果输出到 dist 目录

w4 开始，cli 就被单独抽取到 webpack-cli 这样的模块中，目的是增强 webpack 本身的一个灵活性，因为 webpack 本身还可以以代码的方式去调用，并不一定都是通过 cli 去调用

cli 就是将 cli 的参数和 webpack 配置文件中的配置整合到一起，得到一个完整的配置对象 (cli 的入口文件，bin 目录下的 cli.js 中）

cli 通过 yargs 解析命令行参数，然后调用 conver-argv 的 js 模块，将我们命令行的参数转换为 webpack 的配置对象，重复的话就优先使用 cli 参数

开始调用 webpack 核心模块，传入配置对象

Compiler 对象就是整个 webpack 工作过程中最核心的一个对象，负责完成整个项目的构建工作；
lib 目录下的 webpack.js 文件，这个文件导出的就是个用于创建 compiler 对象的一个函数；
首先校验传递过来的 option 参数是否符合要求，如果 option 是一个数组，webpack 创建 multiCompiler，即支持同时开启多路打包；

注册已配置的插件，plugin.call(compiler， compiler)，因为往后 webpack 生命周期就开始了，所以说必须要先去注册每个插件，这样才能确保每一个插件中的每一个钩子都能被命中；

创建 compiler 之后，紧接着就去判断了以下在配置选项中是否启用了 监视模式，是的话就调用 compiler 对象的 watch 方法，以监视模式启用构建；不是的话就调用 compiler 对象的 run 方法，开始构建整个应用；

run 方法在 lib 下的 compiler.js 文件中，这个方法触发了 before run 和 run 这两个钩子，最关键的是调用了 当前对象的 compile 方法，开始真正去编译整个项目；

compile 方法内部主要是创建了一个 compilation 对象（一次构建过程中的一个上下文对象，里面会包含这一次构建过程中全部的资源和一个额外的信息）；

创建完  compilation 对象后触发 make 钩子，进入到整个构建过程当中最核心的 make 阶段（this.hooks.make.callAsync），这一阶段主要根据 entry 配置，找到入口模块，开始依次递归出所有依赖，形成依赖关系树，然后递归到每个模块交给不同的 Loader 去处理

webpack 插件系统是事件机制是基于官方自己的一个叫 tapable；通过`事件名称。tab`去注册

make 阶段：
调用 compilation 对象的 add entry 方法开始解析入口文件
add entry 方法中调用 _addModuleChain 方法，将入口模块添加到模块依赖列表中；
紧接着通过 compilation 对象的 buildModule 方法进行模块构建
buildModule 方法中执行具体的 loader，处理特殊资源加载
build 完成之后通过 acorn 库生成模块代码的 ast 语法树
根据语法树分析这个模块是否还有依赖的模块，如果又则继续循环 build 每个依赖；
所有依赖解析完成，build 阶段结束
最后合并生成需要输出到 bundle.js 写入 dist 目录

### 2. 是否写过 Loader？简单描述一下编写 loader 的思路？
loader 支持链式调用，所以开发上需要严格遵循‘单一职责’，每个 loader 只负责自己需要负责的模块

loader 管道必须返回 js 代码的原因，返回的内容会拼接到 bundle.js 中，考虑到语法
```js
const marked = require('marked');
module.exports = source => {
  console.log(source);
  const html  = marked(source);
  const code = `module.exports = ${JSON.stringify(html)}`;
  // const code = `export default ${JSON.stringify(html)}`;
  return code;
}
```
1. loader 运行在 nodejs 中，我们可以调用任意 nodejs 自带的 api 或者安装 第三方模块进行调用
2. webpack 传给 loader 的原内容都是 utf-8 格式编码的字符串，在某些场景下 loader 处理二进制文件时，需要通过 exports.raw = true 告诉 webpack 该 loader  需要二进制数据
3. 尽可能异步化 loader，如果计算量很小，同步也可接收
4. loader 是无状态的，不应该在 loader 中保留状态
5. 使用 loader-utils 和 schema-utils 为我们提供的 实用工具
6. 加载本地的 loader 方法：npm link 和 resolveLoader

### 3. 是否写过 Plugin？简单描述一下编写 Plugin 的思路？
webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。Webpack 的 Tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。
webpack 几乎为每一个环节都埋下了一个钩子，开发插件的时候就可以往这些不同的钩子上去挂载不同的任务
webpack 要求插件必须是一个函数，或者是一个包含 apply 方法的类型

Plugin 的 API 可以去官网查阅
1. compiler 暴露了和 Webpack 整个生命周期相关的钩子
2. compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
3. 插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例
4. 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件
5. 找出合适的事件点去完成想要的功能。emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改 (emit 事件是修改 Webpack 输出资源的最后时机）。watch-run 当依赖的文件发生变化时会触发
6. 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住
```js
class RemoveCommentsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      for(const name in compilation.assets) {
        if(name.endsWith('.js')) {
          const contents = compilation.assets[name].source();
          const noComments = contents.replace(/\/\*{2,}\/\s?/g,'');
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}
```

### 4. source map 是什么，生产环境咋用？
source map 是将编译、打包。压缩后的代码映射回源代码的过程。打包压缩的代码不具备良好的可读性，想要调试源码就需要 source map
map 文件只要不打开开发者工具，就蓝旗是不会加载的
线上环境一般有三种处理方案：
1. hidden-source-map：借助第三方错误监控平台 sentry 使用
2. nosources-source-map：只会显示具体行数及查看源代码的错误栈。安全性比 sourcemap 高
3. sourcemap：通过 nginx 将 .map 文件只对白名单开放

### 5. 模块打包原理？
webpack 实际上为，每个模块创造了一个可以导入和导出的环境，本质上并没有修改代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致

### 6. 文件监听原理？
在发现源代码发生改变时，自动重新构建出新的输出文件
webpack 开启监听模式，有两种方式：
启动 webpack --watch：在配置 webpack.config 中设置 watch：true
缺点：每次需要手动刷新浏览器
原理：轮询判断文件的最后编辑时间是否变化，如果变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout  后再执行

### 7. 说一下 webpack 热更新原理？
又称为热替换，不用刷新浏览器而将新变更的模块替换掉旧的模块
HMR 的核心是客户端去服务端拉取更新后的文件，准确来说的 chunk diff（需要更新的 chunk），实际上，WDS 与浏览器之间维护了一个 websocket，当本地资源变更时，WDS 会向刘浏览器推送更新，并带上构建时的 hash，然后客户端与上一次资源进行对比。
客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容，这样客户端就可以再借助这些信息来继续向 WDS 发起 jsonp 请求来获取 chunk 的增量更新。
后续的部分（拿到增量更新后如何处理？哪些状态该保留，哪些需要更新？）由 HotModulePlugin 来完成，提供了相关 api 以供开发者对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 api 来实现 HMR

### 8. 如何对 bundle 体积进行监控和分析？
vscode 有个插件 import cost 可以帮助我么对引入模块的大小进行实时监测，还可以使用 webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积

bundlesize 工具包 可以进行自动化资源体积监控

### 9. 在实际工作中，配置上百行是常事，如何保证各个 loader 按预想工作？
可以使用 enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。(inline 官方不推荐使用）

### 10. 如何优化 webpack 构建速度？
1. 使用高版本的 webpack 和 nodejs
2. 多进程/多实例：happypack（不维护了），thread-loader
3. 压缩代码
  + webpack-paralle-uglify-plugin
  + uglifyjs-webpack-plugin：开启 parallel 参数（不支持 ES6）
  + terse-webpack-plugin：开启 parallel 参数
  + 多进程并行压缩
  + 通过 mini-css-extract-plugin 提取 chunk 中的 css 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 css
4. 图片压缩
  使用基于 node 库的 imagemin
  配置 image-webpack-loader
5. 缩小打包作用域
  exclude/include 确定 loader 规则范围
  resolve.modules 知名第三方模块的绝对路径（减少不必要的查找）
  resolve.mainFields 只采用 main 字段作为入口文件描述字段
  noParse 对完全不需要解析的库进行忽略
  ignorePlugin 完全排除模块
  合理使用 alias
6. 提起页面公共资源
  使用 html-webpack-externals-plugin 将基础包通过 CDN 引入，不打入 bundle
  使用 splitChunksPlugin 进行（公共脚本，基础包，页面公共文件）分离（webpack4 内置），替代了 commonsChunkPlugin 插件
  基础包分离
7. DLL
  使用 DLLPlugin 进行分包，使用 DllReferencePlugin（索引链接）对 manifest.json 引用，让一些基本不会改动的 代码先打包成静态资源，避免反复编译浪费时间
  hashedModuleIdsPlugin 解决模块数字 id 问题
8. 充分利用缓存提升二次构建速度
  babel-loader 开启缓存
  terser-webpack-plugin 开启缓存
  使用 cache-loader 或者 hard-source-webpack-plugin
9. tree-shaking
  purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用（建议）
打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉（只能对 ES6 Modlue 生效） 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
使用 PurifyCSS（不在维护） 或者 uncss 去除无用 CSS 代码
10. Scope hoisting
构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法
11. 动态 Polyfill
建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。（部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)

### 11. 聊一聊 Babel 原理吧？
大多数 JavaScript Parser 遵循 estree 规范，Babel 最初基于 acorn 项目（轻量级现代 JavaScript 解析器） Babel 大概分为三大部分：
1. 解析：将代码转换成 AST 词法分析：将代码（字符串）分割为 token 流，即语法单元成的数组
2. 语法分析：分析 token 流（上面生成的数组）并生成 AST
3. 转换：访问 AST 的节点进行变换操作生产新的 ASTTaro 就是利用 babel 完成的小程序语法转换
4. 生成：以新的 AST 为基础生成代码

### 12. 有哪些常见的 loader，用过哪些 loader
+ style-loader/css-loader/postcss-loader: 将 css 以链接形式插入到 style/加载 css 模块，支持模块化，压缩，文件导入等 / 拓展 css，使用下一代 css，可以配合 autoprefixer 插件自动补齐前缀
+ sass-loader：sass/scss 转为 css
+ file-loader/url-loader: 将文件输出到一个文件夹（处理图片和字体）/ 与前者类似，区别是可以设置阈值，大于阈值返回 publicPath，小于阈值返回 base64 
+ image-loader：加载并压缩图片
+ source-map-loader：加载额外的 source map 文件，方便断点调试
+ babel-loader：将 ES6 转换为 ES5
+ ts-loader/awesome-typescript-loader：ts 转 js / 后者性能优于前者

### 13. 哪些常见 plugin，用过哪些
+ define-plugin：定义环境变量（webpack4 之后指定 mode 即可）
+ ignore-plgin：忽略部分文件
+ mini-css-entra-plugin：分离 css，提取为独立文件，支持按需加载
+ speed-measure-webpack-plugin：可以看到每个 loader 和 plugin 的耗时
+ webpack-bundle-analyzer：可视化 webpack 输出文件的体积
+ @sentry/webpack-plugin: 可以配置源映射并自动将它们上传到 Sentry

### 14. plugin 和 loader 的区别？
+ loader 本质是一个函数，在函数中对接收到的内容进行转换，返回转换后的结果。因为 webpack 只认识 js，所以 loader 就是个翻译官，对其他类型的资源进行转译的预处理工作
+ plugin 就是插件，基于事件流框架 tabtable，可以拓展 webpack 的功能，在 webpack 运行的生命周期中会广播出许多时间，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 api 改变输出结果

loader 在 Module.rules 中配置，作为模块的解析规则，类型为数组
plugin 在 plugins 中单独配置，类型为数组，每一项都是个 plugin 实例

### 15. 使用 webpack 开发时，用过哪些提高效率的插件
+ webpack-dashboard： 可以友好的展示相关打包信息
+ webpack-merge：提取公共配置，减少重读配置代码
+ speed-measure-webpack-plugin：简称 SMP，分析 webpack 打包过程中 loader 和 plugin 的耗时，有助于找到构建过程中的性能瓶颈
+ size-plugin：监控资源体积变化，今早发现问题
+ HotModuleReplacementPlugin：模块热替换
