import { createStore } from 'redux';

const defaultTodos = [
  {
    task: 'Initial todo in store',
  },
];
const defaultState = {
  todos: defaultTodos,
  allTodos: defaultTodos,
  filter: 'pending',
};

function todoStore(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: state.todos.concat([{
          task: action.task,
        }]),
      });
    case 'DONE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.filter(todo => todo !== action.todo),
      });
    case 'TOGGLE_STATE':  // eslint-disable-line
      const filter = state.filter === 'pending' ? 'done' : 'pending';
      return Object.assign({}, state, {
        filter,
      });
    default:
      return state;
  }

}

export default createStore(todoStore);
