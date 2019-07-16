import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import Link from "@material-ui/core/Link";

var styles = {
	Link: {
		textDecoration: "none"
	}
};
export const mainListItems = (
	<div>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<Link href="/dashboard" style={styles.Link}>
				<ListItemText primary="Dashboard" />
			</Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<Link href="/category" style={styles.Link}>
				<ListItemText primary="Category" />
			</Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<Link href="/product" style={styles.Link}>
				<ListItemText primary="Product" />
			</Link>
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<HomeIcon/>
			</ListItemIcon>
			<Link href="/role/add" style={styles.Link}>
				<ListItemText primary="Role" />
			</Link>
		</ListItem>
		
		
	</div>
);
