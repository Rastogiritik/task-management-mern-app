import React, { useState } from 'react'

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(false);


  const addTask = async () => {

    // simple form validation
    if (!title || !description || !status || !type) {
      setError(true);
      return false;
    }

    
    let result = await fetch('http://localhost:6001/addtask', {
      method: 'post',
      body: JSON.stringify({ title, description, status, type }),
      headers: {
        'Content-Type': 'application/json',        
      },
    })
    result = await result.json();
    if (result) {
      alert("Add product succefully");
      window.location.reload(true);
    }
  }


  return (
    <div>

      <div className='box-prod'>
        <h1>Add Task</h1>
        <textarea
          className='inputstyle-prod'
          rows="2"
          cols="45"
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* true check krne keliye && ye wale operator use krte hai */}
        {error && !title && <span className='error-style'>Required field</span>}

        <textarea
          className='inputstyle-prod'
          rows="4"
          cols="45"
          placeholder='Enter Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !status && <span className='error-style'>Required field</span>}

        <textarea
          className='inputstyle-prod'
          rows="3"
          cols="45"
          placeholder='Enter Status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        {error && !status && <span className='error-style'>Required field</span>}

        <textarea
          className='inputstyle-prod'
          rows="3"
          cols="45"
          placeholder='Enter Type'
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        {error && !type && <span className='error-style'>Required field</span>}
        <br />

        <button
          className='button'
          type='submit'
          onClick={addTask}
        > Add Task
        </button>
      </div>

    </div>
  )
}

export default AddTask