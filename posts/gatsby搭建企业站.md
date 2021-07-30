---
title: gatsby搭建企业站
date: '2020-10-16'
tags: ["草稿篇","Gatsby"]
published: true
---

## 利用 gatsby 从零开始搭建企业站

本篇总结包括以下内容：

- Gatsby 入门

  - 开发环境搭建
  - gatsby-starter-default 目录结构解析
  - 添加 CSS 样式
  - 布局组件
  - 一些使用到的插件

- 镜像打包-Dockerfile
- 静态资源上传对象存储
- 建立 CI/CD 流水线，并部署进 k8s

### Gatsby 入门

##### 开发环境搭建

Gatsby CLI 可通过 npm 安装，命令行运行 `npm install -g gatsby-cli` 进行全局安装。

当你新建一个 Gatsby 网站时，可以基于任何一个现有的 Starter:https://www.gatsbyjs.com/starters/?v=2

用以下命令结构来创建一个网站，gatsby-starter-default

`gatsby new [PROJECT_NAME] https://xxxx`

##### 目录结构

- /.cache
- /public：存放最终由`gatsby build`产生的静态文件，可无视。
- /src：主要的程式都放在这里面，最常接触。
  |-- /pages
  |-- html.js
- .gitignore：Git 的 ignore 设定
- gatsby-config.js：为 Gatsby 网站配置选项，并为项目标题，说明，插件等提供元数据。
- gatsby-node.js：实施 Gatsby 的 Node.js API，以自定义和扩展影响构建过程的默认设置
- gatsby-ssr.js：使用 Gatsby 的服务器端渲染 API 自定义影响服务器端渲染的默认设置
- gatsby-browser.js：使用 Gatsby 的浏览器 API 自定义和扩展影响浏览器的默认设置

- package.json：NPM 设定

- package-lock.json, yarn.lock：NPM 和 yarn 的锁定文件，无视。

##### 添加 CSS 样式

- 使用不带布局组件的全局 CSS 文件

- 在布局组件中使用全局样式

- 使用样式化的组件

- 使用 CSS 模块

- 使用 Sass / SCSS

- 添加字体文件

- 使用 emotion

  ---未完
