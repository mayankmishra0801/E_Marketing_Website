import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Container, Divider, Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Usernavbar from "./UserNavbar";
import firebase from "firebase";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
function Mycart() {

    var navi = useNavigate();

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


    var uid = localStorage.getItem('userlogin');

    var cart = db.collection('Uregister').doc(uid).collection('mycart');

    const [data, setdata] = useState([]);
    const [grand, setgrand] = useState();
    function fetchdata() {
        cart.onSnapshot((succ) => {
            var ar = [];
            var ar2 = 0;
            succ.forEach((succc) => {
                ar.push(succc);
                var ar3 = succc.data().Product.Sell * succc.data().Amount;
                console.log(ar3)
                ar2 += parseFloat(ar3)
            })
            setdata(ar);
            setgrand(ar2);
        })
    }

    useEffect(() => {
        fetchdata();
    }, [])

    function makeincrement(x) {
        db.collection('Product').doc(x.data().Product_id).get().then((succ) => {

            if (succ.data().Stock == x.data().Amount) {
                alert('Only this much stock is available');
            } else {
                cart.doc(x.id).update({
                    Amount: firebase.firestore.FieldValue.increment(1),
                })
            }
        })
    }
    function makedecrement(x) {
        cart.doc(x.id).update({
            Amount: firebase.firestore.FieldValue.increment(-1)
        })
    }

    function removeproduct(x) {
        cart.doc(x).delete();
        alert('Cart Product delete');
    }

    function Address() {
        navi('/Address');
    }


    return (

        <>
            <Box style={{ display: "flex" }}>
                <Usernavbar />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                      <Grid container>
                            <Grid lg={8}>
                                <Card>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                MyCart
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">

                                                
                                                {data.map((row) => (
                                                    <Grid container>
                                                        <Grid lg={2} md={2} sm={2}>
                                                            <CardContent className="img-resp">
                                                                <img src={row.data().Product.Image} className="img-responsive" />
                                                            </CardContent>
                                                        </Grid>

                                                        <Grid lg={8} style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                                            <Grid container>
                                                                <Grid lg={12}>
                                                                    <Typography variant="h6">{row.data().Product.Name}</Typography>

                                                                    <small><b>{row.data().Product.Brand}</b></small>

                                                                    <Typography>₹{row.data().Product.Sell}/kg<small><del>₹{row.data().Product.MRP}</del></small> </Typography>

                                                                    <ButtonGroup size="small" variant="contained">

                                                                        {row.data().Amount == 1 ? (
                                                                            <Button disabled>-</Button>
                                                                        ) : (
                                                                            <Button onClick={() => makedecrement(row)}>-</Button>
                                                                        )}
                                                                        <Button disabled>{row.data().Amount}</Button>
                                                                        {row.data().Product.Stock <= row.data().Amount ? (
                                                                        <Button disabled>+</Button>
                                                                        ) : (
                                                                            <Button onClick={() => makeincrement(row)}>+</Button>
                                                                        )}

                                                                    </ButtonGroup>
                                                                               
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid lg={2} style={{ textAlign: 'center' }}>
                                                            <Grid container>
                                                            <Grid lg={12}>
                                                                    <Button variant="contained">Total - {row.data().Product.Sell * row.data().Amount}</Button>
                                                                </Grid>

                                                                <br /><br /><br /><br /><br />
                                                                <Grid lg={12}>

                                                                    <Button onClick={() => removeproduct(row.id)} variant="text">Remove</Button>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                        <Grid lg={12} >
                                                            <Divider style={{padding:'10px 0px'}}/>
                                                        </Grid>

                                                    </Grid>

                                                ))}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
<Grid lg={1}></Grid>
                            <Grid lg={3} >
                                        <Card style={{height:'200px'}}>
                                            <form onSubmit={Address}>
                                                <CardContent>
                                                    <Typography variant="h5">Grand Total: Rs {grand}</Typography>
                                                    <br />
                                                    <Button type="submit" variant="contained">Place Order</Button>
                                                </CardContent>
                                            </form>
                                        </Card>
                            </Grid>
                        </Grid>

                    





                </Box>
            </Box>





        </>
    )
}

export default Mycart;
