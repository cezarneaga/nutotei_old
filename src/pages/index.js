import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import { SEO } from '../components/SEO'
const IndexPage = ({ data: { allContentfulCandidate } }) => {
  return (
    <Layout>
      <SEO />
      <Masonry className="showcase">
        {allContentfulCandidate.nodes.map((work) => (
          <div key={work.id} className="showcase__item">
            <figure className="card">
              <Link to={`/candidat/${work.slug}`} className="card__image">
                <Img fluid={work.mainImage.fluid} />
              </Link>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/candidat/${work.slug}`}>{work.name}</Link>
                </h6>
                <div className="card__description">
                  <p>{work.review.review}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allContentfulCandidate(filter: { node_locale: { eq: "ro" } }) {
      nodes {
        id
        name
        review {
          review
        }
        mainImage {
          fluid(maxWidth: 450, toFormat: WEBP) {
            ...GatsbyContentfulFluid
          }
        }
        slug
      }
    }
  }
`
