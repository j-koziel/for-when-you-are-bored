"use client";

import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currTask, setCurrTask] = useState("");
  const [tasks, setTasks] = useState([""]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitted(true);
          setTasks([...tasks, currTask]);
          toast({
            title: "Added a new task",
            description: `Added new task: ${tasks[-1]}`,
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
          setCurrTask("");
        }}
      >
        <input
          type="text"
          placeholder="Add something that you like to do when you're bored..."
          className="min-w-full text-center outline-none"
          value={currTask}
          onChange={(e) => setCurrTask(e.target.value)}
          autoFocus
        />
      </form>

      {isSubmitted === true
        ? tasks.map((task, i) => <li key={i}>{task}</li>)
        : tasks.map((task, i) => <li key={i}>{task}</li>)}
    </main>
  );
}
