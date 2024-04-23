import React from "react";
import ListItem from "./listItem";

//create your first component
export const List = ({tasks, removeTask}) => {
	return (
		<ul>
			{tasks.map((tasks, index) => (
				<ListItem key={index} task={tasks.label} index={index} removeTask={removeTask} />
			))}
		</ul>
	);
};

export default List;
