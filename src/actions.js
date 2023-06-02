

const click_on_cell_action = (clickColIdx, clickRowIdx, needsToRotate) => {
    return {
        type: "CELL_CLICKED",
        colIdx: clickColIdx,
        activeRows: clickRowIdx,
        needsToRotate: needsToRotate,
    }
}

const reset_action = () => {
    return {
        type: 'RESET',
    }
}

const button_clicked = (buttonQuadrant, direction) => {
    // when button is clicked, relays which quadrant and which direction the rotation will happen in
    return {
        type: 'BUTTON_CLICKED',
        quadrant: buttonQuadrant,
        direction: direction
    }
}



export {
    click_on_cell_action,
    reset_action,
    button_clicked,
};
