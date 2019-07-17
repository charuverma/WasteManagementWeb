import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Productfrom from "../product/from";
import Productlist from "../product/list";
import categorylist from "../category/list";
import clsx from "clsx";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import categoryform from "../category/form";
import rolelist from '../Role/list';
import role from "../Role/form";
import user from '../user/form';
import userList from '../user/list';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	toolbar: {
		paddingRight: 24 // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	menuButtonHidden: {
		display: "none"
	},
	title: {
		flexGrow: 1
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9)
		}
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto"
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column"
	},
	fixedHeight: {
		height: 500
	}
}));

const Main = () => {
	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
	return (
		<main className={classes.content}>
			<div className={classes.appBarSpacer} />
			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={fixedHeightPaper}>
							<Switch>
								<Route
									path="/dashboard"
									component={Dashboard}
								/>
								<Route
									path="/product/add"
									component={Productfrom}
								/>
								<Route
									path="/product/edit/:id"
									component={Productfrom}
								/>
								<Route
									path="/product"
									component={Productlist}
								/>
								<Route
									path="/category/add"
									component={categoryform}
								/>
								<Route
									path="/category/edit/:id"
									component={categoryform}
								/>
								<Route
									path="/category"
									component={categorylist}
								/>
								<Route
									path="/role/add"
									component={role}
								/>
								<Route
									path="/role/edit/:id"
									component={role}
								/>
								<Route
									path="/role"
									component={rolelist}
								/>
								<Route
									path="/user/add"
									component={user}
								/>
								<Route
									path="/user/edit/:id"
									component={user}
								/>
								<Route
									path="/user"
									component={userList}
								/>
							</Switch>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
};

export default Main;
