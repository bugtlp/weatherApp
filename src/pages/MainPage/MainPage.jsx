import React, { Component } from 'react';
import PropTypes from 'prop-types'

import TodoList from 'components/TodoList';
import TodoListModel from 'models/TodoListModel';
// import TodoModel from 'models/TodoModel';

export class MainPage extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  componentWillMount() {
    this.store = new TodoListModel();
  }

  componentDidMount() {
    const { store } = this;
    store.addTodo('Get Coffee');
    store.addTodo('Write simpler code');
    store.todos[0].finished = true;
  }

  render() {
    const { store } = this;
    return (
      <div>
        <TodoList store={store} />
      </div>
    );
  }
}

export default MainPage;