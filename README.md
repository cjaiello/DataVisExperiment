Assignment 5 - Replicating a Classic Experiment
Christina Aiello, cjaiello  
--------------------------------------------------------------------------------

------------------------------ Working Link to Visualization ------------------------------




------------------------------ Concise Description and Screenshot ------------------------------



------------------------------ Visualizations Tested and the Results (Best to Worst, Ranked by Average Error) ------------------------------


!!! Use Bootstrapped 95\% confidence intervals for your error upper and lower bounds. Include these in your figures.

!!! Include example images of each visualization as they appeared in your experiment (i.e. if you used a pie chart show the actual pie chart you used in the experiment along with the markings, not an example from Google Images).




------------------------------ Technical Achievements ------------------------------

1. My constructLatinSquareDesign() method randomly arranges the numbers 1-60 in an array. I then created a function that chooses a visualization type based on the number provided. If the number is between 0 and 19, I make a bar chart. If the number is between 20 and 39, I make the circles chart. If the number is between 40 and 59, I made the third visualization type. Finally, I iterate through this array of unique random numbers that range from 1 to 60 (For example: [12, 40, 52, 57, 25, 43, 9, 4, 56, 2, 16, 49, 50, 17, 44, 46, 31, 35, 51, 5, 1, 10, 37, 36, 60, 34, 19, 30, 33, 20, 24, 22, 11, 41, 55, 3, 54, 14, 7, 45, 21, 47, 28, 58, 32, 26, 48, 13, 18, 27, 38, 42, 59, 8, 6, 15, 53, 23, 29, 39]), and I choose the visualization type based on the randomly-chosen unique number in that place. See my constructLatinSquareDesign() function and my pickVizToBuild() function in scripts.js for more information. :) This guarantees that the user sees 20 of each visualization type, and it shows these visualizations in a random order.

2. To move trial information (the user's values, the error value, the trial number, etc) from one page to another, I have chosen to store it in the session info (using sessionStorage.setItem() and sessionStorage.getItem()).

3. To generate random numbers for the bar values, I wrote the function generateAnyRandomNumbers. This function allows duplicate random numbers.

4. The user also cannot refresh the page to skip trials. Refreshing doesn't change the trial number. The number of trials only resets when you go back to the main screen.

5. To generate random numbers to select two data points from the visualizations, I wrote the function generateDifferentRandomNumbers. This function does not let two of the same number be chosen (because you can't pick the same bar twice, for example. That's just silly).

6. The continueToNextVisualization function takes in the visualization type, and it scrapes the screen and gets info from the session for additional information (user's entered value, the values of the two data points in the chart), which is put into an array and stored in the session information.

7. The session information holds an array for every trial (and its key is "results + TRIALNUMBER").

8. Lastly, I made an external stylesheet and an external JavaScript sheet, making my actual HTML pages less clunky.

------------------------------ Design Achievements ------------------------------

1. For ease of use, the user can either hit the "submit" button or just press "enter" after typing in a number to submit.

2. I also wanted to be sure to display the number of trials that have passed (let's be honest, if they're doing 60 trials, they'll be dying to know how far along they are), so I am updating the header at the top of the page based on the trial number.

------------------------------ References ------------------------------

1. I referenced old assignments when doing this, but I also want to credit the individuals whose work I referenced when I originally did those assignments:
Bar Chart Reference: 
http://bost.ocks.org/mike/bar/

2. http://stackoverflow.com/questions/25405359/how-can-i-select-last-child-in-d3-js

3. Creating a GUID:
http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

4. Displaying final results in a table: 
http://stackoverflow.com/questions/11958641/print-out-javascript-array-in-table