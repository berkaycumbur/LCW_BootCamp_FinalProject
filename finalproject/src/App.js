import { useEffect, useState } from 'react';
import {
  loginWithGoogle,
  logout
} from './utils/firebase-auth';
import {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
} from './utils/firebase-db';
import './App.css'

const App = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('user useEffect');

    if (user) {
      readTodos(user.uid).then(todos => {
        setTodos(todos);
      });
    } else if (storedUser) {
      setUser(storedUser);
      readTodos(storedUser.uid).then(todos => {
        setTodos(todos);
      });
    }
  }, []);

  useEffect(() => {
    user
      ? localStorage.setItem('user', JSON.stringify(user))
      : localStorage.removeItem('user');
  }, [user]);

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(user => {
        setUser({
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        setUser(null);
        setTodos([]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleTodoAdd = event => {
    const todoTitle = event.target.title.value;
    event.preventDefault();

    if (todoTitle) {
      const newTodo = {
        title: todoTitle,
        completed: false,
        userRef: user.uid,
      };

      createTodo(newTodo).then(todoId => {
        setTodos([
          ...todos,
          {
            id: todoId,
            ...newTodo,
          },
        ]);
      });
    }

    event.target.title.value = '';
  };

  return user ? (
    <div>
      <header>
        <h1>Hello {user.name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <form onSubmit={handleTodoAdd} className='container'>
        <input type='text' placeholder='Enter todo' name='title' id='title' />
        <button type='submit'>Add</button>
      </form>
      <ul className='container'>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.title}</s> : <span>{todo.title}</span>}
            <div className='todo-btns'>
              <button
                onClick={() => {
                  updateTodo(todo.id, { completed: !todo.completed }).then(
                    () => {
                      setTodos(
                        todos.map(t =>
                          t.id === todo.id
                            ? { ...t, completed: !todo.completed }
                            : t,
                        ),
                      );
                    },
                  );
                }}
              >
                {todo.completed ? 'Uncomplete' : 'Complete'}
              </button>
              <button
                onClick={() => {
                  deleteTodo(todo.id).then(() => {
                    setTodos(todos.filter(t => t.id !== todo.id));
                  });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>
      <header>
        <h1>Login</h1>
      </header>
      <div className='login-btns'>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
};

export default App;