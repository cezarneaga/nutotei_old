require('dotenv').config()
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulCandidate(filter: { node_locale: { eq: "ro" } }) {
          nodes {
            slug
          }
        }
      }
    `).then((result) => {
      result.data.allContentfulCandidate.nodes.map((candidate) => {
        createPage({
          path: `candidat/${candidate.slug}`,
          component: path.resolve(`./src/templates/candidate.js`),
          context: {
            slug: candidate.slug,
          },
        })
      })
      resolve()
    })
  })
}
