const path = require('path')
/* const slug = require('slug') */
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              path
              templateKey
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.path && node.frontmatter.path === '/cars') {
        createPage({
          path: `/showroom/${node.fields.slug}`,
          component: path.resolve(`src/templates/car-detail.js`),
          context: {
            slug: node.fields.slug,
          }, // additional data can be passed via context
        })
      }
      if (node.frontmatter.templateKey) {
        createPage({
          path: node.frontmatter.path,
          component: path.resolve(
            `src/templates/${String(node.frontmatter.templateKey)}.js`
          ),
          context: {
            slug: node.fields.slug,
          }, // additional data can be passed via context
        })
      }
    })
  })
}
exports.onCreateNode = ({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators,
}) => {
  // add slug field
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const arr = slug.split('/').filter(e => e.length > 0)
    createNodeField({
      node,
      name: `slug`,
      value: arr[arr.length - 1],
    })
  }

  const { frontmatter } = node
  if (frontmatter) {
    const { image, components, carimage, pictures } = frontmatter
    if (components) {
      components.sektioner.forEach(e => {
        if (e.image) {
          if (e.image.indexOf('/img') === 0) {
            e.image = path.relative(
              path.dirname(node.fileAbsolutePath),
              path.join(__dirname, '/static/', e.image)
            )
          }
        }
      })
    }
    if (pictures) {
      pictures.picturelist.forEach((e, i) => {
        if (e.image) {
          if (e.image.indexOf('/img') === 0) {
            e.id = i
            e.image = path.relative(
              path.dirname(node.fileAbsolutePath),
              path.join(__dirname, '/static/', e.image)
            )
          }
        }
      })
    }
    if (image) {
      if (image.indexOf('/img') === 0) {
        frontmatter.image = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, '/static/', image)
        )
      }
    }
    if (carimage) {
      if (carimage.indexOf('/img') === 0) {
        frontmatter.carimage = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, '/static/', carimage)
        )
      }
    }
  }
}
