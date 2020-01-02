import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Button } from "@rmwc/button";
import "./Exit.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/elevation/dist/mdc.elevation.css";
import "@material/button/dist/mdc.button.css";

class Exit extends Component {
  render() {
    return (
      <div className="Exitcontainer">
        <Elevation wrap z={4}>
          <Card className="Exitmain" style={{ backgroundColor: "#0cce6b" }}>
            <div className="Exitmain-table">
              <div
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  color: "white"
                }}
              >
                <Typography use="headline6">You</Typography>
                <br />
                <br />
                <Typography use="headline4">WON!!</Typography>
                <br />
                <br />
                <br />
                <br />
                <Typography use="overline">SCORE : 1</Typography>
                <br />
                <br />
                <Typography use="overline">ROUND : 2</Typography>
              </div>
              <div
                style={{
                  textAlign: "center",
                  alignSelf: "center"
                }}
              >
                <Button
                  label="Exit"
                  danger
                  outlined
                  onClick={() => {
                    this.props.history.replace("/");
                  }}
                />
              </div>
            </div>
          </Card>
        </Elevation>
      </div>
    );
  }
}

export default Exit;
