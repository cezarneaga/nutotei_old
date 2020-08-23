require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const common = `query {
  allContentfulCandidate(filter: {node_locale: {eq: "ro"}}, limit: 500) {
    nodes {
      objectID: id
      name
      slug
      party
      updatedAt
      review {
        review
      }
    }
  }
}`

const queries = [
  {
    query: common,
    transformer: ({ data }) => data.allContentfulCandidate.nodes,
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME_COMMON,
  },
]
module.exports = queries
