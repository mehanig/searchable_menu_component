import React, {Component} from 'react'

import NodeTree from './NodeTree'
import SearchNode from './SearchNode'
import {findNodesByText, Node} from '../models/Node'
import PropTypes from 'prop-types';

export default class SearchableMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: props.nodes,
    }

    this.makeSearch = this.makeSearch.bind(this)
    this.scrollCapture = this.scrollCapture.bind(this)
  }


  makeSearch(input) {
    if (input === "") {
      this.setState({
        nodes: this.state.nodes,
        slice: false,
        search_result: null,
        search_result_all: null
      })
      return
    }

    const search_result = findNodesByText(this.state.nodes, input)

    // This is bad hack for large lists
    if (search_result.length > 100) {
      this.setState({search_result: search_result.slice(0, 100), slice: true, search_result_all: search_result})
    } else {
      this.setState({search_result: search_result})
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollCapture);
  }

  scrollCapture(e) {
    if (this.state.slice) {
      this.setState({search_result: this.state.search_result_all, slice: false})
    }
  }

  render() {
    return (
      <div className="searchable-menu">
        <SearchNode makeSearch={this.makeSearch}/>
        <div className="node-tree" onScroll={this.scrollCapture}>
          {this.state.search_result ?
            <NodeTree nodes={this.state.search_result}
                      highlight={this.props.highlighted}
                      keyboard={this.props.keyboarded}/>
            :
            <NodeTree nodes={this.state.nodes}
                      keyboard={this.props.keyboarded}/>
          }
        </div>
      </div>
    )
  }
}

SearchableMenu.PropTypes = {
  nodes: PropTypes.arrayOf(PropTypes.instanceOf(Node)).isRequired,
  keyboarded: PropTypes.bool,
  highlighted: PropTypes.bool
}
