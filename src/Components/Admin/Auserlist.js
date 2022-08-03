import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Box, Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import MiniDrawer from "./Drawer";
import { styled, useTheme } from '@mui/material/styles';
import { db } from "../../firebase";
import { Delete} from "@mui/icons-material";



function Auserlist() {

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));


  const [data, setdata] = useState([]);

  function udata() {
    db.collection('Uregister').onSnapshot((succ) => {
      var ar = [];
      succ.forEach((succc) => {
        ar.push(succc);
        
      })
      setdata(ar);
    })
  }

  useEffect(() => {
    udata();
  }, [])

  function del(x){
    if(window.confirm('Do you want to delete')){
      db.collection('Uregister').doc(x).delete();
      alert('User data is deleted');
    }
  }

  return (
    <>
      <Box style={{ display: 'flex' }}>
        <MiniDrawer />
        <Box sx={{ flexGrow: 1, p: 0 }}>
          <DrawerHeader />

          {/* <div style={{ height: '50vh', width: '100%', zoom:1.2 }}> */}
          <Grid  className="bg13">
            <Grid container>
            <Grid lg={8}  md={8} sm={8} xs={8}style={{margin:'auto'}}>
            <CardContent>
            <Card>
                                    <CardContent>
                                        <Typography variant="h4" className="txt" color={'blueviolet'}>Users Detail</Typography>
                                    </CardContent>
                                </Card>
                            </CardContent>

                            <CardContent>
                                <Card>
                                    <CardContent>


                                        <TableContainer >
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Email</TableCell>
                                                        <TableCell>Password</TableCell>
                                                        <TableCell>Contact</TableCell>
                                                        <TableCell>Action</TableCell>
                                                        

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.map((row) => (
                                                        <TableRow key={row.id} >
                                                            <TableCell>{row.data().Name}</TableCell>
                                                            <TableCell>{row.data().Email}</TableCell>
                                                            <TableCell>{row.data().Password}</TableCell>
                                                            <TableCell>{row.data().Contact}</TableCell>
                                                        
                                                            <TableCell>
                                                                <IconButton onClick={()=>del(row.id)} color="primary"><Delete/></IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>

                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>

            </CardContent>
            </Grid>
            </Grid>
          </Grid>
          {/* </div> */}


        </Box>
      </Box>

    </>
  )


}
export default Auserlist;