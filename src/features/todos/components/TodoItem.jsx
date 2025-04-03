
import { useState } from 'react';
import AlertButton from './AlertButton';

const TodoItem = ({ id, text, status, completed, alertTime, onToggle, onEdit, onDelete, onUpdateStatus, onSetAlert }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [showConfirm, setShowConfirm] = useState(false);

  // Status classes for styling
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  // Handle save edit
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  // Handle delete confirmation
  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    onDelete(id);
    setShowConfirm(false);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 transition-all duration-300 hover:shadow-md">
      {!isEditing ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span 
                className={`flex-1 ${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
              >
                {text}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Status and Alert Controls */}
          <div className="flex justify-between items-center mt-2">
            <select
              value={status}
              onChange={(e) => onUpdateStatus(id, e.target.value)}
              className={`text-xs p-1 rounded ${statusClasses[status]}`}
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            
            <AlertButton 
              todoId={id} 
              currentAlert={alertTime} 
              onSetAlert={onSetAlert}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showConfirm && (
        <div className="mt-2 p-2 border border-red-200 rounded bg-red-50">
          <p className="text-sm text-red-600 mb-2">Are you sure you want to delete this task?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancelDelete}
              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;