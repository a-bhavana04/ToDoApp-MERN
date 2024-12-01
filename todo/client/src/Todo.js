import React, { useState } from 'react';

function Todo({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleCheck = () => {
    // Toggle the isDone property of the task
    onEdit({ ...task, isDone: !task.isDone });
  };

  const handleDelete = () => {
    // Call the onDelete function and pass the task ID to delete
    onDelete(task.id);
  };

  const handleEdit = () => {
    // Toggle the isEditing state to enable editing
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call the onEdit function and pass the edited task with updated text
    onEdit({ ...task, text: editedText });
    // Disable editing mode
    setIsEditing(false);
  };

  return (
    <div className="App">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <label className="form-label m-2" style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>
          {task.text}
        </label>
      )}
      <button className="btn btn-warning m-1" onClick={handleCheck}>Check It</button>
      <button className="btn btn-info m-1" onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button className="btn btn-danger m-1" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Todo;