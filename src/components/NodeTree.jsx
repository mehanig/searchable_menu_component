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
    if (menu.length > 1) {
      menu[0].nextNode = menu[1]
      menu[menu.length-1].prevNode = menu[menu.length-2]
    }
    for (let i = 1; i < menu.length-1; i++) {
      menu[i].nextNode = menu[i+1]
      menu[i].prevNode = menu[i-1]
    }
  }
  return menu
}

export default class NodeTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: genNodeMenu(menu_api),
      isLoading: false,
      selected: props.selected
    }

    this.updateSelected = this.updateSelected.bind(this)
    this.keyboardHandler = this.keyboardHandler.bind(this)
  }

  updateSelected(node) {
    this.setState({selected: node})
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
          if (!this.state.selected) {
            this.setState({selected: this.state.nodes[0]})
          } else if (this.state.selected.nextNode) {
            this.setState({selected: this.state.selected.nextNode})
          }
          break
        case "ArrowUp":
          if (!this.state.selected) {
            this.setState({selected: this.state.nodes[0]})
          } else if (this.state.selected.prevNode) {
            this.setState({selected: this.state.selected.prevNode})
          }
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
