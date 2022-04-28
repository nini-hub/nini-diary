/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import Header from "./header/header"
import "./layout.css"
import values from "lodash/values"
import groupBy from "lodash/groupBy"
import Sidebar from "@/components/sidebar/Sidebar"
import RightBar from "@/components/sidebar/RightBar"

const Layout = ({ children }) => {
  const [visible, setVisible] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              tagline
              author
              contacts {
                github
              }
            }
          }
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
          <>
            <Header
              siteTitle={data.site.siteMetadata.title}
              tagline={data.site.siteMetadata.tagline}
              author={data.site.siteMetadata.author}
              contacts={data.site.siteMetadata.contacts}
            />
            {/* <div
              className="float-date d-block d-sm-none"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <svg className="icon">
                  <use href="#icon-xingzhuanggongnengtubiao-"></use>
                </svg>
              ) : (
                <svg className="icon">
                  <use href="#icon-Group-"></use>
                </svg>
              )}
            </div>
            <div
              className="float-date-list py-2 d-sm-none"
              style={{
                display: visible ? "block" : "none",
              }}
            >
              {values(groupBy(arr)).map(d => (
                <Link to={`/date/${d[0]}`} key={d[0]} className="d-block">
                  {d[0]}
                  <span className="text-dark">({d.length})</span>
                </Link>
              ))}
            </div> */}
            <div className="index-main row">
              <div className="border-right col-2 d-none d-lg-block">
                <Sidebar />
              </div>
              <div className="col-md-12 col-lg-10">{children}</div>
            </div>
            <footer className="text-center">
              <p className="d-inline">
                © {new Date().getFullYear()}&nbsp;nininini-1, All Rights
                Reserved.
              </p>
            </footer>
            {/* 悬浮 点击打开日期 */}
          </>
        )
      }}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
