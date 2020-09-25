import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import { SEO } from '../components/SEO'
import { AutocompleteSearch } from '../components/AutocompleteSearch'
import ALDE from '../images/logo/logo_ALDE.png'
import PLUS from '../images/logo/logo_PLUS.png'
import PMP from '../images/logo/logo_PMP.png'
import PNL from '../images/logo/logo_PNL.png'
import PSD from '../images/logo/logo_PSD.png'
import UDMR from '../images/logo/logo_UDMR.png'
import USR from '../images/logo/logo_USR.png'
import PRORomania from '../images/logo/logo_PRORomania.png'
const partyLogos = { ALDE, PLUS, PMP, PNL, PSD, UDMR, USR, PRORomania }
const IndexPage = ({ data: { allContentfulCandidate } }) => {
  return (
    <Layout>
      <SEO />
      <AutocompleteSearch />
      <Masonry className="showcase">
        {allContentfulCandidate.nodes.map(work => {
          return (
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
                    {work.party && (
                      <div className="card__logo">
                        <img
                          src={partyLogos[work.party?.replace(' ', '')]}
                          className="logo"
                          alt={work.party}
                        />
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            </div>
          )
        })}
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
        party
      }
    }
  }
`
