 // Author: Christina Aiello, 11/9/2015

  // Function called when application is first loaded
  function begin(){
    // Generate random ID for the person
    var uuid = guid();

    // Store this UUID for this session
    sessionStorage.setItem('uuid', uuid);

    // Store the trial number as well:
    sessionStorage.setItem('trialNumber', 1);

    // Open the first page
    window.open("1.html","_self");
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
    console.log(chartType);

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

    } else if (chartType == "Circle Chart"){
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
    console.log("User's ratio is: " + usersRatio);
    // Looking at the actual answer:
    var firstCorrectNumber = document.getElementById("firstCorrectNumber").innerHTML;
    var secondCorrectNumber = document.getElementById("secondCorrectNumber").innerHTML;
    // Depending on which is larger, set that as the numerator:
    if(firstCorrectNumber < secondCorrectNumber){
      var actualRatio = Math.ceil((firstCorrectNumber/secondCorrectNumber) * 100);
    } else {
      var actualRatio = Math.ceil((secondCorrectNumber/firstCorrectNumber) * 100);
    }
    console.log("Actual ratio is: " + actualRatio);
    
    // Calculating log base 2 error
    var ratio = usersRatio - actualRatio;
    var absoluteValueOfRatio = Math.abs(ratio);
    var addOneEighth = absoluteValueOfRatio+(1/8);
    var logOfAnswer = Math.log(addOneEighth);
    var logOfTwo = Math.log(2);
    var logBase2Error = (logOfAnswer/logOfTwo);
    console.log("Log base 2 of error is: " + logBase2Error);
    
    // Getting current trial number:
    trialNumber = sessionStorage.getItem('trialNumber');
    console.log("Trial Number was: " + trialNumber);
    
    //Saving this information in a multidimensonal array:
    var resultsArray = [];

    // Array holds: UUID, trialNumber, visualizationType, truePercent, reportedPercent, error
    resultsArray = [sessionStorage.getItem('uuid'), sessionStorage.getItem('trialNumber'), visualizationType, actualRatio, usersRatio, logBase2Error]
    console.log("Results array addition: " + resultsArray);

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
    if(trialNumber > 2){
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





  // This function will display the results of all of our trials:
  // Reference: http://stackoverflow.com/questions/11958641/print-out-javascript-array-in-table
  function displayResults(){

    // Get all of the results
    var arrayOfStringsOfData = combineAllResults();

    var $table = $( "<table></table>" );

    var $line = $( "<tr><td align=\"center\" colspan=\"6\" class='tableCellLabel'>Here are your results! <br>To read more about how the error was calculated, see page 13 of the PDF (page 542 is written on the page, but it's page 13 in the PDF) of <strong><a href='http://www.cs.ubc.ca/~tmm/courses/cpsc533c-04-spr/readings/cleveland.pdf' target='_none'>this paper</a></strong>.</td></tr><tr><td class='tableCellLabel'>Participant's UUID</td><td class='tableCellLabel'>Trial Number</td><td class='tableCellLabel'>Type of Graph</td><td class='tableCellLabel'>Actual Percent</td><td class='tableCellLabel'>Reported Percent</td><td class='tableCellLabel'>Log-base-2 Error, a.k.a 'cm-error'</td></tr>" );
    $table.append( $line );
    
    // Loop through the array of strings of data, split it at each comma,
    // and put it into a table.
    for (counter = 0; counter < arrayOfStringsOfData.length; counter++ ) {
      var currentLine = arrayOfStringsOfData[counter];
      var $line = $( "<tr></tr>" );
      if(currentLine != null){
        var arrayOfValues = currentLine.split(',');
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
  questionText.innerHTML = "Make note of the two data points marked with asterisks (*). What percentage is the smaller data point of the larger data point?";

    var w = 400;
    var h = 500;

    var x = d3.scale.linear().range([0, w-50]),
        y = d3.scale.ordinal().rangeRoundBands([0, h-50], .1);

    var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
        yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

    var svg = d3.select("body").append("svg")
        .attr("class", "chart")
        .attr("width", w+40)
        .attr("height", h)
      .append("g")
        .attr("transform", "translate(" + 50 + "," + 30 + ")");

    d3.select(".chart")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", function(d) { return d * 5 + "px"; })
      .style("height", "20px");
}






/// This function will build the dot visualization
function buildDotVis(data){
  // Now let's turn them into circles, because
  // for some reason Christina weirdly likes circles
  // although this will probably prove they're bad practice to use...
  // Aww.

  var chartType = document.getElementById("chartType");
  chartType.innerHTML = "Circle Chart";

  // Changing the text of the directions based on the visualization
  var questionText = document.getElementById("question");
  questionText.innerHTML = "Make note of the two data points that are gray. What percentage is the smaller data point of the larger data point?";

  console.log(data);

  var svg = d3.select(".chart")
            .append("svg")
            .attr("class", "circleChart")
            .attr("width",  600)
            .attr("height", 200);

  // generate circles 
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d, i) {
            console.log(i);
            return (((i+1) * 50)); })
     .attr("cy", 100)
     .attr("r", function(d) {
            return Math.ceil(d / 4); })
     .attr("fill", "white");

    console.log("Done");

  }