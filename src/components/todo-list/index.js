import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todo-item';
import './style.css';

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	list: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string,
	})),
	inputValue: PropTypes.string,
	onInputChange: PropTypes.func,
	onItemAdd: PropTypes.func,
	onItemRemove: PropTypes.func,
};
const defaultProps = {
	list: [],
	inputValue: '',
	onInputChange: () => {},
	onItemAdd: () => {},
	onItemRemove: () => {},
};

class TodoList extends Component {
	constructor() {
		super();
		this._handleItemAdd = this._handleItemAdd.bind(this);
	}

	_handleItemAdd() {
		this.props.onItemAdd({
			text: this.props.inputValue,
		});
	}

	render() {
		const {
			title,
			list,
			inputValue,
			onInputChange,
			onItemRemove,
		} = this.props;

		return (
			<div className="todo-list">
				<div className="todo-list__title">
					{title}
				</div>
				<div className="todo-list__new">
					<input
						className="todo-list__new-input"
						type="text"
						value={inputValue}
						onChange={onInputChange}
					/>
					<button
						className="todo-list__new-button"
						type="button"
						onClick={this._handleItemAdd}
					>
						新增
					</button>
				</div>
				<ul className="todo-list__content">
					{list && list.map((item, index) => {
						return (
							<TodoItem
								key={index}
								text={item.text}
								index={index}
								onItemRemove={onItemRemove}
							/>
						);
					})}
				</ul>
			</div>
		);
	}
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;
