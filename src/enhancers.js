import {
  applyMiddleware,
  createStore,
  combineReducers,
  bindActionReducers
} from "redux";

const reducer = (state) => state;
//first argument is a reducer, second is the state and third is the enhancer function
//second argument can some from session storage or from the server

//takes preformance metrics of everything happening in redux
const monitorEnhancer = (createStore) => (reducer, initState, enhancer) => {
  const monitorReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = Math.round(end - start);

    console.log(diff, "the difference");
    return newState;
  };
  return createStore(monitorReducer, initState, enhancer);
};
const store = createStore(reducer, monitorEnhancer);

store.dispatch({ type: "hello" });
store.dispatch({ type: "add" });
console.log("enhancers", store.getState());

//applymiddleware creates an enhancer
