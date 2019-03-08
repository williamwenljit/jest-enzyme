import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoList from '../';
import TodoItem from '../todo-item';

describe('Todo List', () => {
    it('should handle default props', () => {
        const {
            list,
            inputValue,
            onInputChange,
            onItemAdd,
            onItemRemove,
        } = TodoList.defaultProps;

        expect(list).toMatchObject([]);
        expect(inputValue).toBe('');
        expect(onInputChange).toBeDefined();
        expect(onInputChange).toBeInstanceOf(Function);
        expect(onItemAdd).toBeDefined();
        expect(onItemAdd).toBeInstanceOf(Function);
        expect(onItemRemove).toBeDefined();
        expect(onItemRemove).toBeInstanceOf(Function);
    });

    it('should renders correctly', () => {
        const wrapper = shallow(
            <TodoList
                title="todo list 1"
                list={[{ text: 'todo item 1' }]}
                inputValue=""
            />
        )

        expect(wrapper).toMatchSnapshot();
    });

    it('should contain title', () => {
        const title = 'todo list 1';
        const wrapper = shallow(<TodoList title={title} />);

        expect(wrapper.contains(
            <div className="todo-list__title">
                {title}
            </div>
        )).toEqual(true);
    });

    it('should contain input and button in .todo-list__new', () => {
        const btnText = '新增';
        const wrapper = shallow(<TodoList />);

        expect(wrapper.find('.todo-list__new').containsAllMatchingElements([
            <input />,
            <button>
                {btnText}
            </button>
        ])).toEqual(true);
    });

    it('should handle title props', () => {
        const title = 'todo list 1';
        const wrapper = shallow(<TodoList title={title} />);

        expect(wrapper.find('.todo-list__title').text()).toEqual(title);
    });

    it('should add list item correctly', () => {
        const list = [{ text: 'todo item 1' }];
        const wrapper = shallow(<TodoList />);

        expect(wrapper.find(TodoItem)).toHaveLength(0);
        wrapper.setProps({ list });
        expect(wrapper.find('TodoItem')).toHaveLength(1);
    });

    it('should handle onInputChange', () => {
        const onInputChange = jest.fn();
        const value = 'todo item 1';
        const event = { target: { value } };
        const wrapper = shallow(<TodoList onInputChange={onInputChange} />);

        wrapper.find('.todo-list__new-input').simulate('change', event);
        expect(onInputChange).toHaveBeenCalled();
        expect(onInputChange).toHaveBeenCalledWith(event);
    });

    it('should handle onItemAdd', () => {
        const onItemAdd = jest.fn();
        const text = 'todo item 1';
        const item = { text };
        const wrapper = shallow(<TodoList inputValue={text} onItemAdd={onItemAdd} />);

        wrapper.find('.todo-list__new-button').simulate('click', item);
        expect(onItemAdd).toHaveBeenCalled();
        expect(onItemAdd).toHaveBeenCalledWith(item);
    });

    it('should handle onItemRemove', () => {
        const list = [{ text: 'todo item 1' }, { text: 'todo item 2' }];
        const onItemRemove = jest.fn();
        const index = 1;
        const wrapper = mount(<TodoList list={list} onItemRemove={onItemRemove} />);

        wrapper.find('.todo-item').at(index).find('.todo-item__button').simulate('click', index);
        expect(onItemRemove).toHaveBeenCalled();
        expect(onItemRemove).toHaveBeenCalledWith(index);
    });
});
