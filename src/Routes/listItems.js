import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Link from '@material-ui/core/Link';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  Link:{
    textDecoration: 'none',
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link href="/Dashboard" className={classes.Link}><ListItemText primary="Dashboard"/></Link>
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="HRM" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <Link href="/role" className={classes.Link}>
            <ListItemText primary="Role" /></Link>
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <Link href="/user" className={classes.Link}>
            <ListItemText primary="User" /></Link>
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <ChromeReaderMode />
        </ListItemIcon>
        <Link href="/category" className={classes.Link}><ListItemText primary="Category" /></Link>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
         <Link href="/product" className={classes.Link}><ListItemText  primary="Product"/></Link>
      </ListItem>
    </List>
  );
}
