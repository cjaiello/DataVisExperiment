Assignment 5 - Replicating a Classic Experiment
Christina Aiello, cjaiello  
--------------------------------------------------------------------------------

------------------------------ Working Link to Visualization ------------------------------




------------------------------ Concise Description and Screenshot ------------------------------




------------------------------ Technical Achievements ------------------------------

I used a combination of HTML, CSS, Javascript, and jQuery for this project.

To move trial information (the user's values, the error value, the trial number, etc) from one page to another, I have chosen to store it in the session info (using sessionStorage.setItem() and sessionStorage.getItem()).

To generate random numbers for the bar values, I wrote the function generateAnyRandomNumbers. This function allows duplicate random numbers.

The user also cannot refresh the page to skip trials. Refreshing doesn't change the trial number.

To generate random numbers to select two data points from the visualizations, I wrote the function generateDifferentRandomNumbers. This function does not let two of the same number be chosen (because you can't pick the same bar twice, for example. That's just silly).

The continueToNextVisualization function takes in the visualization type, and it scrapes the screen and gets info from the session for additional information (user's entered value, the values of the two data points in the chart), which is put into an array and stored in the session information.

The session information holds an array for every trial (and its key is "results + TRIALNUMBER").

Lastly, I made an external stylesheet and an external JavaScript sheet, making my actual HTML pages less clunky.

------------------------------ Design Achievements ------------------------------

For ease of use, the user can either hit the "submit" button or just press "enter" after typing in a number to submit.

I also wanted to be sure to display the number of trials that have passed (let's be honest, if they're doing 60 trials, they'll be dying to know how far along they are), so I am updating the header at the top of the page based on the trial number.

------------------------------ References ------------------------------

I referenced old assignments when doing this, but I also want to credit the individuals whose work I referenced when I originally did those assignments:
Bar Chart Reference: 
http://bost.ocks.org/mike/bar/

Placing a dot on a specific piece of data in a chart: 
http://stackoverflow.com/questions/25405359/how-can-i-select-last-child-in-d3-js

Creating a GUID:
http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript