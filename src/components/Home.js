import React, { Component } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Button } from "@rmwc/button";
import QRCode from "qrcode.react";
import QrReader from "react-qr-reader";
import { setScore, setRoom, setRound } from "../actions";
import { connect } from "react-redux";
import "./Home.css";
import "@material/card/dist/mdc.card.css";
import "@material/elevation/dist/mdc.elevation.css";
import "@material/button/dist/mdc.button.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      //to define whether to show scan or display
      scan: true,
      //to make a room id
      room: this.makeid(12),
      //result of the scan
      result: ""
    };
  }

  //to handle the scan data
  handleScan = data => {
    if (data) {
      console.log("scanned", data);
      this.setState({
        result: data
      });
    }
  };
  //to handle the error
  handleError = err => {
    console.error(err);
  };

  //to make a room id to craete a unique room id
  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  //to set the text on button
  setText() {
    //if scan is true , then return SCAN or else DISPLAY
    return this.state.scan ? "SCAN" : "DISPLAY CODE";
  }

  componentDidMount() {
    this.props.setRoom({ room: this.state.room });
    this.props.setRound({ round: 0 });
    this.props.setScore({ score: 0 });
  }

  render() {
    return (
      <div className="container">
        <Elevation wrap z={4}>
          <Card className="main" style={{ backgroundColor: "#0cce6b" }}>
            <div className="main-table">
              <div style={{ textAlign: "center", alignSelf: "center" }}>
                {this.state.scan ? (
                  <QRCode
                    value={this.state.room}
                    renderAs="svg"
                    level="H"
                    size="256"
                  />
                ) : (
                  <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
              <div
                style={{
                  textAlign: "center",
                  alignSelf: "center"
                }}
              >
                <Button
                  label={this.setText()}
                  outlined
                  onClick={() => {
                    if (this.state.scan) this.setState({ scan: false });
                    else this.setState({ scan: true });
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

//to map the store to props
function mapStoreToProps(state) {
  return {
    room: state.Room
  };
}

export default connect(mapStoreToProps, { setRoom, setRound, setScore })(Home);
