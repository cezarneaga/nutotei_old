/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'

import '../styles/index.sass'

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              siteTitle
              siteDescription
              copyright
              social {
                facebook
                email
              }
            }
          }
        }
      `}
      render={(data) => (
        <div className={`container ${showMenu ? 'is-open' : ''}`}>
          <div className="container__sidebar">
            <div className="sidebar">
              <h6 className="sidebar__title">
                <Link to="/">{data.site.siteMetadata.siteTitle}</Link>
              </h6>
              <div className="sidebar__intro">
                {data.site.siteMetadata.siteDescription}
              </div>
              <ul className="sidebar__menu">
                <li>
                  <Link to="/">Acasa</Link>
                </li>
                <li>
                  <Link to="/cautare">Căutare</Link>
                </li>
                <li>
                  <Link to="/despre">Despre</Link>
                </li>
              </ul>
              <p className="sidebar__social">
                <a
                  href={data.site.siteMetadata.social.facebook}
                  target="blank"
                  className={`social social--facebook`}>
                  {' '}
                </a>
                <a
                  href={`mailto:${data.site.siteMetadata.social.email}`}
                  className={`social social--email`}>
                  {' '}
                </a>
              </p>
              <div className="sidebar__copyright">
                {data.site.siteMetadata.copyright}
              </div>
            </div>
          </div>
          <div className="container__body">
            <div className="container__mobile-header">
              <div className="mobile-header">
                <div className="mobile-header__menu">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setShowMenu(!showMenu)
                    }}>
                    <span style={{ display: 'none' }}>menu</span>
                  </button>
                </div>
                <div className="mobile-header__logo">
                  <Link to="/">{data.site.siteMetadata.siteTitle}</Link>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    />
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
