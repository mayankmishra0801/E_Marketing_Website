import { Box, Card, CardContent, Divider, Fab, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar, Bubble, Doughnut, Line, PolarArea, Radar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import MiniDrawer from "./Drawer";
import { styled, useTheme } from '@mui/material/styles';
import firebase from "firebase";
import { db } from "../../firebase";


function Dasboard() {
   
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));



    const [nam,setnam] = useState();
    const [sto,setsto] = useState();
    const [psize,setpsize] = useState();



    function showProduct(){
        db.collection('Product').orderBy('Name', 'asc').onSnapshot((suc) => {
            var name = [];
            var stock = [];
            suc.forEach((succ) => {
                name.push(succ.data().Name);
                stock.push(succ.data().Stock);
            })
            setnam(name);
            setsto(stock);
            setpsize(suc.size)
        })
    }

    useEffect(() => {
        showProduct();
    }, [])


    const datass = {
        labels: nam,
        datasets: [{
            backgroundColor: [
                'rebeccapurple',
                'royalblue',],
            label: 'Stock(kgs)',
            data: sto
        }]
    }

    const [uorder,setuorder] = useState();
    const [Uname,setuname] = useState();

    const [ur, setur] = useState();
    function reg(){
        db.collection('Uregister').onSnapshot((suc) => {
            var o = [];
            var name = [];
            suc.forEach((succ)=>{
                o.push(succ.data().Order);
                name.push(succ.data().Name);
            })
            setuorder(o);
            setuname(name);
            setur(suc.size);
        })
    }

    
    useEffect(() => {
        reg();
        
    }, [])


    const datas = {
        labels: Uname,
        datasets: [{
            backgroundColor: [
                'rebeccapurple',
                'royalblue',],
            label: 'User Orders',
            data: uorder
        }]
    }

    

const[data,setdata] = useState([]);
    const[osize,setosize] = useState([]);

    function getodata(){
      
        db.collection('Orders').onSnapshot((succ)=>{
            var ar =[];
            succ.forEach((succc)=>{
                console.log(succc); 
                ar.push(succc);
            })
            setdata(ar);
            // setpsize(succ.size);
            setosize(succ.size);
            console.log(succ.size);
        })
    }

    useEffect(() => {
        getodata();
    }, [])



    return (


        <>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer />
                <Box Box sx={{ flexGrow: 1, p: 3 }}>



                    <DrawerHeader />

                    <Grid container>
                        
                    <Grid lg={4}  sm={4} md={4} xs={4}>
                        <CardContent>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" className="txt" >
                                    Total no. of Users
                                </Typography>
                                <Divider/>
                                <CardContent>
                                <Typography style={{textAlign:'right'}} variant="h5">
                                   <Fab variant="h4" color="primary">{ur}</Fab> 
                                </Typography>
                                </CardContent>
                            </CardContent>
                        </Card>
                    </CardContent>
                        </Grid>

                        <Grid lg={4} sm={4} md={4} xs={4}>
                        <CardContent>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" className="txt" >
                                    Total no. of Products
                                 </Typography>
                                <Divider/>
                                <CardContent>
                                <Typography style={{textAlign:'right'}} variant="h5">
                                   <Fab variant="h4" color="primary">{psize}</Fab> 
                                </Typography>
                                </CardContent>
                            </CardContent>
                        </Card>
                    </CardContent>
                        </Grid>


                        <Grid lg={4} sm={4} md={4} xs={4}>
                        <CardContent>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" className="txt" >
                                    Total no. of Orders
                                </Typography>
                                <Divider/>
                                <CardContent>
                                <Typography style={{textAlign:'right'}} variant="h5">
                                   <Fab variant="h4" color="primary">{osize}</Fab> 
                                </Typography>
                                </CardContent>
                            </CardContent>
                        </Card>
                    </CardContent>
                        </Grid>


<Grid lg ={4} sm={4} md={4} xs={4}> 
<Doughnut data={datas} height={140} />
</Grid>

                        <Grid lg={8} sm={8} md={8} xs={8}>
                            <Bar data={datass} height={140} />
                        </Grid>
                        {/* <Grid lg={4} sm={4} md={4} xs={4}>
                            <Line data={datas} height={100} />
                        </Grid> */}
                        {/* <Grid lg={4}>
                            <Doughnut data={datasx} height={100} />
                        </Grid> */}
                        {/* <Grid lg={4}>
                            <Radar data={datas} height={100} />
                        </Grid> */}
                        {/* <Grid lg={4}>
                            <PolarArea data={datas} height={100} />
                        </Grid> */}
                    </Grid>

                </Box>
            </Box>
        </>
    );


}
export default Dasboard;