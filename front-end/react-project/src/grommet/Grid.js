import React from 'react';
import { Grid, Box } from 'grommet';
// import { Help, Projects, Clock } from 'grommet-icons';

const GridContainer = () => {
    return (
        <Grid

            rows={['flex']}
            columns={['small', 'small']}
            gap="none"
            areas={[
                { name: 'nav', start: [0, 0], end: [0, 0] },
                { name: 'main', start: [1, 0], end: [1, 0] },
            ]}
        >
            <Box gridArea="nav" background="light-5" />
            <Box gridArea="main" background="light-2" />
        </Grid>)
}

export default GridContainer;