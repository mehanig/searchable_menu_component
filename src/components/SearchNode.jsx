import _ from 'lodash'
import React, {Component} from 'react'
import PropTypes from 'prop-types';


export default class SearchNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      makeSearch: props.makeSearch
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.clearSearchInput = this.clearSearchInput.bind(this)
    this.debouncedSearch = _.debounce(this.makeSearch, 300)
  }

  onSearchChange(e) {
    const value = e.target.value
    this.setState({input: value})
    this.debouncedSearch()
  }

  makeSearch() {
    this.state.makeSearch(this.state.input)
  }

  clearSearchInput() {
    this.setState({input: ""}, ()=> {
      this.makeSearch()
    })
  }

  render() {
    let canselSearch;
    const svg = (<span dangerouslySetInnerHTML={{__html: '<svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg"> <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2"/>  <line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2"/>  </svg>'}} />);
    if (this.state.input.length) {
      canselSearch = (<span className="search-node__cancel" onClick={this.clearSearchInput}>{svg}</span>)
    }
    return (
      <div className="search-node">
        <input className="search-node__input" onChange={this.onSearchChange} placeholder="Search" value={this.state.input}/>
        {canselSearch}
      </div>
    )
  }
}

SearchNode.PropTypes = {
  makeSearch: PropTypes.func.isRequired
}
