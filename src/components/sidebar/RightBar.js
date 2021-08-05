import React from "react"
import { StaticQuery, graphql, Link, navigate } from "gatsby"

import uniq from "lodash/uniq"
import values from "lodash/values"
import groupBy from "lodash/groupBy"

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
          <div>
            <h4 className="mb-1">搜索</h4>
            <input
              defaultValue=""
              class="form-control"
              type="text"
              placeholder="按下回车进行搜索"
              onKeyUp={event => {
                if (event?.keyCode === 13) {
                  navigate(`/search?keyword=${event.target.value}`, {
                    replace: true,
                  })
                }
              }}
            />
            <h4 className="mb-1 mt-4">随笔档案</h4>
            {values(groupBy(arr)).map(d => (
              <Link to={`/date/${d[0]}`} key={d[0]} className="d-block">
                {d[0]}({d.length})
              </Link>
            ))}
          </div>
        )
      }}
    />
  )
}

export default Right
