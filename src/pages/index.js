import React from "react"
import { Link, graphql, navigate } from "gatsby"
import "./index.css"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import range from "lodash/range"

import TechTag from "@/components/tags/TechTag"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels
  const currentPage = 1
  const postsPerPage = 5 // see limit in graphql query below
  const nextPage = "/" + (currentPage + 1).toString()
  const hasNextPage = data.allMarkdownRemark.totalCount > postsPerPage

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
      <SEO title="首页" />

      {posts.map(post => {
        const tags = post.node.frontmatter.tags
        return (
          <div key={post.node.id} className="container pt-3 border-bottom">
            <Link to={post.node.fields.slug} className="text-dark">
              <h2 className="title">{post.node.frontmatter.title}</h2>
            </Link>
            <div className="mx-0 row justify-content-between">
              <small className="text-info">
                发表于 {post.node.frontmatter.date}
              </small>
              {/* <small className="text-info">
                阅读量： {post.node.timeToRead}
              </small> */}
            </div>
            <p className="d-inline">{post.node.excerpt}</p>
            <Link to={post.node.fields.slug} className="text-primary">
              <small className="d-inline-block ml-3"> 阅读全文</small>
            </Link>
            <div className="d-block">{getTechTags(tags)}</div>
          </div>
        )
      })}

      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm justify-content-end">
          <li className="page-item disabled" key="first">
            <a className="page-link" href="" tabIndex="-1" aria-disabled="true">
              &laquo;
            </a>
          </li>
          {range(
            1,
            data.allMarkdownRemark.totalCount / postsPerPage + 1,
            1
          ).map(item => {
            if (item == 1) {
              return (
                <li className="page-item active" aria-current="page" key={item}>
                  <span className="page-link">1</span>
                </li>
              )
            }
            return (
              <li className="page-item" key={item}>
                <a className="page-link" href={`/${item}`}>
                  {item}
                </a>
              </li>
            )
          })}
          <li className={`page-item ${hasNextPage && "disabled"}`} key="last">
            <a className="page-link" href={nextPage}>
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
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
      limit: 5
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

export default IndexPage
