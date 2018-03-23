jsPlumb.ready(function() {

  jsPlumb.importDefaults({
    dragOptions: {
       drag:  function() {console.log('dragging'); }
    },
    Endpoint: {
    dragOptions: {
       drag:  function() {console.log('dragging'); }
    }
    }})


  var firstInstance = jsPlumb.getInstance({
    container: 'container',
      // PaintStyle:{
      //   strokeWidth:1,
      //   stroke:"#567567",
      //   outlineStroke:"black",
      //   outlineWidth:0.5
      // },
      // Connector:[ "Flowchart", { curviness: 30 } ],
    // connectorOverlays:[
    //   [ "Arrow", { width:10, length:30, location:1, id:"arrow" } ],
    //   // [ "Label", { label:"foo", id:"label" } ]
    // ],
    // EndpointStyle : { fill: "#567567"  },
    // Anchor : "AutoDefault",
    // Anchors : [ "TopCenter", "BottomCenter" ]

    Anchor:"Continuous",
    Endpoint: "Blank",
    Connector: [ "StateMachine", { cssClass: "connectorClass", hoverClass: "connectorHoverClass" } ],
    PaintStyle: { strokeWidth: 1, stroke: '#89bcde' },

    HoverPaintStyle: { stroke: "orange" },
    Overlays: [
        [ "Arrow", { fill: "#09098e", width: 10, length: 10, location: 1 } ]
    ]
  });
  //
  // firstInstance.importDefaults({
  //   Connector : [ "Bezier", { curviness: 150 } ],
  //   Anchors : [ "TopCenter", "BottomCenter" ]
  // });

  // jsPlumb.makeSource('red-brick-connect', {
  //   parent: document.getElementById('red-brick'),
  //   endpoint:["Dot", {}],
  //   scope: '1'
  // });
  // jsPlumb.makeSource('green-brick-connect', {
  //   parent: document.getElementById('green-brick'),
  //   endpoint:["Dot", {}],
  //   scope: '1'
  // });
  // jsPlumb.makeSource('blue-brick-connect', {
  //   parent: document.getElementById('blue-brick'),
  //   endpoint:["Dot", {}],
  //   scope: '1'
  // });
  //
  jsPlumb.makeSource(document.querySelectorAll('.connect'), {
    parent: '.brick',
    endpoint:["Dot", {}],
  },{
    dragOptions: {
        start: function() { console.log('start') },
        stop: function() { console.log('stop') },
        drag: function() { console.log('dragging'); }
    }
    // endpoint:["Rectangle", { width:40, height:20 }],
  });

  jsPlumb.makeTarget(document.querySelectorAll('.brick'), {
    allowLoopback:false,
    // endpoint:["Rectangle", { width:40, height:20 }],
  });


  firstInstance.draggable(['container', 'red-brick', 'green-brick', 'blue-brick'],
    {
      dragOptions: {
          start: function() { console.log('start') },
          stop: function() { console.log('stop') },
          drag: function() { console.log('dragging'); }
      }
    }
  )


  // firstInstance.importDefaults({
  //   Connector : [ "Flowchart", { curviness: 150 } ],
  //   Anchors : [ "TopCenter", "BottomCenter" ]
  // });


  // firstInstance.connect({
  //   source: "red-brick",
  //   target: "green-brick",
  //   scope:"someScope",
  // });

});
