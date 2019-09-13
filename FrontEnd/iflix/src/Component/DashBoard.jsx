import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import SideBarMenu from "./SideBarMenu";
import CreateNotes from "./CreateNotes";
import { logoutService } from "../services/userServices";
import ShowNotes from "../components/ShowNotes";
import Tooltip from "@material-ui/core/Tooltip";
import GridView from "@material-ui/icons/ViewAgendaOutlined";
import ListView from "@material-ui/icons/BorderAllRounded";
import RefreshIcon from "@material-ui/icons/Refresh";
import InputBase from "@material-ui/core/InputBase";
import Search from "@material-ui/icons/Search";

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

  handleLogout = event => {
    event.preventDefault();
    const accessToken = localStorage.getItem("token");
    logoutService(accessToken)
      .then(response => {
        console.log(response.data.message);
        localStorage.clear();
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log("Oops, Something went wrong!", error);
      });
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
                src={require("../assets/fundoo_img.png")}
                alt="fundoo icon"
              />
              &nbsp;
              <div className="titleName">
                <Typography variant="h6" className="title">
                  FundooNotes
                </Typography>
              </div>
              <div className="search">
                <div className="searchIcon">
                  <Tooltip title="Search">
                    <IconButton>
                      <Search />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="searchInput">
                  <InputBase placeholder="Search" id="searchInputBase" />
                </div>
              </div>
              <div className="refreshGridProfile">
                <IconButton>
                  <Tooltip title="Refresh">
                    <RefreshIcon onClick={this.refreshHandler} />
                  </Tooltip>
                </IconButton>

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
              <PopupState variant="popover" popupId="demo-popup-menu">
                {PopupState => (
                  <React.Fragment>
                    <IconButton
                      aria-label="Account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      {...bindTrigger(PopupState)}
                    >
                      <AccountCircle />
                    </IconButton>

                    <Menu {...bindMenu(PopupState)} color="inherit">
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Toolbar>
            <SideBarMenu appBarProps={this.state.open} />
          </AppBar>
        </MuiThemeProvider>
        <div className="note-create">
          <CreateNotes />
        </div>
        <div className="show-notes">
          <ShowNotes props={this.props} grid={this.state.grid} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
