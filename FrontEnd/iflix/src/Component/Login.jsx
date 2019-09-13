import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import { userLogin } from "../services/userServices";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: ""
    };

    this.baseState = this.State;
  }
  handleEmail = event => {
    const emailId = event.target.value;
    this.setState({ emailId: emailId });
  };
  handlePassword = event => {
    const password = event.target.value;
    this.setState({ password: password });
  };
  handleSubmit = e => {
    e.preventDefault();
    //email validation
    if (this.state.emailId.length === 0) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please Enter Email Id"
      });
    } else if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.emailId)
    ) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please Enter Valid Email"
      });
    }
    //Password validation
    else if (this.state.password.length === 0) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please Enter Password"
      });
    } else {
      this.setState({
        openSnackBar: false
      });
      var data = {
        emailId: this.state.emailId,
        password: this.state.password
      };
      userLogin(data)
        .then(response => {
          console.log("Login Successfull.");
          console.log(response);
          console.log(data);
          localStorage.setItem("token", response.data.access_token);
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          console.log(error);
          if (error.response.data.errors) {
            alert(error.response.data.errors.password);
          } else {
            alert(error.response.data.message);
          }
        });
    }
  };
  /** auto close SnackBar */
  handleSnackClose = () => {
    this.setState({
      openSnackBar: false
    });
  };
  render() {
    return (
      <div className="root">
        <Card className="box">
          <Container className="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className="formoValidate">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="emailId"
                      label="Email Address"
                      placeholder="Enter Email"
                      name="emailId"
                      value={this.state.email}
                      onChange={this.handleEmail.bind(this)}
                      autoComplete="emailId"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      placeholder="Enter Password"
                      type="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.handlePassword.bind(this)}
                      autoComplete="current-password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="submit"
                      onClick={this.handleSubmit}
                    >
                      Sign In
                    </Button>
                  </Grid>
                  </Grid>
              </form>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={this.state.openSnackBar}
              autoHideDuration={1000}
              onClose={this.state.handleSnackBarClose}
              varient="error"
              ContentProps={{
                "aria-describedby": "message_id"
              }}
              message={
                <span id="message_id">{this.state.snackBarMessage}</span>
              }
              action={[
                <div key="undo">
                  <Button
                    key="undo"
                    color="primary"
                    size="small"
                    onClick={this.handleSnackClose}
                  >
                    Undo
                  </Button>
                </div>
              ]}
            />
          </Container>
        </Card>
      </div>
    );
  }
}
export default Login;
