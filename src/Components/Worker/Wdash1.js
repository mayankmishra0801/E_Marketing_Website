import React, { useEffect, useState } from "react";
import { styled, useTheme} from '@mui/material/styles';
import { Autocomplete, Box, Button, Card, CardContent, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Wnav from "./Wnav";
import { db, product } from "../../firebase";
import { NoBackpackSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Wdash1(){

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));

    //   const top100Films = [
    //     { label: 'The Shawshank Redemption', year: 1994 },
    //     { label: 'The Godfather', year: 1972 },
    //     { label: 'The Godfather: Part II', year: 1974 },
    //     { label: 'The Dark Knight', year: 2008 },
    //     { label: '12 Angry Men', year: 1957 },
    //     { label: "Schindler's List", year: 1993 },
    //     { label: 'Pulp Fiction', year: 1994 },
    //   ]

const[pro,setpro] = useState([]);
function getdata(){
    product.get().then((succ)=>{
        const ar = [];
        succ.forEach((succc)=>{
            ar.push(succc.data().Name);
        })
        setpro(ar);
        // console.log(ar);
    })
}

useEffect(()=>{
getdata();
},[])

const [nw, setnw] = useState(false);
function handleSubmit(e){
    e.preventDefault();

    var data = new FormData(e.currentTarget);
    let name = data.get('name');
    let contact = '+91'+data.get('contact');
    console.log(name);
    db.collection('Uregister').where('Contact','==',contact).get().then((succ) => {
        if(succ.size > 0){
            succ.forEach((succc) => {
                db.collection('bills').add({
                    Contact: contact,
                    Name: succc.data().Name,
                    uid: succc.id
                }).then((doxx) => {
                    alert('Ok');
                })
            })
        }else{
            if(window.confirm('This user is not Registered')){
                // alert('yes');
                setnw(true);
            }else{
                // alert('no');

            }
        }
    })

}

function handleSubmit2(e){
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let name = data.get('name');
    let contact = '+91'+data.get('contact');
    let email = data.get('email');
    // console.log(name);
    db.collection('Uregister').add({
        Password: '123456',
        Name:name,
        Contact:contact,
        Email:email,
    }).then((succ) => {
        var id = succ.id;
        db.collection('bills').add({
            Contact: contact,
            Name: name,
            uid: succ.id
        }).then((doxx) => {
            alert('Ok');
        })
    })

}

const [nbill,setnbill] =useState([]);

function billdata(){
    db.collection('bills').onSnapshot((succ)=>{
        const ar = [];
        succ.forEach((succc)=>{
            ar.push(succc);
        })
        setnbill(ar);
    })
}

useEffect(()=>{
billdata();
},[])

function handledel(x){
alert(x.id);
}
var navi = useNavigate();
function handle(x){
    // alert(x.id);
    navi('/Wdash?id='+x.id);
}
    

return(

    <>
<Box style={{display:'flex'}}>
    <Wnav/>
    <Box sx={{flexGrow:1,p:1}}>
<DrawerHeader/>
<Grid container>
<Grid lg={4} style={{margin:'auto'}}>
    <CardContent>
        <Card>
            <form method="post" action="" onSubmit={nw ? (handleSubmit2) : (handleSubmit)}>
                <CardContent>
                    <TextField label="Contact" fullWidth size="small" type={'number'} name="contact" required/>
                </CardContent>
                {nw && (
                    <>
                    <CardContent>
                        <TextField label="Name" fullWidth size="small" type={'text'} name="name" required/>
                    </CardContent>
                    <CardContent>
                        <TextField label="Email" fullWidth size="small" type={'email'} name="email" required/>
                    </CardContent>
                    </>
                )}
                <CardContent>
                {nw ? (
                    <Button name="addstart" variant="contained" type="submit">
                        Add User and Start Bill
                    </Button>
                ): (
                    <Button name="start" variant="contained" type="submit">
                        Start Bill
                    </Button>
                )}
                </CardContent>
            </form>
        </Card>
    </CardContent>
</Grid>

<Grid lg={12}>
<Card>
    
    <CardContent>
    {nbill.map((row)=>(
        <Chip style={{marginLeft:'15px'}} onClick={()=>handle(row)} onDelete={()=>handledel(row)}  label={row.data().Name} />
         ))}
    </CardContent>
</Card>
</Grid>

</Grid>

    
    </Box>
</Box>

    </>
)

}
export default Wdash1;