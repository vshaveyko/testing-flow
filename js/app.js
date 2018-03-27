window.setZoom = function(zoom, instance, transformOrigin, el) {
  transformOrigin = transformOrigin || [ 0.5, 0.5 ];
  instance = instance || jsPlumb;
  el = el || instance.getContainer();
  var p = [ "webkit", "moz", "ms", "o" ],
      s = "scale(" + zoom + ")",
      oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

  for (var i = 0; i < p.length; i++) {
    el.style[p[i] + "Transform"] = s;
    el.style[p[i] + "TransformOrigin"] = oString;
  }

  el.style["transform"] = s;
  el.style["transformOrigin"] = oString;

  instance.setZoom(zoom);
};

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

  setZoom(1)

  // setInterval(function() {
  //   localStorage.setItem('data', JSON.stringify(wrapper.toData()))
  // })
});
