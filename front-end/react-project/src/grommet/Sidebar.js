import React from 'react';
import { Sidebar, Avatar, Button, Nav } from 'grommet';
import { Help, Projects, Clock } from 'grommet-icons';

const SidebarComponent = () => {
    return (
        <div style={{ width: '100px', display: 'flex' }}>
            <Sidebar background='lightblue' round="small"
                header={
                    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg" />
                }
                footer={
                    <Button icon={<Help />} hoverIndicator />
                }
            >
                <Nav gap="small">
                    <Button icon={<Projects />} hoverIndicator />
                    <Button icon={<Projects />} hoverIndicator />
                </Nav>
            </Sidebar>
        </div >)
}

export default SidebarComponent;