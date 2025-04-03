
import { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import useTodos from '../hooks/useTodos';

const TodoList = () => {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, updateStatus, setTodoAlert } = useTodos();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter todos based on search term and status filter
  const filteredBySearch = todos.filter(todo => 
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTodos = statusFilter === 'all' 
    ? filteredBySearch 
    : filteredBySearch.filter(todo => todo.status === statusFilter);

  // Sort todos based on selected method
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch(sortMethod) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'alert':
        // Sort by alert time (null values at the end)
        if (!a.alertTime && !b.alertTime) return 0;
        if (!a.alertTime) return 1;
        if (!b.alertTime) return -1;
        return new Date(a.alertTime) - new Date(b.alertTime);
      case 'status':
        // Sort by status (active first, then pending, then completed)
        const statusOrder = { active: 1, pending: 2, completed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <TodoForm onAddTodo={addTodo} />

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
          
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <div className="flex space-x-2">
              {[
                { id: 'latest', label: 'Latest' },
                { id: 'oldest', label: 'Oldest' },
                { id: 'alert', label: 'Alert Time' },
                { id: 'status', label: 'Status' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSortMethod(method.id)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    sortMethod === method.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Filter:</span>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'pending', label: 'Pending' },
                { id: 'completed', label: 'Completed' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    statusFilter === filter.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {sortedTodos.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              {searchTerm 
                ? 'No tasks match your search.' 
                : statusFilter !== 'all'
                  ? `No ${statusFilter} tasks found.`
                  : 'No tasks yet. Add one above!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                status={todo.status}
                completed={todo.completed}
                alertTime={todo.alertTime}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
                onUpdateStatus={updateStatus}
                onSetAlert={setTodoAlert}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;