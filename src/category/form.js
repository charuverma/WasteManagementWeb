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
import axios from "axios";
import {ApiUrl} from '../config';
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
		width: 459
	},
	textarea: {
		height: 48,
		width: 483
  },
  textField: {
    width: 480,
  },
};
class Categoryform extends React.Component {
	constructor() {
		super();
		this.state = {
			fields: {
				name: "",
				parentId: "",
				slug: "",
				desc: "",
				metatitle: "",
				metadesc: "",
				metakeyword: "",
				Status: false,
				oldImage: ""
			},
			data: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}
	handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.type === "checkbox"
            ? e.target.checked
            : e.target.value;
		this.setState({
			fields
		});
	}
	async submit(e) {
		e.preventDefault();
		const file = document.getElementById('catimage');
		if(file.files.length && file.files[0].size > 307200){
			alert("File is too big!");
			return false;
		};
		const formdata = new FormData(e.target);
		if (this.state.fields && this.state.fields.id) {
			formdata.append("id", this.state.fields.id);
		}
		var option = {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data"
			},
			url: ApiUrl + "category/save",
			data: formdata
		};
		await axios(option);
		alert("Category Form Submitted");
		window.location.href = "/category";
	}
	async componentDidMount() {
		var option = {
			method: "POST",
			url: ApiUrl + "category/list",
			data: {}
		};
		const { data } = await axios(option);
		this.setState({
			data: data.result
		});
		if (this.props.match.params.id) {
			var options = {
				method: "POST",
				url: ApiUrl + "category/get",
				data: {
					id: this.props.match.params.id
				}
			};
			const { data } = await axios(options);
			this.setState({
				fields: {
					id: data.result.id,
					name: data.result.name,
					parentId: data.result.parentId,
					slug: data.result.slug,
					desc: data.result.desc,
					metatitle: data.result.metatitle,
					metadesc: data.result.metadesc,
					metakeyword: data.result.metakeyword,
					Status: data.result.Status,
					oldImage: data.result.file
				}
			});
		}
	}
	
	render() {
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom style={styles.Typography}>
					Category Form
				</Typography>
				<form onSubmit={this.submit}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="name"
								value={this.state.fields.name}
								onChange={this.handleChange}
								label="CategoryName"
								fullWidth
								autoComplete="name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl>
								<InputLabel>Parent category</InputLabel>
								<Select
									style={styles.select}
									name="parentId"
									value={this.state.fields.parentId}
									onChange={this.handleChange}
								>
									<MenuItem>Parent Id</MenuItem>
									{this.state.data.map(item => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="slug"
								value={this.state.fields.slug}
								onChange={this.handleChange}
								label=" Slug"
								fullWidth
								autoComplete="slug"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
							id="standard-multiline-flexible"
							label="Description"
							multiline
							rowsMax="8"
							name="desc"
							value={this.state.fields.desc}
							onChange={this.handleChange}
							style={styles.textField}
							margin="normal"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="metatitle"
								value={this.state.fields.metatitle}
								onChange={this.handleChange}
								label="Meta Title"
								fullWidth
								autoComplete="metatitle"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
							id="standard-multiline-flexible"
							label="Meta Description"
							multiline
							rowsMax="8"
							name="metadesc"
							value={this.state.fields.metadesc}
							onChange={this.handleChange}
							style={styles.textField}
							margin="normal"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
							id="standard-multiline-flexible"
							label="Meta Keyword"
							multiline
							rowsMax="8"
							name="metakeyword"
							value={this.state.fields.metakeyword}
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
										name="Status"
										checked={this.state.fields.Status}
										onChange={this.handleChange}
										color="primary"
										autoComplete="Status"
									/>
								}
								label="Check me out"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<input
								required
								style={styles.file}
								type="file"
								id='catimage'
								onClick={this.uploadField}
								name="file"
								value={this.state.fields.file}
								onChange={this.handleChange}
								
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
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

export default Categoryform;
