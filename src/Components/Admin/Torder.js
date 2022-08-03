import { Box, Card, CardContent, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MiniDrawer from "./Drawer";
import { styled, useTheme } from '@mui/material/styles';
import { db } from "../../firebase";
import { InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


function Torder() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const [data, setdata] = useState([]);
    function fetch() {
        db.collection('Orders').orderBy('OID', 'desc').onSnapshot((succ) => {
            var ar = [];
            succ.forEach((succc) => {
                ar.push(succc);
            })
            setdata(ar);
        })

    }

    useEffect(() => {
        fetch();
    }, [])

    var navi = useNavigate();

    function Orderinfoa(x) {
        var path = '/ViewOinfo?id=' + x.id;
        navi(path);
    }

    return (
        <>
            <Box style={{ display: 'flex' }}>
                <MiniDrawer />
                <Box sx={{ flexGrow: 1 }}>
                    <DrawerHeader />

                    <Grid className="bg13">
                        <Grid container>
                            <Grid lg={8} md={8} sm={8} xs={8} style={{ margin: 'auto', marginTop: '20px' }}>
                                <Card>
                                    <CardContent><Typography color={'primary'} style={{ textAlign: 'center' }} variant="h4">Order-Details</Typography></CardContent>
                                    <Divider />
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Order ID</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Contact</TableCell>
                                                    <TableCell>DateTime </TableCell>
                                                    <TableCell>Items</TableCell>
                                                    <TableCell>Grand Total</TableCell>
                                                    <TableCell>Action</TableCell>

                                                </TableRow>
                                            </TableHead>

                                            <TableBody >
                                                {data.map((row) =>
                                                    <TableRow >
                                                        <TableCell>{row.data().OID}</TableCell>
                                                        <TableCell>{row.data().Name}</TableCell>
                                                        <TableCell>{row.data().Contact}</TableCell>
                                                        <TableCell>{row.data().Date}</TableCell>
                                                        <TableCell>{row.data().Item}</TableCell>
                                                        <TableCell>₹{row.data().Total}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title='Show Details'>
                                                                <IconButton onClick={() => Orderinfoa(row)} ><InfoOutlined /></IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>

                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Box>


        </>
    )
}
export default Torder;