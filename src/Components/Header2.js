import {BarChart, Dashboard, Menu, TableBar } from "@mui/icons-material";
import { AppBar, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

function Header2(){

const[state,setstate]=useState({left:false});
const toggleDrawer = (Anchor,open) =>(event)=>{
    setstate({...state,[Anchor]:open});
}

return(

    <>
    <AppBar>
        <Toolbar>
            <IconButton onClick={toggleDrawer('left',true)} size="large"  color="inherit">
                <Menu/>
            </IconButton>
            <Typography variant="h5">Myproject</Typography>
        </Toolbar>
    </AppBar>

    <Drawer open={state['left']} onClose={toggleDrawer('left',false)}>
        <List>
            <ListItemButton>
                <IconButton>
                    <Dashboard/>
                </IconButton>
                <ListItemText primary="header"/>
            </ListItemButton>

            <ListItemButton>
                <IconButton>
                    <TableBar/>
                </IconButton>
                <ListItemText primary="header2"/>
            </ListItemButton>

            <ListItemButton>
                <IconButton>
                    <BarChart/>
                </IconButton>
                <ListItemText primary="header3"/>
            </ListItemButton>

        </List>
    </Drawer>

    </>
)

}
export default Header2;
