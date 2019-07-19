import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Container from '@material-ui/core/Container';
import { ApiUrl } from './config';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const classes ={
	avatar:{
		margin: 8,
		backgroundColor: "#f50057",
	},
	paper: {
		display: "flex",
		marginTop: 64,
		alignItems: "center",
		flexDirection: "column",
	},
	form: { 
		width: 370,
		marginTop: 8,
	},
	submit: {
		marginTop: 24,
		marginRight: 0,
		marginBottom: 16,
		marginLeft: 0
	},
	Link:{
		textDecoration:'none',
		color: "#3f51b5",
	}
}

export default class Login extends React.Component {
	constructor(){
		super();
		this.state={
			fields:{
				id:'',
				emailid:'',
				password:'',
				status:false,
				hidden:true,
			}
		}
		this.handleChange= this.handleChange.bind(this);
		this.submit=this.submit.bind(this);
		this.tooglebutton = this.tooglebutton.bind(this);
	}
	handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] =
		  e.target.type === "checkbox" ? e.target.checked : e.target.value;
		this.setState({
		  fields
		});
	  }
	tooglebutton(){
		this.setState({
			hidden: !this.state.hidden
		})
	}
	async submit(e) {
		e.preventDefault();
		 var options ={
			method:'POST',
			url: ApiUrl + "login/login",
			data:{
				emailid:this.state.fields.emailid,
				password:this.state.fields.password,
			}
		}
		const {data} =await axios(options);
		if(!data.status){
			alert('Invalid login details');
		}
		else{
			alert('Login successfully');
			cookies.set('emailid',this.state.fields.emailid);
			window.location.href = "/dashboard";
		} 
	}
	render(){
		return (
			<Container maxWidth="xs">
				<div style={classes.paper}>
					<Avatar style={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login in
					</Typography>
					<form style={classes.form} onSubmit={this.submit} >
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="emailid"
							value={this.state.fields.emailid}
							onChange={this.handleChange}
							label="Email Address"
							autoComplete="emailid"
							autoFocus
						/>
						<Grid item xs={12} sm={12}>
							<TextField
								id="outlined-adornment-password"
								variant="outlined"
								required
								type={!this.state.hidden ? "password" : "text"}
								label="Password"
								name="password"
								value={this.state.fields.password}
								onChange={this.handleChange}
								fullWidth
								autoComplete="password"
								InputProps={{
								endAdornment: (
									<InputAdornment position="end">
									<IconButton
										edge="end"
										aria-label="Toggle password visibility"
										onClick={this.tooglebutton}>
										{this.state.hidden ? <Visibility /> : <VisibilityOff />}
									</IconButton>
									</InputAdornment>
								),
								}}
							/>
	  				</Grid>
						<FormControlLabel
							control={
							<Checkbox  color="primary" 
							name="status"
							checked={this.state.fields.status}
							onChange={this.handleChange}
							/>}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={classes.submit}
						>
							Login In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="/" variant="body2" style={classes.Link}>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to="signup" variant="body2" style={classes.Link}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}
