function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
   
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
 
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
   
    // 3. Create a variable that holds the samples array. 
    var samplesData = data.samples;
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultSampleArray = samplesData.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var sampleResult = resultSampleArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var resultOtUIDs = sampleResult.otu_ids;
    var resultOtULabels = sampleResult.otu_labels;
    var resultSampleValues = sampleResult.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = resultSampleValues.slice(0, 10).reverse();
    var ylabels = resultOtUIDs.slice(0,10).reverse().map(entry => `OTU ${entry.toString()}`);
    var hoverText = resultOtULabels.slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: yticks,
      y: ylabels,
      text: hoverText,
      type: "bar",
      orientation: "h",
    }

    var barData = [trace];


    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacterial Cultures Found'
     
    }
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  
  // Using d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    
    // Filter the data for the object with desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
 
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
 
    // 3. Create a variable that holds the samples array. 
    var samplesData = data.samples;
 
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesData.filter(sampleObj => sampleObj.id == sample); 
 
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var resultOtuIDs = result.otu_ids;
    var resultOtuLabels = result.otu_labels;
    var resultSampleValues = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = resultSampleValues.slice(0, 10).reverse();
    var ylabels = resultOtuIDs.slice(0,10).reverse().map(entry => `OTU ${entry.toString()}`);
    var hoverText = resultOtuLabels.slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: yticks,
      y: ylabels,
      text: hoverText,
      type: "bar",
      orientation: "h",
    }

    var barData = [trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacterial Cultures Found'
    }


    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout); 

    // 1. Create the trace for the bubble chart.
    var bubbleTrace = {

      x: resultOtuIDs,
      y: resultSampleValues,
      text: resultOtuLabels,
      mode: "markers",
      marker: {
        size: resultSampleValues,
        sizeref: 1.4,
        color: resultOtuIDs,
        colorscale: "Earth"
      },
      sizemode: "area"
    }

    var bubbleData = [bubbleTrace];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: "OTU ID"},
      hovermode: "closets",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    }

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}

function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samplesData = data.samples;
   
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesData.filter(sampleObj => sampleObj.id == sample); 
    
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];
   
    // 2. Create a variable that holds the first sample in the metadata array.
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var resultOtuIDs = result.otu_ids;
    var resultOtuLabels = result.otu_labels;
    var resultSampleValues = result.sample_values;
   
    // 3. Create a variable that holds the washing frequency.
    var sampleMetadata = data.metadata;
    var metadataArray = sampleMetadata.filter(sampleObj => sampleObj.id == sample);
    var metadataResult = metadataArray[0];
    var washFreq = parseFloat(metadataResult["wfreq"]);
    
    // Create the yticks for the bar chart.
    var yticks = resultSampleValues.slice(0, 10).reverse();
    var ylabels = resultOtuIDs.slice(0,10).reverse().map(entry => `OTU ${entry.toString()}`);
    var hoverText = resultOtuLabels.slice(0,10).reverse();

    var trace = {
      x: yticks,
      y: ylabels,
      text: hoverText,
      type: "bar",
      orientation: "h",
    }

    var barData = [trace];
    
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacterial Cultures Found'
    }

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    var bubbleTrace = {

      x: resultOtuIDs,
      y: resultSampleValues,
      text: resultOtuLabels,
      mode: "markers",
      marker: {
        size: resultSampleValues,
        sizeref: 1.4,
        color: resultOtuIDs,
        colorscale: "Earth"
      },
      sizemode: "area"
    }

    var bubbleData = [bubbleTrace];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: "OTU ID"},
      hovermode: "closets",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    }
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeTrace = {
      domain: {x: [0,1], y:[0,1]},
      value: washFreq,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "<b>Belly Button Washing Frequency</b><br></br> Scrubs Per Week"},
      gauge: {
        axis: {range: [null,10], dtick: "2"},
        bar: {color: "black"},
        steps: [
          {range:[0,2], color: "red"},
          {range:[2,4], color: "orange"},
          {range:[4,6], color: "yellow"},
          {range:[6,8], color: "lightgreen"},
          {range:[8,10], color: "green"}
        ],
        dtick: 2
      }
    };
    var gaugeData = [gaugeTrace];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      automargin: true,
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}

