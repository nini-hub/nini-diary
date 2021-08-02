import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import TechTags from "./TechTags"
import uniq from "lodash/uniq"

const Right = () => {
  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={data => {
        const arr = []
        data.allMarkdownRemark.edges?.map(edge => {
          arr.push(edge.node.frontmatter.date)
        })
        return (
          <div style={{ position: "fixed" }}>
            {/* <h4 className="mb-1">搜索</h4>
          <input type="text" placeholder="按下回车进行搜索"/> */}
            <h4 className="mb-1 mt-4">随笔档案</h4>
            {uniq(arr)?.map((date, index) => (
              <Link to={`/date/${date}`} key={index} className="d-block">
                {date}
              </Link>
            ))}
          </div>
        )
      }}
    />
  )
}

export default Right
