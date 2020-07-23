export function moveStepByStep(drag, values, scrollPoints) {
    const workingArea = document.querySelector('.working-area')

    requestAnimationFrame(() => {
        const newPosition = values.shift();
        drag.move(newPosition);
        const newScrollPosition = scrollPoints.shift()
        workingArea.scrollTo(workingArea.scrollLeft, newScrollPosition)
        if (values.length) {
            moveStepByStep(drag, values, scrollPoints);
        } else {
            drag.drop();
        }
    });
}

// export function scrollStepByStep(scrollPoints) {
//     const workingArea = document.querySelector('.working-area')
//     requestAnimationFrame(() => {
//         const newPosition = scrollPoints.shift()
//         workingArea.scrollTo(workingArea.scrollLeft, newPosition)
//         if (scrollPoints.length) {
//             scrollStepByStep(scrollPoints)
//         }
//     })
// }

// export function noScrollMoveToTop() {

//     const workingArea = document.querySelector('.working-area')
//     workingArea.scrollTo(workingArea.scrollLeft, 0);

//     // workingArea.scrollTo(workingArea.scrollLeft, workingArea.scrollTop)
//     // workingArea.scrollTo(0, 0);
// }

// export function noScroll() {

//     const workingArea = document.querySelector('.working-area')
//     // workingArea.scrollTo(workingArea.scrollLeft, 0);

//     workingArea.scrollTo(workingArea.scrollLeft, workingArea.scrollTop)
//     // workingArea.scrollTo(0, 0);
// }

// export function noScroll(scrollLock) {

//     const workingArea = document.querySelector('.working-area')
//     // workingArea.scrollTo(workingArea.scrollLeft, 0);

//     workingArea.scrollTo(workingArea.scrollLeft, scrollLock)
//     // workingArea.scrollTo(0, 0);
// }