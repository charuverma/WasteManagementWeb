import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCircle from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import {ApiUrl} from '../config';
const baseurl = "http://192.168.100.22:8000/";
var styles = {
	Button: {
		backgroundColor: "red"
	},
	ListItemText: {
		color: "#3f51b5"
	},
	Image: {
		width: 50,
		height: 50
	},
	Link: {
		textDecoration: "none"
	},
	Delete:{
		color:"red",
		height:20,
		width:20
	},
	Edit:{
		height:20,
		width:20
	},
	Typography: {
		color: "#3f51b5",
		flexGrow: 1
		 
	}
};

class userList extends React.Component {
	state = {
		data: []
	};
	async componentDidMount() {
		var options = {
			method: "POST",
			url: ApiUrl + "user/list",
			data: {}
		};
		const { data } = await axios(options);
		this.setState({
			data: data.result
		});
	}
	async delete(id) {
        var option = {
          method: "POST",
          url: ApiUrl + "user/delete",
          data: { id }
        };
        await axios(option);
        this.setState({
          data: this.state.data.filter(item => item.id !== id)
        });
      }
	render() {
		return (
			<React.Fragment>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={11}>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							style={styles.Typography}
							>
							User Details
						</Typography>
		  			</Grid>
					  <Grid item xs={12} sm={1}>
		  				<IconButton color="inherit">
							<Badge color="secondary">
								<Link to="../user/add">
									<AddCircle/>
								</Link>
							</Badge>
						</IconButton>
		  			</Grid>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell>Role</TableCell>
								<TableCell>Name</TableCell>
                                <TableCell>Email Id</TableCell>
                                <TableCell>Mobile Number</TableCell>
								<TableCell>Status</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.data.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.id}</TableCell>
									<TableCell>{item.role}</TableCell>
									<TableCell>{item.name}</TableCell>
                                    <TableCell>{item.emailid}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
									<TableCell>{item.status ? 'Active' : 'Inactive'}</TableCell>
					
									<TableCell>
										<Link
                     						 to={`/user/edit/${item.id}`}
										>
											<Create style={styles.Edit}/>
										</Link>
                    					{' '}
										<Delete style={styles.Delete} onClick={() => {
												if (
													window.confirm(
														"Are you sure you wish to delete this item?"
													)
												)
													this.delete(item.id);
											}}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
			</React.Fragment>
		);
	}
}
export default userList;
