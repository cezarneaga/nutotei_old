import React, { Component } from 'react'
import {
  connectAutoComplete,
  Highlight,
  PoweredBy,
} from 'react-instantsearch-dom'
import AutoSuggest from 'react-autosuggest'
import { navigate } from '@reach/router'

class Autocomplete extends Component {
  state = { value: this.props.currentRefinement, active: false }

  onSuggestionSelected = (event, { suggestion, suggestionValue, method }) => {
    const slug = `candidat/${suggestion.slug}`
    if (method === 'click' || method === 'enter') {
      navigate(slug, { state: { searchValue: suggestionValue } })
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value)
  }

  onSuggestionsClearRequested = () => {
    this.props.refine()
  }

  getSuggestionValue(hit) {
    return hit.name
  }

  renderSuggestion(hit) {
    return (
      <>
        <Highlight attribute="name" hit={hit} className="hit-name" />

        <span className="hit-party">
          Partid: <Highlight attribute="party" hit={hit} /> <br />
        </span>

        <span className="hit-summary">
          <Highlight attribute="summary.summary" hit={hit} />
        </span>
      </>
    )
  }
  onChange = (event, { newValue, method }) => {
    if (method === 'enter') {
      return navigate('/cautare', { state: { searchValue: this.state.value } })
    }
    this.setState({ value: newValue, active: true })
  }
  render() {
    const { hits } = this.props

    const inputProps = {
      placeholder: 'Caută politicieni',
      onChange: this.onChange,
      onBlur: () => this.setState({ active: false }),
      value: this.state.value,
    }
    return (
      <>
        <AutoSuggest
          suggestions={hits}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        <PoweredBy
          className={this.state.active ? 'active' : ''}
          // Optional parameters
          translations={{
            searchBy: 'Search by',
          }}
        />
      </>
    )
  }
}
export default connectAutoComplete(Autocomplete)
