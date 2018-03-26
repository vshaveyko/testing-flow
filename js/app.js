jsPlumb.ready(function() {

  data = JSON.parse(localStorage.getItem('data'))

  window.wrapper = new JsPlumbWrapper({
    Anchor:"Continuous",
    Endpoint: "Blank",
    Connector: [ "StateMachine", { cssClass: "connectorClass", hoverClass: "connectorHoverClass" } ],
    PaintStyle: { strokeWidth: 1, stroke: '#89bcde' },
    HoverPaintStyle: { stroke: "orange" },
    Overlays: [
        [ "Arrow", { fill: "#09098e", width: 10, length: 10, location: 1 } ],
        // [ "Arrow", { fill: "#09098e", width: 10, length: 10, location: 0.5 } ]
    ],
    ConnectorOverlays: [
        [ "Arrow", { fill: "#09098e", width: 10, length: 10, location: 1 } ]
    ]
  }, document.getElementById('container'), data.nodes, data.edges).initJsPlumb()


  // setInterval(function() {
  //   localStorage.setItem('data', JSON.stringify(wrapper.toData()))
  // })
});
