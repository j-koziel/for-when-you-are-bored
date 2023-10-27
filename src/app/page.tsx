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
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currTask, setCurrTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[] | []>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-0 right-0 m-4">
        <ModeToggle />
      </div>

      <div className="min-h-[45vh] min-w-[100vh] flex flex-col justify-evenly items-center">
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

        <div className="max-w-[100vh] flex flex-row justify-center items-center flex-wrap">
          {isSubmitted === true
            ? tasks.map((task, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <Button className="m-2">{task}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{task}</DialogTitle>
                      <DialogDescription>{i + 1}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))
            : tasks.length
            ? tasks.map((task, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <Button>{task}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{task}</DialogTitle>
                      <DialogDescription>{i + 1}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))
            : null}
        </div>
      </div>
    </main>
  );
}
