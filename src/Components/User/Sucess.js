import { Done } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, FormGroup, Grid, Icon, Modal, Paper, Rating, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Usernavbar from "./UserNavbar";

function Success() {

    function submitdata2() {

    }

    const [open2, setopen2] = useState(false);

    function openmodal() {
        setopen2(true);
    }
    function closemodal() {
        setopen2(false);
    }




    return (<>
        <Box style={{ display: 'flex' }}>
            <Usernavbar />
            <Box sx={{ flexGrow: 1 }}>

                <Grid container  className="success">
                    <Grid lg={4}>


                        <Modal open={open2} onClose={closemodal}>
                            <Grid container>

                                <Grid lg={3} style={{ margin: 'auto' }}>
                                    <Paper style={{ marginTop: 40 }}>
                                        <CardContent>
                                            <Grid lg={12} >
                                                <Typography variant='h5' className="txt" >Feedback</Typography>
                                                <Typography>
                                                    <Button onClick={closemodal} sx={{ position: 'absolute', top: 55, right: 580 }}  >
                                                        x
                                                    </Button>
                                                </Typography>
                                                <form onSubmit={submitdata2} >

                                                    <FormGroup>
                                                        <Typography>
                                                            Quality
                                                        </Typography>
                                                        <Rating name="customized-10" />
                                                    </FormGroup>
                                                    &nbsp;

                                                    <FormGroup>
                                                        <Typography>
                                                            Variety
                                                        </Typography>
                                                        <Rating />
                                                    </FormGroup>
                                                    &nbsp;

                                                    <FormGroup>
                                                        <Typography>
                                                            Taste
                                                        </Typography>
                                                        <Rating />
                                                    </FormGroup>
                                                    &nbsp;


                                                    <FormGroup>
                                                        <Typography>
                                                            How was the service ?
                                                        </Typography>
                                                        <Rating />
                                                    </FormGroup>
                                                    &nbsp;


                                                    <FormGroup>
                                                        <Typography>
                                                            Overall Experience
                                                        </Typography>
                                                        <Rating />
                                                    </FormGroup>
                                                    &nbsp;

                                                    <FormGroup>
                                                        <Typography>
                                                            How like are you to recommend us to your friends and family ?
                                                        </Typography>
                                                        <Rating />
                                                    </FormGroup>
                                                    &nbsp;

                                                    <FormGroup>
                                                        <TextField
                                                            type='text' margin="dense" multiline name="name" label='Expirence' fullWidth size='small' required placeholder='' sx={{ bgcolor: 'white' }} />
                                                    </FormGroup>


                                                    <CardContent>
                                                        <Button variant="contained" className="btn1" name="submit" type="submit" fullWidth color="error" >Submit</Button>
                                                    </CardContent>

                                                </form>

                                            </Grid>
                                        </CardContent>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Modal>


                    </Grid>
                    <Grid lg={4} style={{ marginTop: '150px', background:'rbg(0,0,0,.5)'}}>
                        <CardContent>
                            <Box  style={{  background:'rgb(255,255,255,.85)',borderRadius:'15px'}} >
                                <CardContent >
                                    <Avatar sx={{ m: 3, margin: "auto", bgcolor: 'success.main', height: 70, width: 70 }}>
                                        <Done />
                                    </Avatar>
                                    <Grid style={{ margin: 'auto', textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ m: 2 }} color='green' className="txt" >
                                            Order Successful
                                        </Typography>

                                        <Typography color="gray" variant="h6" className="txt">
                                            Thank you so much for your Order.
                                        </Typography>
                                        <Typography variant="h6" sx={{ m: 2 }} color='' className="txt" >
                                            It will be delivered soon!
                                        </Typography>
                                        <br />
                                        <CardContent>

                                            <Link to='/Orderlist' style={{ textDecoration: "none" }}>
                                                <Button className="btn4" variant="contained" style={{ borderRadius: "5px", textDecoration: "none" }} color="success">
                                                    Check status
                                                </Button>
                                            </Link>
                                        </CardContent>

                                        <CardContent>

                                            <Button className="btn4" onClick={openmodal} variant="contained" style={{ borderRadius: "5px" }} color="primary">
                                                Add Feedback
                                            </Button>

                                        </CardContent>



                                    </Grid>

                                </CardContent>
                            </Box>
                        </CardContent>


                    </Grid>




                </Grid>

            </Box>
        </Box>

    </>)

}

export default Success;