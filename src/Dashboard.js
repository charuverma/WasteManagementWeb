import React from 'react';
import Grid from "@material-ui/core/Grid";

const Dashboard  = () =>{
  var styles={
    h1 :{
      marginLeft:406,
      fontSize:30,
    },
    p :{
      paddingTop: 39,
      paddingLeft: 19,
    },
  }
  return(
    <div>
      <section>
        <h1 style ={styles.h1}>Waste Management</h1>
      </section>
    </div>
  )
}


export default Dashboard;