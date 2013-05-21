if (Meteor.isClient) {
  Template.hello.rendered = function () {
    nv.addGraph(function() {
      chart = nv.models.lineChart();

      chart.x(function(d,i) {
        return i;
      });


      chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
          .tickFormat(d3.format(',.1f'));

      chart.yAxis
          .axisLabel('Voltage (v)')
          .tickFormat(d3.format(',.2f'));

      d3.select('#chart1 svg')
          //.datum([]) //for testing noData
          .datum(sinAndCos())
        .transition().duration(500)
          .call(chart);

      //TODO: Figure out a good way to do this automatically
      nv.utils.windowResize(chart.update);
      //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

      chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

      return chart;
    });



    function sinAndCos() {
      var sin = [],
          cos = [];

      for (var i = 0; i < 100; i++) {
        sin.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) }); //the nulls are to show how defined works
        cos.push({x: i, y: 0.5 * Math.cos(i/10)});
      }

      return [
        {
          area: true,
          values: sin,
          key: "Sine Wave",
          color: "#ff7f0e"
        },
        {
          values: cos,
          key: "Cosine Wave",
          color: "#2ca02c"
        }
      ];
    }

  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
