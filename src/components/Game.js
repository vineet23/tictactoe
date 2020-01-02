import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import Alert from "./Alert";
import "./Game.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/elevation/dist/mdc.elevation.css";
import "@material/button/dist/mdc.button.css";

class Game extends Component {
  constructor() {
    super();
    this.setaction = this.setaction.bind(this);
    this.state = {
      open: false,
      title: "",
      content: "",
      exit: false
    };
  }

  setaction(action) {
    if (action === "ok") {
      //if exit
      if (this.state.exit) {
        this.props.history.replace("/exit");
      }
      //else hide the alert
      else {
        this.setState({
          open: false
        });
      }
    } else {
      this.setState({
        open: false
      });
    }
  }

  render() {
    return (
      <div className="Gamecontainer">
        <Alert
          open={this.state.open}
          title={this.state.title}
          content={this.state.content}
          exit={this.state.exit}
          setaction={this.setaction.bind(this)}
        />
        <Elevation wrap z={4}>
          <Card className="Gamemain" style={{ backgroundColor: "#0cce6b" }}>
            <div className="Gamemain-table">
              <div>
                <div className="Gameheader">
                  <div
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      color: "white"
                    }}
                  >
                    <Typography use="headline6">ROUND 2</Typography>
                  </div>
                  <div style={{ textAlign: "center", alignSelf: "center" }}>
                    <Button
                      label="Exit"
                      danger
                      outlined
                      onClick={() => {
                        this.setState({
                          open: true,
                          title: "Exit",
                          content: "Do you want to exit?",
                          exit: true
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="Gameplay">
                  <div className="GameWindow">
                    <div className="Gameplayground">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  color: "white"
                }}
              >
                <Typography use="headline4">SCORE : 1</Typography>
                <br />
                <br />
                <Typography use="overline">your turn</Typography>
              </div>
            </div>
          </Card>
        </Elevation>
      </div>
    );
  }
}

export default Game;
