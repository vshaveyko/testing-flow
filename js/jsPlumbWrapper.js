var connectCssClass = 'connect',
    removeCssClass = 'delete',
    nodeCssClass="jtk-node",
    connectCss=`.${connectCssClass}`;

console.log(connectCss)

class JsPlumbNode {

  constructor(container, elId, left, top, name) {
    this.container = container
    this.elId = elId
    this.name = name || elId

    container.insertAdjacentHTML('beforeend', this.toHtml(left, top))
  }

  get el() { return document.getElementById(this.elId) }

  initJSPlumb() {
    jsPlumb.makeSource(this.el, {
      filter: connectCss,
      deleteEndpointsOnDetach:false,
      endpoint: ['Dot', {}]
    }).makeTarget(this.el, {
      allowLoopback: false,
      deleteEndpointsOnDetach:false,
    })

    this.el.querySelector(`.${removeCssClass}`).addEventListener('click', (ev) => {
      this.remove()
    })

    return this
  }

  toData() {
    return {
      id:   this.elId,
      name: this.name,
      top:  this.el.style.top,
      left: this.el.style.left
    }
  }

  remove() {
    jsPlumb.deleteConnectionsForElement(this.el).unmakeSource(this.el).unmakeTarget(this.el)

    this.el.remove()
  }

  toHtml(left, top) {
    var style = ""
    if (left) style += `left: ${left}px;`
    if (top) style += `top: ${top}px;`
    if (style) style = `style="${ style }"`

    return `
      <div class="${ nodeCssClass }" id='${ this.elId }' ${ style }>
        <div class="${ connectCssClass }"></div>
        <div class="${ removeCssClass }">X</div>
        <div class="name">
          <span>${ this.name }</span>
        </div>
      </div>
    `
  }

}

class JsPlumbEdge {

  constructor(sourceNode, targetNode) {
    this.update({
      source: sourceNode,
      target: targetNode
    })
  }

  get sourceNodeId() { return this.sourceNode.elId }

  get targetNodeId() { return this.targetNode.elId }

  initJsPlumb() {
    jsPlumb.connect({
      source: this.sourceNode.el,
      target: this.targetNode.el
    })

    return this
  }

  update({ source, target }) {
    this.sourceNode = source
    this.targetNode = target
  }

  toData() { return { source: this.sourceNodeId, target: this.targetNodeId } }

}

class JsPlumbWrapper {

  //
  // nodes: Array of Node('id' - el id, "name" - ..., "left" - left offset, "top" - top offset)
  // Ex: {
  //   "id": "window1",
  //   "name": "1",
  //   "left": 50,
  //   "top": 50
  // }
  //
  constructor(settings, container, nodes, edges) {
    this.container = container

    jsPlumb.importDefaults(settings)
    jsPlumb.setContainer(this.container)

    this.container = container
    this.nodes = nodes.map((data) => new JsPlumbNode(this.container,
                                                     data.id,
                                                     data.left,
                                                     data.top,
                                                     data.name).initJSPlumb())
    this.edges = edges.map(
      (edge) => new JsPlumbEdge(this._nodeById(edge.source),
                                this._nodeById(edge.target)).initJsPlumb()
    )

  }

  _edgeByEndPoints(startId, endId) {
    return this.edges.find((e) => e.sourceNodeId == startId && e.targetNodeId == endId)
  }

  subscribe() {
    var _this = this

    jsPlumb.bind('connection', function({ sourceId, targetId }) {
      console.log('connec')
      _this._edgeByEndPoints(sourceId, targetId) || _this.edges.push(
        new JsPlumbEdge(_this._nodeById(sourceId),
                        _this._nodeById(targetId))
      )
    })

    jsPlumb.bind('connectionMoved', function({ originalSourceId, newSourceId, originalTargetId, newTargetId }) {
      var edge = _this._edgeByEndPoints(originalSourceId, originalTargetId)

      edge.update({
        source: _this._nodeById(newSourceId),
        target: _this._nodeById(newTargetId)
      })

    })

    jsPlumb.bind('connectionDetached', function({ sourceId, targetId }) {
      var edge = _this._edgeByEndPoints(sourceId, targetId)
      var edgeIndex = _this.edges.indexOf(edge)

      _this.edges.splice(edgeIndex, 1)
    })

  }

  initJsPlumb() {
    var els = [this.container].concat(this.nodes.map((n) => n.el))

    els.forEach((el) => this._makeDraggable(el))

    this.subscribe()

    return this
  }

  toData() {
    return {
      edges: this.edges.map((e) => e.toData()),
      nodes: this.nodes.map((e) => e.toData())
    }
  }

  _nodeById(nodeId) {
    return this.nodes.find((n) => n.elId == nodeId)
  }

  _makeDraggable(el) {
    var _onDrag = function() {
      jsPlumb.repaintEverything()
    }

    jsPlumb.draggable(el,
      {
        stop: _onDrag,
        drag: _onDrag,
        filter: `${connectCss}, ${connectCss} *, .${removeCssClass} *`,
        filterExclude: true,
        magnetize: true
      }
    )
  }

  save() {
    return JsPlumbWrapperSaver(this)
  }

}

var localStorageKey = 'data';

class JsPlumbWrapperSaver {

  constructor(jsPlumbWrapper) {
    this.jsPlumbWrapper = jsPlumbWrapper
  }

  toLocalStorage() {
    localStorage.setItem(
      localStorageKey,
      this.jsPlumbWrapper.toData()
    )
  }

}
