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
    // 入力した値が既にtodoListにある場合は何も行わない
    if (todoName === '' || todoList.some((value) => todoName === value.name))
      return;
    await postCreateTodo(todoName);
    setTodoList(await getToDoList());
    clearText();
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

  const clearText = () => {
    setTodoName('');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center p-5">
        <h1 className="text-xl underline">2025_TOTO_LISTS</h1>
      </div>
      <div className="flex justify-between mt-4 mb-4 bg-slate-600">
        <input
          type="text"
          value={todoName}
          placeholder="やること"
          onChange={handleSetTodo}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
        className="text-white bg-slate-800 hover:bg-blue-800 focus:ring-4  font-medium  text-sm px-5 py-2.5  focus:outline-none dark:focus:ring-blue-800"
        onClick={clearText}
        >
          x
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium  text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleCreate}
        >
          作成
        </button>
      </div>
      <div>
        <div className='items-center text-center'>
        {
          todoList.length == 0 ? <p className='text-2xl'>まだ投稿はありません。</p> : <p className='text-2xl'>全ての投稿</p>
        }
        </div>
        
        {todoList.map((todo) => {
          return (
            <>
            <div className='shadow-inner md:shadow-lg bg-slate-200 m-1'>
              <div key={todo.id} className="flex items-center mb-2 p-4 m-4 italic">
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
                {/* <div className='p-5'>
                  {todo.description}
                </div> */}
                <button
                  data-id={todo.id}
                  onClick={handleDelete}
                  className="bg-transparent text-blue-600 border border-blue-600  rounded px-2 py-1 cursor-pointer ml-2"
                >
                  削除
                </button>
              </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Top;
