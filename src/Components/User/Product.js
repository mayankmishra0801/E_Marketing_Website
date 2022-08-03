import {  Box, Button, ButtonGroup, Card, CardContent, Divider, Grid,  IconButton,  InputBase,  Modal, Paper } from "@mui/material";
import React, {  useEffect, useState } from "react";
import fries from './../../images/fries.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Usernavbar from "./UserNavbar";
import slider from './../../images/offer1.webp';
import slider1 from './../../images/offer2.webp';
import slider2 from './../../images/offer3.webp';
import { styled, useTheme} from '@mui/material/styles';
import { Category, Search, ViewAgenda } from "@mui/icons-material";
import firebase from "firebase";
import { db, product } from "../../firebase";

function Product() {
    var navi = useNavigate();


    var uid = localStorage.getItem('userlogin');
    var name = localStorage.getItem('Uname')

    const [open, setopen] = useState(false);
    const [onedata, setonedata] = useState();

    function openmodal(x) {
        setonedata(x);
        setopen(true);
        
        
    }

    function close() {
        setopen(false);
        
    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
      
    
      const [data, setdata] = useState([]);

      let catid = new URLSearchParams(window.location.search).get('id');

      console.log(catid);

      function fetchdata(x){
        var query = ''
        if(x){
            query = product.where('Category','==',catid).where('keyword', 'array-contains', x);
        }else{
            query = product.where('Category','==',catid);
        }
          query.onSnapshot((succ)=>{
              const ar =[];
              succ.forEach((succc)=>{
                  ar.push(succc);
              })
              setdata(ar);
          })
      }
      
      useEffect(()=>{
          fetchdata();
      },[catid])
      



function addtocart(x){
    db.collection('Uregister').doc(uid).collection('mycart').where('Product_id','==',x.id).get().then((succ) => {
        if(succ.size > 0){
            alert('This Product is already in cart');
        }else{
            db.collection('Uregister').doc(uid).collection('mycart').add({
                Product:x.data(),
                Amount:1,
                Product_id: x.id
            }).then((succ) => {
                alert('Product Added to Cart');
            })        
        }
    })
}


return (
<>

<Box style={{display:'flex',background:'whitesmoke'}}>
    <Usernavbar/>
    <Box sx={{flexGrow:1,p:0}}>
        <DrawerHeader/>
        
            <Grid container>
               
               <Grid lg={12} md={12} sm={12} xs={12}> 
            <Paper component='form' style={{margin:'auto',width:'50%',marginTop:'20px'}}>
                                    <InputBase 
                                        sx={{p:1}}
                                        placeholder="Search your Product here .. . . "
                                        onKeyUp={(e) => fetchdata(e.target.value)}
                                    />
                                </Paper>
                                </Grid>           
                                

                {data.map((row)=>(               
                    <Grid lg={3} md={6} sm={6} xs={6} key={row.id}>
                        <CardContent >
                            <Card style={{width:'90%'}}>
                                <CardContent >
                                    <img 
                                        title="View Details" 
                                        onClick={() => openmodal(row)} 
                                        style={{ height: '220px', width: '100%', cursor:'pointer' }} 
                                        src={row.data().Image} />
                                    <Typography style={{textTransform:'capitalize'}} variant="h6" >{row.data().Name}</Typography>
                                    <Typography> <span style={{color:'green', fontWeight:'bold'}}>₹{row.data().Sell}/kg</span>&nbsp;<del style={{ fontSize: '14px',color:'grey' }}>₹{row.data().MRP}</del></Typography>
                                    <br/>
                                    <div className="center">
                                    <Button fullWidth onClick={() => addtocart(row)} variant="contained">Add to Cart</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Grid>
                ))}
{/*---------------- product modal open onclick-------------------------------- */}
                <Modal sx={{mt:5}} open={open} onClose={close}>
                    <Grid lg={6} md={12} sm={12} xs={12} style={{ margin: 'auto'}}>
                        <Card>
                            {onedata && (
                            <Grid container>
                                <Grid lg={6} md={12} sm={12} xs={12}>
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
                                <Grid lg={6} md={12} sm={12} xs={12}>
                                    <CardContent>
                                        <button className="close" onClick={close}>x</button>
                                        <Typography variant="h4">{onedata.data().Name}</Typography>
                                        <Typography variant="h6"><span style={{color:'green', fontWeight:'bold'}}> ₹{onedata.data().Sell}/kg </span> <del style={{ fontSize: '14px', color:'grey' }}>₹{onedata.data().Cost}</del></Typography><br/>
                                        <Typography variant="body2">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                                            neque doloribus, cupiditate numquam dignissimos laborum fu  iat deleniti? Eum
                                            quasi quidem quibusdam.
                                        </Typography><br/>
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

export default Product;

