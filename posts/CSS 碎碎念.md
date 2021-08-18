---
title: css 碎碎念
date: '2021-08-18'
tags: ["CSS","碎碎念"]
published: true
---

#### 将一大串文字分两行显示，超出用省略号表示

`-webkit-line-clamp`: 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性。
常见结合属性：
1. `display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
2. `-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
3. `text-overflow: ellipsis;`可以用来多行文本的情况下，用省略号 “…” 隐藏超出范围的文本 

```css
.show2line {  
  overflow: hidden;  
  -webkit-line-clamp: 2; 
  text-overflow: ellipsis;  
  display: -webkit-box;  
  -webkit-box-orient: vertical;  
}  
```