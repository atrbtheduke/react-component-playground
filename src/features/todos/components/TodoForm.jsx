
import { useState, useEffect } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    onAddTodo(input.trim());
    setInput('');
    setError('');
  };

  // Clear error when input changes
  useEffect(() => {
    if (input && error) {
      setError('');
    }
  }, [input, error]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;