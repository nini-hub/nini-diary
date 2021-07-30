import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import "../pages/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"
import TechTag from "../components/tags/TechTag"

const Tag = ({ pageContext, data }) => {
<<<<<<< HEAD
    const posts = data.allMarkdownRemark.edges
    const labels = data.site.siteMetadata.labels
    console.log(pageContext.tag)
    const { tag } = pageContext
    const { totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`

    const getTechTags = (tags) => {
        const techTags = []
        tags.forEach((tag, i) => {
            labels.forEach((label) => {
                if (tag === label.tag) {
                    techTags.push(<TechTag key={i} tag={label.tag} tech={label.tech} name={label.name} size={label.size} color={label.color} />)
                }
            })
        })
        return techTags
    }

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `node.js`, `graphql`]} />
            <div className="index-main">
                <div className="sidebar px-4 py-2">
                    <Sidebar />
                </div>

                <div className="post-list-main">
                    <i><h2 className="heading">{tagHeader}</h2></i>
                    {posts.map((post) => {
                        const tags = post.node.frontmatter.tags
                        return (
                            <div key={post.node.id} className="container mt-5">
                                <Link
                                    to={post.node.fields.slug}
                                    className="text-dark"
                                >
                                    <h2 className="heading">{post.node.frontmatter.title}</h2>
                                </Link>
                                <small className="d-block text-info">Posted on {post.node.frontmatter.date}
                                </small>
                                <p className="mt-3 d-inline">{post.node.excerpt}</p>
                                <Link
                                    to={post.node.fields.slug}
                                    className="text-primary"
                                >
                                    <small className="d-inline-block ml-3"> Read full post</small>
                                </Link>
                                <div className="d-block">
                                    {getTechTags(tags)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

Tag.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
=======
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels
  console.log(pageContext.tag)
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

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
              size={label.size}
              color={label.color}
            />
          )
        }
      })
    })
    return techTags
  }

  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[
          `gatsby`,
          `javascript`,
          `react`,
          `web development`,
          `node.js`,
          `graphql`,
        ]}
      />
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>

        <div className="post-list-main">
          <i>
            <h2 className="heading">{tagHeader}</h2>
          </i>
          {posts.map(post => {
            const tags = post.node.frontmatter.tags
            return (
              <div key={post.node.id} className="container mt-5">
                <Link to={post.node.fields.slug} className="text-dark">
                  <h2 className="heading">{post.node.frontmatter.title}</h2>
                </Link>
                <small className="d-block text-info">
                  Posted on {post.node.frontmatter.date}
                </small>
                <p className="mt-3 d-inline">{post.node.excerpt}</p>
                <Link to={post.node.fields.slug} className="text-primary">
                  <small className="d-inline-block ml-3"> Read full post</small>
                </Link>
                <div className="d-block">{getTechTags(tags)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
}

export const pageQuery = graphql`
  query($tag: String) {
    site {
<<<<<<< HEAD
        siteMetadata {
            title 
            author
            labels {
                tag
                tech 
                name 
                size 
                color
            } 
        }
    } 
=======
      siteMetadata {
        title
        author
        labels {
          tag
          tech
          name
          size
          color
        }
      }
    }
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
<<<<<<< HEAD
         node {
            excerpt(pruneLength: 200)
            html
            id
            frontmatter {
                title
                date(formatString: "MMMM, YYYY")
                tags
            }
             fields {
                slug
            }
=======
        node {
          excerpt(pruneLength: 200)
          html
          id
          frontmatter {
            title
            date(formatString: "MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
        }
      }
    }
  }
`

<<<<<<< HEAD
export default Tag
=======
export default Tag
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
