import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import Alert from "./Alert";
import { connect } from "react-redux";
import { setRound, setScore, setDraw } from "../actions";
import { socket } from "./Home";
import "./Game.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/elevation/dist/mdc.elevation.css";
import "@material/button/dist/mdc.button.css";

//to maintain the count for each move
var count = 9;

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
      //for recent data i.e number updated
      recent: "zero",
      //game stats
      score: 0,
      draw: 0,
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

  //to check state of the passed in number
  checkstate(number1, number2, number3) {
    if (
      this.state[number1] === this.state[number2] &&
      this.state[number2] === this.state[number3]
    ) {
      if (this.state[number1] !== "") return true;
      else return false;
    } else {
      return false;
    }
  }

  //to check after each move , about whether anyone wins
  check(number) {
    if (number === "one") {
      if (this.checkstate("one", "two", "three")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("one", "four", "seven")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("one", "five", "nine")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "two") {
      if (this.checkstate("one", "two", "three")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("two", "five", "eight")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "three") {
      if (this.checkstate("one", "two", "three")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("three", "six", "nine")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("three", "five", "seven")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "four") {
      if (this.checkstate("one", "four", "seven")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("four", "five", "six")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "five") {
      if (this.checkstate("two", "five", "eight")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("four", "five", "six")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("one", "five", "nine")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("seven", "five", "three")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "six") {
      if (this.checkstate("three", "six", "nine")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("four", "five", "six")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "seven") {
      if (this.checkstate("one", "four", "seven")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("seven", "eight", "nine")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("seven", "five", "three")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "eight") {
      if (this.checkstate("two", "five", "eight")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("seven", "eight", "nine")) {
        this.result(this.state[number]);
        return;
      }
    } else if (number === "nine") {
      if (this.checkstate("three", "six", "nine")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("seven", "eight", "nine")) {
        this.result(this.state[number]);
        return;
      } else if (this.checkstate("one", "five", "nine")) {
        this.result(this.state[number]);
        return;
      }
    }
    if (count === 0) {
      //for draw
      var update_draw = this.state.draw + 1;
      this.props.setDraw(update_draw);
      //to reset
      this.reset({
        open: true,
        exit: false,
        draw: update_draw,
        title: "Result",
        content: "Match Draw!!"
      });
    }
  }

  //result of the match when any one of the pattern matches
  result(char) {
    const { score } = this.state;
    var { open, title, content, exit } = this.state;
    var update_score;
    open = true;
    exit = false;
    title = "Result";
    //the user wons if X
    if (char === "X") {
      content = "Hurray! You WON";
      update_score = score + 1;
    } else {
      content = "You LOST";
      update_score = score;
    }
    const stateUpdate = {
      open: open,
      exit: exit,
      title: title,
      content: content,
      score: update_score
    };
    this.props.setScore(update_score);
    //to reset
    this.reset(stateUpdate);
  }

  //to reset the count and increase the round
  reset(state = {}) {
    const { round } = this.state;
    count = 9;
    var update_round = round + 1;
    this.props.setRound(update_round);
    state.round = update_round;
    state.recent = "zero";
    state.one = "";
    state.two = "";
    state.three = "";
    state.four = "";
    state.five = "";
    state.six = "";
    state.seven = "";
    state.eight = "";
    state.nine = "";
    setTimeout(() => {
      this.setState(state);
    }, 800);
  }

  //to send the server about the move if it was the users turn
  sendMove(number) {
    if (this.state.turn) {
      if (this.state[number] === "") {
        socket.emit("move", { number: number, room: this.state.room });
        count--;
        //update the state
        this.setState({
          [number]: "X",
          recent: number,
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
          count--;
          //update the state about the opponents move
          this.setState({
            [data]: "O",
            recent: data,
            turn: true
          });
        }.bind(this)
      );
    } catch (err) {}
  }

  render() {
    console.log(this.state);
    //check for completion
    this.check(this.state.recent);
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

export default connect(mapStoreToProps, { setRound, setScore, setDraw })(Game);
