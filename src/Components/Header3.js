import { Menu , ChairAltOutlined, DraftsTwoTone, BarChartSharp } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography ,Drawer, List, ListItemButton,ListItemText } from "@mui/material";
import React, { useState } from "react";

function Header3(){

    const[state,setstate]=useState({left:false})
    const toggleDrawer = (anchor,open) =>(e)=>{
        setstate({...state,[anchor]:open})
    }

return(

    <>
    <AppBar>
        <Toolbar>
            <IconButton onClick={toggleDrawer('left',true)} size="large" color="inherit">
                <Menu/>
            </IconButton>
            <Typography variant="h5">
                Myproject
            </Typography>
        </Toolbar>
    </AppBar>

    <Drawer open={state['left']} onClose={toggleDrawer('left',false)}>
        <List>
            <ListItemButton>
                <IconButton>
                    <ChairAltOutlined/>
                </IconButton>
                <ListItemText primary="header"/>
            </ListItemButton>

            <ListItemButton>
                <IconButton>
                    <DraftsTwoTone/>
                </IconButton>
                <ListItemText primary="header2"/>
            </ListItemButton>

            <ListItemButton>
                <IconButton>
                    <BarChartSharp/>
                </IconButton>
                <ListItemText primary="header3"/>
            </ListItemButton>

        </List>
    </Drawer>
    </>
)
}

export default Header3;