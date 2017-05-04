import React, {Component} from 'react';

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
    const {isOpen, childs} = this.state.node
    let classNameHeader = 'node-tree__node-header'
    if (this.state.selected && this.state.selected.id === this.state.node.id) {
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
          <span className="node-tree__node-header_text">{this.state.node.title}</span>
          <span className="node-tree__node-header_count">{childs.length ? "(" + childs.length + ")" : null}</span>
        </div>
        <ul className="node-tree__node-childs">
          {isOpen && childs.length ? childs.map((el) => {
            return <NodeElement key={el.id}
                                node={el}
                                selected={this.state.selected}
                                updateSelected={this.props.updateSelected}/>
          }) : null}
        </ul>
      </li>
    )
  }
}
