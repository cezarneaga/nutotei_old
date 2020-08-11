import React from 'react'
import { graphql } from 'gatsby'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { SEO } from '../components/SEO'
import Img from 'gatsby-image'
import Layout from '../components/layout'

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

const About = ({ data: { about } }) => (
  <Layout>
    <article className="sheet">
      <SEO title={about.title} summary={about.subtitle} slug={about.slug} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{about.title}</h1>
        <p className="sheet__lead">{about.subtitle}</p>
        <div className="sheet__gallery">
          <Img fixed={about.photo.fixed} />
        </div>
        <div className="sheet__body">
          {documentToReactComponents(about.content.json, options)}
        </div>
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query AboutQuery {
    about: contentfulPage(slug: { eq: "despre" }) {
      slug
      photo {
        fixed(height: 400, width: 600, toFormat: WEBP) {
          ...GatsbyContentfulFixed
        }
      }
      content {
        json
      }
      subtitle
      title
    }
  }
`
