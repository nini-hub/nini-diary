import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Bio from "./Bio"
import "./sidebar.css"

import TechTags from "./TechTags"
import uniq from "lodash/uniq"
import values from "lodash/values"
import groupBy from "lodash/groupBy"

const Sidebar = () => {
  return (
    <StaticQuery
      query={graphql`
        query SiteBioQuery {
          site {
            siteMetadata {
              title
              tagline
              author
              contacts {
                github
              }
              labels {
                tag
                tech
                name
              }
            }
          }
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { published: { eq: true } } }
          ) {
            edges {
              node {
                frontmatter {
                  tags
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
          <>
            <div className="py-5">
              <Bio
                author={data.site.siteMetadata.author}
                tagline={data.site.siteMetadata.tagline}
              />

              <div className="mt-4">
                <TechTags
                  labels={data.site.siteMetadata.labels}
                  posts={data.allMarkdownRemark.edges}
                  title="分类"
                />
              </div>
              <h4 className="mb-1 mt-4">随笔档案</h4>

              {values(groupBy(arr)).map(d => (
                <Link to={`/date/${d[0]}`} key={d[0]} className="d-block">
                  {d[0]}({d.length})
                </Link>
              ))}
            </div>
          </>
        )
      }}
    />
  )
}

export default Sidebar
