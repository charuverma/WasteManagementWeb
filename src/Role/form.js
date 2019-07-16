import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
	}
};
class Role extends React.Component {
	constructor() {
		super();
		this.state = {
			fields: {
				name: "",
				Status:false,
			},
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.setState({
			fields
		});
    }
    submit(e){
        e.preventDefault();
    }
	render() {
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom style={styles.Typography}>
					Role Form
				</Typography>
				<form onSubmit={this.submit}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="name"
								value={this.state.fields.name}
								onChange={this.handleChange}
								label="Role Name"
								fullWidth
								autoComplete="name"
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

export default Role;
