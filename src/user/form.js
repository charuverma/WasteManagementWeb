import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from "axios";
import { ApiUrl } from "../config";
const baseurl = "http://192.168.100.22:8000/";
var styles = {
	file: {
		marginTop: 17,
		fontSize: 18
	},
	Typography: {
		color: "#3f51b5"
	},
	Image: {
		width: 50,
		height: 50
	},
	select: {
		width: 500
	},
	textField: {
		width: 500
	}
};
class User extends React.Component {
	constructor() {
		super();
		this.state = {
			fields: {
				id:"",
				role: "",
				name: "",
				emailid: "",
				mobile: "",
				address: "",
				password: "",
				status: false,
				oldImage: "",
				isPassword: true,
				hidden:true,
				
			},
			errors: {},
			data: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.tooglebutton =this.tooglebutton.bind(this);
		this.submit = this.submit.bind(this);
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
			hidden:!this.state.hidden,
		})
	}
	async submit(e) {
		e.preventDefault();
		this.setState({errors: {}});
		let fields={};
		const file = document.getElementById("catimage");
		if (file.files.length && file.files[0].size > 307200) {
			alert("File is too big!");
			return false;
		}
		const formdata = new FormData(e.target);
		if (this.state.fields && this.state.fields.id) {
			formdata.append("id", this.state.fields.id);
		}
		var option = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			url: ApiUrl + "user/save",
			data: formdata
		};
		const {data} = await axios(option);
		if(data.status) {
			window.location.href = "/user"; 
		} else {
			let errors = {};
			data.errors.forEach(item => {
				errors[item.path] = item.message;
			});

			this.setState({errors});
		}
	}
	async componentDidMount() {
		var option = {
			method: "POST",
			url: ApiUrl + "role/list",
			data: {}
		};
		const { data } = await axios(option);
		this.setState({
			data: data.result
		});
		const fields ={...this.state.fields};
			if(this.props.match.params.id){
				var options ={
					method: "POST",
					url: ApiUrl + "user/get",
					data: {
						id: this.props.match.params.id
					}
				};
				const { data } = await axios(options);
				fields.id = data.result.id;
				fields.role = data.result.role;
				fields.name = data.result.name;
				fields.emailid = data.result.emailid;
				fields.mobile = data.result.mobile;
				fields.address = data.result.address;
				fields.status = data.result.status;
				fields.oldImage = data.result.file;
				fields.isPassword = false;
			}

			this.setState({
				loading:true,
				fields,
			});
		}
	render(){
		const {errors} = this.state;
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom style={styles.Typography}>
					Add User
				</Typography>
				<form onSubmit={this.submit}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<FormControl>
								<InputLabel>Role</InputLabel>
								<Select
									style={styles.select}
									name="role"
									value={this.state.fields.role}
									onChange={this.handleChange}
								>
									<MenuItem>Role</MenuItem>
									{this.state.data.map(item => (
										<MenuItem key={item.id} value={item.name}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="name"
								value={this.state.fields.name}
								onChange={this.handleChange}
								label="Name"
								fullWidth
								autoComplete="name"
								
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								type="email"
								label="Email Id"
								name="emailid"
								error={!!errors.emailid}
								value={this.state.fields.emailid }
								onChange={this.handleChange}
								fullWidth
								autoComplete="emailid"
							/>
							{errors.emailid && (
								<FormHelperText id="component-error-text" error>{errors.emailid}</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								error={!!errors.mobile}
								type="number"
								name="mobile"
								value={this.state.fields.mobile}
								onChange={this.handleChange}
								label="Mobile Number"
								fullWidth
								autoComplete="mobile"
							/>
							{errors.mobile && (
								<FormHelperText id="component-error-text" error>{errors.mobile}</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12} sm={6}>
						<FormControl >
							<InputLabel htmlFor="adornment-password">Password</InputLabel>
							<Input
								id="adornment-password"
								required
								type={!this.state.hidden ? "password" : "text"}
								label="Password"
								name="password"
								value={this.state.fields.password}
								onChange={this.handleChange}
								fullWidth
								autoComplete="password"
								disabled={!this.state.fields.isPassword}
								endAdornment={
									<InputAdornment position="end">
										<IconButton aria-label="Toggle password visibility" 
										onClick={this.tooglebutton}>
										{this.state.hidden ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
      					</FormControl>
	  				</Grid>
						{ this.state.fields.id &&
							<Grid item xs={12} sm={2}>
								<Checkbox
									id="checkbox"
									color="primary"
									name='isPassword'
									checked={this.state.fields.isPassword}
									onChange={this.handleChange}
								/>
							</Grid>
						}
						<Grid item xs={12} sm={6}>
							<TextField
								required
								label="Address"
								multiline
								rowsMax="8"
								name="address"
								value={this.state.fields.address}
								onChange={this.handleChange}
								style={styles.textField}
								margin="normal"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControlLabel
								control={
									<Checkbox
										value="1"
										name="status"
										checked={this.state.fields.status}
										onChange={this.handleChange}
										color="primary"
										autoComplete="status"
									/>
								}
								label="Check me out"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<input
								required={!this.state.fields.oldImage}
								style={styles.file}
								type="file"
								id="catimage"
								onClick={this.uploadField}
								name="file"
								value={this.state.fields.file}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							{this.state.fields.oldImage && (
								<img
									src={baseurl + this.state.fields.oldImage}
									style={styles.Image}
								/>
							)}
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</React.Fragment>
		);
	}
}

export default User;
