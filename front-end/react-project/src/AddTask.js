import React, { useState, useContext } from 'react';
import { AddCircle } from 'grommet-icons';
import { Layer, Form, Box, FormField, Button, TextArea } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

const AddTask = ({ columnId, taskArrLength }) => {
    const { currentUserId, displayedColumns, setDisplayedColumns, setColumnFull } = useContext(Context);
    const [show, setShow] = useState();
    const [value, setValue] = useState('');
    const [descriptionLength, setDescriptionLength] = useState(0)
    const [clickedButton, setClickedButton] = useState(false)

    const addTaskClick = async () => {

        if (taskArrLength === 11) {
            setColumnFull(true)
            setValue('')
            setDescriptionLength(0)
        } else {
            if (clickedButton) {
                setClickedButton(false)
            }
            setShow(true)
        }

    }

    const addTaskSubmit = async () => {
        setClickedButton(true)
        if (value.length > 100 || !value) {
            return
        }

        setShow(false)

        const columnPosition = taskArrLength;

        const res = await fetch(`${apiBaseUrl}/columns/${columnId}/tasks`, {
            method: 'POST',
            body: JSON.stringify(
                { columnPosition, heading: 'heading', description: value, creatorId: currentUserId }
            ),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const parsedRes = await res.json();

        const columnsCopy = [...displayedColumns];

        columnsCopy.forEach(column => {
            if (column.id === columnId) {

                column.Tasks.push(parsedRes.newTask)
                column.Tasks.forEach((task, i) => {
                    task.columnPosition = i;
                })
            }
        })

        setDisplayedColumns(columnsCopy)
        setValue('')
        setDescriptionLength(0)
    }

    return (<>
        <div className='add-task'>
            <AddCircle color='black' onClick={addTaskClick}></AddCircle>
        </div>
        {
            show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setShow(false)
                        setValue('')
                        setDescriptionLength(0)
                    }}
                >
                    <div className='popup-container'>
                        <div className='popup-text'>Describe the task:</div>
                        <textarea className='popup-input' value={value} onChange={e => {
                            if (clickedButton) {
                                setClickedButton(false)
                            }
                            setDescriptionLength(e.target.value.length)
                            setValue(e.target.value)
                        }} />
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={addTaskSubmit}>Add</div>
                            <div style={{ color: descriptionLength > 100 && 'red' }}>{descriptionLength} / 100</div>
                        </div>
                        {/* <Form
                            value={value}
                            onChange={nextValue => {
                                setDescriptionLength(nextValue.description.length)
                                setValue(nextValue)
                            }}
                            onReset={() => setValue({})}
                            onSubmit={addTaskSubmit}
                        >
                            <FormField name="description" htmlfor="text-input-id" label="Task Description:">
                                <TextArea id="text-input-id" name="description" />
                            </FormField>
                            <Box direction="row" gap="medium">
                                <Button type="submit" color='lightsteelblue' primary label="Submit" />
                                <div style={{ color: descriptionLength > 100 && 'red' }}>{descriptionLength} / 100</div>
                            </Box>
                        </Form> */}
                    </div>
                </Layer>
            )
        }
    </>
    );

}

export default AddTask;
