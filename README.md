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

```javascript

const spotMiddle = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().top + document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().height / 2
const taskMiddle = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().top + document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().height / 2


let startScrollTop = workingArea.scrollTop
let nextScrollTop = workingArea.scrollTop


if (bottomOfTaskToMove + workingArea.scrollTop > workingArea.getBoundingClientRect().height) {
    startScrollTop = taskMiddle - third + workingArea.scrollTop
    nextScrollTop = spotMiddle - third + workingArea.scrollTop
}

workingArea.scrollTop = startScrollTop

const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)

let endY;

if (startScrollTop > workingArea.scrollTop) {
    startScrollTop = workingArea.scrollTop
    if (nextScrollTop > workingArea.scrollTop) {

        nextScrollTop = workingArea.scrollTop
        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
    } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {
        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y) + workingArea.scrollTop
    } else {
    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-   id-${tasksArray[i].id}`).getBoundingClientRect().y) + workingArea.scrollTop - nextScrollTop
    }

} else if (nextScrollTop < workingArea.getBoundingClientRect().top) {

endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y) + workingArea.scrollTop
} else {
endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
}
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
