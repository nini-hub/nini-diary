import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaCheckCircle } from "react-icons/fa"
import "./index.css"

import Sidebar from "../components/sidebar/Sidebar"

const AboutPage = props => {
  return (
    <Layout>
      <SEO title="About" />
      <div className="post-page-main">
        <div className="sidebar border-right px-1 py-2">
          <Sidebar />
        </div>

        <div className="post-main mx-3">
          <SEO title="About" />
          啥也没有哈哈哈哈哈哈哈
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query aboutQuery {
    site {
      siteMetadata {
        labels {
          tag
          tech
          name
        }
      }
    }
  }
`

export default AboutPage
