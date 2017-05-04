import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Node} from '../models/Node'

export default class NodeElement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      node: props.node,
      selected: props.selected,
      updateSelected: props.updateSelected
    }

    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleNodeClick() {
    this.state.node.isOpen = !this.state.node.isOpen
    this.props.updateSelected(this.state.node)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selected: nextProps.selected, isOpen: nextProps.isOpen})
  }

  render() {
    const {node, selected} = this.state
    const {isOpen, childs} = node
    let classNameHeader = 'node-tree__node-header'
    if (selected && selected.id === node.id) {
      classNameHeader += ' selected'
    }
    if (isOpen) {
      classNameHeader += ' open'
    }
    return (
      <li className="node-tree__node">
        <div className={classNameHeader} onClick={this.handleNodeClick}>
          { childs.length ?
            <span className="node-tree__node-header_arrow"/>
            :
            <span className="node-tree__node-header_no-arrow"/>
          }
          {node.marked_length && this.props.highlight ?
            <span className="node-tree__node-header_text">
              {node.title.substr(0, node.marked_start)}
              <mark>{node.title.substr(node.marked_start, node.marked_length)}</mark>
              {node.title.substr(node.marked_start + node.marked_length)}
            </span>
            :
            <span className="node-tree__node-header_text">
              {node.title}
            </span>
          }
          <span className="node-tree__node-header_count">{childs.length ? "(" + childs.length + ")" : null}</span>
        </div>
        <ul className="node-tree__node-childs">
          {isOpen && childs.length ? childs.map((el) => {
            const key = [el.id, "_", el.childs.length, "_", el.marked_start, "_", el.marked_length].join()
            return <NodeElement key={key}
                                node={el}
                                highlight={this.props.hightlight}
                                selected={selected}
                                updateSelected={this.props.updateSelected}/>
          }) : null}
        </ul>
      </li>
    )
  }
}

NodeElement.propTypes = {
  node: PropTypes.instanceOf(Node).isRequired,
  selected: PropTypes.instanceOf(Node),
  updateSelected: PropTypes.func.isRequired,
  highlight: PropTypes.bool
}
