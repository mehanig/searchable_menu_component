export default class Node {
  constructor({id, title, url, pages}) {
    this.id = id
    this.title = title
    this.url = url
    this.pages = pages
    this.childs = []
    this.nextNode = null
    this.prevNode = null
  }
}
