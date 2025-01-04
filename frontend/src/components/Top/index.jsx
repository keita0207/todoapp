import { useState, useEffect } from 'react';
import {
  getToDoList,
  postCreateTodo,
  patchCheckTodo,
  deleteTodo,
} from '../../api/todo';

const Top = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoName, setTodoName] = useState('');

  useEffect(() => {
    ;(async () => {
      const list = await getToDoList();
      console.log(list);
      setTodoList(list);
    })();
  }, []);

  const handleCreate = async () => {
    if (todoName === '' || todoList.some((value) => todoName === value.name))
      return;
    await postCreateTodo(todoName);
    setTodoList(await getToDoList());
  };

  const handleSetTodo = (e) => {
    setTodoName(e.target.value);
  };

  const handleCheck = (e) => {
    const todoId = e.target.value;
    const checked = e.target.checked;
    const list = todoList.map((value, index) => {
      if (value.id.toString() === todoId) {
        todoList[index].checked = checked;
      }
      return todoList[index];
    });
    setTodoList(list);
    patchCheckTodo(todoId, checked);
  };

  const handleDelete = (e) => {
    const todoId = e.currentTarget.dataset.id;
    const list = todoList.filter((value) => value['id'].toString() !== todoId);
    setTodoList(list);
    deleteTodo(todoId);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-xl underline">2025_TOTOLIST</h1>
      </div>
      <div className="flex justify-between mt-4 mb-4 bg-slate-600">
        <input
          type="text"
          placeholder="やること"
          onChange={handleSetTodo}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleCreate}
        >
          作成
        </button>
      </div>
      <div>
        {todoList.map((todo) => {
          return (
            <>
              <div key={todo.id} className="flex items-center mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={todo.id}
                    onChange={handleCheck}
                    checked={todo.checked ? true : false}
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2">{todo.name}</span>
                </label>
                <button
                  data-id={todo.id}
                  onClick={handleDelete}
                  className="bg-transparent text-blue-600 border border-blue-600 rounded px-2 py-1 cursor-pointer ml-2"
                >
                  削除
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Top;
