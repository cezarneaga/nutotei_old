import React from 'react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Img from 'gatsby-image'
import { ExternalLink } from 'react-feather'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/SEO'
const Bold = ({ children }) => <strong>{children}</strong>
const Text = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}
export default ({ data: { contentfulCandidate } }) => (
  <Layout>
    <article className="sheet">
      <SEO
        title={contentfulCandidate.name}
        summary={contentfulCandidate.review.review}
        slug={contentfulCandidate.slug}
      />
      <div className="sheet__inner">
        <h1 className="sheet__title">{contentfulCandidate.name}</h1>
        <p className="sheet__lead">{contentfulCandidate.review.review}</p>
        <div className="sheet__gallery">
          <Img fluid={contentfulCandidate.mainImage.fluid} />
        </div>
        <div className="sheet__body">
          {documentToReactComponents(contentfulCandidate.content.json, options)}
          {contentfulCandidate.documents.map((cv) => {
            return (
              <>
                <ExternalLink
                  size={14}
                  color="#699acf"
                  style={{ paddingRight: 5 }}
                />
                <a href={cv.file.url}>Vizualizează CV-ul</a>
              </>
            )
          })}
        </div>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query CandidatesQuery($slug: String!) {
    contentfulCandidate(slug: { eq: $slug }) {
      name
      slug
      mainImage {
        fluid(maxWidth: 600, toFormat: WEBP) {
          ...GatsbyContentfulFluid
        }
      }
      review {
        review
      }
      content {
        json
      }
      createdAt
      documents {
        file {
          url
        }
      }
    }
  }
`
