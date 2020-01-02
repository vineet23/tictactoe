import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import Alert from "./Alert";
import { connect } from "react-redux";
import { setRound, setScore } from "../actions";
import { socket } from "./Home";
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
      exit: false,
      //game positions
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      //game stats
      score: 0,
      round: 1,
      room: "",
      //to specify whose turn is this
      //todo initialize depending on the scan
      turn: true
    };
  }

  //used for the alert as exit function
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
    }
    //else user has clicked cancel
    else {
      this.setState({
        open: false
      });
    }
  }

  //to send the server about the move if it was the users turn
  sendMove(number) {
    if (this.state.turn) {
      if (this.state[number] === "") {
        socket.emit("move", { number: number, room: this.state.room });
        this.setState({
          [number]: "X",
          turn: false
        });
      }
    }
  }

  //listen for socket events
  componentDidMount() {
    console.log(this.props);
    this.setState({
      room: this.props.room
    });
    //when opponent makes a move
    //data is the block number to which the opponent has played
    try {
      socket.on(
        "play",
        function(data) {
          this.setState({
            [data]: "O",
            turn: true
          });
        }.bind(this)
      );
    } catch (err) {}
  }

  render() {
    console.log(this.state);
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
                    <Typography use="headline6">
                      ROUND {this.state.round}
                    </Typography>
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
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("one");
                        }}
                      >
                        {this.state.one.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("two");
                        }}
                      >
                        {this.state.two.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("three");
                        }}
                      >
                        {this.state.three.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("four");
                        }}
                      >
                        {this.state.four.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("five");
                        }}
                      >
                        {this.state.five.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("six");
                        }}
                      >
                        {this.state.six.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("seven");
                        }}
                      >
                        {this.state.seven.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("eight");
                        }}
                      >
                        {this.state.eight.trim()}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          this.sendMove("nine");
                        }}
                      >
                        {this.state.nine.trim()}
                      </div>
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
                <Typography use="headline4">
                  SCORE : {this.state.score}
                </Typography>
                <br />
                <br />
                <Typography use="overline">
                  {this.state.turn ? "your" : "opponent's"} turn
                </Typography>
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
    room: store.Room
  };
}

export default connect(mapStoreToProps, { setRound, setScore })(Game);
