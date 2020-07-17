import React, { useState, useContext } from 'react';
import { Add, AddCircle, ChapterAdd, Checkbox } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

const AddColumn = () => {

    const { currentProjectId, displayedColumns, setDisplayedColumns } = useContext(Context)
    const [show, setShow] = useState();
    const [value, setValue] = useState('');
    const [clickedButton, setClickedButton] = useState(false)

    const addColumnClick = () => {
        if (clickedButton) {
            setClickedButton(false)
        }

        setShow(true)
    }

    const addColumnSubmit = async () => {
        setClickedButton(true)

        if (!value) {
            return
        }

        setShow(false);

        const columnsCopy = [...displayedColumns];

        const pagePositionOfNewColumn = columnsCopy.length;

        const res = await fetch(`${apiBaseUrl}/projects/${currentProjectId}/columns`, {
            method: 'POST',
            body: JSON.stringify(
                { name: value, pagePosition: pagePositionOfNewColumn }
            ),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const parsedRes = await res.json();
        const newColumn = parsedRes.newColumn;
        newColumn.Tasks = []
        columnsCopy.push(newColumn);

        setDisplayedColumns(columnsCopy);

        setValue('')
    }

    return (<>
        {currentProjectId &&
            <div className='add-column'>
                <Add color='black' onClick={addColumnClick} className='add-column-icon' />

            </div>
        }
        {
            show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setClickedButton(false)
                        setShow(false)
                        setValue('')
                    }}
                >
                    <div className='popup-container'>
                        <div className='popup-text'>Name your column:</div>

                        <input className='popup-input' value={value} onChange={e => {
                            if (clickedButton) {
                                setClickedButton(false)
                            }
                            setValue(e.target.value)
                        }} />
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={addColumnSubmit}>Add</div>
                        </div>
                    </div>
                </Layer>
            )
        }
    </>
    )
}

export default AddColumn;