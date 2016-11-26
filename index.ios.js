import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import TaskList from './TaskList';
import TaskForm from './TaskForm';

export default class pluraltodo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [
        {
          task: 'Learn React Native',
        },
        {
          task: 'Learn Redux',
        },
      ],
    }
  }

  onAddStarted() {
    this.nav.push({
      name: 'taskform',
    });
  }

  onAdd(task) {
    console.log('a task was added:', task);
    this.state.todos.push({
      task,
    });
    this.setState({ todos: this.state.todos });
    this.nav.pop();
  }

  onCancel() {
    console.log('cancelled!');
    this.nav.pop();
  }

  onDone(todo) {
    console.log('todo was completed:', todo.task);
    const filteredTodos =
      this.state.todos.filter((filterTodo) => {
        return filterTodo !== todo;
      });
    this.setState({ todos: filteredTodos });
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  renderScene(route) {
    switch (route.name) {
      case 'taskform':
        return (
          <TaskForm
            onAdd={this.onAdd.bind(this)}
            onCancel={this.onCancel.bind(this)}
          />
        );
      default:
        return (
          <TaskList
            onDone={this.onDone.bind(this)}
            onAddStarted={this.onAddStarted.bind(this)}
            todos={this.state.todos}
          />
        );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'tasklist', index: 0 }}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.configureScene}
      />
    );
  }
}

AppRegistry.registerComponent('pluraltodo', () => pluraltodo);
