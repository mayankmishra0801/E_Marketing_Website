import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import { useNavigate } from 'react-router-dom';
import { ChatTwoTone, Email, LockOutlined, Password } from '@mui/icons-material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Userlogin() {
  var navi = useNavigate();
  const theme = createTheme();


  const [form, setfrom] = useState(true);
  
  function handleSubmit(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    db.collection('Uregister').where('Email', '==', data.get('email')).where('Password', '==', data.get('password')).get().then((succ) => {

      if (succ.size == 0) {
        alert('please fill corrent email and password');

      }
      else {
        succ.forEach((succc) => {

          localStorage.setItem('userlogin', succc.id);
          localStorage.setItem('Uname', succc.data().Name);
          navi('/Home')

        })
      }
    }).catch((err) => {
      alert('something went wrong');
    })
  }

  const [forg, setforg] = useState(false);
  const [otp, setotp] = useState();
  const [checkOTP, setcheckOTP] = useState(false);
  function forgot() {
    setforg(true);
    setfrom(false)
  }

  function verifyotp(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var email = data.get('email')
    db.collection('Uregister').where('Email', '==', email).get().then((succ) => {
      succ.forEach((succc) => {
        var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        const phoneNumber = succc.data().Contact;
        console.log(phoneNumber);


        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            setotp(confirmationResult);
            setforg(false);
            localStorage.setItem('UID', succc.id);
            setcheckOTP(true);
            e.target.reset();

          })
      })
    }).catch((err) => {
      console.log(err);
      alert('something wnet worng')
    })
  }


  function handleOtp(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var code = data.get('otp');
    otp.confirm(code).then((result) => {
      const Users = result.user;
      console.log('yes');
      setpas(true);
      setcheckOTP(false);
      console.log(Users);
    }).catch((err) => {
      console.log('no');
    })
  }

  const [pas, setpas] = useState(false);

  function updatepas(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    var npas = data.get('npas');
    var cpas = data.get('cpas');
    var uid = localStorage.getItem('UID');

    if (!npas == cpas) {
      alert('Password doesnot match');
    }
    if (npas == cpas) {
      db.collection('Uregister').doc(uid).update({
        Password: cpas,
      }).then((succ) => {
        alert("Password Changed");
        setpas(false);
        setfrom(true);
      })

    }
  }



  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {checkOTP && (<>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} style={{ margin: 'auto' }} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
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
              <Box component="form" onSubmit={handleOtp} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth

                  label="Enter OTP"
                  name="otp"

                  type={'number'}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify Otp
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid></>)}

        {pas && (<>

          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} style={{ margin: 'auto' }} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ChatTwoTone />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Password
              </Typography>
              <Box component="form" onSubmit={updatepas} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="New Password"
                  name="npas"
                  type={'password'}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  name="cpas"
                  type={'password'}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  update
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </>)}


        {form && (<> <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/1600x900/?grocery)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                User Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
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

                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link onClick={forgot} style={{ cursor: "pointer" }} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="Uregister" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </>
        )}


        {/*condition fro going to forgot password page  */}
        {forg && (<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} style={{ margin: 'auto' }} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={verifyotp} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"


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
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>)}



      </Grid>
    </ThemeProvider>
  );
}

export default Userlogin;


