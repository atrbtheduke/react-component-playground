
import { useState, useEffect, useCallback } from 'react';

const useTodos = () => {
  // Initialize state from localStorage with status support
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved).map(todo => ({
      ...todo,
      status: todo.status || 'pending', // Default for old tasks
      createdAt: todo.createdAt || new Date().toISOString(),
      alertTime: todo.alertTime || null
    })) : [];
  });

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, 300); // Debounce to reduce frequent writes
    
    return () => clearTimeout(timer);
  }, [todos]);

  // Add a new todo
  const addTodo = useCallback((text) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: crypto.randomUUID(),
        text,
        status: 'pending',
        completed: false,
        createdAt: new Date().toISOString(),
        alertTime: null
      }
    ]);
  }, []);

  // Update todo status
  const updateStatus = useCallback((id, newStatus) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { 
          ...todo, 
          status: newStatus,
          completed: newStatus === 'completed'
        } : todo
      )
    );
  }, []);

  // Toggle todo completion status
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => {
        if (todo.id === id) {
          const completed = !todo.completed;
          return { 
            ...todo, 
            completed,
            status: completed ? 'completed' : 'pending'
          };
        }
        return todo;
      })
    );
  }, []);

  // Edit todo text
  const editTodo = useCallback((id, newText) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, []);

  // Delete a todo
  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Set alert for a todo
  const setTodoAlert = useCallback((id, alertTime) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, alertTime } : todo
      )
    );
  }, []);

  // Check for alerts that need to be triggered
  useEffect(() => {
    const checkAlerts = setInterval(() => {
      let updatedTodos = false;
      
      const newTodos = todos.map(todo => {
        if (todo.alertTime && new Date(todo.alertTime) <= new Date()) {
          // Alert is due
          alert(`ALERT: Time to work on "${todo.text}"!`);
          updatedTodos = true;
          return { ...todo, alertTime: null };
        }
        return todo;
      });
      
      if (updatedTodos) {
        setTodos(newTodos);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkAlerts);
  }, [todos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    updateStatus,
    setTodoAlert
  };
};

export default useTodos;

