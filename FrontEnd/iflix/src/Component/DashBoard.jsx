import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import GridView from "@material-ui/icons/ViewAgendaOutlined";
import ListView from "@material-ui/icons/BorderAllRounded";

const thm = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 60,
        width: 240,
        background: "white",
        border: "transparent"
      }, 
      paperAnchorDockedLeft: {
        borderColor: "white"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        color: "black",
        backgroundColor: "whitesmoke"
      },
      root: {
        left: "auto"
      }
    }
  }
});

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      popoverOpen: false,
      grid: false
    };
    this.refreshHandler = this.refreshHandler.bind(this);
  }

  grid = grid => {
    try {
      this.setState({ grid: grid });
    } catch (error) {
      console.log("Error in cards view");
    }
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  refreshHandler = event => {
    event.preventDefault();
    window.location.reload();
  };

  gridHandler = e => {
    this.setState({ grid: !this.state.grid });
  };



  render() {
    return (
      <div className="dashboard">
        <MuiThemeProvider theme={thm}>
          <AppBar position="fixed" color="inherit">
            <Toolbar>
              <IconButton
                edge="start"
                className="menuButton"
                color="inherit"
                aria-label="Menu"
                onClick={this.handleToggle}
              >
                <MenuIcon />
              </IconButton>
              <img
                className="img"
                src={require("../assets/film_img.png")}
                alt="iflix icon"
              />
              &nbsp;
              <div className="titleName">
                <Typography variant="h6" className="title">
                  Iflix
                </Typography>
              </div>
              <div>
                {!this.state.grid ? (
                  <IconButton onClick={this.gridHandler}>
                    <GridView />
                  </IconButton>
                ) : (
                  <IconButton onClick={this.gridHandler}>
                    <ListView />
                  </IconButton>
                )}
              </div>
              </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Dashboard;
