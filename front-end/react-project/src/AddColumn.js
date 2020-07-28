import React, { useState, useContext } from 'react';
import { Add, AddCircle, ChapterAdd, Checkbox } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';
import Tooltip from '@material-ui/core/Tooltip';

const AddColumn = () => {

    const { alphabetizing, currentProjectId, displayedColumns, setDisplayedColumns, columnDragging } = useContext(Context)
    const [show, setShow] = useState();
    const [value, setValue] = useState('');
    const [clickedButton, setClickedButton] = useState(false)
    const [descriptionLength, setDescriptionLength] = useState(0)
    const addColumnClick = () => {
        if (alphabetizing) {
            return
        }
        if (clickedButton) {
            setClickedButton(false)
        }

        setShow(true)
    }

    const addColumnSubmit = async (e) => {
        e.preventDefault()
        setClickedButton(true)

        if (value.length > 20 || !value) {
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
        {
            currentProjectId &&

            <div className='add-column'>
                <Tooltip title='Add Column' arrow>
                    <div className='add-column-icon-wrapper'>
                        <Add color='black' onClick={addColumnClick} className='add-column-icon' />
                    </div>
                </Tooltip>
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
                        setDescriptionLength(0)
                    }}
                >
                    <div className='popup-container'>

                        <div className='popup-text'>Name your column:</div>
                        <form onSubmit={addColumnSubmit}>
                            <input
                                className='popup-input'
                                value={value}
                                onChange={e => {
                                    if (clickedButton) {
                                        setClickedButton(false)
                                    }
                                    setDescriptionLength(e.target.value.length)
                                    setValue(e.target.value)
                                }}
                                onFocus={() => {
                                    if (clickedButton) {
                                        setClickedButton(false)
                                    }
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={addColumnSubmit}>Add</div>
                                <div style={{ color: descriptionLength > 20 && 'red', marginTop: '15px' }}>{descriptionLength} / 20</div>
                            </div>
                        </form>
                    </div>
                </Layer>
            )
        }
    </>
    )
}

export default AddColumn;