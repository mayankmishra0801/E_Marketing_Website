import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Usernavbar from "./UserNavbar";
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Button, Card, CardContent, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MobileDatePicker } from "@mui/x-date-pickers";
import firebase from "firebase";
import { db, product } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Userlogin from "./Userlogin";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    marginTop: '40px'
}));

function Payment() {

    const [value, setValue] = React.useState('1');


    useEffect(() => {
        fetch();
    })

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };




    const [name, setname] = useState();
    const [conct, setconct] = useState();


    function fetch() {
        db.collection('Uregister').doc(uid).onSnapshot((succ) => {



            setname(succ.data().Name);
            console.log(succ.data().Name);
            setconct(succ.data().Contact);

        })
    }

    useEffect(() => {
        fetch();
    }, [])

    var uid = localStorage.getItem('userlogin');

    var cart = db.collection('Uregister').doc(uid).collection('mycart');

    const [data1, setdata1] = useState([]);
    const [size1, setsize1] = useState([]);
    const [osize1, setosize1] = useState([]);

    const [grand, setgrand] = useState();
    function fetchdata() {
        cart.get().then((succ) => {
            var ar = [];
            var ar1 = [];
            var ar2 = 0;
            succ.forEach((succc) => {
                ar.push(succc);
                ar1.push(succc.data().Product);
                var ar3 = succc.data().Product.Sell * succc.data().Amount;
                ar2 += parseFloat(ar3)
            })
            setdata1(ar1);
            setsize1(succ.size);
            setgrand(ar2)
        })
    }

    useEffect(() => {
        fetchdata();
    }, [])

    // var aid = localStorage.getItem('aid');
    // console.log(aid);

    var navi = useNavigate();

    function cresub(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        let ncredit = data.get('ncredit');
        let creno = data.get('creno');
        let cred = data.get('cred');
        let crep = data.get('crep')

        var d = new Date();

        var crepval = /^([0-9]{3})$/;

        if (ncredit == '' || creno == '' || cred == '' || crep == '') {
            alert('Please fill the all details');
        } else if (!crepval.test(crep)) {
            alert('Please fill only  3 numerical digits')
        } else {


            db.collection('Orders').get().then((succ) => {

                var count = 1;
                if (succ.size == 0) {

                } else {
                    count = succ.size
                    console.log(count);
                }
                var batch = db.batch();

                var ord = count;

                var str = "" + ord
                console.log(str);
                var pad = "0000"

                var ans = pad.substring(0, pad.length - str.length) + str
                var yer = d.getFullYear().toString();
                var y = yer.substring(2, 4);
                var oid = "OID" + y + "-" + ans;
                console.log(oid);
                var dd = String(d.getDate()).padStart(2, '0');
                var mm = String(d.getMonth() + 1).padStart(2, '0');
                var yyyy = d.getFullYear();
                var today = dd + '/' + mm + '/' + yyyy;
                var month = (d.getMonth() + 1);
                var year = d.getFullYear();
                cart.get().then((succ) => {
                    var ar = [];
                    var ar1 = [];
                    succ.forEach((succc) => {
                        ar.push(succc.data);
                        var obj = succc.data().Product;
                        var source = { Pro_id: succc.data().Product_id, Amount: succc.data().Amount }
                        Object.assign(obj, source)
                        ar1.push(obj);
                        var cr = cart.doc(succc.id);

                        console.log(succc.data().Amount);
                        console.log(succc.data().Product_id);

                        var uc = db.collection('Product').doc(succc.data().Product_id);
                        batch.update(uc, {
                            Stock: firebase.firestore.FieldValue.increment(-succc.data().Amount)
                        })
                        batch.delete(cr);
                    })
                    var u = db.collection('Uregister').doc(uid);
                    batch.update(u, {
                        Order: firebase.firestore.FieldValue.increment(1)
                    })


                    setdata1(ar1);
                    console.log(ar1);

                    var or = db.collection('Orders').doc();

                    var aid = localStorage.getItem('aid');
                    console.log(aid);
                    batch.set(or, {
                        OID: oid,
                        UID: uid,
                        AID: aid,
                        Item: size1,
                        Name: name,
                        Contact: conct,
                        Total: grand,
                        PaymentType: 'Credit Payment',
                        Date: today,
                        Month: month,
                        Year: year,
                        DateTime: firebase.firestore.FieldValue.serverTimestamp()
                    })

                    var orr = db.collection('Orders').doc(or.id).collection('Products').doc('AllProducts');

                    batch.set(orr, {
                        Data: ar1
                    })

                    batch.commit().then((succ) => {
                        alert('Success');
                        navi('/Success');
                    })



                })


            })


        }

    }

    function desub(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        let ndb = data.get('ndb');
        let dbno = data.get('dbno');
        let dbd = data.get('dbd');
        let dbp = data.get('dbp')

        var d = new Date();

        var dbpval = /^([0-9]{3})$/;

        if (ndb == '' || dbno == '' || dbd == '' || dbp == '') {
            alert('Please fill the all details');
        } else if (!dbpval.test(dbp)) {
            alert('Please fill only  3 numerical digits')
        } else {

            db.collection('Orders').get().then((succ) => {

                var count = 1;
                if (succ.size == 0) {

                } else {
                    count = succ.size
                }
                var batch = db.batch();

                var ord = count;

                var str = "" + ord
                console.log(str);
                var pad = "0000"

                var ans = pad.substring(0, pad.length - str.length) + str
                var yer = d.getFullYear().toString();
                var y = yer.substring(2, 4);
                var oid = "OID" + y + "-" + ans;
                console.log(oid);
                var dd = String(d.getDate()).padStart(2, '0');
                var mm = String(d.getMonth() + 1).padStart(2, '0');
                var yyyy = d.getFullYear();
                var today = dd + '/' + mm + '/' + yyyy;
                var month = (d.getMonth() + 1);
                var year = d.getFullYear();
                cart.get().then((succ) => {
                    var ar = [];
                    var ar1 = [];
                    succ.forEach((succc) => {
                        ar.push(succc.data);
                        var obj = succc.data().Product;
                        var source = { Pro_id: succc.data().Product_id, Amount: succc.data().Amount }
                        Object.assign(obj, source)
                        ar1.push(obj);
                        var cr = cart.doc(succc.id);

                        console.log(succc.data().Amount);
                        console.log(succc.data().Product_id);

                        var uc = db.collection('Product').doc(succc.data().Product_id);
                        batch.update(uc, {
                            Stock: firebase.firestore.FieldValue.increment(-succc.data().Amount)
                        })
                        batch.delete(cr);
                    })

                    var u = db.collection('Uregister').doc(uid);
                    batch.update(u, {
                        Order: firebase.firestore.FieldValue.increment(1)
                    })
                    setdata1(ar1);
                    console.log(ar1);

                    var or = db.collection('Orders').doc();

                    var aid = localStorage.getItem('aid');
                    console.log(aid);
                    batch.set(or, {
                        OID: oid,
                        UID: uid,
                        AID: aid,
                        Item: size1,
                        Name: name,
                        Contact: conct,
                        Total: grand,
                        PaymentType: 'Debit Payment',
                        Date: today,
                        Month: month,
                        Year: year,
                        DateTime: firebase.firestore.FieldValue.serverTimestamp()
                    })

                    var orr = db.collection('Orders').doc(or.id).collection('Products').doc('AllProducts');

                    batch.set(orr, {
                        Data: ar1
                    })

                    batch.commit().then((succ) => {
                        alert('Success');
                        navi('/Success');
                    })



                })


            })




        }
    }

    function upisub(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        let up = data.get('up');

        var d = new Date();

        db.collection('Orders').get().then((succ) => {

            var count = 1;
            if (succ.size == 0) {

            } else {
                count = succ.size
            }
            var batch = db.batch();

            var ord = count;

            var str = "" + ord
            console.log(str);
            var pad = "0000"

            var ans = pad.substring(0, pad.length - str.length) + str
            var yer = d.getFullYear().toString();
            var y = yer.substring(2, 4);
            var oid = "OID" + y + "-" + ans;
            console.log(oid);
            var dd = String(d.getDate()).padStart(2, '0');
            var mm = String(d.getMonth() + 1).padStart(2, '0');
            var yyyy = d.getFullYear();
            var today = dd + '/' + mm + '/' + yyyy;
            var month = (d.getMonth() + 1);
            var year = d.getFullYear();
            cart.get().then((succ) => {
                var ar = [];
                var ar1 = [];
                succ.forEach((succc) => {
                    ar.push(succc.data);
                    var obj = succc.data().Product;
                    var source = { Pro_id: succc.data().Product_id, Amount: succc.data().Amount }
                    Object.assign(obj, source)
                    ar1.push(obj);
                    var cr = cart.doc(succc.id);

                    console.log(succc.data().Amount);
                    console.log(succc.data().Product_id);
                    var uc = db.collection('Product').doc(succc.data().Product_id);
                    batch.update(uc, {
                        Stock: firebase.firestore.FieldValue.increment(-succc.data().Amount)
                    })
                    batch.delete(cr);
                })

                var u = db.collection('Uregister').doc(uid);
                batch.update(u, {
                    Order: firebase.firestore.FieldValue.increment(1)
                })

                setdata1(ar1);
                console.log(ar1);

                var or = db.collection('Orders').doc();

                var aid = localStorage.getItem('aid');
                console.log(aid);
                batch.set(or, {
                    OID: oid,
                    UID: uid,
                    AID: aid,
                    Item: size1,
                    Name: name,
                    Contact: conct,
                    Total: grand,
                    PaymentType: 'UPI Payment',
                    Date: today,
                    Month: month,
                    Year: year,
                    DateTime: firebase.firestore.FieldValue.serverTimestamp()
                })

                var orr = db.collection('Orders').doc(or.id).collection('Products').doc('AllProducts');

                batch.set(orr, {
                    Data: ar1
                })

                batch.commit().then((succ) => {
                    alert('Success');
                    navi('/Success');
                })



            })


        })



    }

    return (
        <>
            <Box style={{ display: 'flex' }}>
                <Usernavbar />
                <Box className="img" sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    <Grid container >
                        <TabContext value={value} >
                            <Box sx={{ width: '80%', m: 'auto', border: '1px solid black', background: 'rgb(255,255,255,.7)' }} >
                                <AppBar position="static">
                                    <TabList onChange={handleChange} textColor={'inherit'} indicatorColor="secondary" variant="fullWidth" aria-label="full width tabs example">
                                        <Tab label="CreditCard" value="1" />
                                        <Tab label="DebitCard" value="2" />
                                        <Tab label="Upi" value="3" />
                                    </TabList>
                                </AppBar>
                                <TabPanel value="1">
                                    <Grid container>
                                        <Grid lg={5} style={{ margin: 'auto', marginTop: '10px', boxShadow: '1px 1px 5px black' }}>
                                            <Card>
                                                <Typography style={{ textAlign: 'center', marginTop: '5px' }} variant="h5">Payment Checkout</Typography>
                                                <form onSubmit={cresub}>
                                                    <CardContent>
                                                        <TextField fullWidth label="Name on card" type={'text'} name="ncredit" size="small" required />
                                                    </CardContent>
                                                    <CardContent>
                                                        <TextField fullWidth label="Card Number" type={'number'} name="creno" size="small" required />
                                                    </CardContent>
                                                    <Grid container>
                                                        <Grid lg={6}>
                                                            <CardContent>
                                                                <TextField type={'month'} size="small" name="cred" fullWidth required />
                                                            </CardContent>
                                                        </Grid>
                                                        <Grid lg={6}>
                                                            <CardContent>
                                                                <TextField fullWidth label="CVV" type={'password'}  name="crep" size="small" required />
                                                            </CardContent>
                                                        </Grid>
                                                    </Grid>
                                                    <CardContent>
                                                        <Button fullWidth type="submit" variant="contained">Make Payment</Button>
                                                    </CardContent>
                                                </form>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value="2">
                                    <Grid container  >
                                        <Grid lg={5} style={{ margin: 'auto', marginTop: '10px', boxShadow: '1px 1px 5px black' }}>
                                            <Card>
                                                <Typography style={{ textAlign: 'center', marginTop: '5px' }} variant="h5">Payment Checkout</Typography>
                                                <form onSubmit={desub}>
                                                    <CardContent>
                                                        <TextField fullWidth label="Name on card" type={'text'} name="ndb" size="small" required />
                                                    </CardContent>
                                                    <CardContent>
                                                        <TextField fullWidth label="Card Number" type={'number'} name="dbno" size="small" required />
                                                    </CardContent>
                                                    <Grid container>
                                                        <Grid lg={6}>
                                                            <CardContent>
                                                                <TextField type={'month'} size="small" name="dbd" fullWidth required />
                                                            </CardContent>
                                                        </Grid>
                                                        <Grid lg={6}>
                                                            <CardContent>
                                                                <TextField fullWidth label="CVV" type={'password'} name="dbp"  size="small" required />
                                                            </CardContent>
                                                        </Grid>
                                                    </Grid>
                                                    <CardContent>
                                                        <Button fullWidth type="submit" variant="contained">Make Payment</Button>
                                                    </CardContent>
                                                </form>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Grid container>
                                        <Grid lg={5} style={{ margin: 'auto', marginTop: '10px', boxShadow: '1px 1px 5px black' }}>
                                            <Card>
                                                <Typography style={{ textAlign: 'center', marginTop: '5px' }} variant="h5">Payment Checkout</Typography>
                                                <form onSubmit={upisub}>
                                                    <CardContent>
                                                        <TextField fullWidth label="Enter your UPI" type={'email'} name="up" size="small" required />
                                                    </CardContent>
                                                    <CardContent>
                                                        <Button variant="contained" type="submit">Make Payment</Button>
                                                    </CardContent>
                                                </form>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            </Box>


                        </TabContext>
                    </Grid>

                </Box>
            </Box>
        </>
    )

}
export default Payment;

