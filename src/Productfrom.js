import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
const baseurl = "http://192.168.100.22:8000/";

var styles ={
  file:{
  marginTop:17,
  fontSize:18
  },
  Typography:{
    color:"#3f51b5"
  },
  Image:{
    width:132,
    height:101,
  }
}
class Productfrom extends React.Component {
  constructor(){
    super();
    this.state= {
      fields:{
        name:"",
        type:"",
        desc:"",
        qty:"",
        weight:"",
        price:"",
        HSNnumber:"",
        others:"",
        oldImage:"",
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(e){
    let fields= this.state.fields;
    fields[e.target.name] = [e.target.value];
    this.setState({
      fields
    })
  }
  async submit(e){
    e.preventDefault();
    const formdata = new FormData(e.target);
    if(this.state.fields && this.state.fields.id) {
      formdata.append('id', this.state.fields.id);
  }
    var option = {
      method:'POST',
      headers:{
      'Content-Type': 'multipart/form-data',
      },
      url:"http://localhost:8000/Product/save",
      data:formdata
    }
    await axios(option);
    alert("Product Form Submitted");
     window.location.href='/productlist';
  }
 async componentDidMount(){
   if(this.props.match.params.id){
     var options ={
       method:'POST',
       url:'http://localhost:8000/Product/get',
       data:{
        id:this.props.match.params.id
       }
     }
     const {data} = await axios(options);
     console.log(data.result);
     this.setState({
       fields:{
         id:data.result.id,
         name:data.result.name,
         type:data.result.type,
         qty:data.result.qty,
         weight:data.result.weight,
         price:data.result.price,
         HSNnumber:data.result.HSNnumber,
         others:data.result.others,
         oldImage: data.result.file
       }
     })
   }
 }
  render(){
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom style ={styles.Typography}>
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
            label="ProductName"
            fullWidth
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="type"
            value={this.state.fields.type}
            onChange={this.handleChange}
            label=" Type"
            fullWidth
            autoComplete="type"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <input
            required
            style={styles.file}
            type="file"
            name="file"
            value={this.state.fields.file}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          {this.state.fields.oldImage && <img src={baseurl + this.state.fields.oldImage} style={styles.Image}/>}
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

export default Productfrom;