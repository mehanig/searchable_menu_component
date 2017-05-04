import React, {Component} from 'react'
import PropTypes from 'prop-types';

import {updateNodeWithId, Node } from '../models/Node.js'
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
    if (this.props.keyboard) {
      window.addEventListener("keydown", this.keyboardHandler)
    }
  }

  componentWillUnmount() {
    if (this.props.keyboard) {
      window.removeEventListener("keydown", this.keyboardHandler)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nodes: nextProps.nodes,
      isLoading: false,
      selected: nextProps.selected
    })
  }

  keyboardHandler(e) {
    if (this.props.keyboard && document.activeElement.tagName === "BODY") {
      const {nodes, selected} = this.state
      switch (e.key) {
        case "ArrowDown":
          if (!selected) {
            this.setState({selected: nodes[0]})
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
            this.setState({selected: nodes[0]})
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
            this.setState({selected: nodes[0]})
          } else if (selected.childs.length && selected.isOpen) {
            const new_node_state = {...selected, isOpen: !selected.isOpen}
            updateNodeWithId(nodes, selected, new_node_state)
            this.setState({nodes})
          } else if (selected.parentNode) {
            this.setState({selected: selected.parentNode})
          }
          break
        case "ArrowRight":
          if (!selected) {
            this.setState({selected: nodes[0]})
          } else if (selected.childs.length) {
            const new_node_state = {...selected, isOpen: !selected.isOpen}
            updateNodeWithId(nodes, selected, new_node_state)
            this.setState({nodes})
          }
          break
        default:
      }
    } else {
    }
  }


  render() {
    const {nodes, selected} = this.state
    return (
      <ul ref="menu_list" className="node-tree__main">
        {this.state.isLoading ? <div>Loading</div> :
          nodes.map((el) => {
            // use custom key to force React to rerender element in search_results
            // (search_results and menu are different to display, and
            // menu NodeElement elements should not be reused in search result list
            const key = [el.id, "_", el.childs.length, "_", el.marked_start, "_", el.marked_length].join()
            return <NodeElement
                      key={key}
                      node={el}
                      highlight={this.props.highlight}
                      selected={selected}
                      isOpen={el.isOpen}
                      updateSelected={this.updateSelected}/>
          })
        }
      </ul>
    )
  }
}

NodeTree.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.instanceOf(Node)).isRequired,
  isLoading: PropTypes.bool,
  highlight: PropTypes.bool,
  keyboard: PropTypes.bool,
  selected: PropTypes.instanceOf(Node),
}
