import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from "redux";

const initState = { value: 0 };
const increment = () => ({ type: "INCREMENT" });
const subtract = () => ({ type: "SUBTRACT", payload: 1 });

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
      break;
    case "SUBTRACT":
      return { value: state.value - 1 };
      break;
    default:
      return state;
  }
  return state;
};

const store = createStore(reducer);

//dispatch gets an action into a reducer

store.dispatch(increment()); //calls the action creator

//rules for reducers
//no mutating object, touch it - replace it
//you have to return something
//its just a javascript function

//Subcribe is like an event listener or an event ommitter

const subscriber = () => console.log("SUBSCRIBER", store.getState());
store.subscribe(subscriber);

store.dispatch(subtract());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(subtract());
store.dispatch(increment());

//bindActionCreator binding a dispatch to an action
//first is what functions should be bound, second is whcih store to displatch it to
const actions = bindActionCreators({ increment, subtract }, store.dispatch);

//now when these functions are called, dont have to use store.dispatch()

actions.increment();
actions.subtract();

console.log(store.getState());

//what bindaction creator is actually doing

const [dispatchIncrement, dispatchSubtract] = [increment, subtract].map(
  (fn) => {
    return compose(store.dispatch, fn);
  }
);

dispatchIncrement();
dispatchSubtract();

//subcribe, everytime the state changes calls this function
const subcriber = () => console.log("subbed", store.getState());

store.subscribe(subcriber);

//Combining reducers
