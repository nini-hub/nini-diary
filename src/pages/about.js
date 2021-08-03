import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { FaCheckCircle } from "react-icons/fa"
import "./index.css"

const AboutPage = props => {
  return (
    <Layout>
      <SEO title="关于我" />
      啥也没有哈哈哈哈哈哈哈
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
