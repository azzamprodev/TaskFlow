"use client";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/auth/authContext";
import { Card } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Pencil } from "lucide-react";
import { ArrowDownRight } from "lucide-react";
import { Trash2 } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import { useToast } from "@/hooks/use-toast";

export default function TaskManager() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { name, username } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    task: {
      title: "",
    },
  });
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
  });

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const handleChangeForCreatingNewTask = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      task: {
        ...prevTask.task,
        [name]: value,
      },
    }));
  };

  const handleChangeForUpdatingTask = (event) => {
    const { value } = event.target;
    setUpdatedTask({
      title: value,
    });
  };

  const updateTasks = async (taskId) => {
    setIsLoading(true);
    const url = `http://localhost:4000/api/updateTasks?username=${username}&taskId=${taskId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedTask),
    });
    if (response.status === 200) {
      setIsLoading(false);
      checkTasks();
    } else {
      toast({
        variant: "destructive",
        title: "There was an error updating the task",
      });
    }
    setUpdatedTask({
      title: "",
    });
  };

  const addNewTasks = async () => {
    const url = `http://localhost:4000/api/addNewTask?username=${username}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
      credentials: "include",
    });

    if (response.status === 200) {
      checkTasks();
      setNewTask({
        task: {
          title: "",
        },
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error creating task",
      });
    }
  };

  const checkTasks = async () => {
    const url = `http://localhost:4000/api/checkTasks?username=${username}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.log("Error fetching data", response.status);
    }
  };

  useEffect(() => {
    checkTasks();
  }, []);

  return (
    <>
      <div className="font-bold text-2xl px-4 text-gray-900">
        <span className="bg-primary p-0.5">Good</span> Morning{" "}
        <span className="">{capitalizeWords(name)}...</span>
      </div>
      <div className="py-6 mx-auto w-5/6">
        <div>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <Card className="py-4 px-3 md:px-6 mt-2">
                <div
                  key={task.id}
                  className="flex justify-between items-center"
                >
                  <span className="md:text-lg">{task.title}</span>
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      className="hover:bg-primary hover:border-primary hover:text-white px-3 md:px-4"
                      onClick={() => {
                        updateTasks(task.id);
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress sx={{ color: "#FF7F50" }} />
                      ) : (
                        <Trash2 />
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="outline"
                          className="hover:bg-primary hover:border-primary hover:text-white px-3 md:px-4"
                        >
                          <Pencil />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Edit Task</AlertDialogTitle>
                          <AlertDialogDescription>
                            Deploy your new task in one-click.
                          </AlertDialogDescription>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Describe your task"
                            value={updatedTask.title}
                            onChange={handleChangeForUpdatingTask}
                            required
                          />
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-primary hover:bg-orange-600"
                            onClick={() => {
                              updateTasks(task.id);
                            }}
                            type="submit"
                          >
                            Edit
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="h-[60vh] flex items-center justify-center text-center">
              <div className="text-2xl md:text-3xl font-semibold">
                You Have No <span className="text-primary">Tasks...</span>
                <br />
                <span className="text-sm md:text-md flex items-center justify-center text-center">
                  <span className="bg-primary p-0.5">Start</span> Creating One{" "}
                  <ArrowDownRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          )}
          <div>
            <AlertDialog>
              <div className="fixed bottom-5 right-5">
                <AlertDialogTrigger>
                  <Button>Create New Task</Button>
                </AlertDialogTrigger>
              </div>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deploy your new task in one-click.
                  </AlertDialogDescription>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Describe your task"
                    value={newTask.task.title}
                    onChange={handleChangeForCreatingNewTask}
                    required
                  />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-primary hover:bg-orange-600"
                    onClick={() => {
                      if (newTask.task.title === "") {
                        return;
                      } else {
                        addNewTasks();
                      }
                    }}
                  >
                    Create
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
}
