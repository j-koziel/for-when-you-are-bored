import { Dispatch, SetStateAction } from "react"

function undoTaskAddition(tasks: string[] | [], setTasks: Dispatch<SetStateAction<string[] | []>>) {
  const newTasks = tasks
  newTasks.pop()
  setTasks((prevTasks) => {
    const updatedTasks = [...newTasks];
    return updatedTasks;
  });
}

export default undoTaskAddition