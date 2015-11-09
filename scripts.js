 // Author: Christina Aiello, 11/9/2015

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
      console.log("Random number chosen: " + randomNumber);
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
        console.log("We can use this! Using: " + randomNumber);
        arrayOfNumbers[counter] = randomNumber;
        counter++;
      }
    }
    return arrayOfNumbers;
  }

  // Short function to mark two data points in the set
  function markTwoDataPoints(){
    // First we need to randomly choose two data points to select:
    console.log("Choosing random points to mark:");
    arrayOfChosenDataPoints = generateDifferentRandomNumbers(10, 2);
    console.log("Chosen data points are: " + (arrayOfChosenDataPoints[0]-1) + " and " + (arrayOfChosenDataPoints[1]-1));

    // Then we need to select them and add marks to them:
    firstMarkedNode = d3.select(".chart")[0][0].children[(arrayOfChosenDataPoints[0]-1)];
    firstMarkedNode.innerHTML = "<font style=\"color: black; font-size: 20px;\"><strong>*</strong></font>";
    secondMarkedNode = d3.select(".chart")[0][0].children[(arrayOfChosenDataPoints[1]-1)];
    secondMarkedNode.innerHTML = "<font style=\"color: black; font-size: 20px;\"><strong>*</strong></font>";
    // Keeping track of the correct answers:
    var firstCorrectNumber = document.getElementById("firstCorrectNumber");
    firstCorrectNumber.innerHTML = (firstMarkedNode.offsetWidth-10) / 5;
    var secondCorrectNumber = document.getElementById("secondCorrectNumber");
    secondCorrectNumber.innerHTML = (secondMarkedNode.offsetWidth-10) / 5;
  }

  // This function will continue the user to the next page
  function continue(visualizationType){
    // Looking at the user's answer:
    var firstNumberInRatio = document.getElementById("firstNumberInRatio");
    var secondNumberInRatio = document.getElementById("secondNumberInRatio");
    var usersRatio = firstNumberInRatio/secondNumberInRatio;
    // Looking at the actual answer:
    var firstCorrectNumber = document.getElementById("firstCorrectNumber").innerHTML;
    var secondCorrectNumber = document.getElementById("secondCorrectNumber").innerHTML;
    var actualRatio = firstCorrectNumber/secondCorrectNumber;

    // Calculating log base 2 error
    var logBase2Error = (log(abs(usersRatio - actualRatio)+(1/8)))/(log(2));
    return logBase2Error;

    // Getting current trial number
    trialNumber = sessionStorage.getItem('trialNumber');
    
    //Saving this information in a multidimensonal array:
    var resultsArray = [sessionStorage.getItem('uuid'), sessionStorage.getItem('trialNumber'), visualizationType, actualRatio, usersRatio]

    // Increasing the trial number
    sessionStorage.setItem('trialNumber', trialNumber + 1)
  }

  // This function will specifically build a bar chart visualization
  function buildBarVis(data) {

    var w = 400;
    var h = 500;

    var format = d3.format(",.0f");

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