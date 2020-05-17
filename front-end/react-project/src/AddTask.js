import React, { useState, useContext } from 'react';
import { AddCircle } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

const AddTask = ({ columnId, taskArrLength }) => {
    const { currentUserId, displayedColumns, setDisplayedColumns } = useContext(Context);
    const [show, setShow] = useState();
    const [value, setValue] = useState({ name: '', description: '' });

    const addTaskClick = async () => {
        setShow(true)
    }

    const addTaskSubmit = async () => {
        setShow(false)

        const columnPosition = taskArrLength - 1;

        const res = await fetch(`${apiBaseUrl}/columns/${columnId}/tasks`, {
            method: 'POST',
            body: JSON.stringify(
                { columnPosition, heading: value.name, description: value.description, creatorId: currentUserId }
            ),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const parsedRes = await res.json();

        const columnsCopy = [...displayedColumns];

        columnsCopy.forEach(column => {
            if (column.id === columnId) {
                if (column.Tasks.length === 1) {
                    column.Tasks.unshift(parsedRes.newTask)
                } else {
                    const secondToLastPosition = column.Tasks.length - 1;
                    column.Tasks.splice(secondToLastPosition, 0, parsedRes.newTask)
                }
                column.Tasks.forEach((task, i) => {
                    task.columnPosition = i;
                })
            }
        })

        setDisplayedColumns(columnsCopy)
        setValue({ name: '', description: '' })
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
                        setValue({ name: '', description: '' })
                    }}
                >
                    <Form
                        value={value}
                        onChange={nextValue => setValue(nextValue)}
                        onReset={() => setValue({})}
                        onSubmit={addTaskSubmit}
                    >
                        <FormField name="name" htmlfor="text-input-id" label="Name:">
                            <TextInput id="text-input-id" name="name" />
                        </FormField>
                        <FormField name="description" htmlfor="text-input-id" label="Description:">
                            <TextInput id="text-input-id" name="description" />
                        </FormField>
                        <Box direction="row" gap="medium">
                            <Button type="submit" color='lightblue' primary label="Submit" />

                        </Box>
                    </Form>
                </Layer>
            )
        }
    </>
    );

}

export default AddTask;
