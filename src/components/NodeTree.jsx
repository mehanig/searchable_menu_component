import React, {Component} from 'react'

import {updateNodeWithId } from '../models/Node.js'
import NodeElement from './NodeElement'


export default class NodeTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: props.nodes,
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
    window.addEventListener("keydown", this.keyboardHandler)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyboardHandler)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nodes: nextProps.nodes,
      isLoading: false,
      selected: nextProps.selected
    })
  }

  keyboardHandler(e) {
    if (document.activeElement.tagName === "BODY") {
      const selected = this.state.selected
      switch (e.key) {
        case "ArrowDown":
          if (!selected) {
            this.setState({selected: this.state.nodes[0]})
          } else if (selected.isOpen && selected.childs.length) {
            this.setState({selected: selected.childs[0]})
          } else if (selected.nextNode){
            this.setState({selected: selected.nextNode})
          } else if (selected.parentNode.nextNode) {
            this.setState({selected: selected.parentNode.nextNode})
          }
          break
        case "ArrowUp":
          if (!selected) {
            this.setState({selected: this.state.nodes[0]})
          } else if (selected.prevNode) {
            if (!selected.prevNode.isOpen) {
              this.setState({selected: selected.prevNode})
             } else {
              const last_parent_child = selected.prevNode.childs.length - 1
              this.setState({selected: selected.prevNode.childs[last_parent_child]})
            }
          } else {
            if (selected.parentNode) {
              this.setState({selected: selected.parentNode})
            }
          }
          break
        case "ArrowLeft":
          if (!selected) {
            this.setState({selected: this.state.nodes[0]})
          } else if (selected.childs.length && selected.isOpen) {
            let nodes = this.state.nodes
            const new_node_state = {...selected, isOpen: !selected.isOpen}
            updateNodeWithId(nodes, selected, new_node_state)
            this.setState({nodes})
          } else if (selected.parentNode) {
            this.setState({selected: selected.parentNode})
          }
          break
        case "ArrowRight":
          if (!selected) {
            this.setState({selected: this.state.nodes[0]})
          } else if (selected.childs.length) {
            let nodes = this.state.nodes
            const new_node_state = {...selected, isOpen: !selected.isOpen}
            updateNodeWithId(nodes, selected, new_node_state)
            this.setState({nodes})
          }
          break
        default:
      }
    } else {
      // console.log(document.activeElement.tagName)
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
                      isOpen={node.isOpen}
                      updateSelected={this.updateSelected}/>
          })
        }
      </ul>
    )
  }
}
