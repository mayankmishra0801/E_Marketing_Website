import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Avatar, Button, Card, CardContent, FormControl, CardHeader, FormGroup, Grid, IconButton, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, Modal, Select, MenuItem, InputLabel, Fab, Typography, Tooltip } from "@mui/material";

import { db, product, storageRef } from "../../firebase";
import { Category, CategoryOutlined, CategoryRounded, Close, Delete, Edit, ProductionQuantityLimits, ShoppingBagTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MiniDrawer from "./Drawer";
import { styled, useTheme } from '@mui/material/styles';

function Productlist() {
    var navi = useNavigate();

    const [succes, setsucces] = useState(false);
    const [mess, setmess] = useState('');


    const submitform = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let name = data.get('name').toLocaleLowerCase();
        let sell = parseFloat(data.get('sell'));
        let cost = parseFloat(data.get('cost'))
        let brand = data.get('brand');
        let category = data.get('category')
        let description = data.get('description');
        let mrp = parseFloat(data.get('mrp'));
        let barcode = data.get('barcode')
        let stock = parseFloat(data.get('stock'));

        console.log(image);

        product.where('Name', '==', name).get().then((succ) => {

            if (succ.size > 0) {
                setmess('Product already exist');
                setsucces(true);
                console.log(succ.size);
            } else {

                let ar_name = name.split(' ');
                console.log(ar_name);
                let new_ar = [];

                for (let i = 0; i < ar_name.length; i++) {
                    const element = ar_name[i];
                    console.log(ar_name[i]);
                    var new_ar2 = [];
                    console.log(element.length);
                    for (let j = 1; j <= element.length; j++) {
                        const sub_element = element.slice(0, j);
                        console.log(sub_element);
                        new_ar2.push(sub_element);
                    }
                    new_ar.push(new_ar2);
                }
                console.log(new_ar);
                let filter_arr = new_ar.flat(Infinity);
                console.log(filter_arr);
                let uploadTask = storageRef.ref().child('images/' + name).put(image);
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
                        // Handle unsuccessful uploads
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            product.add({
                                Name: name,
                                Sell: sell,
                                Cost: cost,
                                keyword: filter_arr,
                                Brand: brand,
                                Description: description,
                                Stock: stock,
                                MRP: mrp,
                                Barcode: barcode,
                                Category: category,
                                Image: downloadURL,
                            }).then((succ) => {
                                alert('Product added');
                                setOpen1(false);
                                e.target.reset();
                                e.target.name.focus();
                            }).catch((err) => {
                                alert('Something went wrong');
                            })

                        });
                    }
                );

            }
        })

    }

    const [data, setdata] = useState([]);

    function fetchdata() {
        product.onSnapshot((succ) => {
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

    const [datas, setdatas] = useState([])
    function fetchdata1() {
        db.collection('Category').onSnapshot((succ) => {
            const ar = [];
            succ.forEach((succc) => {
                ar.push(succc);
            })
            setdatas(ar);
        })

    }

    useEffect(() => {
        fetchdata1();
    }, [])


    function del(e) {
        if (window.confirm('Do you want to delete')) {
            product.doc(e.id).delete();
            storageRef.refFromURL(e.data().Image).delete();
            alert('product deleted');
            console.log(e);
        }
    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        marginTop: "8px"
    }));

    const [open, setOpen] = useState(false);

    const handleclose = () => setOpen(false);

    const [open1, setOpen1] = useState(false);

    const handleclose1 = () => setOpen1(false);

    const openmodal = () => {
        setOpen1(true);
    }

    const [open2, setopen2] = useState(false);
    const openmodal2 = () => {
        setopen2(true);
    }


    function addcategory(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        db.collection('Category').add({
            CategoryName: data.get('category')
        }).then((succ) => {
            e.target.reset();
            alert('Category added');
            setopen2(false);
        }).catch((err) => {
            alert('something went wrong');
        })
    }

    function catdel(e) {
        if (window.confirm('Do you want to delete')) {
            db.collection('Category').doc(e).delete();
            alert('Category deleted');
        }
    }
    const [catdata, setcatdata] = useState([])
    function datacat() {
        db.collection('Category').onSnapshot((succ) => {
            var ar = [];
            succ.forEach((succc) => {
                ar.push(succc);
            })
            setcatdata(ar);
        })
    }

    useEffect(() => {
        datacat();
    }, [])

    const [catopen, setcatopen] = useState(false);
    const [editcat, seteditcat] = useState();
    const [editval, seteditval] = useState();
    function catmodal(x) {
        seteditval(x.data().CategoryName);
        seteditcat(x);
        setcatopen(true);
    }

    function submitupdate(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var id = data.get('id');
        var cat = data.get('catname');
        db.collection('Category').doc(id).update({
            CategoryName: cat
        }).then((succ) => {
            alert('Updated');
            setcatopen(false);
        })
    }


    const [name, setname] = useState();
    const [sell, setsell] = useState();
    const [cost, setcost] = useState();
    const [brand, setbrand] = useState();
    const [category, setcategory] = useState();
    const [stock, setstock] = useState();
    const [description, setdescription] = useState();
    const [mrp, setmrp] = useState();
    const [barcode, setbarcode] = useState();
    const [image, setimage] = useState();

    const [editdata, seteditdata] = useState();

    const edit = (x) => {
        setname(x.data().Name);
        setsell(x.data().Sell);
        setcost(x.data().Cost);
        setbrand(x.data().Brand);
        setcategory(x.data().Category);
        setstock(x.data().Stock);
        setdescription(x.data().Description);
        setmrp(x.data().MRP)
        setbarcode(x.data().Barcode);
        setimage(x.data().Image)
        seteditdata(x)
        setOpen(true);
    }

    const editform = (e) => {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var id = data.get('id');
        var name = data.get('name').toLocaleLowerCase();

        let ar_name = name.split(' ');
        console.log(ar_name);
        let new_ar = [];

        for (let i = 0; i < ar_name.length; i++) {
            const element = ar_name[i];
            console.log(ar_name[i]);
            var new_ar2 = [];
            console.log(element.length);
            for (let j = 1; j <= element.length; j++) {
                const sub_element = element.slice(0, j);
                console.log(sub_element);
                new_ar2.push(sub_element);
            }
            new_ar.push(new_ar2);
        }
        console.log(new_ar);
        let filter_arr = new_ar.flat(Infinity);
        console.log(filter_arr);

        product.doc(id).update({
            Name: data.get('name'),
            Sell: parseFloat(data.get('sell')),
            keyword: filter_arr,
            MRP: parseFloat(data.get('mrp')),
            Barcode: data.get('barcode'),
            Brand: data.get('brand'),
            Category: data.get('category'),
            Stock: parseFloat(data.get('stock')),
            Cost: parseFloat(data.get('cost')),
            Description: data.get('description'),

        }).then((succ) => {
            alert('Product Updated');
            setOpen(false);
            navi('/Productlist');
            e.target.reset();
        }).catch((err) => {
            alert('Something went wrong ');
        })

    }

    function upic(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var id = data.get('id')
        var storageRe = storageRef.ref('images/' + name).put(image);
        storageRe.then((succ) => {
            storageRe.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                product.doc(id).update({
                    Image: downloadURL,
                }).then((succc) => {
                    alert('Product image updated');
                    setimage(downloadURL);
                    e.target.reset();
                })

            })
        })
    }

    return (

        <>

            <Box sx={{ display: "flex" }}>
                <MiniDrawer />
                <Box className="bg13" sx={{ flexGrow: 1 }}>

                    <DrawerHeader />

                    <Grid container  >
                        <Tooltip arrow title='Add product'>
                            <Fab onClick={openmodal} color="secondary" style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
                                <ProductionQuantityLimits />
                            </Fab>
                        </Tooltip>

                        <Tooltip arrow title='Add category'>
                            <Fab onClick={openmodal2} color="primary" style={{ position: 'fixed', left: '100px', bottom: '20px' }}>
                                <CategoryOutlined />
                            </Fab>
                        </Tooltip>
                        <Modal open={open1} onClose={handleclose1}>
                            <Grid lg={6}  md={6} sm={6} xs={6} style={{ margin: 'auto' }} >
                                <CardContent>
                                    <Card>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: 'royalblue' }}><ShoppingBagTwoTone /></Avatar>}
                                            title="Add Product"
                                        />
                                        <Button className="close" style={{ marginTop: '-60PX' }}><IconButton onClick={handleclose1}><Close /></IconButton></Button>
                                        <form onSubmit={submitform}>
                                            <Grid container>

                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>

                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label" name="category" required>Category</InputLabel>

                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    size="small"
                                                                    label="Category"
                                                                    required
                                                                    name="category"

                                                                >{catdata.map((row) => (
                                                                    <MenuItem value={row.data().CategoryName}>{row.data().CategoryName}</MenuItem>
                                                                ))}
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'text'} name="name" label="Product name" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={6}   md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'text'} name="brand" label="Brand" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'number'} name="sell" label="Selling price" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'number'} name="cost" label="Cost price" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>
                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'text'} name="description" label="Description" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'text'} name="mrp" label="MRP" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'text'} name="barcode" label="Barcode" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <FormGroup>
                                                            <TextField fullWidth type={'number'} name="stock" label="Stock" size="small" required />
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>
                                                <Grid lg={6}  md={12} sm={12} xs={12}>
                                                    <CardContent>
                                                        <TextField onChange={(e) => setimage(e.target.files[0])} size='small' type={'file'} name="image" fullWidth />
                                                    </CardContent>
                                                </Grid>

                                                <Grid lg={12 } md={12} sm={12} xs={12} >
                                                    <CardContent>
                                                        <FormGroup>
                                                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                                                        </FormGroup>
                                                    </CardContent>
                                                </Grid>
                                            </Grid>
                                        </form>


                                    </Card>
                                </CardContent>
                            </Grid>
                        </Modal>


                        <Modal aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description" open={open} onClose={handleclose}>

                            <Grid lg={8}  md={8} sm={8} xs={8} style={{ margin: 'auto' }}>
                                <Grid container>
                                    <CardContent>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar sx={{ bgcolor: 'royalblue' }}><Edit /></Avatar>}
                                                title="Edit details"
                                            />


                                            <Button className="close" style={{ marginTop: '-60PX' }}><IconButton onClick={handleclose}><Close /></IconButton></Button>

                                            <Grid container>
                                                {editdata && (<>
                                                    <Grid lg={8}   md={8} sm={8} xs={8}>

                                                        <CardContent>
                                                            <form onSubmit={editform}>
                                                                <input type={'hidden'} name='id' value={editdata.id} />
                                                                <Grid container >
                                                                    <Grid lg={6}  md={12} sm={12} xs={12}>
                                                                        <CardContent>
                                                                            <FormGroup>

                                                                                <FormControl fullWidth>
                                                                                    <InputLabel id="demo-simple-select-label" name="category" required>Category</InputLabel>
                                                                                    <Select
                                                                                        labelId="demo-simple-select-label"
                                                                                        id="demo-simple-select"
                                                                                        size="small"
                                                                                        label="Category"
                                                                                        required
                                                                                        name="category"
                                                                                        value={category}
                                                                                        onChange={(e) => setcategory(e.target.value)}
                                                                                    >
                                                                                        <MenuItem value={'Fruits'}>Fruits</MenuItem>
                                                                                        <MenuItem value={'Vegetables'}>Vegetables</MenuItem>
                                                                                        <MenuItem value={'Beverages'}>Beverages</MenuItem>
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>

                                                                    <Grid lg={6}  md={6} sm={6} xs={6} >
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'text'} name="name" label="Product name" value={name} onChange={(e) => setname(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>

                                                                    <Grid lg={6}   md={6} sm={6} xs={6}>
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'text'} name="brand" label="Brand" value={brand} onChange={(e) => setbrand(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>

                                                                    <Grid lg={6}  md={6} sm={6} xs={6}>
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'number'} name="sell" label="Selling price" value={sell} onChange={(e) => setsell(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>

                                                                    <Grid lg={6}  md={6} sm={6} xs={6}>
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'number'} name="cost" label="Cost price" value={cost} onChange={(e) => setcost(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>

                                                                    <Grid lg={6}  md={6} sm={6} xs={6}>
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'text'} name="description" label="Description" value={description} onChange={(e) => setdescription(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>

                                                                    <Grid lg={6}  md={6} sm={6} xs={6} >
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'text'} name="mrp" label="MRP" value={mrp} onChange={(e) => setmrp(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>

                                                                    <Grid lg={6}  md={6} sm={6} xs={6}>
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'text'} name="barcode" label="Barcode" value={barcode} onChange={(e) => setbarcode(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>


                                                                    <Grid lg={6}  md={6} sm={6} xs={6} >
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <TextField fullWidth type={'number'} name="stock" label="Stock" value={stock} onChange={(e) => setstock(e.target.value)} size="small" required />
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>



                                                                    <Grid lg={12 }  md={12} sm={12} xs={12}>
                                                                        <CardContent>
                                                                            <FormGroup>
                                                                                <Button variant="contained" color="primary" type="submit">Update</Button>
                                                                            </FormGroup>
                                                                        </CardContent>
                                                                    </Grid>
                                                                </Grid>
                                                            </form>
                                                        </CardContent>

                                                    </Grid>
                                                    <Grid lg={4} sm={8} md={8} xs={8}>
                                                        <CardContent>
                                                            <form onSubmit={upic}>
                                                                <input type={'hidden'} name='id' value={editdata.id} />
                                                                <CardContent>
                                                                    <img src={image} style={{ height: "150px", width: '90%' }} />
                                                                    <TextField fullWidth onChange={(e) => setimage(e.target.files[0])} size="small" type={'file'} />
                                                                </CardContent>
                                                                <CardContent>
                                                                    <Button type="submit" variant="contained">update</Button>
                                                                </CardContent>
                                                            </form>
                                                        </CardContent>
                                                    </Grid>
                                                </>)}
                                            </Grid>

                                        </Card>
                                    </CardContent>

                                </Grid>


                            </Grid>

                        </Modal>

                        <Grid lg={12} sm={12} md={12} xs={12} style={{ margin: "auto" }}>
                            <CardContent>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h4" className="txt" color={'blueviolet'}>Products Details</Typography>
                                    </CardContent>
                                </Card>
                            </CardContent>

                            <CardContent>
                                <Card>
                                    <CardContent>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Image</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Brand</TableCell>
                                                        <TableCell>Category</TableCell>
                                                        <TableCell> Sell Price</TableCell>
                                                        <TableCell>Stock(in kgs)</TableCell>
                                                        <TableCell>MRP</TableCell>
                                                        <TableCell>Barcode</TableCell>
                                                        <TableCell>Description</TableCell>
                                                        <TableCell>Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.map((row) => (
                                                        <TableRow key={row.id} >
                                                            <TableCell><img src={row.data().Image} height="100px" /></TableCell>
                                                            <TableCell>{row.data().Name}</TableCell>
                                                            <TableCell>{row.data().Brand}</TableCell>
                                                            <TableCell>{row.data().Category}</TableCell>
                                                            <TableCell>{row.data().Sell}</TableCell>
                                                            <TableCell>{row.data().Stock}</TableCell>
                                                            <TableCell>{row.data().MRP}</TableCell>
                                                            <TableCell>{row.data().Barcode}</TableCell>
                                                            <TableCell>{row.data().Description}</TableCell>
                                                            <TableCell>
                                                                <IconButton onClick={() => edit(row)} color="primary"><Edit /></IconButton>
                                                                <IconButton onClick={() => del(row)} color="primary"><Delete /></IconButton>
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

                        <Modal open={open2} onClose={() => setopen2(false)}>

                            <CardContent style={{ marginLeft: 'auto' }}>
                                <Card>
                                    <Grid container >

                                        <Grid lg={4} md={8} sm={8} xs={8} style={{ marginTop: '10px', marginLeft: '50px' }}>
                                            <CardContent>
                                                <Card>
                                                    <CardContent>

                                                        <CardHeader avatar={<Avatar style={{ background: '#3f51b5' }}><IconButton color="inherit"><CategoryRounded /></IconButton></Avatar>} title={'ADD Category'} />
                                                        <Button className="close" style={{ marginTop: '-60PX' }}><IconButton onClick={() => setopen2(false)}><Close /></IconButton></Button>
                                                        <form onSubmit={addcategory}>
                                                            <CardContent>


                                                                <TextField fullWidth type={'text'} name='category' label='Product Category' size="small" required />
                                                                <br /><br />
                                                                <Button variant="contained" type="submit">add category</Button>
                                                            </CardContent>
                                                        </form>

                                                    </CardContent>
                                                </Card>
                                            </CardContent>
                                        </Grid>

                                        <Grid lg={6}  md={12} sm={12} xs={12} style={{ marginTop: '10px', marginLeft: '50px' }}>
                                            <CardContent>
                                                <Card>
                                                    <CardContent>
                                                        <TableContainer>
                                                            <Typography variant="h4" color={'blueviolet'}>Add Category</Typography>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>CategoryName</TableCell>
                                                                        <TableCell>Action1</TableCell>
                                                                        <TableCell>Action2</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {datas.map((row) => (
                                                                        <TableRow key={row.id}>
                                                                            <TableCell>{row.data().CategoryName}</TableCell>
                                                                            <TableCell><IconButton color="primary" onClick={() => catmodal(row)}><Edit /></IconButton></TableCell>
                                                                            <TableCell><IconButton onClick={() => catdel(row.id)} color="primary"><Delete /></IconButton></TableCell>
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
                                </Card>
                            </CardContent>

                        </Modal>

                        <Modal open={catopen} onClose={() => setcatopen(false)}>
                            <Grid lg={4} md={8} sm={8} xs={8}style={{ margin: 'auto' }}>
                                <CardContent>

                                    {editcat && (
                                        <Card>
                                            <CardHeader title="Edit Category"></CardHeader>
                                            <CardContent>
                                                <form method="post" onSubmit={submitupdate}>
                                                    <input type={'hidden'} name='id' value={editcat.id} />
                                                    <TextField type={'text'} label='Category' name="catname" onChange={(e) => seteditval(e.target.value)} value={editval} required fullWidth size="small" />
                                                    <br /><br />
                                                    <Button variant="contained" type={'submit'} value={editcat.data().CategoryName} required fullWidth size="small">Update</Button>
                                                </form>
                                            </CardContent>
                                        </Card>
                                    )}
                                </CardContent>
                            </Grid>
                        </Modal>


                    </Grid>
                </Box>
            </Box>
        </>
    )

}

export default Productlist;