class Node {
  constructor({id, title, url}, path="") {
    this.id = id
    this.title = title
    this.url = url
    this.childs = []
    this.path = path
    this.isOpen = false
    this.nextNode = null
    this.prevNode = null
    this.parentNode = null
  }
}

function genNodeMenu(data, path="") {
  let menu = []
  let path_index = 0;
  for (let el of data) {
    let node = new Node(el, path + path_index + ".")
    if (el.pages && el.pages.length) {
      node.childs = genNodeMenu(el.pages, path + path_index + ".")
      for (let ch of node.childs) {
        ch.parentNode = node
      }
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
    path_index += 1;
  }
  return menu
}

function updateNodeWithId(nodes, node, new_state) {
  const path = node.path.split('.').map(el => parseInt(el, 10)).filter(el => !isNaN(el))
  let original_node = nodes[path[0]]
  for (let index of path.slice(1)) {
    original_node = original_node.childs[index]
  }
  Object.assign(original_node, new_state)
}

function dfsSearch(nodes, text) {
  let data = []
  for (let node of nodes) {
    if (node.title.search(text) !== -1) {
      data.push(node)
    }
    if (node.childs.length) {
      data.push(...dfsSearch(node.childs, text))
    }
  }
  return data
}

function buildListLinks(nodes) {
  let new_list = []
  for (let node of nodes) {
    let new_node = new Node({...node})
    new_node.childs = []
    new_node.nextNode = null
    new_node.prevNode = null
    new_node.parentNode = null
    new_list.push(new_node)
  }
  return new_list
}

function findNodesByText(nodes, text) {
  console.log(new Date())
  const f = buildListLinks(dfsSearch(nodes, text))
  console.log(new Date())
  return f
}

export {
  Node,
  genNodeMenu,
  updateNodeWithId,
  findNodesByText
}
