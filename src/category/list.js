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
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
	}
};

class CategoryList extends React.Component {
	state = {
		data: []
	};
	async componentDidMount() {
		var options = {
			method: "POST",
			url: ApiUrl + "category/list",
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
			url:  ApiUrl + "category/delete",
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
				<Grid item xs>
					<ListItem button>
						<Link to="/category/add">
							<ListItemIcon>
								<AddCircle />
							</ListItemIcon>
						</Link>
						<ListItemText
							style={styles.ListItemText}
							primary="Category Details"
						/>
					</ListItem>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell>ParentId</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>File</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.data.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.id}</TableCell>
									<TableCell>{item.Parent}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.Status}</TableCell>
									<TableCell>
										<img
											src={baseurl + item.file}
											style={styles.Image}
										/>
									</TableCell>
									<TableCell>
										<Link
                     						 to={`/category/edit/${item.id}`}
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
export default CategoryList;
