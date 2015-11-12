 // Author: Christina Aiello, 11/9/2015

  // Function called when application is first loaded
  function begin(){
    // Generate random ID for the person
    var uuid = guid();

    // Store this UUID for this session
    sessionStorage.setItem('uuid', uuid);

    // Store the trial number as well:
    sessionStorage.setItem('trialNumber', 1);

    // Create a randomly-chosen order of 60 graphs.
    // There are 20 graphs of each type.
    constructLatinSquareDesign();

    // Open the first page
    window.open("visualization.html","_self");
  }





 /*
  * This function will generate ten random numbers between
  * 1 and maxNumber. It returns them as an array. Numbers CAN be
  * duplicates here.
  */
  function generateAnyRandomNumbers(maxNumber, numberOfNumbersWanted){
    arrayOfNumbers = [];
    // Generate numberOfNumbersWanted random numbers between 1 and maxNumber
    for(counter = 0; counter < numberOfNumbersWanted; counter++){
      // Add this random number to the array
      arrayOfNumbers[counter] = Math.floor((Math.random() * maxNumber) + 1);
    }
    return arrayOfNumbers;
  }





  /*
  * This function will generate ten random numbers between
  * 1 and maxNumber. It returns them as an array. Numbers CANNOT
  * be duplicates here.
  */
  function generateDifferentRandomNumbers(maxNumber, numberOfNumbersWanted){
    arrayOfNumbers = [];
    counter = 0;
    // Generate numberOfNumbersWanted random numbers between 1 and maxNumber
    while(counter < numberOfNumbersWanted){
      // Choose a random number:
      randomNumber =  Math.floor((Math.random() * maxNumber) + 1);
      // See if we've ever used this number before:
      var foundBoolean = false;
      for(innerCounter = 0; innerCounter < arrayOfNumbers.length; innerCounter++){
        // If we don't find any matches in our current array:
        if(arrayOfNumbers[innerCounter] == randomNumber){
          foundBoolean = true;
        }
      }
      // If we haven't used this number before, we can use it now:
      if(!foundBoolean){
        arrayOfNumbers[counter] = randomNumber;
        counter++;
      }
    }
    return arrayOfNumbers;
  }





  // Short function to mark two data points in the set
  function markTwoDataPoints(){
    var chartType = document.getElementById("chartType").innerHTML;

    // First we need to randomly choose two data points to select:
    arrayOfChosenDataPoints = generateDifferentRandomNumbers(10, 2);

    // Marking the bar chart visualizations:
    if(chartType == "Bar Chart"){
      firstMarkedNode = d3.select(".chart")[0][0].children[(arrayOfChosenDataPoints[0]-1)];
      firstMarkedNode.innerHTML = "<font style=\"color: black; font-size: 20px;\"><strong>*</strong></font>";
      secondMarkedNode = d3.select(".chart")[0][0].children[(arrayOfChosenDataPoints[1]-1)];
      secondMarkedNode.innerHTML = "<font style=\"color: black; font-size: 20px;\"><strong>*</strong></font>";
      // Keeping track of the correct answers:
      var firstCorrectNumber = document.getElementById("firstCorrectNumber");
      firstCorrectNumber.innerHTML = (firstMarkedNode.offsetWidth-10) / 5;
      var secondCorrectNumber = document.getElementById("secondCorrectNumber");
      secondCorrectNumber.innerHTML = (secondMarkedNode.offsetWidth-10) / 5;

    } else if ((chartType == "Circle Chart") || (chartType == "Scattered Circle Chart")){
      var firstMarkedNode;
      var secondMarkedNode;
      // Marking the dot visualizations:
      d3.selectAll("circle")
       .attr("fill", function(d, i){
        if(i == (arrayOfChosenDataPoints[0]-1)){
          firstMarkedNode = d; // Grab the value
          return "gray";
        } else if (i == (arrayOfChosenDataPoints[1]-1)){
          secondMarkedNode = d; // Grab the value
          return "gray";
        } else { 
          return "white"
        }});
     
      // Keeping track of the correct answers:
      var firstCorrectNumber = document.getElementById("firstCorrectNumber");
      firstCorrectNumber.innerHTML = firstMarkedNode;
      var secondCorrectNumber = document.getElementById("secondCorrectNumber");
      secondCorrectNumber.innerHTML = secondMarkedNode;

    }
  } 






  // This function will continue the user to the next page
  function continueToNextVisualization(visualizationType){
    // Looking at the user's answer:
    var usersRatio = document.getElementById("percentage").value;
    // Looking at the actual answer:
    var firstCorrectNumber = document.getElementById("firstCorrectNumber").innerHTML;
    var secondCorrectNumber = document.getElementById("secondCorrectNumber").innerHTML;
    // Depending on which is larger, set that as the numerator:
    if(firstCorrectNumber < secondCorrectNumber){
      var actualRatio = Math.ceil((firstCorrectNumber/secondCorrectNumber) * 50 + 250);
    } else {
      var actualRatio = Math.ceil((secondCorrectNumber/firstCorrectNumber) * 50 + 250);
    }
    
    // Calculating log base 2 error
    var ratio = usersRatio - actualRatio;
    var absoluteValueOfRatio = Math.abs(ratio);
    var addOneEighth = absoluteValueOfRatio+(1/8);
    var logOfAnswer = Math.log(addOneEighth);
    var logOfTwo = Math.log(2);
    var logBase2Error = (logOfAnswer/logOfTwo);
    
    // Getting current trial number:
    trialNumber = sessionStorage.getItem('trialNumber');
    console.log("Trial Number was: " + trialNumber);
    
    //Saving this information in a multidimensonal array:
    var resultsArray = [];

    // Array holds: UUID, trialNumber, visualizationType, truePercent, reportedPercent, error
    resultsArray = [sessionStorage.getItem('uuid'), sessionStorage.getItem('trialNumber'), visualizationType, actualRatio, usersRatio, logBase2Error]

    // Saving this results array in the session:
    sessionStorage.setItem('results-' + trialNumber, resultsArray);

    // Let's see what we have so far:
    console.log("Entirety of results array is:");
    for(counter = 1; counter <= trialNumber; counter++){
      var trialToGet = 'results-' + counter;
      console.log(trialToGet);
      var pastValue = sessionStorage.getItem(trialToGet);
      console.log(pastValue);
    }

    // Increasing the trial number in the session:
    trialNumber = parseInt(trialNumber) + 1;
    sessionStorage.setItem('trialNumber', trialNumber);
    console.log("Trial number is now: " + trialNumber);

    // If we've done 60 trials, then we're done.
    // Open the final page:
    if(trialNumber > 60){
      // Open the ending page:
      window.open("end.html","_self");
    } else {
        location.reload();
    }
  }






  // Generating four values for GUID.
  // Reference: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function generateGuidValues() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }





  // This prevents the user from leaving the box blank
  // and prevents them from giving something that's not a number
  function validateForm() {
    var usersRatio = document.getElementById("percentage").value;
    if (usersRatio==null || usersRatio== "" || isNaN(usersRatio)) {
      alert("Please give a number as your answer.");
      return false;
    } else return true;
  }





  // This function will display the results of all of our trials:
  // Reference: http://stackoverflow.com/questions/11958641/print-out-javascript-array-in-table
  function displayResults(){
    var arrayOfTrialData = [];
    arrayOfTrialData[0] = ["uuid", "trialNumber", "chartType", "actual", "reported", "errorValue"]

    // Get all of the results
    var stringsOfData = combineAllResults();

    var $table = $( "<table></table>" );

    var $line = $( "<tr><td align=\"center\" colspan=\"6\" class='tableCellLabel'>Here are your results! <br>To read more about how the error was calculated, see page 13 of the PDF (page 542 is written on the page, but it's page 13 in the PDF) of <strong><a href='http://www.cs.ubc.ca/~tmm/courses/cpsc533c-04-spr/readings/cleveland.pdf' target='_none'>this paper</a></strong>.</td></tr><tr><td class='tableCellLabel'>Participant's UUID</td><td class='tableCellLabel'>Trial Number</td><td class='tableCellLabel'>Type of Graph</td><td class='tableCellLabel'>Actual Percent</td><td class='tableCellLabel'>Reported Percent</td><td class='tableCellLabel'>Log-base-2 Error, a.k.a 'cm-error'</td></tr>" );
    $table.append( $line );
    
    // Loop through the array of strings of data, split it at each comma,
    // and put it into a table.
    for (counter = 0; counter < stringsOfData.length; counter++ ) {
      var currentLine = stringsOfData[counter];
      var $line = $( "<tr></tr>" );
      if(currentLine != null){
        // Splitting this line up into an array of values
        var arrayOfValues = currentLine.split(',');
        // Creating a multidimensional array with these values,
        // but adding 1 because [0] has the labels for each column
        arrayOfTrialData[counter+1] = arrayOfValues;
        if(arrayOfValues != null){
          $line.append( $( "<td class='tableCell'></td>" ).html( arrayOfValues[0] ) );
          $line.append( $( "<td class='tableCell'></td>" ).html( arrayOfValues[1] ) );
          $line.append( $( "<td class='tableCell'></td>" ).html( arrayOfValues[2] ) );
          $line.append( $( "<td class='tableCell'></td>" ).html( arrayOfValues[3] ) );
          $line.append( $( "<td class='tableCell'></td>" ).html( arrayOfValues[4] ) );
          $line.append( $( "<td class='tableCell'></td>" ).html( arrayOfValues[5] ) );
        }
      }
      $table.append( $line );
    }

    // Append to the table on the screen
    $table.appendTo($("#resultsDiv"));

    // This will email me the data from the last page
    // Reference: https://medium.com/@mariusc23/send-an-email-using-only-javascript-b53319616782
    /*$.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        'key': 'LJg9w_7e5HyL8045L-BjQA',
        'message': {
          'from_email': 'cjaiello@wpi.edu',
          'to': [
              {
                'email': 'cjaiello@wpi.edu',
                'type': 'to'
              },
            ],
          'autotext': 'true',
          'subject': 'Data Visualization Project 5 Data',
          'html': JSON.stringify(arrayOfTrialData)
        }
      }
     }).done(function(response) {
       console.log(JSON.stringify(arrayOfTrialData));
     });*/
      console.log("UNCOMMENT THE AJAX");

     // Lastly, let's display the final results:
     buildFinalResultsViz(arrayOfTrialData);
  }






  // This function will combine the results from all trials into one array
  function combineAllResults() {
    var arrayOfStringsOfData = [];
    for(counter = 1; counter <= 60; counter++){
      var trialToGet = 'results-' + counter;
      var trialValues = sessionStorage.getItem(trialToGet);
      // Store these trial values in this final array:
      arrayOfStringsOfData[counter-1] = trialValues;
    }
    return arrayOfStringsOfData;
  }






  // Constructing GUID.
  // Reference: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function guid() {
    return generateGuidValues() + generateGuidValues() + '-' + generateGuidValues() + '-' + generateGuidValues() + '-' +
      generateGuidValues() + '-' + generateGuidValues() + generateGuidValues() + generateGuidValues();
  }






  // This function will specifically build a bar chart visualization
  function buildBarVis(data) {

  var chartType = document.getElementById("chartType");
  chartType.innerHTML = "Bar Chart";

  // Changing the text of the directions based on the visualization
  var questionText = document.getElementById("question");
  questionText.innerHTML = "Make note of the two data points marked with asterisks (*). What percentage is the smaller data point of the larger data point? (Ex: If you think the smaller one is half the size of the larger one, write 50. If you think the smaller one is a quarter of the larger one, write 25.)";

    var w = 900;
    var h = 400;

    var x = d3.scale.linear().range([0, w-50]),
        y = d3.scale.ordinal().rangeRoundBands([0, h-50], .1);

    d3.select(".chart")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", function(d) { return d * 8 + "px"; })
      .style("height", "20px");
}






