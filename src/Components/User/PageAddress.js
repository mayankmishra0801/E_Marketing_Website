import { Avatar, Box, Button, Card, CardContent, CardHeader, FormGroup, Grid, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Usernavbar from "./UserNavbar";
import { styled, useTheme } from '@mui/material/styles';
import { db } from "../../firebase";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function PageAddress() {

    var navi = useNavigate();

    var uid = localStorage.getItem('userlogin')

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


    function submitAD(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        let name = data.get('name');
        let contact = data.get('contact');
        let street = data.get('street');
        let city = data.get('city');
        let state = data.get('state');
        let pincode = data.get('pincode');

        db.collection('Address').add({

            Name: name,
            Contact: contact,
            Street: street,
            City: city,
            State: state,
            Pincode: pincode,
            UID: uid
        }).then((succ) => {
            alert('addres is added');
            e.target.reset();
        }).catch((err) => {
            alert('something went wrong');
        })

    }

    const [data, setdata] = useState([]);

    function fetchdata() {
        db.collection('Address').where('UID', '==', uid).onSnapshot((succ) => {
            const ar = [];
            succ.forEach((succc) => {
                ar.push(succc)
            })
            setdata(ar);
        })
    }

    useEffect(() => {
        fetchdata();
    }, [])




    function del(e) {
        if (window.confirm('Do you want to delete')) {
            db.collection('Address').doc(e.id).delete();
            alert('product deleted');
            console.log(e);
        }
    }


    function sel(x) {
        localStorage.setItem('aid', x.id);
        var path = "/Payment?uid=" + x.id;
        navi(path)

    }

    const [open, setopen] = useState(false);
    const [editdata, seteditdata] = useState();
    const [name, setname] = useState();
    const [contact, setcontact] = useState();
    const [street, setstreet] = useState();
    const [city, setcity] = useState();
    const [state, setstate] = useState();
    const [pincode, setpincode] = useState();


    const edit = (x) => {
        seteditdata(x);
        setname(x.data().Name);
        setcontact(x.data().Contact);
        setstreet(x.data().Street);
        setcity(x.data().City);
        setstate(x.data().State);
        setpincode(x.data().Pincode);
        setopen(true);
    }

    function editform(e) {
        e.preventDefault()
        var data = new FormData(e.currentTarget);
        var id = data.get('id');
        let name = data.get('name');
        console.log(name);
        db.collection('Address').doc(id).update({
            Name: data.get('name'),
            Contact: data.get('contact'),
            Street: data.get('street'),
            City: data.get('city'),
            State: data.get('state'),
            Pincode: data.get('pincode'),
        }).then((succ) => {
            alert('Address updated');
            e.target.reset();
            setopen(false)
        }).catch((err) => {
            alert('something went wrong');
        })
    }

    return (
        <>
            <Box style={{ display: 'flex' }}>
                <Usernavbar />
                <Box sx={{ flexGrow: 1, p: 2 }} className='bg16' >
                    <DrawerHeader />
                    <Grid container >

                        <Grid lg={4} md={8} sm={8} xs={8} >
                            <CardContent>
                                <Card>
                                    <form onSubmit={submitAD}>
                                        <CardHeader title="Add New Address " />

                                        <CardContent>
                                            <TextField type={'text'} fullWidth size="small" name="name" label="Name" required />
                                        </CardContent>

                                        <CardContent>
                                            <TextField type={'text'} fullWidth size="small" name="contact" label="Contact" required />
                                        </CardContent>

                                        <CardContent>
                                            <TextField type={'text'} fullWidth size="small" name="street" label="street Address" required />
                                        </CardContent>

                                        <CardContent>
                                            <TextField type={'text'} fullWidth size="small" name="city" label="City" required />
                                        </CardContent>

                                        <CardContent>
                                            <TextField type={'text'} fullWidth size="small" name="state" label="State" required />
                                        </CardContent>

                                        <CardContent>
                                            <TextField type={'number'} fullWidth size="small" name="pincode" label="Pincode" required />
                                        </CardContent>

                                        <CardContent>
                                            <Button type="submit" variant="contained">submit</Button>
                                        </CardContent>
                                    </form>
                                </Card>
                            </CardContent>

                        </Grid>

                        <Grid lg={8} >
                            <CardContent >
                                <Card>

                                    <TableContainer>
                                        <Typography className="txt" variant="h4" color={'blueviolet'}>Address</Typography>
                                        <Table>
                                            <TableHead>
                                                <TableRow>

                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Contact</TableCell>
                                                    <TableCell>Street</TableCell>
                                                    <TableCell>City</TableCell>
                                                    <TableCell>State</TableCell>
                                                    <TableCell>Pincode</TableCell>
                                                    <TableCell>Action1</TableCell>
                                                    <TableCell>Action2</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map((row) => (
                                                    <TableRow key={row.id} >
                                                        <TableCell>{row.data().Name}</TableCell>
                                                        <TableCell>{row.data().Contact}</TableCell>
                                                        <TableCell>{row.data().Street}</TableCell>
                                                        <TableCell>{row.data().City}</TableCell>
                                                        <TableCell>{row.data().State}</TableCell>
                                                        <TableCell>{row.data().Pincode}</TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={() => edit(row)} color="primary"><Edit /></IconButton>
                                                            <IconButton onClick={() => del(row)} color="primary"><Delete /></IconButton>
                                                        </TableCell>
                                                        <TableCell><Button variant="contained" onClick={() => sel(row)}>select</Button></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                </Card>
                            </CardContent>
                        </Grid>

                        <Modal aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description" open={open} onClose={() => setopen(false)}>
                            <Grid lg={5} md={10} sm={10} xs={10} style={{ margin: 'auto' }}>

                                <CardContent>
                                    <Card>


                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: 'royalblue' }}><Edit /></Avatar>}
                                            title="Edit details"
                                        />


                                        <Button className="close" style={{ marginTop: '-60PX' }}><IconButton onClick={() => setopen(false)}><Close /></IconButton></Button>

                                        {editdata && (<>
                                            <CardContent>
                                                <form onSubmit={editform}>
                                                    <input type={'hidden'} name='id' value={editdata.id} />
                                                    <Grid lg={12} >
                                                        <CardContent>
                                                            <FormGroup>
                                                                <TextField fullWidth type={'text'} name="name" label="Product name" value={name} onChange={(e) => setname(e.target.value)} size="small" required />
                                                            </FormGroup>
                                                        </CardContent>
                                                    </Grid>

                                                    <Grid lg={12} >
                                                        <CardContent>
                                                            <FormGroup>
                                                                <TextField fullWidth type={'text'} name="contact" label="Contact" value={contact} onChange={(e) => setcontact(e.target.value)} size="small" required />
                                                            </FormGroup>
                                                        </CardContent>
                                                    </Grid>

                                                    <Grid lg={12}>
                                                        <CardContent>
                                                            <FormGroup>
                                                                <TextField fullWidth type={'text'} name="street" label="Street" value={street} onChange={(e) => setstreet(e.target.value)} size="small" required />
                                                            </FormGroup>
                                                        </CardContent>
                                                    </Grid>

                                                    <Grid lg={12}>
                                                        <CardContent>
                                                            <FormGroup>
                                                                <TextField fullWidth type={'text'} name="city" label="City" value={city} onChange={(e) => setcity(e.target.value)} size="small" required />
                                                            </FormGroup>
                                                        </CardContent>
                                                    </Grid>

                                                    <Grid lg={12}>
                                                        <CardContent>
                                                            <FormGroup>
                                                                <TextField fullWidth type={'text'} name="state" label="State" value={state} onChange={(e) => setstate(e.target.value)} size="small" required />
                                                            </FormGroup>
                                                        </CardContent>
                                                    </Grid>

                                                    <Grid lg={12}>
                                                        <CardContent>
                                                            <FormGroup>
                                                                <TextField fullWidth type={'text'} name="pincode" label="Pincode" value={pincode} onChange={(e) => setpincode(e.target.value)} size="small" required />
                                                            </FormGroup>
                                                        </CardContent>
                                                    </Grid>

                                                    <Grid lg={12}>
                                                        <CardContent>
                                                            <FormGroup>
                                                                <Button variant="contained" color="primary" type="submit">Update</Button>
                                                            </FormGroup>
                                                        </CardContent>
                                                    </Grid>


                                                </form>
                                            </CardContent>
                                        </>)}



                                    </Card>
                                </CardContent>

                            </Grid>
                        </Modal>


                    </Grid>

                </Box>
            </Box>
        </>
    )
}

export default PageAddress;