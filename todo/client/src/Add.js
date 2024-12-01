import React, { useState } from 'react';

function Add({fetchAgain}) {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim() !== '') {
      const newTask = {
        id: Math.floor(Math.random() * 100000), // Generate a random ID
        text: inputText,
        isDone: false
      };
      setInputText('');
      fetch('http://localhost:5000/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    }
    fetchAgain();
  };
  
  return (
    <div className="App">
      <input className="form-control"
        type="text"
        id="addToList"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="btn btn-success m-3" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Add;