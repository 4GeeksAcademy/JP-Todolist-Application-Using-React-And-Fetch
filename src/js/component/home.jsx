import React, { useState, useEffect } from "react";
import List from "./list";

//create your first component
export const Home = () => {


		const [tasks, setTasks] = useState ([]);
		const [input, setInput] = useState ("");
		let placeHolderList = [];

//handle input change
 const handleInputChange = (e) => {setInput(e.target.value)};

//add task
const addTask = (tasks) => {
	if (input){
		setTasks([...tasks, input]);
		setInput("");

		fetch('https://playground.4geeks.com/todo/todos/labs404', {
      method: "POST",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        return resp.json();
    })
    .catch(error => {
        console.error(error);
    });
	console.log("addTask() \n", tasks);
	}
};

//remove task
const removeTask = (index) => {
	const newTasks = tasks.filter((_, i) => {i !== index},
	setTasks(newTasks));
};

const createUser = () => {
	let emptyList = [];
	fetch("https://playground.4geeks.com/todo/users/labs404", {
		method:'POST',
		headers:{
			"Content-Type": "application/json"
		}
	})
	.then(resp => resp.json())
	.catch(error =>	console.log(error))
	setTasks(emptyList);
}

// const clearList = () => {
// 	let emptyClearList = [];
// 	fetch("https://playground.4geeks.com/todo/users/labs404", {
// 		method:'DELETE',
// 		headers:{
// 			"Content-Type": "application/json"
// 		}
// 	})
// 	.then(resp => resp.json())
// 	.catch(error =>	console.log(error))
// 	createUser();
// 	setTasks(emptyClearList);
// }

useEffect(() => {

	fetch("https://playground.4geeks.com/todo/users/labs404")
	.then(response => {
		if (!response.ok) {
			setTasks(placeHolderList);
			// setCounter(placeHolderList.length + 1);
			createUser();
		}
		else {
			return response.json();
		};
	})
	.then(data => {
		if (!data) {
			console.log("API data not found, placeholder array used.");
		}
		else {
			setTasks(data.tasks);
			// setCounter(data.length + 1);
		}
	});
}, []);


	return (
		
		<div className="container">
			{/* <button onClick={() => clearList()}>Clear List</button> */}
			<input type="text" value={input} onChange={handleInputChange}/>
			<button onClick={addTask(tasks)}></button>
			<List tasks={tasks} removeTask={removeTask}/>
		</div>
	);
};

export default Home;
