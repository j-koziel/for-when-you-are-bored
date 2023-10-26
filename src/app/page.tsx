"use client";

import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NavBar } from "./components/navigation-bar";

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currTask, setCurrTask] = useState("");
  const [tasks, setTasks] = useState<string[] | []>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      <NavBar />
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitted(true);
          setTasks([...tasks, currTask]);
          toast({
            title: "Added a new task",
            description: `Added new task: ${currTask}`,
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
          setCurrTask("");
        }}
      >
        <Input
          type="text"
          placeholder="Add something that you like to do when you're bored..."
          className="min-w-full text-center outline-none"
          value={currTask}
          onChange={(e) => setCurrTask(e.target.value)}
          autoFocus
        />
      </form>

      <div className="flex flex-col justify-center items-center">
        {isSubmitted === true
          ? tasks.map((task, i) => (
              <Dialog key={i}>
                <DialogTrigger>{task}</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))
          : tasks.map((task, i) => (
              <Dialog key={i}>
                <DialogTrigger>{task}</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
      </div>
    </main>
  );
}
