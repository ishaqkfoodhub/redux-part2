import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from "redux";

//three function to modify a string
const add = (string) => string + 1;
const repeatThreeTimes = (string) => string.repeat(3);
const makeBold = (string) => string.bold();

//this is what the compose function does behind the scenes
const makeLoud = (string) => makeBold(repeatThreeTimes(add(string)));

console.log(makeLoud("hello world"));

//way to take multiple functions and make something from those peices
const makeLouder = compose(add, repeatThreeTimes, makeBold);

console.log(makeLouder("ishaq khan"));

//stores and reducers

//making a store
//exopects a reducer as an argument

//what is a reducer? stuff goes in, stuff goes out
//a reducer is a pure function. Two arguments go in, one comes out
//the arguments are first is the state (javascript object), the second argument is the action (thing being changed ) also another javasscript object

//state and action goes in, new state comes out
const intiState = { value: 0 };
const reducer = (state, action) => {
  return state;
};

const altReducer = (state, action) => {
  if (action.type === "INCREMENT") {
    return { value: state.value + 1 };
  }
  if (action.type === "ADD") {
    return { value: state.value + 2 };
  }
  if (action.type === "SUBTRACT") {
    return { value: state.value - 1 };
  }
};

const store = createStore(reducer);
//create store has four methods
//changes the reducer for code splitting
store.replaceReducer(altReducer);

//getState, gets the state
store.getState();

//an action
//an action is an object (must have the value type) used in the second argument of reducer
//tells the store what needs updating inside the state
//convention is to use a constant
const incrementAction = { type: "INCREMENT" };
//dispatch

//actions
//use a function to create an action
//function that returns an action is called an action creator

const increment = () => ({ type: "INCREMENT", payload: 5 });
const adding = () => ({ type: "ADD", payload: 10 });
const subtract = () => ({ type: "SUBTRACT", payload: 1 });

//go to dispatch.js to learn about dispatch
