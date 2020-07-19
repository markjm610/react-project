export function moveStepByStep(drag, values) {
    requestAnimationFrame(() => {
        const newPosition = values.shift();
        drag.move(newPosition);
        if (values.length) {
            moveStepByStep(drag, values);
        } else {
            drag.drop();
        }
    });
}

export function noScroll() {

    const workingArea = document.querySelector('.working-area')
    // workingArea.scrollTo(workingArea.scrollLeft, 0);

    workingArea.scrollTo(workingArea.scrollLeft, workingArea.scrollTop)
    // workingArea.scrollTo(0, 0);
}
