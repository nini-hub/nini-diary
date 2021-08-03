import React from "react"
import { Link, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"

import Layout from "@/components/layout"
import SEO from "@/components/seo"

import TechTag from "@/components/tags/TechTag"

const ArchivePage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels

  const getTechTags = tags => {
    const techTags = []
    tags.forEach((tag, i) => {
      labels.forEach(label => {
        if (tag === label.tag) {
          techTags.push(
            <TechTag
              key={i}
              tag={label.tag}
              tech={label.tech}
              name={label.name}
            />
          )
        }
      })
    })
    return techTags
  }

  return (
    <Layout>
      <SEO title="文章" />

      <h2 className="heading mt-3">All Posts</h2>
      {posts.map(post => {
        const tags = post.node.frontmatter.tags
        return (
          <div key={post.node.id} className="container mt-5">
            <Link to={post.node.fields.slug} className="text-dark">
              <h2 className="title">{post.node.frontmatter.title}</h2>
            </Link>
            {/* <small className="d-block text-info">
                  发表于 {post.node.frontmatter.date}
                </small> */}
            <div className="mx-0 row justify-content-between">
              <small className="text-info">
                发表于 {post.node.frontmatter.date}
              </small>
              <small className="text-info">
                阅读量： {post.node.timeToRead}
              </small>
            </div>
            <p className="mt-3 d-inline">{post.node.excerpt}</p>
            <Link to={post.node.fields.slug} className="text-primary">
              <small className="d-inline-block ml-3"> 阅读全文</small>
            </Link>
            <div className="d-block">{getTechTags(tags)}</div>
          </div>
        )
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
  query ArchiveQuery {
    site {
      siteMetadata {
        title
        author
        labels {
          tag
          tech
          name
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 120)
          html
          id
          timeToRead
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default ArchivePage
