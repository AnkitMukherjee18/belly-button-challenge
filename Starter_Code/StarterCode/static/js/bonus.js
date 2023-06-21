d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    // Create a Gauge Chart
let gaugeChartData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: selectedMetadata.wfreq || 0,
      title: { text: "Belly Button scrubs per week", font: { size: 24 } },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9] },
        bar: { color: "black" },
        steps: [
          { range: [0, 1], color: "white" },
          { range: [1, 2], color: "white" },
          { range: [2, 3], color: "lightyellow" },
          { range: [3, 4], color: "lightyellow" },
          { range: [4, 5], color: "yellow" },
          { range: [5, 6], color: "yellow" },
          { range: [6, 7], color: "lightgreen" },
          { range: [7, 8], color: "lightgreen" },
          { range: [8, 9], color: "green" },
        ],
      },
    },
  ];
  
  let gaugeLayout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" },
  };
  
  Plotly.newPlot("gauge", gaugeChartData, gaugeLayout);

// Call the initialize function
initializeDashboard();
 })