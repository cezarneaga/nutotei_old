import React from 'react'
import { Link } from 'gatsby'

import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  Panel,
  Stats,
  Highlight,
  PoweredBy,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'
import { ArrowRightCircle } from 'react-feather'

const indexCommon = process.env.GATSBY_ALGOLIA_INDEX_NAME_COMMON
// @ts-ignore
const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

export function InstaSearch(props) {
  return (
    <div className="ais-InstantSearch">
      <InstantSearch indexName={`${indexCommon}`} searchClient={client}>
        <div className="search-header">
          <SearchBox
            defaultRefinement={props?.location?.state?.searchValue || ''}
            translations={{
              placeholder: 'Cauta aici...',
            }}
          />
          <PoweredBy
            translations={{
              searchBy: 'search by',
            }}
          />
          <Stats
            translations={{
              stats(nbHits, timeSpentMS) {
                return `${nbHits} rezultate găsite în ${timeSpentMS}ms`
              },
            }}
          />
        </div>
        <div className="search-result-wrapper">
          <div className="left-panel">
            <Hits hitComponent={Hit} />
            <Configure hitsPerPage={10} />
          </div>
          <div className="right-panel">
            <div className="filter location">
              <Panel header="Partide">
                <RefinementList attribute="party" />
              </Panel>
            </div>
          </div>
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  )
}

function Hit({ hit }) {
  return (
    <div className={`card-candidate`}>
      <Link to={`/candidat/${hit.slug}`}>
        <Highlight attribute="name" hit={hit} className="hit-name" />
        {hit.party && (
          <span className="hit-party">
            {' - '}
            <Highlight attribute="party" hit={hit} />
          </span>
        )}
      </Link>
      <br />
      <span className="hit-summary">
        <Highlight attribute="review.review" hit={hit} />
      </span>
      <Link
        to={`/candidat/${hit.slug}`}
        className="button"
        style={{ float: 'right', display: 'inline-block', marginRight: 10 }}>
        <ArrowRightCircle />
      </Link>
    </div>
  )
}
