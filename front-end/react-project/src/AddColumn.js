import React, { useContext } from 'react';
import { Add } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

const AddColumn = () => {

    const { currentProjectId } = useContext(Context)

    const addColumnClick = () => {

    }

    return (<>
        {currentProjectId && <div className='add-column'><Add onClick={addColumnClick} className='add-column-icon'></Add></div>}
    </>
    )
}

export default AddColumn;