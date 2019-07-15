  import React from 'react';
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import Button from '@material-ui/core/Button';
  import TableCell from '@material-ui/core/TableCell';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import AddCircle from '@material-ui/icons/AddCircle';
  import {Link} from 'react-router-dom';
  import Grid from '@material-ui/core/Grid';
  import ListItem from '@material-ui/core/ListItem';
  import ListItemIcon from '@material-ui/core/ListItemIcon';
  import ListItemText from '@material-ui/core/ListItemText';
  import axios from 'axios';
  const baseurl = "http://192.168.100.22:8000/";
  var styles ={
    Button:{
      backgroundColor:"red"
    },
    ListItemText:{
      color:"#3f51b5"
    },
    Image:{
      width:160,
      height:140
    },
    Link:{
      textDecoration:'none',
    }
  }

  class ProductList extends React.Component {
    state ={
      data:[]
    };
    async componentDidMount(){
    var options = {
      method: "POST",
      url: "http://localhost:8000/Product/list",
      data: {}
    };
    const { data } = await axios(options);
    this.setState({
      data: data.result
    });
  }
  async delete(id){
    var option ={
      method:'POST',
      url:"http://localhost:8000/Product/delete",
      data:{id}
    }
    await axios(option);
    this.setState({
      data:this.state.data.filter(item => item.id !==id)
    })
  }
    render() {
      return (
        <React.Fragment>
          <Grid item xs>
            <ListItem button>
              <Link to="/Productfrom">
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
              </Link>
              <ListItemText style={styles.ListItemText} primary="Product Details"/>
            </ListItem>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell><img src={baseurl + item.file} style={styles.Image}/></TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell><Link to={`/productlist/edit/${item.id}`} style={styles.Link}>Edit</Link></TableCell>
                    <TableCell align="right"><Button style={styles.Button} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.delete(item.id)}}>Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </Grid>
      </React.Fragment>
    );
  }
}
export default ProductList;