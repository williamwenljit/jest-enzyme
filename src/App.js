import React, { Component } from 'react';
import TodoList from './components/todo-list';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			list: [],
			inputValue: '',
		};
		this._handleInputChange = this._handleInputChange.bind(this);
		this._handleItemAdd = this._handleItemAdd.bind(this);
		this._handleItemRemove = this._handleItemRemove.bind(this);
	}

	_handleInputChange(event) {
		this.setState({ inputValue: event.target.value });
	}

	_handleItemAdd(item) {
		const list = this.state.list.concat([item]);
		this.setState({ list, inputValue: '' });
	}

	_handleItemRemove(index) {
		const list = this.state.list.slice();
		list.splice(index, 1);
		this.setState({ list });
	}

	render() {
		const {
			list,
			inputValue,
		} = this.state;

		return (
			<div className="App">
				<header className="app-header">
					React Test Demo
				</header>
				<div>
					<TodoList
						title="Todo list 1"
						list={list}
						inputValue={inputValue}
						onInputChange={this._handleInputChange}
						onItemAdd={this._handleItemAdd}
						onItemRemove={this._handleItemRemove}
					/>
				</div>
			</div>
		);
	}
}

export default App;
