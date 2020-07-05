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

