const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: `/1`,
    toPath: `/`,
    redirectInBrowser: true,
    isPermanent: true,
  })
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
              date(formatString:"YYYY-MM")
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: path.resolve("src/templates/tag.js"),
        context: {
          tag,
        },
      })
    })

      // Tag pages:
      let formatDatas = []
      // Iterate through each post, putting all found tags into `tags`
      _.each(posts, edge => {
        if (_.get(edge, "node.frontmatter.date")) {
          formatDatas = formatDatas.concat(edge.node.frontmatter.date)
        }
      })

      // Eliminate duplicate tags
      formatDatas = _.uniq(formatDatas)

      // Make tag pages
      formatDatas.forEach(date => {
      const arr = date.split('-');
      let year = arr[0];
      let month = arr[1]
      if(month == "12") {
        year = year + 1
        month = "1"
      }
      const nextMonth = `${year}-${month+1}`
        createPage({
          path: `/date/${_.kebabCase(date)}/`,
          component: path.resolve("src/templates/date.js"),
          context: {
            date,
            nextMonth
          },
        })
      })

    const postsPerPage = 5
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i+1}`,
        component: path.resolve("./src/templates/post-list.js"),
        context: {
          limit: postsPerPage,
          skip: i*postsPerPage, 
          numPages,
          currentPage: i+1,
        }
      })
    })
  })
}
