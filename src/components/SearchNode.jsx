import React, {Component} from 'react'

export default class SearchNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      makeSearch: props.makeSearch
    }

    this.keyboardHandler = this.keyboardHandler.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  keyboardHandler(e){
    if (e.key === 'Enter') {
      this.state.makeSearch(this.state.input)
    }
  }

  onSearchChange(e) {
    this.setState({input: e.target.value});
  }

  render() {
    return (
      <div className="search-node">
        <input onKeyPress={this.keyboardHandler} onChange={this.onSearchChange} placeholder="Search"/>
      </div>
    )
  }
}
