import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import firebase from 'firebase';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormGroup, InputLabel, Link } from '@mui/material';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { ChatTwoTone, DeliveryDining } from '@mui/icons-material';
import { Select, MenuItem } from '@mui/material';





function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

function Uregister() {
	const theme = createTheme();
	var navi = useNavigate();
	const [checkOTP, setcheckOTP] = useState(false);
	const [OTPData, setOTPData] = useState();
	const [value, setvalue] = useState('91');



	function handleSubmit(e) {
		e.preventDefault();
		var data = new FormData(e.currentTarget);
		var name = data.get('name');
		var email = data.get('email');
		var password = data.get('password');
		var phn = data.get('contact')
		var contact = '+' + data.get('countryCode') + data.get('contact');
		var nameval = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
		var conval = /^([0-9]{10})$/;
if(name == ''|| email == '' || password == '' || contact == ''){
	alert('Please fill the all details');
 }else if (!nameval.test(name)){
	 alert('Please fill at least min 3 alphahet ')
 }else if (!conval.test(phn)){
	alert('Please fill 10 numerical digits ')
}
 
 
 else{ 

	db.collection('Uregister').where('Email', '==', email).limit(1).get().then((succ) => {
		//  console.log(succ.size);
		if (succ.size > 0) {
			alert('Sorry This email is already registered');
		} else {

			db.collection('Uregister').where('Contact', '==', contact).limit(1).get().then((ducc) => {
				// console.log(ducc.size);
				if (ducc.size > 0) {
					alert('Sorry This Contact is already registered');
				} else {

					db.collection('Uregister').add({
						Name: name,
						Contact: contact,
						Email: email,
						Password: password,
					}).then((succ) => {
						alert('User data added');
						console.log(succ.id);
						localStorage.setItem('userlogin', succ.id);
						localStorage.setItem('Uname', name);
						console.log(name);
						var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
						const phoneNumber = contact;
						console.log(phoneNumber)
						//  console.log();

						auth.signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
							console.log('yes')
							setOTPData(confirmationResult);
							setcheckOTP(true);
							e.target.reset();
							e.target.name.focus();
						})
					}).catch((err) => {
						console.log(err);
						alert('something went worng');
					})

				}
			})
		}
	})


 }

	
	}


	function handleOtp(e) {
		e.preventDefault();
		var data = new FormData(e.currentTarget);
		console.log(data);
		var code = data.get('otp');
		OTPData.confirm(code).then((result) => {
			const Users = result.user;
			console.log(result);
			console.log('yes');
			console.log(Users);
			console.log(Users.id)

			navi('/');
		}).catch((err) => {
			console.log('no');
		})


	}

	return (
		<Grid container className='bg15'>

			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs"  sx={{mt:2, padding:'0px 15px', bgcolor:'rgb(255,255,255,.8)',borderRadius:5}}>
					<CssBaseline />

					{checkOTP ? (<Box
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
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Verify Otp
							</Button>
						</Box>
					</Box>
					) : (<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
							{/* <DeliveryDining/> */}
						</Avatar>
						<Typography component="h1" variant="h5">
							User Sign up
						</Typography>
						<form onSubmit={handleSubmit}>
							<Box sx={{ mt: 3 }}>
								<Grid container spacing={2}>

									<Grid item xs={12} sm={12}>
										<TextField
											name="name"
											required
											fullWidth
											label="First Name"
											autoFocus
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											label="Email Address"
											name="email"
											type={'email'}

										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											// inputProps={{pattern : "[A-Za-z0-9]{6,10}"}}
										/>
									</Grid>

									<Grid item xs={12} sm={6} lg={4}>
										<FormGroup>
											<FormControl>
												<InputLabel id="demo-simple-select-label" name="CountryCode" required>Country Code</InputLabel>
												<Select fullWidth name="countryCode"value={value} onChange={(e) => setvalue(e.target.value) } id="countryCode" label="Country Code" required>
													<MenuItem data-countryCode="GB" value="44" aria-selected>UK (+44)</MenuItem>
													<MenuItem data-countryCode="US" value="1">USA (+1)</MenuItem>
													<MenuItem data-countryCode="DZ" value="213">Algeria (+213)</MenuItem>
													<MenuItem data-countryCode="AD" value="376">Andorra (+376)</MenuItem>
													<MenuItem data-countryCode="AO" value="244">Angola (+244)</MenuItem>
													<MenuItem data-countryCode="AI" value="1264">Anguilla (+1264)</MenuItem>
													<MenuItem data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</MenuItem>
													<MenuItem data-countryCode="AR" value="54">Argentina (+54)</MenuItem>
													<MenuItem data-countryCode="AM" value="374">Armenia (+374)</MenuItem>
													<MenuItem data-countryCode="AW" value="297">Aruba (+297)</MenuItem>
													<MenuItem data-countryCode="AU" value="61">Australia (+61)</MenuItem>
													<MenuItem data-countryCode="AT" value="43">Austria (+43)</MenuItem>
													<MenuItem data-countryCode="AZ" value="994">Azerbaijan (+994)</MenuItem>
													<MenuItem data-countryCode="BS" value="1242">Bahamas (+1242)</MenuItem>
													<MenuItem data-countryCode="BH" value="973">Bahrain (+973)</MenuItem>
													<MenuItem data-countryCode="BD" value="880">Bangladesh (+880)</MenuItem>
													<MenuItem data-countryCode="BB" value="1246">Barbados (+1246)</MenuItem>
													<MenuItem data-countryCode="BY" value="375">Belarus (+375)</MenuItem>
													<MenuItem data-countryCode="BE" value="32">Belgium (+32)</MenuItem>
													<MenuItem data-countryCode="BZ" value="501">Belize (+501)</MenuItem>
													<MenuItem data-countryCode="BJ" value="229">Benin (+229)</MenuItem>
													<MenuItem data-countryCode="BM" value="1441">Bermuda (+1441)</MenuItem>
													<MenuItem data-countryCode="BT" value="975">Bhutan (+975)</MenuItem>
													<MenuItem data-countryCode="BO" value="591">Bolivia (+591)</MenuItem>
													<MenuItem data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</MenuItem>
													<MenuItem data-countryCode="BW" value="267">Botswana (+267)</MenuItem>
													<MenuItem data-countryCode="BR" value="55">Brazil (+55)</MenuItem>
													<MenuItem data-countryCode="BN" value="673">Brunei (+673)</MenuItem>
													<MenuItem data-countryCode="BG" value="359">Bulgaria (+359)</MenuItem>
													<MenuItem data-countryCode="BF" value="226">Burkina Faso (+226)</MenuItem>
													<MenuItem data-countryCode="BI" value="257">Burundi (+257)</MenuItem>
													<MenuItem data-countryCode="KH" value="855">Cambodia (+855)</MenuItem>
													<MenuItem data-countryCode="CM" value="237">Cameroon (+237)</MenuItem>
													<MenuItem data-countryCode="CA" value="1">Canada (+1)</MenuItem>
													<MenuItem data-countryCode="CV" value="238">Cape Verde Islands (+238)</MenuItem>
													<MenuItem data-countryCode="KY" value="1345">Cayman Islands (+1345)</MenuItem>
													<MenuItem data-countryCode="CF" value="236">Central African Republic (+236)</MenuItem>
													<MenuItem data-countryCode="CL" value="56">Chile (+56)</MenuItem>
													<MenuItem data-countryCode="CN" value="86">China (+86)</MenuItem>
													<MenuItem data-countryCode="CO" value="57">Colombia (+57)</MenuItem>
													<MenuItem data-countryCode="KM" value="269">Comoros (+269)</MenuItem>
													<MenuItem data-countryCode="CG" value="242">Congo (+242)</MenuItem>
													<MenuItem data-countryCode="CK" value="682">Cook Islands (+682)</MenuItem>
													<MenuItem data-countryCode="CR" value="506">Costa Rica (+506)</MenuItem>
													<MenuItem data-countryCode="HR" value="385">Croatia (+385)</MenuItem>
													<MenuItem data-countryCode="CU" value="53">Cuba (+53)</MenuItem>
													<MenuItem data-countryCode="CY" value="90392">Cyprus North (+90392)</MenuItem>
													<MenuItem data-countryCode="CY" value="357">Cyprus South (+357)</MenuItem>
													<MenuItem data-countryCode="CZ" value="42">Czech Republic (+42)</MenuItem>
													<MenuItem data-countryCode="DK" value="45">Denmark (+45)</MenuItem>
													<MenuItem data-countryCode="DJ" value="253">Djibouti (+253)</MenuItem>
													<MenuItem data-countryCode="DM" value="1809">Dominica (+1809)</MenuItem>
													<MenuItem data-countryCode="DO" value="1809">Dominican Republic (+1809)</MenuItem>
													<MenuItem data-countryCode="EC" value="593">Ecuador (+593)</MenuItem>
													<MenuItem data-countryCode="EG" value="20">Egypt (+20)</MenuItem>
													<MenuItem data-countryCode="SV" value="503">El Salvador (+503)</MenuItem>
													<MenuItem data-countryCode="GQ" value="240">Equatorial Guinea (+240)</MenuItem>
													<MenuItem data-countryCode="ER" value="291">Eritrea (+291)</MenuItem>
													<MenuItem data-countryCode="EE" value="372">Estonia (+372)</MenuItem>
													<MenuItem data-countryCode="ET" value="251">Ethiopia (+251)</MenuItem>
													<MenuItem data-countryCode="FK" value="500">Falkland Islands (+500)</MenuItem>
													<MenuItem data-countryCode="FO" value="298">Faroe Islands (+298)</MenuItem>
													<MenuItem data-countryCode="FJ" value="679">Fiji (+679)</MenuItem>
													<MenuItem data-countryCode="FI" value="358">Finland (+358)</MenuItem>
													<MenuItem data-countryCode="FR" value="33">France (+33)</MenuItem>
													<MenuItem data-countryCode="GF" value="594">French Guiana (+594)</MenuItem>
													<MenuItem data-countryCode="PF" value="689">French Polynesia (+689)</MenuItem>
													<MenuItem data-countryCode="GA" value="241">Gabon (+241)</MenuItem>
													<MenuItem data-countryCode="GM" value="220">Gambia (+220)</MenuItem>
													<MenuItem data-countryCode="GE" value="7880">Georgia (+7880)</MenuItem>
													<MenuItem data-countryCode="DE" value="49">Germany (+49)</MenuItem>
													<MenuItem data-countryCode="GH" value="233">Ghana (+233)</MenuItem>
													<MenuItem data-countryCode="GI" value="350">Gibraltar (+350)</MenuItem>
													<MenuItem data-countryCode="GR" value="30">Greece (+30)</MenuItem>
													<MenuItem data-countryCode="GL" value="299">Greenland (+299)</MenuItem>
													<MenuItem data-countryCode="GD" value="1473">Grenada (+1473)</MenuItem>
													<MenuItem data-countryCode="GP" value="590">Guadeloupe (+590)</MenuItem>
													<MenuItem data-countryCode="GU" value="671">Guam (+671)</MenuItem>
													<MenuItem data-countryCode="GT" value="502">Guatemala (+502)</MenuItem>
													<MenuItem data-countryCode="GN" value="224">Guinea (+224)</MenuItem>
													<MenuItem data-countryCode="GW" value="245">Guinea - Bissau (+245)</MenuItem>
													<MenuItem data-countryCode="GY" value="592">Guyana (+592)</MenuItem>
													<MenuItem data-countryCode="HT" value="509">Haiti (+509)</MenuItem>
													<MenuItem data-countryCode="HN" value="504">Honduras (+504)</MenuItem>
													<MenuItem data-countryCode="HK" value="852">Hong Kong (+852)</MenuItem>
													<MenuItem data-countryCode="HU" value="36">Hungary (+36)</MenuItem>
													<MenuItem data-countryCode="IS" value="354">Iceland (+354)</MenuItem>
													<MenuItem data-countryCode="IN" value="91">India (+91)</MenuItem>
													<MenuItem data-countryCode="ID" value="62">Indonesia (+62)</MenuItem>
													<MenuItem data-countryCode="IR" value="98">Iran (+98)</MenuItem>
													<MenuItem data-countryCode="IQ" value="964">Iraq (+964)</MenuItem>
													<MenuItem data-countryCode="IE" value="353">Ireland (+353)</MenuItem>
													<MenuItem data-countryCode="IL" value="972">Israel (+972)</MenuItem>
													<MenuItem data-countryCode="IT" value="39">Italy (+39)</MenuItem>
													<MenuItem data-countryCode="JM" value="1876">Jamaica (+1876)</MenuItem>
													<MenuItem data-countryCode="JP" value="81">Japan (+81)</MenuItem>
													<MenuItem data-countryCode="JO" value="962">Jordan (+962)</MenuItem>
													<MenuItem data-countryCode="KZ" value="7">Kazakhstan (+7)</MenuItem>
													<MenuItem data-countryCode="KE" value="254">Kenya (+254)</MenuItem>
													<MenuItem data-countryCode="KI" value="686">Kiribati (+686)</MenuItem>
													<MenuItem data-countryCode="KP" value="850">Korea North (+850)</MenuItem>
													<MenuItem data-countryCode="KR" value="82">Korea South (+82)</MenuItem>
													<MenuItem data-countryCode="KW" value="965">Kuwait (+965)</MenuItem>
													<MenuItem data-countryCode="KG" value="996">Kyrgyzstan (+996)</MenuItem>
													<MenuItem data-countryCode="LA" value="856">Laos (+856)</MenuItem>
													<MenuItem data-countryCode="LV" value="371">Latvia (+371)</MenuItem>
													<MenuItem data-countryCode="LB" value="961">Lebanon (+961)</MenuItem>
													<MenuItem data-countryCode="LS" value="266">Lesotho (+266)</MenuItem>
													<MenuItem data-countryCode="LR" value="231">Liberia (+231)</MenuItem>
													<MenuItem data-countryCode="LY" value="218">Libya (+218)</MenuItem>
													<MenuItem data-countryCode="LI" value="417">Liechtenstein (+417)</MenuItem>
													<MenuItem data-countryCode="LT" value="370">Lithuania (+370)</MenuItem>
													<MenuItem data-countryCode="LU" value="352">Luxembourg (+352)</MenuItem>
													<MenuItem data-countryCode="MO" value="853">Macao (+853)</MenuItem>
													<MenuItem data-countryCode="MK" value="389">Macedonia (+389)</MenuItem>
													<MenuItem data-countryCode="MG" value="261">Madagascar (+261)</MenuItem>
													<MenuItem data-countryCode="MW" value="265">Malawi (+265)</MenuItem>
													<MenuItem data-countryCode="MY" value="60">Malaysia (+60)</MenuItem>
													<MenuItem data-countryCode="MV" value="960">Maldives (+960)</MenuItem>
													<MenuItem data-countryCode="ML" value="223">Mali (+223)</MenuItem>
													<MenuItem data-countryCode="MT" value="356">Malta (+356)</MenuItem>
													<MenuItem data-countryCode="MH" value="692">Marshall Islands (+692)</MenuItem>
													<MenuItem data-countryCode="MQ" value="596">Martinique (+596)</MenuItem>
													<MenuItem data-countryCode="MR" value="222">Mauritania (+222)</MenuItem>
													<MenuItem data-countryCode="YT" value="269">Mayotte (+269)</MenuItem>
													<MenuItem data-countryCode="MX" value="52">Mexico (+52)</MenuItem>
													<MenuItem data-countryCode="FM" value="691">Micronesia (+691)</MenuItem>
													<MenuItem data-countryCode="MD" value="373">Moldova (+373)</MenuItem>
													<MenuItem data-countryCode="MC" value="377">Monaco (+377)</MenuItem>
													<MenuItem data-countryCode="MN" value="976">Mongolia (+976)</MenuItem>
													<MenuItem data-countryCode="MS" value="1664">Montserrat (+1664)</MenuItem>
													<MenuItem data-countryCode="MA" value="212">Morocco (+212)</MenuItem>
													<MenuItem data-countryCode="MZ" value="258">Mozambique (+258)</MenuItem>
													<MenuItem data-countryCode="MN" value="95">Myanmar (+95)</MenuItem>
													<MenuItem data-countryCode="NA" value="264">Namibia (+264)</MenuItem>
													<MenuItem data-countryCode="NR" value="674">Nauru (+674)</MenuItem>
													<MenuItem data-countryCode="NP" value="977">Nepal (+977)</MenuItem>
													<MenuItem data-countryCode="NL" value="31">Netherlands (+31)</MenuItem>
													<MenuItem data-countryCode="NC" value="687">New Caledonia (+687)</MenuItem>
													<MenuItem data-countryCode="NZ" value="64">New Zealand (+64)</MenuItem>
													<MenuItem data-countryCode="NI" value="505">Nicaragua (+505)</MenuItem>
													<MenuItem data-countryCode="NE" value="227">Niger (+227)</MenuItem>
													<MenuItem data-countryCode="NG" value="234">Nigeria (+234)</MenuItem>
													<MenuItem data-countryCode="NU" value="683">Niue (+683)</MenuItem>
													<MenuItem data-countryCode="NF" value="672">Norfolk Islands (+672)</MenuItem>
													<MenuItem data-countryCode="NP" value="670">Northern Marianas (+670)</MenuItem>
													<MenuItem data-countryCode="NO" value="47">Norway (+47)</MenuItem>
													<MenuItem data-countryCode="OM" value="968">Oman (+968)</MenuItem>
													<MenuItem data-countryCode="PW" value="680">Palau (+680)</MenuItem>
													<MenuItem data-countryCode="PA" value="507">Panama (+507)</MenuItem>
													<MenuItem data-countryCode="PG" value="675">Papua New Guinea (+675)</MenuItem>
													<MenuItem data-countryCode="PY" value="595">Paraguay (+595)</MenuItem>
													<MenuItem data-countryCode="PE" value="51">Peru (+51)</MenuItem>
													<MenuItem data-countryCode="PH" value="63">Philippines (+63)</MenuItem>
													<MenuItem data-countryCode="PL" value="48">Poland (+48)</MenuItem>
													<MenuItem data-countryCode="PT" value="351">Portugal (+351)</MenuItem>
													<MenuItem data-countryCode="PR" value="1787">Puerto Rico (+1787)</MenuItem>
													<MenuItem data-countryCode="QA" value="974">Qatar (+974)</MenuItem>
													<MenuItem data-countryCode="RE" value="262">Reunion (+262)</MenuItem>
													<MenuItem data-countryCode="RO" value="40">Romania (+40)</MenuItem>
													<MenuItem data-countryCode="RU" value="7">Russia (+7)</MenuItem>
													<MenuItem data-countryCode="RW" value="250">Rwanda (+250)</MenuItem>
													<MenuItem data-countryCode="SM" value="378">San Marino (+378)</MenuItem>
													<MenuItem data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</MenuItem>
													<MenuItem data-countryCode="SA" value="966">Saudi Arabia (+966)</MenuItem>
													<MenuItem data-countryCode="SN" value="221">Senegal (+221)</MenuItem>
													<MenuItem data-countryCode="CS" value="381">Serbia (+381)</MenuItem>
													<MenuItem data-countryCode="SC" value="248">Seychelles (+248)</MenuItem>
													<MenuItem data-countryCode="SL" value="232">Sierra Leone (+232)</MenuItem>
													<MenuItem data-countryCode="SG" value="65">Singapore (+65)</MenuItem>
													<MenuItem data-countryCode="SK" value="421">Slovak Republic (+421)</MenuItem>
													<MenuItem data-countryCode="SI" value="386">Slovenia (+386)</MenuItem>
													<MenuItem data-countryCode="SB" value="677">Solomon Islands (+677)</MenuItem>
													<MenuItem data-countryCode="SO" value="252">Somalia (+252)</MenuItem>
													<MenuItem data-countryCode="ZA" value="27">South Africa (+27)</MenuItem>
													<MenuItem data-countryCode="ES" value="34">Spain (+34)</MenuItem>
													<MenuItem data-countryCode="LK" value="94">Sri Lanka (+94)</MenuItem>
													<MenuItem data-countryCode="SH" value="290">St. Helena (+290)</MenuItem>
													<MenuItem data-countryCode="KN" value="1869">St. Kitts (+1869)</MenuItem>
													<MenuItem data-countryCode="SC" value="1758">St. Lucia (+1758)</MenuItem>
													<MenuItem data-countryCode="SD" value="249">Sudan (+249)</MenuItem>
													<MenuItem data-countryCode="SR" value="597">Suriname (+597)</MenuItem>
													<MenuItem data-countryCode="SZ" value="268">Swaziland (+268)</MenuItem>
													<MenuItem data-countryCode="SE" value="46">Sweden (+46)</MenuItem>
													<MenuItem data-countryCode="CH" value="41">Switzerland (+41)</MenuItem>
													<MenuItem data-countryCode="SI" value="963">Syria (+963)</MenuItem>
													<MenuItem data-countryCode="TW" value="886">Taiwan (+886)</MenuItem>
													<MenuItem data-countryCode="TJ" value="7">Tajikstan (+7)</MenuItem>
													<MenuItem data-countryCode="TH" value="66">Thailand (+66)</MenuItem>
													<MenuItem data-countryCode="TG" value="228">Togo (+228)</MenuItem>
													<MenuItem data-countryCode="TO" value="676">Tonga (+676)</MenuItem>
													<MenuItem data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</MenuItem>
													<MenuItem data-countryCode="TN" value="216">Tunisia (+216)</MenuItem>
													<MenuItem data-countryCode="TR" value="90">Turkey (+90)</MenuItem>
													<MenuItem data-countryCode="TM" value="7">Turkmenistan (+7)</MenuItem>
													<MenuItem data-countryCode="TM" value="993">Turkmenistan (+993)</MenuItem>
													<MenuItem data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</MenuItem>
													<MenuItem data-countryCode="TV" value="688">Tuvalu (+688)</MenuItem>
													<MenuItem data-countryCode="UG" value="256">Uganda (+256)</MenuItem>
													<MenuItem data-countryCode="UA" value="380">Ukraine (+380)</MenuItem>
													<MenuItem data-countryCode="AE" value="971">United Arab Emirates (+971)</MenuItem>
													<MenuItem data-countryCode="UY" value="598">Uruguay (+598)</MenuItem>
													<MenuItem data-countryCode="UZ" value="7">Uzbekistan (+7)</MenuItem>
													<MenuItem data-countryCode="VU" value="678">Vanuatu (+678)</MenuItem>
													<MenuItem data-countryCode="VA" value="379">Vatican City (+379)</MenuItem>
													<MenuItem data-countryCode="VE" value="58">Venezuela (+58)</MenuItem>
													<MenuItem data-countryCode="VN" value="84">Vietnam (+84)</MenuItem>
													<MenuItem data-countryCode="VG" value="84">Virgin Islands - British (+1284)</MenuItem>
													<MenuItem data-countryCode="VI" value="84">Virgin Islands - US (+1340)</MenuItem>
													<MenuItem data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</MenuItem>
													<MenuItem data-countryCode="YE" value="969">Yemen (North)(+969)</MenuItem>
													<MenuItem data-countryCode="YE" value="967">Yemen (South)(+967)</MenuItem>
													<MenuItem data-countryCode="ZM" value="260">Zambia (+260)</MenuItem>
													<MenuItem data-countryCode="ZW" value="263">Zimbabwe (+263)</MenuItem>
												</Select>
											</FormControl>
										</FormGroup>
									</Grid>

									<Grid item xs={12} sm={6} lg={8}>
										<TextField
											required
											fullWidth
											type="text"
											label="contact"
											name="contact"
										/>
									</Grid>
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Sign Up
								</Button>
								<div id='recaptcha-container'></div>
								<Grid  justifyContent="flex-end">
									<Grid item>
										<Link href='/' variant="body2">
											Already have an account? Sign in
										</Link>
									
									</Grid>

								</Grid>
								<Copyright sx={{ mt: 5 }} />
							</Box>
						</form>
						
					</Box>

					)}
					
				</Container>
			</ThemeProvider>
		</Grid>

	);

}

export default Uregister;


