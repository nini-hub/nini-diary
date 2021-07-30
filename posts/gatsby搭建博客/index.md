---
title: 从零开始搭建博客
date: '2021-07-16'
tags: ["Gatsby"]
published: true
---

### 注册 gatsby cloud 账户

首先，需要一个带有版本控制系统的帐户。 目前已支持 GitHub 和 Gitlab。

1. 要注册帐户，请访问 [gatsby dashboard](http://gatsbyjs.com/dashboard/signup "dashboard")。 输入名字，姓氏和电子邮件。选择 Personal Project
   ![image](./注册账户.png)

2. 接下来，选择“版本控制系统提供商”按钮的授权。授予访问 Gatsby Cloud 应用程序的访问权限。
   ![image](./auth.png)

3. 单击“授权”按钮后，您将重新启动回 Gatsby Cloud，选择 individual
   ![image](./individual.png)

4. 进入 dashborder
   ![image](./dashborder.png)

### 已有仓库创建站点

添加新的 Gatsby Cloud 站点有两种流程：

- 从 Template 开始
- 从 git 仓库导入

本文只介绍第二种，由 git 仓库导入

1. 准备仓库
   本文将使用 gatsby-starter-blog。
   `gatsby new my-gatsby-project https://github.com/gatsbyjs/gatsby-starter-blog`
   或者
   `git clone https://github.com/gatsbyjs/gatsby-starter-blog`
   项目初始化完成后，推到你得远程仓库

2. 选择仓库
   从 Gatsby Dashboard 中，单击“add site”按钮。 从 GIT repository 选择导入
   ![image](./add site.png)

3. 接下来，选择 GitHub，现已支持 GitHub，Gitlab 和 Bitbucket。
   ![image](./github.png)

4. 完善仓库详情
   ![image](./github-detail.png)

接下来的设置非必需
至此你就得到了一个默认域名 `xxx.gatsbyjs.io`,每一次 push 都会自动部署 `xxx.gatsbyjs.io`

### 遇到的坑

##### mermaid 语法无法使用

![image](./mermaid无法使用.png)
警告：`warn unable to find prism language 'mermaid' for highlighting. applying generic code block`

###### 解决：安装 `gatsby-remark-mermaid`,在 Markdown 文件中创建 mermaid 图形和图表。

1. 安装
   `yarn add gatsby-remark-mermaid gatsby-transformer-remark puppeteer`

2. 如何使用
   这个插件处理 Markdown 代码块。如果您有任何其他插件，例如语法高亮器，请确保在这些插件之前导入它。

将插件添加到您的 gatsby-config.js.

```
{
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-mermaid'
        ]
      }
    }
  ]
}
```

效果如图
![image](./mermaid成功使用.png)

###### gatsby-remark-mermaid 踩坑

插件依赖 puppeteer，当要把站点部署至 gatsbyjs.io 时，流水线环境报错如下
![image](./流水线出错.png)
解决方案过于繁琐，那么就换一个思路

1. 安装 `gatsby-remark-graph` 插件，该插件没有依赖
   `yarn add gatsby-remark-graph`

2. 如何使用

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-graph",
          options: {
            // this is the language in your code-block that triggers mermaid parsing
            language: "mermaid", // default
            theme: "default", // could also be dark, forest, or neutral
          },
        },
      ],
    },
  },
]
```

效果如下图
![image](./graph成功.png)
