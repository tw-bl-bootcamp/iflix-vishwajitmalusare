import React, { Component } from "react";
import { Drawer } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Label } from "reactstrap";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const thm = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: "auto",
        width: 200
      }
    }
  }
});

class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      labels: []
    };
  }
  handleNotes = event => {
    event.preventDefault();
    this.props.history.push("/dashboard");
  };
//   handleArchive = event => {
//     event.preventDefault();
//     getArchivedNotes()
//       .then(response => {
//         console.log(response);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
//   handleTrash = event => {
//     event.preventDefault();
//     getTrashedNotes()
//       .then(response => {
//         console.log(response);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   componentDidMount() {
//     getLabels()
//       .then(response => {
//         this.setState({ labels: response.data.labels });
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.log("Error in getting labels", error);
//       });
//   }
  render() {
    return (
      <div className="side-bar">
        <MuiThemeProvider theme={thm}>
          <Drawer variant="persistent" open={this.props.appBarProps}>
            <div
              style={{
                borderBottom: "1px solid lightgrey",
                borderTop: "0.5px solid lightgrey"
              }}
            />
            <MenuItem>
              &nbsp;&nbsp;
              <img
                className="drawer-img"
                src={require("../assets/notes.svg")}
                alt="color picker"
              />
              <span className="sidebar-text" onClick={this.handleNotes}>
                {" "}
                Notes
              </span>
            </MenuItem>
            <MenuItem>
              &nbsp;&nbsp;
              <img
                className="drawer-img"
                src={require("../assets/reminder.svg")}
                alt="color picker"
              />
              <span className="sidebar-text"> Reminders</span>
            </MenuItem>
            <div
              style={{
                borderBottom: "1px solid lightgrey",
                borderTop: "1px solid lightgrey"
              }}
            >
              <div
                style={{
                  marginLeft: "10%",
                  marginRight: "218px",
                  fontSize: "12px",
                  marginBottom: "30%",
                  marginTop: "10px",
                  fontFamily: "arial"
                }}
              >
                <Label>LABELS</Label>
              </div>
              <div>
                <MenuItem>
                  <img
                    className="drawer-img"
                    src={require("../assets/create.svg")}
                    alt="color picker"
                  />

                  <span className="sidebar-text">Edit labels</span>
                </MenuItem>
              </div>
            </div>
            <div>
              <MenuItem onClick={this.handleArchive}>
                &nbsp;&nbsp;
                <img
                  className="drawer-img"
                  src={require("../assets/archived.svg")}
                  alt="color picker"
                />
                <span className="sidebar-text">Archive</span>
              </MenuItem>
              <MenuItem onClick={this.handleTrash}>
                &nbsp;&nbsp;
                <img
                  className="drawer-img"
                  src={require("../assets/trash.svg")}
                  alt="color picker"
                />
                <span className="sidebar-text">Trash</span>
              </MenuItem>
            </div>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SideBarMenu;
