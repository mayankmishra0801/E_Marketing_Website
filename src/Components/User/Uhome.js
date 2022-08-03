import { Box, Button, ButtonGroup, Card, CardContent, Divider, Grid, IconButton, InputBase, Modal, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import fries from './../../images/fries.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Usernavbar from "./UserNavbar";
import slider from './../../images/offer1.webp';
import slider1 from './../../images/offer2.webp';
import slider2 from './../../images/offer3.webp';
import { styled, useTheme } from '@mui/material/styles';
import { Search } from "@mui/icons-material";
import firebase from "firebase";
import { db, product } from "../../firebase";

function Uhome() {
    var navi = useNavigate();

    var uid = localStorage.getItem('userlogin');

    // console.log(uid);

    const [open, setopen] = useState(false);
    const [onedata, setonedata] = useState();

    function openmodal(x) {
        setonedata(x);
        setopen(true);


    }

    function close() {
        setopen(false);
        setshowcart(false);
    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


    

    React.useEffect(() => {
        if (!uid) {
          navi('/');
        }
      }, [])

    const [data, setdata] = useState([]);

    function fetchdata(x) {
        if(uid){      
              var query = ''
        if (x) {
            query = product.where('keyword', 'array-contains', x);
        } else {
            query = product;
        }
        query.onSnapshot((succ) => {
            const ar = [];
            succ.forEach((succc) => {
                ar.push(succc);
            })
            setdata(ar);
        })
    }

    }

    useEffect(() => {
        fetchdata();
    }, [])

    const [showcart, setshowcart] = useState(false);

    function cart() {
        setshowcart(true);
    }


    function addtocart(x) {
        if (uid) {
            db.collection('Uregister').doc(uid).collection('mycart').where('Product_id', '==', x.id).get().then((succ) => {
                if (succ.size > 0) {
                    alert('This Product is already in cart');
                } else {
                    db.collection('Uregister').doc(uid).collection('mycart').add({
                        Product: x.data(),
                        Amount: 1,
                        Product_id: x.id
                    }).then((succ) => {
                        alert('Product Added to Cart');
                        
                    })
                }
            })
        }
    }




    return (
        <>

            <Box style={{ display: 'flex', background: 'whitesmoke' }}>
                <Usernavbar />
                <Box sx={{ flexGrow: 1, p: 0 }}>
                    <DrawerHeader />
                    <Grid container style={{backgroundColor:'ghostwhite'}}>
                        <Grid lg={12} md={12} sm={12} xs={12} className="back">
                            <Grid>
                                <h3>ALL NATURAL PRODUCTS</h3>
                                <h1>Healthy Pure Food</h1>
                                <h2>Organic Markert </h2>
                                <p>Organic food is food produced by methods that comply with the standard of farming</p>
                                <Paper component="form" sx={{ width: '100%', margin: 'auto' }}>
                                    <InputBase
                                        size="small"
                                        sx={{ flex: 2, p: 1 }}
                                        placeholder="Search your Product here   .  .  .  .  .  ."
                                        onKeyUp={(e) => fetchdata(e.target.value)}
                                    />
                                </Paper>

                                <Grid lg={12} md={12} sm={12} xs={12}>
                                    <br /><br />
                                    <Grid container>
                                        
                                        {/* <Grid lg={4}>
                                            <img style={{ width: '60%' }} src={slider} />
                                        </Grid>
                                        <Grid lg={4}>
                                            <img style={{ width: '60%' }} src={slider1} />
                                        </Grid>
                                        <Grid lg={4}>
                                            <img style={{ width: '60%' }} src={slider2} />
                                        </Grid> */}

                                    </Grid>
                                </Grid>


                            </Grid>
                        </Grid>

                        {data.map((row) => (
                            <Grid lg={3} md={6} sm={6} xs={12} key={row.id}>
                                <CardContent >
                                    <Card style={{ width: '90%' }}>
                                        <CardContent >
                                            <img
                                                title="View Details"
                                                onClick={() => openmodal(row)}
                                                style={{ height: '220px', width: '100%', cursor: 'pointer' }}
                                                src={row.data().Image} />
                                            <Typography style={{ textTransform: 'capitalize' }} variant="h6" >{row.data().Name}</Typography>
                                            <Typography> <span style={{ color: 'green', fontWeight: 'bold' }}>₹{row.data().Sell}/kg</span>&nbsp;<del style={{ fontSize: '14px', color: 'grey' }}>₹{row.data().MRP}</del></Typography>
                                            <br />
                                            <div className="center">
                                                <Button fullWidth onClick={() => addtocart(row)} variant="contained">Add to Cart</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </Grid>
                        ))}


                        <Modal sx={{ mt: 5 }} open={open} onClose={close}>
                            <Grid lg={6} md={6} sm={6} xs={6} style={{ margin: 'auto' }}>
                                <Card>
                                    {onedata && (
                                        <Grid container>
                                            <Grid lg={6} md={6} sm={6} xs={6}>
                                                <CardContent>
                                                    <Carousel thumbWidth={70} showThumbs={true} autoPlay={true} infiniteLoop={true} interval={4000}>
                                                        <div>
                                                            <img src={onedata.data().Image} />
                                                        </div>
                                                        <div>
                                                            <img src={onedata.data().Image} />
                                                        </div>
                                                        <div>
                                                            <img src={onedata.data().Image} />
                                                        </div>
                                                    </Carousel>
                                                </CardContent>
                                            </Grid>
                                            <Grid lg={6} md={6} sm={6} xs={6}>
                                                <CardContent>
                                                    <button className="close" onClick={close}>x</button>
                                                    <Typography variant="h4">{onedata.data().Name}</Typography>
                                                    <Typography variant="h6"><span style={{ color: 'green', fontWeight: 'bold' }}> ₹{onedata.data().Sell}/kg </span> <del style={{ fontSize: '14px', color: 'grey' }}>₹{onedata.data().Cost}</del></Typography><br />
                                                    <Typography variant="body2">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                                        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                                                        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                                                        quasi quidem quibusdam.
                                                    </Typography><br />
                                                </CardContent>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Card>
                            </Grid>
                        </Modal>


                    </Grid>


                </Box>
            </Box>
        </>
    );
}

export default Uhome;

