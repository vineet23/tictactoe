export const SET_SCORE = "SET_SCORE";
export const SET_ROUND = "SET_ROUND";
export const SET_ROOM = "SET_ROOM";

//action for score
export function setScore(score) {
  return {
    type: SET_SCORE,
    score: score
  };
}

//action for round
export function setRound(round) {
  return {
    type: SET_ROUND,
    round: round
  };
}

//action for room
export function setRoom(room) {
  return {
    type: SET_ROOM,
    room: room
  };
}
