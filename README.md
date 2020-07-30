# [Taskflow](https://taskflow.herokuapp.com)

Drag the word "Demo" to the middle and click submit to sign in as a demo user

## What is Taskflow?

Taskflow is a project management application with columns and tasks within shareable projects

## Features

### Click on a task to move it to the top of its column and scroll the page up automatically

![move-task-to-top](https://media.giphy.com/media/UqTCnramz1VKXryqDP/giphy.gif)

### Drag and drop script to show the tasks sorting in alphabetical order, regardless of scroll position

![alphabetize](https://media.giphy.com/media/RlTyMUfN8nz1SQjIXn/giphy.gif)

### Drag and drop project navigation tabs between two lists, one displayed and one hidden

![moving-project](https://media.giphy.com/media/XejWce8zMcOEu8VYKO/giphy.gif)

### Create a new project and invite other users to projects

![new-project-and-invite](https://media.giphy.com/media/SwD1o3zFBtcZ0HJ1JJ/giphy.gif)

### Conditionally display invite notifications and accept invites to projects

![accept-invite](https://media.giphy.com/media/mFTOKfZYMFIanKW6ic/giphy.gif)

### Drag and drop tasks and columns

![drag-and-drop](https://media.giphy.com/media/XZaBCOeEPbrtfgaIPX/giphy.gif)

### Add columns and tasks

![add](https://media.giphy.com/media/UsGVXuRyf6ytv54CM6/giphy.gif)

### Delete tasks by clearing the "Completed" column, and delete columns

![delete](https://media.giphy.com/media/H2sTP0lPnkhze8YGry/giphy.gif)

### Code Highlight
#### Start and end scroll positions for each drag and drop event of the alphabetize script when container is overflowed
```javascript
// Find the location on the screen of the middle of the spot to move the task to
const spotMiddle = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().top + document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().height / 2
// Find the location on the screen of the middle of the task that is going to be moved
const taskMiddle = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().top + document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().height / 2

// By default, make both the start scroll position and the end scroll position equal to the current scrollTop of the container
let startScrollTop = workingArea.scrollTop
let nextScrollTop = workingArea.scrollTop

// If the bottom of the task to move is not currently displayed, taking into account the current scroll position
if (bottomOfTaskToMove + workingArea.scrollTop > workingArea.getBoundingClientRect().height) {
    // Make the start scroll position one third of the container size above the location of the bottom of the task to move, adjusting for current scroll position
    startScrollTop = taskMiddle - third + workingArea.scrollTop
    // Make the end scroll position one third of the container size above the location of the middle of the spot to move to, adjusting for current scroll position
    nextScrollTop = spotMiddle - third + workingArea.scrollTop
}

// Set the current scroll position equal to the start scroll position before the task begins dragging.
workingArea.scrollTop = startScrollTop // It is important to note that if startScrollTop is greater than the maximum value of workingArea.scrollTop, workingArea.scrollTop will get set to its maximum value, and startScrollTop will end up being greater than workingArea.scrollTop after this point instead of equal to as you might expect. 

// Find the horizontal end position (same as the horizontal start position since the task is only moving upwards)
const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)


// The following is a series of conditionals that check for specific combinations of start and end positions so the appropriate distances to move and scroll positions can be calculated.
let endY;

// This evaluates to true if workingArea.scrollTop's maximum value is less than startScrollTop, as mentioned on line 64. This indicates that workingArea.scrollTop is maxed out. In other words, the start scroll position is all the way at the bottom of the container
if (startScrollTop > workingArea.scrollTop) {
   
    // Indicates that the container will remain scrolled all the way down. 
    if (nextScrollTop > workingArea.scrollTop) {
        // Since the container does not scroll during the animation, there does not need to be any adjustment made to the distance to move the task
        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
        
    // Indicates that the container will start all the way scrolled down, then move all the way up to the top
    } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {
        // The distance to move the task needs to be decreased by the starting scrollTop because scrolling moves the task. Otherwise the task would move too far and miss its end spot (adding reduces the distance moved)
        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y) + workingArea.scrollTop
    
    // This means that the container starts scrolled all the way down, but ends up scrolled somewhere in between the top and bottom
    } else {
    // This is the same concept as decreasing the amount scrolled by the starting scrollTop, except it also has to increase (subtracting increases the distance) the distance travelled by the end scroll position 
    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-   id-${tasksArray[i].id}`).getBoundingClientRect().y) + workingArea.scrollTop - nextScrollTop
    }

// Indicates that the end position to scroll will be all the way to the top of the container
} else if (nextScrollTop < workingArea.getBoundingClientRect().top) {
// Decrease distance travelled by the scrollTop
endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y) + workingArea.scrollTop
} else {
endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
}

// The animation frames are found using the process covered in [this article](https://dev.to/raathigesh/scripted-natural-motion-with-react-beautiful-dnd-4ifj). I added the scroll positions based on start and end scroll positions to the same function to have the scroll bar follow the exact same path as the task that's moving.
```

## Developed By

[Mark Mansolino](https://markjm610.github.io/) ([GitHub](https://github.com/markjm610) | [LinkedIn](https://www.linkedin.com/in/markmansolino/) | [AngelList](https://angel.co/u/mark-mansolino))

## Technologies

- React
- JavaScript
- Express
- Node
- PostgreSQL
- Sequelize
- react-beautiful-dnd
- CSS3
- HTML5
