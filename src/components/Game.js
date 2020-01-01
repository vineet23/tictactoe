import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import "./Game.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/elevation/dist/mdc.elevation.css";
import "@material/button/dist/mdc.button.css";

class Game extends Component {
  render() {
    return (
      <div className="Gamecontainer">
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
                    <Button label="Exit" danger outlined />
                  </div>
                </div>
              </div>
              <div>
                <div className="Gameplay">
                  <div style={{ width: "80%", height: "60%" }}>
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
