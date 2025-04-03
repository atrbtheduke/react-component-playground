
import { useState } from 'react';

const AlertButton = ({ todoId, currentAlert, onSetAlert }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [alertDate, setAlertDate] = useState(
    currentAlert ? new Date(currentAlert) : new Date()
  );

  const handleSetAlert = () => {
    onSetAlert(todoId, alertDate.toISOString());
    setShowPicker(false);
  };

  const handleDateChange = (e) => {
    setAlertDate(new Date(e.target.value));
  };

  // Format date for datetime-local input
  const formatDateForInput = (date) => {
    const d = new Date(date);
    // Format as YYYY-MM-DDThh:mm
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowPicker(!showPicker)}
        className="text-xs p-1 bg-gray-100 rounded hover:bg-gray-200 flex items-center"
      >
        {currentAlert ? (
          <>
            <span className="mr-1">🕒</span> 
            {new Date(currentAlert).toLocaleString(undefined, { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </>
        ) : (
          <>
            <span className="mr-1">⏰</span> Set Alert
          </>
        )}
      </button>

      {showPicker && (
        <div className="absolute z-10 bg-white shadow-lg p-3 rounded border mt-1 right-0">
          <input
            type="datetime-local"
            value={formatDateForInput(alertDate)}
            onChange={handleDateChange}
            min={formatDateForInput(new Date())}
            className="border rounded p-1 text-sm w-full"
          />
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => setShowPicker(false)}
              className="flex-1 bg-gray-200 text-gray-800 p-1 rounded text-xs hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              onClick={handleSetAlert}
              className="flex-1 bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertButton;