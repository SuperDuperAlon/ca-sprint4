export const COUNT_ADULTS = "COUNT_ADULTS";
export const COUNT_CHILDREN = "COUNT_CHILDREN";
export const COUNT_INFANTS = "COUNT_INFANTS";
export const COUNT_PETS = "COUNT_PETS";
export const CHANGE_COUNT = "CHANGE_COUNT";

const initialState = {
  adultsCount: 1,
  childrenCount: 0,
  infantCount: 0,
  petsCount: 0,
  count: 1,
};

export function reserveReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case COUNT_ADULTS:
      newState = { ...state, adultsCount: state.adultsCount + action.diff };
      console.log(newState);
      break;
    case COUNT_CHILDREN:
      newState = { ...state, childrenCount: state.childrenCount + action.diff };
      break;
    case COUNT_INFANTS:
      newState = { ...state, infantCount: state.infantCount + action.diff };
      break;
    case COUNT_PETS:
      newState = { ...state, petsCount: state.petsCount + action.diff };
      break;
    case CHANGE_COUNT:
      console.log(state);
      newState = {
        ...state,
        count:
          state.adultsCount +
          state.childrenCount +
          state.infantCount +
          state.petsCount +
          action.diff,
      };
      break;
  }
  return newState;
}
// For debug:
// window.userState = newState
// console.log('State:', newState)
