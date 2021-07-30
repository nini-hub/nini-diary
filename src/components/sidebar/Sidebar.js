import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Bio from "./Bio"
import "./sidebar.css"

import TechTags from "./TechTags"

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
            limit: 10
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { published: { eq: true } } }
          ) {
            edges {
              node {
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <div className="sidebar-main ">
            <Bio
              author={data.site.siteMetadata.author}
              tagline={data.site.siteMetadata.tagline}
            />
            <div className="page-links mt-3">
              <Link to="/">
                <span className="text-dark d-block py-1">主页</span>
              </Link>
              <Link to="/about">
                <span className="text-dark d-block py-1">关于我</span>
              </Link>
              <Link to="/archive">
                <span className="text-dark d-block py-1">文章</span>
              </Link>
            </div>
            <div className="tech-tags mt-4">
              <TechTags
                labels={data.site.siteMetadata.labels}
                posts={data.allMarkdownRemark.edges}
              />
            </div>
          </div>
        </>
      )}
    />
  )
}

export default Sidebar
