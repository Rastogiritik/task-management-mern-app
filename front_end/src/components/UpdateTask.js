import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState(false);
  


  // useParams is a hook it use for get id from params
  const params = useParams();

  const naviagte = useNavigate();

  // isko hnm tub use krte hai jub hme kisi chize ko ek bar call krna ho
  useEffect(()=>{
    getTaskDetail();
  }, [])

  // in update form get data of the update product api
  const getTaskDetail = async () => {
    let result = await fetch(`http://localhost:6001/updatetask/${params.id}`,);

    // ye method data ko json form me lata hai
    result = await result.json();

    // ab is data ko set krnge bt states aise hnm fill krwa skte hai.
    setTitle(result.title);
    setDescription(result.description);
    setStatus(result.status);
    setType(result.type);
  }


  // product update api
  const updateTask = async () => {

    // Simple form validation
    if (!title || !description || !status || !type) {
      setError(true);
      return false;
    }

      let result = await fetch(`http://localhost:6001/updatetask/${params.id}`,
      {
        method: 'put',
        body: JSON.stringify({ title, description, status, type}),
        headers: {
            'Content-Type': 'application/json',
        }
      });
      result = await result.json();
      if (result) {
        alert("Add task succefully");
        naviagte('/');
      }
  }


  return (
    <div>
      <div className='box-prod'>
        <h1>Update Task</h1>
        <textarea
          className='inputstyle-prod'
          rows="2"
          cols="45"
          placeholder='Enter Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && !title && <span className='error-style'>Required field</span>}

      

        <textarea
          className='inputstyle-prod'
          rows="3"
          cols="45"
          placeholder='Enter description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && <span className='error-style'>Required field</span>}


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
          onClick={updateTask}
        > Update Task
        </button>
      </div>
    </div>
  )
}

export default UpdateTask