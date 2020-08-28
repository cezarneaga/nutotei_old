import React from 'react'
import { SEO } from '../components/SEO'
import Layout from '../components/layout'
import { InstaSearch } from '../components/InstaSearch'
const Search = () => (
  <Layout>
    <article className="sheet">
      <SEO title="cautare" summary="pagina de cautare" slug="/cautare" />
      <div className="sheet__inner_wide page-search-result">
        <h1 className="sheet__title">Căutare</h1>
        <div className="sheet__body">
          <InstaSearch />
        </div>
      </div>
    </article>
  </Layout>
)

export default Search
