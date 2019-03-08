import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	index: PropTypes.number,
	onItemRemove: PropTypes.func,
};

const TodoItem = ({ text, index, onItemRemove }) => (
	<li className="todo-item">
		<span className="todo-item__text">{text}</span>
		<button
			className="todo-item__button"
			type="button"
			onClick={() => onItemRemove(index)}
		>
			刪除
		</button>
	</li>
);

TodoItem.propTypes = propTypes;

export default TodoItem;
