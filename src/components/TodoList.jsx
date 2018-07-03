import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import WeatherWidget from './WeatherWidget';

@observer
class TodoList extends Component {
  @observable newTodoTitle = '';

  @action
  handleInputChange = (e) => {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleFormSubmit = (e) => {
    this.props.store.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
    e.preventDefault();
  };

  render() {
    const { store } = this.props;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">
            Add
          </button>
        </form>
        <hr />
        <WeatherWidget
          store={store}
        />
      </div>
    );
  }
}

export default TodoList;
