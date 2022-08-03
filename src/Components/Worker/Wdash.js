import React, { useEffect, useState } from "react";
import { styled, useTheme} from '@mui/material/styles';
import { Autocomplete, Box, Button, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Wnav from "./Wnav";
import { db, product } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Wdash(){

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

    var navi = useNavigate();
    var id = new URLSearchParams(window.location.search).get('id');
    if(!id){
        navi('/Wlog');
    }


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


function handleSubmit(e){
    // alert('hi');
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let name = data.get('name');
    let qty = data.get('qty');
    console.log(name);
    product.where('Name','==',name).get().then((succ) => {
        succ.forEach((succc) => {
            console.log(succc.data());
            console.log(succc.id);
            console.log(qty);


            var newdata = Object.assign(succc.data(), { pid: succc.id , amount: qty })

            // console.log(newdata);

            var chk = db.collection('bills').doc(id);            
            if(chk){
                alert('ok');
            }else{
                alert('no');
            }


        })
    })

}

return(

    <>
<Box style={{display:'flex'}}>
    <Wnav/>
    <Box sx={{flexGrow:1,p:1}}>
<DrawerHeader/>
<Grid container>
<Grid lg={3}>
    <CardContent>
    <Card>
        <form method="post" action="" onSubmit={handleSubmit}>
                <CardContent>
                    <Autocomplete size="small" name="name" options={pro}  renderInput={(params)=><TextField name="name" {...params} label="Movie"/>}/>
                </CardContent>
                <CardContent>
                    <TextField fullWidth size="small" type={'number'} name="qty"/>
                </CardContent>
                <CardContent>
                    <Button variant="contained" type="submit">
                        add
                    </Button>
                </CardContent>
            </form>
    </Card>
    </CardContent>
    </Grid>
    <Grid lg={9}>
        <CardContent>
<Card>
    <CardContent>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Name</TableCell>    
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </CardContent>
</Card>
</CardContent>
    </Grid>
</Grid>

    
    </Box>
</Box>

    </>
)

}
export default Wdash;