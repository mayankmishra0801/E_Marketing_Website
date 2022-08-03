import { Box, Card, CardContent, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';

import Usernavbar from "./UserNavbar";
import { db } from "../../firebase";
import { InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Orderlist() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


 var uid = localStorage.getItem('userlogin');

const [ data,setdata] = useState([]);
const [size, setsize] = React.useState([]);
function fetchdata(){
    db.collection('Orders').where('UID' ,'==',uid).onSnapshot((succ)=>{
        var ar = [];
        var ar2 =[];
        succ.forEach((succc)=>{
            ar.push(succc);
        })
        setdata(ar);
        setsize()
    })
}

useEffect(()=>{
    fetchdata();
},[])

var navi= useNavigate();

function show(x){
   var path = '/OrderInfo?id='+ x.id;
    navi(path);
}

    return (
        <>

            <Box style={{ display: 'flex' }}>
                <Usernavbar />
                <Box className="orimg"  sx={{ flexGrow: 1}}>
                    <DrawerHeader />

                    <Grid container >
                    <Grid lg={8} style={{margin:'auto',marginTop:'100px',background:'rgb(255,255,255,.8 )' }}>
                   
                    <Typography style={{textAlign:'center'}} variant="h3" color={'primary'}>Orderlist</Typography>
                    <Divider/>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order-Id</TableCell>
                                            <TableCell>Items</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Grand-Total</TableCell>
                                            <TableCell>Action</TableCell>
                                            
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {data.map((row) => (
                                            <TableRow key={row.id} >
                                                <TableCell>{row.data().OID} </TableCell>
                                                <TableCell>{row.data().Item} </TableCell>
                                                <TableCell>{row.data().Date}</TableCell>
                                                <TableCell>{row.data().Total} </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={()=>show(row)}><InfoOutlined/></IconButton>
                                                
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                        </Grid>
                        
                    </Grid>


                </Box>
            </Box>

        </>
    )
}
export default Orderlist;