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
        return <div className="py-5 px-4"></div>
      }}
    />
  )
}

export default Right
