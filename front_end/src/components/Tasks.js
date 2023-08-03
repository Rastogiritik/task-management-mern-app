import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  // call products
  useEffect(() => {
    gettasks();
  }, [])

  



  // get data api intigration
  const gettasks = async () => {
    let result = await fetch('http://localhost:6001/tasks', {
      // or hnm isko headers me se hi le skte hai
    headers:{
      // ye hmne token ko parse krne ke liye use kiya hai
      authorization: `bereer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
    result = await result.json();
    setTasks(result);
  }

  

  // delete data api integration
  const deleteTask = async (id) => {
    let result = await fetch(`http://localhost:6001/deletetask/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      alert("Task is deleted");
      gettasks();
    }
  }


  // search data api integration
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:6001/search/${key}`,);
      result = await result.json();
      if (result) {
        setTasks(result);
      }
    } else {
      gettasks();
    }
  }

  return (
    <div className='prod-list-box'>
      <h1>Tasks List </h1>
      <input className='search-box' type='text' placeholder='Search Task'
        onChange={searchHandle}
      />
      <ul>
        <li>S. no</li>
        <li>title</li>
        <li>description</li>
        <li>status</li>
        <li>Type</li>
        <li>Operation</li>
      </ul>
      {
        tasks.length > 0 ? tasks.map((item, index) =>
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.title}</li>
            <li>{item.description}</li>
            <li>{item.status}</li>
            <li>{item.type}</li>
            <li>
              <button className='del-button' onClick={() => deleteTask(item._id)}>delete</button>
              <Link className='link' to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        )
          :
          <h1>No Task Found</h1>
      }
    </div>
  )
}

export default Tasks