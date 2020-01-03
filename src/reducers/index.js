import { SET_ROOM, SET_ROUND, SET_SCORE, SET_DRAW } from "../actions";
import { combineReducers } from "redux";

//store conatins score which conatins score key
function Score(score = {}, action) {
  switch (action.type) {
    case SET_SCORE:
      return action.score;
    default:
      return score;
  }
}

//store contains draw score which contain draw key
function Draw(draw = {}, action) {
  switch (action.type) {
    case SET_DRAW:
      return action.draw;
    default:
      return draw;
  }
}

//store conatins round which conatins round key
function Round(round = {}, action) {
  switch (action.type) {
    case SET_ROUND:
      return action.round;
    default:
      return round;
  }
}

//store conatins room which conatins room key
function Room(room = {}, action) {
  switch (action.type) {
    case SET_ROOM:
      return action.room;
    default:
      return room;
  }
}

export default combineReducers({ Score, Round, Room, Draw });
