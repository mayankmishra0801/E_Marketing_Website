import { Avatar, Box, Button, Link, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import firebase from "firebase";
import { auth, db } from "../../firebase";
import { ChatTwoTone, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { bgcolor } from "@mui/system";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Welcome Admin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Alogin() {

  var navi = useNavigate();

  const theme = createTheme();
  const [checkOTP, setcheckOTP] = useState(false);
  const [OTPData, setOTPData] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget)
    var email = data.get('email');
    var password = data.get('password');
    console.log(email);
    console.log(password);
    
    db.collection('Admin').where('Email', '==', email).where('Password', '==', password).get().then((succ) => {

      if (succ.size==0) {
        alert('please check your email');
      } else {
        succ.forEach((succc) => {
          var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

          const phoneNumber = succc.data().Phone;

          auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              console.log('yes')
              setOTPData(confirmationResult);
              setcheckOTP(true);
            }).catch((error) => {
              console.log('no');
            });

        })
      }

    })

  };

  function handleOtp(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const code = data.get('otp');
    OTPData.confirm(code).then((result) => {
      const Users = result.user;
      console.log('yes');
      console.log(Users);
      localStorage.setItem('adminlogin', Users.phoneNumber);
      navi('/Dasboard');
    }).catch((error) => {
      console.log('no');
    })
  }



  return (

    <Grid container className="bg14">
    


      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{mt:10, height:'580px', bgcolor:'rgb(255,255,255,.8)',borderRadius:5}} >
          <CssBaseline />



          {checkOTP ? (



            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ChatTwoTone />
              </Avatar>
              <Typography component="h1" variant="h5">
                Enter OTP
              </Typography>
              <Box component="form" onSubmit={handleOtp} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  autoFocus
                  type={'number'}
                  sx={{bgcolor:'white'}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify
                </Button>
              </Box>
            </Box>






          ) : (








            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Sign In
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  sx={{bgcolor:'white'}}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  sx={{bgcolor:'white'}}
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <div id='recaptcha-container'></div>

              </Box>
            </Box>




          )}


          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>


    </Grid>
  )
}

export default Alogin;