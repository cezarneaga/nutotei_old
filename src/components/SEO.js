import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export const SEO = ({ title, summary, image, slug, isRepeatable }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            siteDescription
            lang
            social {
              twitter
            }
            fbAppId
          }
        }
      }
    `}
    render={(data) => (
      <Helmet /*bodyAttributes={{}}*/>
        {/* <script
        type="text/javascript"
        src="https://polyfill.io/v3/polyfill.min.js?features=Symbol"
      /> */}
        {title ? (
          <title>{`${title} | ${data.site.siteMetadata.siteTitle}`}</title>
        ) : (
          <title>{`${data.site.siteMetadata.siteTitle}`}</title>
        )}
        {/* General tags */}
        <meta name="description" content={summary} />
        <meta name="image" content={image} />
        {/* OpenGraph tags */}
        <meta property="og:url" content={slug} />
        {isRepeatable ? (
          <meta property="og:type" content="article" />
        ) : (
          <meta property="og:type" content="website" />
        )}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={image} />
        <meta property="fb:app_id" content={data.site.siteMetadata.fbAppID} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={data.site.siteMetadata.social.twitter}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />
        <html lang={data.site.siteMetadata.lang} />
      </Helmet>
    )}
  />
)

export default SEO