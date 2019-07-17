import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
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
      loading:true,
      fields: {
        id: '',
        name: '',
        status: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      fields
    });
  }
  async submit(e) {
    e.preventDefault();
    var options = {
      method: "POST",
      url: "http://localhost:8000/role/save",
      data: {
        id: this.state.fields.id,
        name: this.state.fields.name,
        status: this.state.fields.status
      }
    };
    const data = await axios(options);
    alert("Role Added");
    window.location.href = "/role";
  }
  async componentDidMount() {
    const fields = {...this.state.fields};
    if (this.props.match.params.id) {
      var option = {
        method: "POST",
        url: "http://localhost:8000/role/get",
        data: {
          id: this.props.match.params.id
        }
      };
      const { data } = await axios(option);
      fields.id = data.result.id;
      fields.name = data.result.name;
      fields.status = data.result.status;
    }
    this.setState({
      loading:false,
      fields
    });
  }

  render() {
    if(this.state.loading) return 'Loading...';
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom style={styles.Typography}>
          Role Form
        </Typography>
        <form onSubmit={this.submit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="1"
                    name="status"
                    checked={this.state.fields.status}
                    onChange={this.handleChange}
                    color="primary"
                    autoComplete="status"
                  />
                }
                label="Check me out"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
