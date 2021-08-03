import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import TechTags from "../sidebar/TechTags"

const MobilePages = () => {
  const [visible, setVisible] = useState(false)
  const toggleTagList = e => {
    setVisible(!visible)
  }
  return (
    <StaticQuery
      query={graphql`
        query myQuery {
          site {
            siteMetadata {
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
        <div className="mobile-pages-main py-1 d-sm-none d-block mt-2">
          <div className="text-center" className="mobile-pages-main-link">
            <p>
              <Link to="/">
                <svg className="icon">
                  <use href={`#icon-tubiaozhizuomobanyihuifu-`}></use>
                </svg>
                <span className="text-dark">主页</span>
              </Link>
            </p>
            <p>
              <Link to="/about">
                <svg className="icon">
                  <use href={`#icon-guanyuwomen`}></use>
                </svg>
                <span className="text-dark">关于我</span>
              </Link>
            </p>
            <p>
              <Link to="/archive">
                <svg className="icon">
                  <use href={`#icon-icon_A`}></use>
                </svg>
                <span className="text-dark">文章</span>
              </Link>
            </p>
            <p>
              <a onClick={toggleTagList}>
                <svg className="icon">
                  <use href={`#icon-tag`}></use>
                </svg>
                <span className="text-dark">分类</span>
                <svg className="icon">
                  <use href={`#icon-jiantouxia`}></use>
                </svg>
              </a>
            </p>
          </div>
          <div
            className="mobile-tag-list"
            style={{
              height: visible ? 110 : 0,
            }}
          >
            <TechTags
              labels={data.site.siteMetadata.labels}
              posts={data.allMarkdownRemark.edges}
            />
          </div>
        </div>
      )}
    />
  )
}

export default MobilePages
