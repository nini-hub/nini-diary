import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import TechTags from "./TechTags"
import uniq from "lodash/uniq"

const Right = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                date(formatString: "YYYY-MM")
              }
            }
          }
        }
      }
    `
  )

  const getUniqData = () => {
    const edges = data.allMarkdownRemark.edges
    const oldDate = []
    edges?.map(item => {
      oldDate.push(item.node.frontmatter.date)
    })
    return uniq(oldDate)
  }
  console.log(getUniqData())
  // {item.node.frontmatter.date}
  return (
    <div style={{ position: "fixed" }}>
      {/* <h4 className="mb-1">搜索</h4>
      <input type="text" placeholder="按下回车进行搜索" onpre/> */}
      <h4 className="mb-1 mt-4">随笔档案</h4>
      {getUniqData()?.map((item, index) => (
        <Link to={`/date/${item}`} key={index} className="d-block">
          {item}
        </Link>
      ))}
    </div>
  )
}

export default Right