// This function will build the dot visualization
function buildCircleVis(data){
  // Now let's turn them into circles, because
  // for some reason Christina weirdly likes circles
  // although this will probably prove they're bad practice to use...
  // Aww.

  var chartType = document.getElementById("chartType");
  chartType.innerHTML = "Circle Chart";

  // Changing the text of the directions based on the visualization
  var questionText = document.getElementById("question");
  questionText.innerHTML = "Make note of the two data points that are gray. What percentage is the smaller data point of the larger data point?  (Ex: If you think the smaller one is half the size of the larger one, write 50. If you think the smaller one is a quarter of the larger one, write 25.)";

  console.log(data);

  var svg = d3.select(".chart")
            .append("svg")
            .attr("class", "circleChart")
            .attr("width",  900)
            .attr("height", 350);

  // generate circles 
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d, i) {
            console.log(i);
            return (((i+1) * 80)); })
     .attr("cy", 175)
     .attr("r", function(d) {
            return Math.ceil(d / 3); })
     .attr("fill", "white");

    console.log("Done");

  }




  // Making sure that we have 20 of each chart
  // type, and that each is chosen at random.
  function constructLatinSquareDesign(){
    // This will hold the numbers 1-60, chosen at random:
    var randomNumbers = generateDifferentRandomNumbers(60, 60);

    // Store these numbers in the session storage:
    sessionStorage.setItem("numbers", JSON.stringify(randomNumbers));
  }





  // This will get the current viz type and pass it into
  // a function that will load our next visualization:
  function loadNextVis(){
    if(validateForm()){
      var previousChartType = document.getElementById("chartType").innerHTML;
      continueToNextVisualization(previousChartType);
    }
  }





  // This function chooses what our next viz to build is:
  function pickVizToBuild(trialNumber){
    // Trial numbers are 1-60, but the array is
    // zero-indexed, so we need to subtract one.
    trialNumber = trialNumber - 1;

    // Get our list of random numbers:
    var stringOfNumbers = sessionStorage.getItem("numbers");
    var storedNumbers = JSON.parse(stringOfNumbers);

    // Based on the random number, pick a chart type:
    if(storedNumbers[trialNumber] < 0){
      buildBarVis(generateAnyRandomNumbers(100, 10));
    } else if (storedNumbers[trialNumber] < 0){
      buildCircleVis(generateAnyRandomNumbers(100, 10));
    } else {
      buildScatteredCircleVis(generateAnyRandomNumbers(100, 10));
    }
    markTwoDataPoints();
  }





