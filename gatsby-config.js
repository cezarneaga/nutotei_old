require('dotenv').config()
const siteConfig = require('./site-config')
module.exports = {
  siteMetadata: {
    ...siteConfig,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_GRAPHQL_ID,
        accessToken: process.env.GATSBY_GRAPHQL_TOKEN,
        downloadLocal: true,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
