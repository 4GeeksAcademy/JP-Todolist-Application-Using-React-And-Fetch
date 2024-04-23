import React from "react";

//create your first component
export const List = ({task, removeTask, index}) => {
	return (
		<li>
            {task} <button onClick={() => removeTask(index)}>X</button>
        </li>
	);
};

export default List;