// This function will build the dot visualization
function buildScatteredCircleVis(data){
  // Now let's turn them into circles, because
  // for some reason Christina weirdly likes circles
  // although this will probably prove they're bad practice to use...
  // Aww.

  var chartType = document.getElementById("chartType");
  chartType.innerHTML = "Scattered Circle Chart";

  // Changing the text of the directions based on the visualization
  var questionText = document.getElementById("question");
  questionText.innerHTML = "Make note of the two data points that are gray. What percentage is the smaller data point of the larger data point? (Ex: If you think the smaller one is half the size of the larger one, write 50. If you think the smaller one is a quarter of the larger one, write 25.)";

  var svg = d3.select(".chart")
            .append("svg")
            .attr("class", "circleChart")
            .attr("width",  900)
            .attr("height", 350);

  // generate circles 
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d, i) {
            return (((i+1) * 80)); })
     .attr("cy", function(d){
      return d * 2;
    })
     .attr("r", function(d) {
            return Math.ceil(d / 3); })
     .attr("fill", "white");
  }



  // This function will build the final visualzation
  // to depict how the user did
  function buildFinalResultsViz(data){
    var width = 1140;
    var height = 400;

    var barChartResults = new Array();
    var circleChartResults = new Array();
    var scatteredCircleChartResults = new Array();

    // Aggregating our data, grouped by chart type
    for(counter = 0; counter < data.length; counter++){
      if(data[counter][2] == "Bar Chart"){
        barChartResults.push(data[counter]);
      } else if (data[counter][2] == "Circle Chart"){
        circleChartResults.push(data[counter]);
      } else if (data[counter][2] == "Scattered Circle Chart"){
        scatteredCircleChartResults.push(data[counter]);
      } else {};
    }

    // Array of 3 arrays
    var arrayOfAllValues = new Array();
    arrayOfAllValues.push(barChartResults);
    arrayOfAllValues.push(circleChartResults);
    arrayOfAllValues.push(scatteredCircleChartResults);

    console.log("Bar chart results:");
    console.log(barChartResults);
    console.log(circleChartResults);
    console.log(scatteredCircleChartResults);
    console.log("All results combined:");
    console.log(arrayOfAllValues);

    // Creating the base for our chart
    var chart = d3.select("#endingChart")
    .append("svg")
    .attr("class", "svgBox")
    .attr("width", width)
    .attr("height", height);

    // Adding a place to put our lines into
    var line = chart.append("g");

    // Sorting our arrays by error (smallest to largest)
    arrayOfAllValues[0].sort(function(a,b) {
      return parseFloat(a[5],10) - parseFloat(b[5],10);
    });
    arrayOfAllValues[1].sort(function(a,b) {
      return parseFloat(a[5],10) - parseFloat(b[5],10);
    });
    arrayOfAllValues[2].sort(function(a,b) {
      return parseFloat(a[5],10) - parseFloat(b[5],10);
    });

    line.append("text")
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("dx", 470)
        .attr("dy", 20)
        .text("Log-Base-2 Error Plotting");

    // Appending lines to the visualization:
    // Results for bar chart:
    line.append("line")
        .attr("stroke", "#76ddf2")
        .attr("class", "lineForBarChart")
        // Smallest error:
        .attr("x1", arrayOfAllValues[0][0][5] * 50 + 250)
        // Largest error:
        .attr("x2", arrayOfAllValues[0][(arrayOfAllValues[0].length-1)][5] * 50 + 250)
        .attr("y1", (height * (1/4)))
        .attr("y2", (height * (1/4)))
        .attr("stroke-width", "4");

    // Left-side number label for the bar chart line
    line.append("text")
        .attr("stroke", "white")
        .attr("class", "labelForEndChart")
        .attr("dx", (arrayOfAllValues[0][0][5] * 50 + 250) - 25)
        .attr("dy", ((height * (1/4)) + 20))
        .text(parseFloat(arrayOfAllValues[0][0][5]).toFixed(2));

    // Right-side number label for the bar chart line
    line.append("text")
        .attr("stroke", "white")
        .attr("class", "labelForEndChart")
        .attr("dx", (arrayOfAllValues[0][(arrayOfAllValues[0].length-1)][5] * 50 + 250))
        .attr("dy", ((height * (1/4)) + 20))
        .text(parseFloat(arrayOfAllValues[0][(arrayOfAllValues[0].length-1)][5]).toFixed(2));

    // Results for circle chart:
    line.append("line")
        .attr("stroke", "#bd5fef")
        // Smallest error:
        .attr("x1", arrayOfAllValues[1][0][5] * 50 + 250)
        // Largest error:
        .attr("x2", arrayOfAllValues[1][(arrayOfAllValues[1].length-1)][5] * 50 + 250)
        .attr("y1", (height * (2/4)))
        .attr("y2", (height * (2/4)))
        .attr("stroke-width", "4");

    // Left-side number label for the bar chart line
    line.append("text")
        .attr("stroke", "white")
        .attr("class", "labelForEndChart")
        .attr("dx", (arrayOfAllValues[1][0][5] * 50 + 250) - 25)
        .attr("dy", ((height * (2/4)) + 20))
        .text(parseFloat(arrayOfAllValues[1][0][5]).toFixed(2));

    // Right-side number label for the circle chart line
    line.append("text")
        .attr("stroke", "white")
        .attr("class", "labelForEndChart")
        .attr("dx", (arrayOfAllValues[1][(arrayOfAllValues[1].length-1)][5] * 50 + 250))
        .attr("dy", ((height * (2/4)+20)))
        .text(parseFloat(arrayOfAllValues[1][(arrayOfAllValues[1].length-1)][5]).toFixed(2));

    // Results for scattered circle chart:
    line.append("line")
        .attr("stroke", "#2080f7")
        // Smallest error:
        .attr("x1", arrayOfAllValues[2][0][5] * 50 + 250)
        // Largest error:
        .attr("x2", arrayOfAllValues[2][(arrayOfAllValues[2].length-1)][5] * 50 + 250)
        .attr("y1", (height * (3/4)))
        .attr("y2", (height * (3/4)))
        .attr("stroke-width", "4");

    // Left-side number label for the bar chart line
    line.append("text")
        .attr("stroke", "white")
        .attr("class", "labelForEndChart")
        .attr("dx", (arrayOfAllValues[2][0][5] * 50 + 250) - 25)
        .attr("dy", ((height * (3/4)) + 20))
        .text(parseFloat(arrayOfAllValues[2][0][5]).toFixed(2));

    // Right-side number label for the circle chart line
    line.append("text")
        .attr("stroke", "white")
        .attr("class", "labelForEndChart")
        .attr("dx", (arrayOfAllValues[2][(arrayOfAllValues[2].length-1)][5] * 50 + 250))
        .attr("dy", ((height * (3/4) + 20)))
        .text(parseFloat(arrayOfAllValues[2][(arrayOfAllValues[2].length-1)][5]).toFixed(2));

    // Graph color labels
    line.append("text")
        .attr("fill", "#76ddf2")
        .attr("dx", 0)
        .attr("dy", ((height * (1/4) - 20)))
        .text("Bar Chart:");
    line.append("text")
        .attr("fill", "#bd5fef")
        .attr("dx", 0)
        .attr("dy", ((height * (2/4) - 20)))
        .text("Circle Chart:");
    line.append("text")
        .attr("fill", "#2080f7")
        .attr("dx", 0)
        .attr("dy", ((height * (3/4) - 20)))
        .text("Scattered Circle Chart:");
  } 





  