import React from 'react';
import Todo from "./Todo.js";

function Display({t, onDelete, onEdit}) {
    return (
      <div className="App">
        {t.map(taskitem => (
          <Todo 
            key={taskitem.id}
            task={taskitem}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    );
}

export default Display;