import { Box, Button, Card, CardActionArea, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Usernavbar from "./UserNavbar";
import { styled, useTheme } from '@mui/material/styles';
import { SettingsOverscanOutlined } from "@mui/icons-material";
function OrderInfo() {


    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    var uid = localStorage.getItem('userlogin');

    var oid = new URLSearchParams(window.location.search).get('id');

    var cart = db.collection('Orders').doc(oid).collection('Products');


    const [data, setdata] = useState([]);
    const [grand, setgrand] = useState();
    function fetchdata() {
        cart.onSnapshot((succ) => {
            var ar = [];
            //    var ar2 = 0;
            succ.forEach((succc) => {
                // var ar3 = succc.data().Data.Sell*succc.data().Data.Amount;
                //   ar2+= parseFloat(ar3)
                if (succc.exists) {
                    setdata(succc.data().Data);
                    // console.log(succc.data());
                }
            })
            // setgrand(ar2);
        })
    }

    useEffect(() => {
        fetchdata();
    }, [])

    var cart2 = db.collection('Orders').doc(oid);
    console.log(oid);
    const [data1, setdata1] = useState({});
    const[con,setcon] = useState('');
    const[date,setdate] = useState('');
    const [ooid, setoid] = useState('');
    const [name, setname] = useState('');
    
    function fetchdata1() {
        // var ar = [];
        cart2.onSnapshot((succ) => {
            console.log(succ);
            // ar.push(succ);
            // setdata1(succ);
            setoid(succ.data().OID);
            setname(succ.data().Name);
            setcon(succ.data().Contact);
            setdate(succ.data().Date);
            setgrand(succ.data().Total);
        })
        // setdata1(ar);
    }

    useEffect(() => {
        fetchdata1();
    }, [oid])


    return (

        <>

            <Box style={{ display: 'flex' }}>
                <Usernavbar />
                <Box className="infoimg" sx={{ flexGrow: 1, p: 1 }}>
                    <DrawerHeader />
                    <Grid container>

                        <Grid lg={12}>
                            <CardContent>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h4" style={{ textAlign: 'center' }} color={'primary'}>
                                            OG Store
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </CardContent>

                            <center>

                                <Grid lg={8}>
                                    <CardContent>
                                        <Card>
                                            <CardContent>
                                                <Grid container >
                                                    <Box style={{textAlign:'left',lineHeight:'100px'}}>

<Grid lg={12} style={{textAlign:'left',lineHeight:'100px'}}>
    <Typography variant="h3">INVOICE</Typography>
</Grid>
                                                    <Grid lg={12} style={{textAlign:'left',lineHeight:'100px'}}><Typography>Name:{name}</Typography>
                                                        
                                                    </Grid>

                                                    <Grid lg={12 } style={{textAlign:'left',lineHeight:'100px'}}><Typography>Contact:{con}</Typography>
                                                        
                                                    </Grid>

                                                    <Grid lg={12}><Typography>Invioce:{ooid}</Typography>
                                                        
                                                    </Grid>

                                                    <Grid lg={12}><Typography>Date:{date}</Typography>
                                                        
                                                    </Grid>
                                                    </Box>

                                                    <Grid lg={12} >
                                                        <Divider />
                                                    </Grid>


                                                    {data.map((row) => (<><Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        <Grid lg={3} key={row.id}>
                                                            <CardContent >
                                                                <img src={row.Image} style={{ height: '70px', width: 'auto' }} />
                                                            </CardContent>
                                                        </Grid>


                                                        <Grid lg={2} style={{ textTransform: 'capitalize', textAlign: 'left', marginTop: '10px' }}>
                                                            <Typography variant="h6" style={{ color: '#3f50b5', fontWeight:'bold' }}>{row.Name}</Typography>
                                                            <Typography variant="body2" style={{ color: '#3f50b5' }}>₹{row.Sell}/kg<small>&nbsp;<del>₹{row.MRP}</del></small> </Typography>

                                                        </Grid>


                                                        <Grid lg={5} style={{ textTransform: 'capitalize', textAlign: 'left', marginTop: '10px' }}>


                                                            <Typography variant="body2" style={{ color: 'grey' }}>Amount - {row.Amount}kg</Typography>
                                                            <Typography variant="body2" style={{ color: 'grey' }}>{row.Description.slice(0, 22)}. . .</Typography>
                                                        </Grid>


                                                        <Grid lg={2} style={{ textAlign: 'center', marginTop: '10px' }}>
                                                            <Typography variant="h6" style={{ color: '#3f50b5' }}>₹{row.Sell * row.Amount}
                                                            </Typography>

                                                        </Grid>

                                                    </Grid>
                                                    <Grid lg={12}><Divider/></Grid></>

                                                    ))}
                                                    
<Grid lg={12} style={{textAlign:'right',lineHeight:'40px'}}><Button variant="text"><Typography variant="h5" style={{fontWeight:'bolder'}} >Grand Total :{grand}</Typography></Button></Grid>

                                                    

                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </CardContent>
                                </Grid>
                            </center>

                        </Grid>
                    </Grid>




                </Box>
            </Box>

        </>

    )

}

export default OrderInfo;