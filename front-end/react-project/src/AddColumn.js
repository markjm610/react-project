import React, { useState, useContext } from 'react';
import { Add, AddCircle } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

const AddColumn = () => {

    const { currentProjectId, displayedColumns, setDisplayedColumns } = useContext(Context)
    const [show, setShow] = useState();
    const [value, setValue] = useState({ name: '' });


    const addColumnClick = () => {
        setShow(true)
    }

    const addColumnSubmit = async () => {
        setShow(false);

        const columnsCopy = [...displayedColumns];

        const pagePositionOfNewColumn = columnsCopy.length;


        const res = await fetch(`${apiBaseUrl}/projects/${currentProjectId}/columns`, {
            method: 'POST',
            body: JSON.stringify(
                { name: value.name, pagePosition: pagePositionOfNewColumn }
            ),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const parsedRes = await res.json();
        const newColumn = parsedRes.newColumn;
        newColumn.Tasks = []
        // newColumn.Tasks = [{ id: null, heading: null, description: null, columnPosition: 0, columnId: newColumn.id }]
        columnsCopy.push(newColumn);

        setDisplayedColumns(columnsCopy);

        value.name = ''
    }

    return (<>
        {currentProjectId && <div className='add-column'><AddCircle onClick={addColumnClick} className='add-column-icon' /></div>}
        {
            show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setShow(false)
                        setValue({ name: '' })
                    }}
                >
                    <Form
                        value={value}
                        onChange={nextValue => setValue(nextValue)}
                        onReset={() => setValue({})}
                        onSubmit={addColumnSubmit}
                    >

                        <FormField name="name" htmlfor="text-input-id" label="Add Column:">
                            <TextInput id="text-input-id" name="name" />
                        </FormField>
                        <Box direction="row" gap="medium">
                            <Button type="submit" color='lightsteelblue' primary label="Submit" />
                        </Box>
                    </Form>
                </Layer>
            )
        }
    </>
    )
}

export default AddColumn;