import {
  applyMiddleware,
  createStore,
  compose,
  bindActionCreators,
  combineReducers
} from "redux";

const initState = {
  users: [
    { id: 1, name: "ishaq" },
    { id: 2, name: "khan" }
  ],
  tasks: [{ title: "eat bread" }, { title: "drink water" }]
};

const addTask = (title) => ({ type: "ADD_TASK", payload: { title } });
const addUser = (name) => ({ type: "ADD_USER", payload: { name } });

const reducer = (state = initState, action) => {
  if (action.type === "ADD_USER") {
    return {
      ...state,
      users: [...state.users, action.payload]
    };
  }
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      tasks: [...state.tasks, action.payload]
    };
  }
};

//combine reducer
const userReducer = (users = initState.users, action) => {
  if (action.type === "ADD_USER") {
    return [...users, action.payload];
  }
  return users;
};

const taskReducer = (tasks = initState.tasks, action) => {
  if (action.type === "ADD_TASK") {
    return [...tasks, action.payload];
  }
  return tasks;
};

//combining the reduces so it looks like initState
const combinedReducer = combineReducers({
  users: userReducer,
  tasks: taskReducer
});

//create the store
const store = createStore(combinedReducer, initState);
//combining reducers

const actions = bindActionCreators({ addTask, addUser }, store.dispatch);

store.subscribe(() => console.log("combining reducers", store.getState()));

actions.addTask("learn redux");
actions.addUser("Mr Blobby");

console.log(store.getState());
