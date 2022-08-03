import { Chair, Menu } from "@mui/icons-material";
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";


function Header(){

const[state,setstate] = useState({left:false});
const toggleDrawer =(anchor,open)=>(e)=>{
    setstate({...state,[anchor]:open});
} 

return(
    <>
    <AppBar>
        <Toolbar>
            <IconButton onClick={toggleDrawer('left',true)} color="inherit" size="large">
                <Menu/>
            </IconButton>
            <Typography variant="h5">Myproject</Typography>
        </Toolbar>
    </AppBar>


<Drawer open={state['left']} onClose={toggleDrawer('left',false)} >
    <List>
        
        <ListItemButton>
            <IconButton>
                <Chair/>
            </IconButton>
            <ListItemText primary="header"/>
        </ListItemButton>
        
        
        <ListItemButton>
            <IconButton>
                <Chair/>
            </IconButton>
            <ListItemText primary="header"/>
        </ListItemButton>

        <ListItemButton>
            <IconButton>
                <Chair/>
            </IconButton>
            <ListItemText primary="header"/>
        </ListItemButton>

        <ListItemButton>
            <IconButton>
                <Chair/>
            </IconButton>
            <ListItemText primary="header"/>
        </ListItemButton>


    </List>
</Drawer>


    </>
)


}
export default Header;