import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { ApiUrl } from "./config";

const classes ={
	avatar:{
		margin: 6,
		backgroundColor: "#f50057",
	},
	paper: {
		display: "flex",
		marginTop: 34,
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
	link:{
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
				name:'',
				emailid:'',
				mobile:'',
				password:'',
				status:true,
				hidden:true,
			}
		};
		this.handleChange=this.handleChange.bind(this);
		this.tooglebutton=this.tooglebutton.bind(this);
		this.submit=this.submit.bind(this);

	}
	handleChange(e){
		let fields=this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({
			fields
		})
	}
	tooglebutton(){
		this.setState({
			hidden:!this.state.hidden
		})
	}
	async submit(e){
		e.preventDefault();
		var option= {
			method:'POST',
			url: ApiUrl + "register/save",
			data:{
					id:this.state.fields.id,
					name:this.state.fields.name,
					emailid:this.state.fields.emailid,
					mobile:this.state.fields.mobile,
					password:this.state.fields.password,
					status:this.state.fields.status,
			}
		}
		const data = await axios(option);
		window.location.href = "/";
	}
	render(){
	return (
		<Container maxWidth="xs">
			<div style={classes.paper}>
				<Avatar style={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<form style={classes.form}  onSubmit={this.submit}>
				<TextField
						variant="outlined"
						margin="normal"
						required
						type="name"
						fullWidth
						label="Name"
						name="name"
						value={this.state.fields.name}
						onChange={this.handleChange}
					/>
					<TextField
						variant="outlined"
						required
						type="email"
						fullWidth
						label="Email Id"
						name="emailid"
						value={this.state.fields.emailid}
						onChange={this.handleChange}
						autoComplete="emailid"
						autoFocus
					/>
					<Grid item xs={12} sm={12}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						type="number"
						fullWidth
						label="Mobile"
						name="mobile"
						value={this.state.fields.mobile}
						onChange={this.handleChange}
					/>
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						style={classes.submit}
					>
						Sign In
					</Button>
					<Grid container justify="center">
						<Grid item>
							<Link to="/" variant="body2" style={classes.link}>
								{"Already have an account? Login"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
	}
}
