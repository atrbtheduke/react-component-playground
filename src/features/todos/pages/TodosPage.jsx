
import TodoList from '../components/TodoList';

const TodosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">To-Do</h1>
      <TodoList />
    </div>
  );
};

export default TodosPage;