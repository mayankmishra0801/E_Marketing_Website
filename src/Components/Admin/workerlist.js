import { Box, Button, Card, CardContent, CardHeader, Divider, Fab, Grid, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MiniDrawer from "./Drawer";
import { styled, useTheme } from '@mui/material/styles';
import firebase from "firebase";
import { db, storageRef } from "../../firebase";
import { Delete, Edit, ProductionQuantityLimits, WorkOutlineRounded } from "@mui/icons-material";

function Workerlist() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        marginTop: '0px',
    }));

    const [image, setimage] = useState();
    const [image2, setimage2] = useState();

    function workerform(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        let name = data.get('name');
        let email = data.get('email');
        let password = data.get('password');
        db.collection('Workerlist').where('Email', '==', email).get().then((succ) => {
            if (succ.size > 0) {
                alert('Sorry this email is already exits')
            } else {


                var uploadTask = storageRef.ref().child(' workerimages/' + name).put(image);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);

                            var uploadTask2 = storageRef.ref().child(' workerid/' + name).put(image2);
                            uploadTask2.on('state_changed',
                                (snapshot) => {
                                    var progress2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress2 + '% done');
                                    switch (snapshot.state) {
                                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                                            console.log('Upload is paused');
                                            break;
                                        case firebase.storage.TaskState.RUNNING: // or 'running'
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                (error) => {
                                },
                                () => {
                                    uploadTask2.snapshot.ref.getDownloadURL().then((downloadURL2) => {
                                        console.log('File available at', downloadURL2);
                                        db.collection('Workerlist').add({
                                            Name: name,
                                            Email: email,
                                            Password: password,
                                            Image: downloadURL,
                                            Image2: downloadURL2,
                                        }).then((succ) => {
                                            alert('Data is added');
                                            e.target.reset();
                                        }).catch((err) => {
                                            alert('Something Went wrong');
                                        })

                                    });
                                }
                            );

                        });
                    }
                );
            }
        })
    }

    const [data, setdata] = useState([]);
    function fetchdata() {
        db.collection('Workerlist').onSnapshot((succ) => {
            const ar = [];
            succ.forEach((succc) => {
                ar.push(succc);
            })
            setdata(ar);
        })
    }

    useEffect(() => {
        fetchdata();
    }, [])


    function del(e) {
        if (window.confirm('Do you want to delete it')) {
            db.collection('Workerlist').doc(e.id).delete();
            storageRef.refFromURL(e.data().Image).delete();
            storageRef.refFromURL(e.data().Image2).delete();
            alert('This worker profile is deleted');
        }
    }

    const [open, setOpen] = useState(false);

    function openmodal() {
        setOpen(true);
    }

    return (
        <>
            <Box style={{ display: 'flex' }}>
                <MiniDrawer />
                <Box sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    <Grid className="bg13">
                    <Grid container >
                        <Tooltip arrow title='Add Worker'>
                            <Fab onClick={openmodal} color="secondary" style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
                                <WorkOutlineRounded />
                            </Fab>
                        </Tooltip>


                        <Grid lg={8} style={{ margin: 'auto' }}>
                            <CardContent>
                                <Card><CardContent><Typography variant="h4" style={{ textAlign: 'center' }} color={'primary'}>Worker Details</Typography></CardContent>
                                    <Divider />
                                    <TableContainer>
                                        <Table >
                                            <TableHead>
                                                <TableRow style={{ textAlign: 'center' }}>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Idproof</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>Password</TableCell>
                                                    <TableCell>Action1</TableCell>
                                                    <TableCell>Action2</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map((row) => (
                                                    <TableRow style={{ textAlign: 'center' }} key={row.id} >
                                                        <TableCell><img src={row.data().Image} style={{ height: '100px', width: '100px' }} /></TableCell>
                                                        <TableCell><img src={row.data().Image2} style={{ height: '100px', width: '100px' }} /></TableCell>
                                                        <TableCell>{row.data().Name}</TableCell>
                                                        <TableCell>{row.data().Email}</TableCell>
                                                        <TableCell>{row.data().Password}</TableCell>
                                                        <TableCell>
                                                            <IconButton color="primary"><Edit /></IconButton></TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={() => del(row)} color="primary"><Delete /></IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                </Card>
                            </CardContent>
                        </Grid>

                        <Modal open={open} onClose={() => setOpen(false)}>

                            <Grid lg={4}>
                                <CardContent>
                                    <Card>
                                        <CardHeader title="workerlist" />
                                        <form onSubmit={workerform}>
                                            <CardContent>
                                                <TextField type={'text'} label="Name" name="name" fullWidth size="small" required />
                                            </CardContent>
                                            <CardContent>
                                                <TextField type={'email'} label="Email" name="email" fullWidth size="small" required />
                                            </CardContent>
                                            <CardContent>
                                                <TextField type={'password'} label="Password" name="password" fullWidth size="small" required />
                                            </CardContent>
                                            <CardContent>
                                                <TextField type={'file'} helperText="Upload your image*" name="image" onChange={(e) => setimage(e.target.files[0])} fullWidth size="small" required />
                                            </CardContent>
                                            <CardContent>
                                                <TextField type={'file'} helperText="Upload your Idproof*" name="image2" onChange={(e) => setimage2(e.target.files[0])} fullWidth size="small" required />
                                            </CardContent>
                                            <CardContent>
                                                <Button variant="contained" type="submit" fullWidth>Submit</Button>
                                            </CardContent>
                                        </form>
                                    </Card>
                                </CardContent>
                            </Grid>
                        </Modal>

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
export default Workerlist;