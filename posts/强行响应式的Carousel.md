---
title: 强行响应式的Carousel
date: '2021-07-16'
tags: ["碎碎念"]
published: true
---

#### 技术造型

antd 的 Carousel,nextjs

#### 需求

桌面视图：每个轮播子项中分配 2 个项
手机视图：每个轮播子项中分配 4 个项

#### 解决方案

1. 根据用户设备的窗口宽度，呈现桌面视图或手机视图。
   但是，当调整窗口大小时，未解决宽度值的更新问题，可能会渲染错误的组件。
   因此，封装一个 hook：useViewport

```jsx
const useViewport = () => {
  // 此处 nextjs 会提示window undefined,因此暂将初始值移至hook中
  // const [width, setWidth] = React.useState(window.innerWidth);
  const [width, setWidth] = React.useState()
  React.useEffect(() => {
    setWidth(window.innerHeight)
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  return { width }
}
```

使用的时候

```jsx
const MyComponent = () => {
  const { width } = useViewport()
  const breakpoint = 620

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />
}
```

2. 解决轮播子项问题
   使用`lodash/chunk` 将集合拆分成多 2 个或 4 个长度的区块，组成一个新数组

```jsx
<Carousel arrows dots={false}  />
   {
      chunk(data, 2).map((item,index) => (
         <div key={index}>
            {
               item.map((ele,i) => (
                 <img src={ele.src} />
               ))
            }
         </div>
      ))
     }
</Carousel>
```
