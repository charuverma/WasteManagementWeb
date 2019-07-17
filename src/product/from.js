import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import{ApiUrl} from '../config';
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
	}
};
class Productfrom extends React.Component {
	constructor() {
		super();
		this.state = {
			loading:true,
			fields: {
				id:"",
				name: "",
				type: "",
				desc: "",
				qty: "",
				weight: "",
				price: "",
				HSNnumber: "",
				others: "",
				oldImage: ""
			},
			categories: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] = [e.target.value];
		this.setState({
			fields
		});
	}

	async submit(e) {
		e.preventDefault();
		const file= document.getElementById('Proimage');
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
			url: ApiUrl + "product/save",
			data: formdata
		};
		await axios(option);
		alert("Product Form Submitted");
		window.location.href = "/product";
	}

	async componentDidMount() {
		var fields = { ...this.state.fields };
		if (this.props.match.params.id) {
			var options = {
				method: "POST",
				url: ApiUrl + "product/get",
				data: {
					id: this.props.match.params.id
				}
			};
			const { data } = await axios(options);
				fields.id = data.result.id;
				fields.name =  data.result.name;
				fields.type =  data.result.type;
				fields.qty =  data.result.qty;
				fields.weight =  data.result.weight;
				fields.price =  data.result.price;
				fields.HSNnumber =  data.result.HSNnumber;
				fields.others =  data.result.others;
				fields.oldImage =  data.result.file;
		}

		var category = {
			method: "POST",
			url: ApiUrl + "category/list",
			data: {}
		};

		const { data: categories } = await axios(category);
		this.setState({
			loading:false,
			fields,
			categories: categories.result
		});
	}
	render() {
		if(this.state.loading) return 'loading...';
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom style={styles.Typography}>
					Product Form
				</Typography>
				<form onSubmit={this.submit}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="name"
								value={this.state.fields.name}
								onChange={this.handleChange}
								label="Product Name"
								fullWidth
								autoComplete="name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl>
								<InputLabel>category</InputLabel>
								<Select
									style={styles.select}
									name="type"
									value={this.state.fields.type}
									onChange={this.handleChange}
								>
									<MenuItem>Category Type</MenuItem>
									{this.state.categories.map(item => (
										<MenuItem
											key={item.id}
											value={item.name}
										>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								type="number"
								name="qty"
								value={this.state.fields.qty}
								onChange={this.handleChange}
								label="Quantity"
								fullWidth
								autoComplete="qty"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="weight"
								value={this.state.fields.weight}
								onChange={this.handleChange}
								label="Weight(kg)"
								fullWidth
								autoComplete="weight"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								type="number"
								name="price"
								value={this.state.fields.price}
								onChange={this.handleChange}
								label="Price"
								fullWidth
								autoComplete="price"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								type="number"
								name="HSNnumber"
								value={this.state.fields.HSNnumber}
								onChange={this.handleChange}
								label="HSN Number"
								fullWidth
								autoComplete="HSNnumber"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="others"
								value={this.state.fields.others}
								onChange={this.handleChange}
								label="Others"
								fullWidth
								autoComplete="others"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<input
								required={!this.state.fields.oldImage}
								style={styles.file}
								id="Proimage"
								type="file"
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
						<Grid item xs={12} >
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

export default Productfrom;
