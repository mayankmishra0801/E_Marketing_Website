import {  AccountCircle, BadgeSharp, BadgeTwoTone, CopyAllRounded, Delete, ExpandMore, HideImage, Home, PhoneAndroid, RoofingRounded, ShoppingBag,  FileCopy, Save, Print, Share } from "@mui/icons-material";
import { Avatar, AvatarGroup, Grid,Badge, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, CircularProgress, List, ListItem, ListItemButton, IconButton, ListItemText, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Alert, Autocomplete, TextField, Switch, Checkbox, RadioGroup, Radio, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Tooltip, Skeleton, Typography, Box, Menu, Accordion, AccordionDetails, AccordionSummary, SpeedDial, SpeedDialIcon, SpeedDialAction, FormGroup, CardContent } from "@mui/material";
import React, { useState } from "react";
import img1 from "../../images/3.jpeg"
function Mui(){

    const[showopen,setshowopen]=useState(false);

function openmenu(){
setshowopen(true);
}
function closemenu(){
setshowopen(false);
}

function del(){
    alert('aakash')
}
const[open,setopen] = useState(false);

function dailog(){
setopen(true);
}

function close(){
setopen(false);
}

    const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    ]

    const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;



const actions = [
    { icon: <FileCopy />, name: 'Copy' },
    { icon: <Save />, name: 'Save' },
    { icon: <Print />, name: 'Print' },
    { icon: <Share />, name: 'Share' },
  ];

