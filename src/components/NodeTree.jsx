import React, {Component} from 'react'

import Node from '../models/Node.js'
import NodeElement from './NodeElement'
import menu_api from '../menu_api.json'

function genNodeMenu(data) {
  let menu = []
  for (let el of data) {
    let node = new Node(el)
    if (node.pages && node.pages.length) {
      node.childs = genNodeMenu(node.pages)
    }
    menu.push(node)
  }
  return menu
}

export default class NodeTree extends Component {
  constructor(props) {
    super(props)
    this.state = {nodes: genNodeMenu(menu_api), isLoading: false, selected: props.selected}

    this.updateSelected = this.updateSelected.bind(this)
    this.keyboardHandler = this.keyboardHandler.bind(this)
  }

  updateSelected(id) {
    this.setState({selected: id})
  }

  componentDidMount() {
    console.log(this.refs.menu_list)
    window.addEventListener("keydown", this.keyboardHandler)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyboardHandler)
  }

  keyboardHandler(e) {
    if (document.activeElement.tagName === "BODY") {
      switch (e.key) {
        case "ArrowDown":
          break
        case "ArrowUp":
          break
        case "ArrowLeft":
          break
        case "ArrowRight":
          break
        default:
      }
    }
  }

  
  render() {
    const {nodes, selected} = this.state
    return (
      <ul ref="menu_list" className="node-tree__main">
        {this.state.isLoading ? <div>Loading</div> :
          nodes.map((node) => {
            return <NodeElement
                      node={node}
                      key={node.id}
                      selected={selected}
                      updateSelected={this.updateSelected}/>
          })
        }
      </ul>
    )
  }
}
