import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Button } from "@rmwc/button";
import { connect } from "react-redux";
import "./Exit.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/elevation/dist/mdc.elevation.css";
import "@material/button/dist/mdc.button.css";

class Exit extends Component {
  score() {
    return "SCORE : " + this.props.score;
  }

  round() {
    return "ROUND : " + (this.props.round - 1);
  }

  result() {
    const score = this.props.score;
    const draw = this.props.draw;
    const round = this.props.round - 1;
    const lost = round - score - draw;
    if (lost < score) {
      //if won
      return (
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
        </div>
      );
    } else if (lost > score) {
      //if lost
      return (
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
          <Typography use="headline4">LOST!!</Typography>
        </div>
      );
    } else {
      //if draw
      return (
        <div
          style={{
            textAlign: "center",
            alignSelf: "center",
            color: "white"
          }}
        >
          <Typography use="headline6">IT'S A</Typography>
          <br />
          <br />
          <Typography use="headline4">DRAW!!</Typography>
        </div>
      );
    }
  }

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
                {this.result()}
                <br />
                <br />
                <br />
                <br />
                <Typography use="overline">{this.score()}</Typography>
                <br />
                <br />
                <Typography use="overline">{this.round()}</Typography>
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

function mapStoreToProps(store) {
  return {
    score: store.Score,
    round: store.Round,
    draw: store.Draw
  };
}

export default connect(mapStoreToProps, null)(Exit);