return(
<>
    <Grid container>
        <Grid lg={4} md={12}>
            <Avatar src={img1}/><br/>
            <Avatar variant="primary" color="primary"><PhoneAndroid/></Avatar><br/>
            <Avatar style={{backgroundColor:"maroon"}}>A</Avatar><br/>
            <Avatar sx={{bgcolor:"green"}}><Home/></Avatar><br/>
            <Avatar variant="square" sx={{bgcolor:"blue"}}><RoofingRounded/></Avatar><br/>
            <Avatar variant="rounded" sx={{bgcolor:"blue"}}><BadgeSharp/></Avatar>
                
            <AvatarGroup max={2}>
            <Avatar sx={{bgcolor:"green"}}><Home/></Avatar>
            <Avatar sx={{bgcolor:"green"}}><HideImage/></Avatar>
            <Avatar sx={{bgcolor:"green"}}><BadgeTwoTone/></Avatar>
            <Avatar sx={{bgcolor:"green"}}><CopyAllRounded/></Avatar>
            </AvatarGroup>
            
            <br/>

            <Badge color="primary" badgeContent={5} >
                <ShoppingBag/>
            </Badge>
            
            <br/><br/>

            <Chip label="apple" /><br/><br/>
            <Chip label="rumaliroti" color="primary" onDelete={del} />
            
            <br/><br/>

            <Button onClick={dailog} color="primary">
                click me
            </Button>
            <Dialog open={open} onClose={close}>
                <DialogTitle>
                Heading
                </DialogTitle>
                <DialogContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.a
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>
                    close    
                    </Button>
                </DialogActions>
            </Dialog><br/>
            <LinearProgress/><br/>
            <CircularProgress/><br/><br/>

            <Tooltip title="delete" arrow>
            <IconButton>
                <Delete/>
            </IconButton>
            </Tooltip>
            
            <Tooltip title={longText} arrow>
                <Button>click</Button>
            </Tooltip>

        </Grid>

        <Grid lg={2}>
            <List>
                <ListItem>
                    <ListItemButton >
                        <IconButton color="primary">
                            <AccountCircle/>
                        </IconButton>
                        <ListItemText primary="Dashboard" secondary="all states"/>
                    </ListItemButton>
                </ListItem>
            </List>

            <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Rollno.</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Marks</TableCell>    
                    </TableRow>  
                    </TableHead>

                    <TableBody>
                    <TableRow>
                    <TableCell>aakash</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>maths</TableCell>
                    <TableCell>99</TableCell>    
                    </TableRow>  

                    <TableRow>
                    <TableCell>aaditya</TableCell>
                    <TableCell>101</TableCell>
                    <TableCell>science</TableCell>
                    <TableCell>99</TableCell>    
                    </TableRow>  

                    </TableBody>
                </Table>
            </TableContainer><br/><br/>
            <Alert severity="error">Hello</Alert>
            <Alert severity="warning">Hello</Alert>
            <Alert severity="info">Hello</Alert>
            <Alert severity="success">Hello</Alert>
            <br/>
            <Alert variant="outlined" severity="warning">Hello</Alert><br/>
            <Alert variant="filled" severity="success">Hello</Alert>
        </Grid>
        <Grid lg={4}>
            <Switch/>
            <Checkbox/>
        </Grid>

                <Grid lg={4}>
        <RadioGroup>
                <FormControlLabel value='male' control={<Radio/>} label='Male' />
             
                <FormControlLabel value='female' control={<Radio/>} label='Female' />
            </RadioGroup>

        </Grid>
</Grid>
   
    <Grid container>
        <Grid lg={4}>

            <FormControl fullWidth>
                <InputLabel>city</InputLabel>
            
            <Select fullWidth size="small" label="city">
                <MenuItem value="ludhiana">ludhiana</MenuItem>
                <MenuItem value="rajkot">rajkot</MenuItem>
                <MenuItem value ="barnala">barnala</MenuItem>
            </Select>
            
            </FormControl>
            
            <FormControl fullWidth>
                <InputLabel>cities</InputLabel>
                <Select fullWidth size="small">
                    <MenuItem value={'ludhiana'}>ludhiana</MenuItem>
                    <MenuItem value={'Raikot'}>raikot</MenuItem>
                </Select>
            </FormControl>

            </Grid>
            
            <Grid lg={5}>
            <Skeleton variant="text" width={400} color="primary"/>
            <Skeleton variant="circular" width={60} height={60}/>
            <Skeleton variant="rectangular" width={400} height ={200}/>
        </Grid>
            <Grid lg={5}>
            <Skeleton variant="rectangular" width={400} height ={200}/>
            <Skeleton variant="text" width={400}/>
            <Skeleton variant="text" width={200}/>
        </Grid>
    
        </Grid>
    
    
    
    {/* <Grid lg={5}>
    <Typography variant="h1"><Skeleton variant="text" width={400}/></Typography>
    <Typography variant="h1"><Skeleton variant="circular" width={400}/></Typography>    
    <Typography variant="h1"><Skeleton variant="rectangular" width={400}/></Typography>

    </Grid> */}
     
            
    <Grid container>

        <Grid lg={1}>
            <Box>
        <Button onClick={openmenu}>
            Dashboard
        </Button>
        <Menu open={showopen} onClose={closemenu}>
            <MenuItem onClick={closemenu}>signup</MenuItem>
            <MenuItem onClick={closemenu}>Profile</MenuItem>
            <MenuItem onClick={closemenu}> Logout</MenuItem>
        </Menu>
        </Box>
        </Grid>

        <CardContent>
                                        <FormGroup>
                                            
                                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" required>Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            size="small"
                                            label="Category"
                                            required
                                            
                                        >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        </FormControl>
                                        </FormGroup>
                                    </CardContent>
    

      <Grid lg={4}>
        <Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore/>} >
                    <Typography color={'primary'}>aakash</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
        </Grid>

        <Grid lg={4}>
            <Autocomplete  options={top100Films} renderInput={(Prop)=> <TextField {...Prop} fullWidth size="small" label="movies" />} />
        </Grid>

        <Box sx={{height:320,transform:'translateZ(0px)',flexGrow:1}}>
            <SpeedDial icon={<SpeedDialIcon/>}  ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                {actions.map((action)=>(
                    <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name}/>
                ))}          
            </SpeedDial>
        </Box>

        </Grid>
    </>    
    
)
}
export default Mui;