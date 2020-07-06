import React, { useState, useContext } from 'react';
import { AddCircle } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button, TextArea } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

const AddTask = ({ columnId, taskArrLength }) => {
    const { currentUserId, displayedColumns, setDisplayedColumns } = useContext(Context);
    const [show, setShow] = useState();
    const [value, setValue] = useState({ description: '' });
    const [descriptionLength, setDescriptionLength] = useState(0)

    const addTaskClick = async () => {
        setShow(true)
    }



    const addTaskSubmit = async () => {

        if (value.description.length > 100) {
            return
        }

        setShow(false)

        const columnPosition = taskArrLength;

        const res = await fetch(`${apiBaseUrl}/columns/${columnId}/tasks`, {
            method: 'POST',
            body: JSON.stringify(
                { columnPosition, heading: 'heading', description: value.description, creatorId: currentUserId }
            ),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const parsedRes = await res.json();

        const columnsCopy = [...displayedColumns];

        columnsCopy.forEach(column => {
            if (column.id === columnId) {
                // if (column.Tasks.length === 1) {
                //     column.Tasks.unshift(parsedRes.newTask)
                // } else {
                //     const secondToLastPosition = column.Tasks.length - 1;
                //     column.Tasks.splice(secondToLastPosition, 0, parsedRes.newTask)
                // }
                column.Tasks.push(parsedRes.newTask)
                column.Tasks.forEach((task, i) => {
                    task.columnPosition = i;
                })
            }
        })

        setDisplayedColumns(columnsCopy)
        setValue({ description: '' })
    }


    return (<>
        <div className='add-task'>
            <AddCircle onClick={addTaskClick}></AddCircle>
        </div>
        {
            show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setShow(false)
                        setValue({ description: '' })
                    }}
                >
                    <Form
                        value={value}
                        onChange={nextValue => {
                            console.log(nextValue)
                            setDescriptionLength(nextValue.description.length)
                            setValue(nextValue)
                        }}
                        onReset={() => setValue({})}
                        onSubmit={addTaskSubmit}
                    >
                        <FormField name="description" htmlfor="text-input-id" label="Description:">
                            <TextArea id="text-input-id" name="description" />
                        </FormField>
                        <Box direction="row" gap="medium">
                            <Button type="submit" color='lightblue' primary label="Submit" />
                            <div style={{ color: descriptionLength > 100 && 'red' }}>{descriptionLength} / 100</div>
                        </Box>
                    </Form>
                </Layer>
            )
        }
    </>
    );

}

export default AddTask;
