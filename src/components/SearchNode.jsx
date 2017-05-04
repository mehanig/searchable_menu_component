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

  render() {
    return (
      <div className="search-node">
        <input onChange={this.onSearchChange} placeholder="Search"/>
      </div>
    )
  }
}

SearchNode.PropTypes = {
  makeSearch: PropTypes.func.isRequired
}
