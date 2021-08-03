import React from "react"
import { Link, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "@/pages/index.css"

import Layout from "@/components/layout"
import SEO from "@/components/seo"
import TechTag from "@/components/tags/TechTag"

const PostList = props => {
  const posts = props.data.allMarkdownRemark.edges
  const labels = props.data.site.siteMetadata.labels
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/" : "/" + (currentPage - 1).toString()
  const nextPage = "/" + (currentPage + 1).toString()

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

      {posts.map(post => {
        const tags = post.node.frontmatter.tags
        return (
          <div key={post.node.id} className="container mt-5">
            <Link to={post.node.fields.slug} className="text-dark">
              <h2 className="title">{post.node.frontmatter.title}</h2>
            </Link>
            <div className="mx-0 row justify-content-between mb-3">
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
      <div className="mx-4 mt-4 row justify-content-between">
        {!isFirst ? (
          <Link to={prevPage} rel="prev" style={{ textDecoration: `none` }}>
            <span className="text-dark">← 上一页</span>
          </Link>
        ) : (
          <span style={{ color: `#ccc` }}>← 上一页</span>
        )}
        {!isLast && (
          <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
            <span className="text-dark">下一页 →</span>
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const listQuery = graphql`
  query paginateQuery($skip: Int!, $limit: Int!) {
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
      limit: $limit
      skip: $skip
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

export default PostList
