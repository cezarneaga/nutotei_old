import React from 'react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Img from 'gatsby-image'
import { ExternalLink } from 'react-feather'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/SEO'
const Bold = ({ children }) => <strong>{children}</strong>
const Text = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

const CandidateMedia = ({ MediaUrl, MediaText }) => {
  return (
    <>
      <ExternalLink size={14} color="#699acf" style={{ paddingRight: 5 }} />
      <a href={MediaUrl} target="_blank" rel="noreferrer">
        {MediaText}
      </a>
      <br />
    </>
  )
}

export default ({ data: { contentfulCandidate, allContentfulCandidate } }) => (
  <Layout>
    <article className="sheet">
      <SEO
        title={contentfulCandidate.name}
        summary={contentfulCandidate.review.review}
        slug={contentfulCandidate.slug}
      />
      <div className="sheet__inner">
        <h1 className="sheet__title">
          {contentfulCandidate.name}
          {contentfulCandidate.party ? ` - ${contentfulCandidate.party}` : ''}
        </h1>
        <p className="sheet__lead">{contentfulCandidate.review.review}</p>
        <div className="sheet__gallery">
          <Img fluid={contentfulCandidate.mainImage.fluid} />
        </div>
        <div className="sheet__body">
          {documentToReactComponents(contentfulCandidate.content.json, options)}
          {contentfulCandidate?.documents?.map(cv => {
            return (
              <CandidateMedia
                MediaUrl={cv.file.url}
                MediaText="Vizualizează CV-ul"
              />
            )
          })}
          {contentfulCandidate.facebookLink && (
            <CandidateMedia
              MediaUrl={contentfulCandidate.facebookLink}
              MediaText="Sursă articol"
            />
          )}
          <hr className="separator" />
          <ul className="others" style={{ overflow: 'hidden', marginRight: 0 }}>
            {allContentfulCandidate.nodes.map(other => (
              <li key={other.id} className="card">
                <Link to={`/candidat/${other.slug}`} className="card__image">
                  <Img fluid={other.mainImage.fluid} />
                </Link>
                <div className="card__caption">
                  <h6 className="card__title">
                    <Link to={`/candidat/${other.slug}`}>{other.name}</Link>
                  </h6>
                </div>
              </li>
            ))}
          </ul>
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
      facebookLink
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
      party
      createdAt
      documents {
        file {
          url
        }
      }
    }
    allContentfulCandidate(limit: 3, skip: 1) {
      nodes {
        id
        name
        slug
        party
        mainImage {
          fluid(maxWidth: 400, maxHeight: 280, toFormat: WEBP) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`