"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarIcon,
  Clock,
  Search,
  Tag,
  ChevronDown,
  ChevronUp,
  Trash,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { deleteTaskDb, getTasksDB, updateTasksDB } from "@/axios/taskService";

const initialTasks = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Set up JWT-based authentication for the application",
    priority: "High",
    assignee: {
      id: "1",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    deadline: new Date(2023, 5, 30),
    dateAdded: new Date(2023, 5, 1),
    estimatedTime: "3 days",
    tags: ["backend", "security"],
    isCompleted: false,
  },
  {
    id: "2",
    title: "Design landing page",
    description: "Create a responsive design for the new landing page",
    priority: "Medium",
    assignee: {
      id: "2",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    deadline: new Date(2023, 6, 15),
    dateAdded: new Date(2023, 5, 5),
    estimatedTime: "5 days",
    tags: ["design", "frontend"],
    isCompleted: true,
  },
  {
    id: "3",
    title: "Optimize database queries",
    description: "Improve performance of slow database queries",
    priority: "Low",
    assignee: {
      id: "3",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    deadline: new Date(2023, 7, 1),
    dateAdded: new Date(2023, 5, 10),
    estimatedTime: "2 days",
    tags: ["backend", "performance"],
    isCompleted: false,
  },
];

export default function LaptopTask() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTasks, setExpandedTasks] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [originalTask, setOriginalTask] = useState([]);
  const [changedTask, setChangedTask] = useState([]);

  const fecthTask = async () => {
    try {
      const tasksList = await getTasksDB();
      const tasksWithIds = tasksList.map((member) => ({
        ...member,
        id: member._id || member.email,
      }))
      setTasks(tasksWithIds);
      setOriginalTask(tasksWithIds);
    } catch { }
  };

  useEffect(() => {
    fecthTask();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const toggleTaskCompletion = (taskId) => {
    setChangedTask([...changedTask, taskId])
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    setShowBtn(true);
  };

  const deleteTask = async(taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    try {
      if(taskId)
      {
        await deleteTaskDb(taskId);
      } 
    } catch (error) {
      
    }
  };

  const updateTasks = async () => {

    try {
      console.log("changed tsak: ", changedTask)
      console.log("tasks: ", tasks)
      for (const task of tasks) {

        if (changedTask.includes(task._id)) {

          const taskValue = task
          if (taskValue._id) {
            console.log("jii: ", taskValue)
             await updateTasksDB(taskValue._id, taskValue);
          }
        }
      }
      setShowBtn(false);

    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const cancelBtn = () => {
    setTasks(originalTask);
    setShowBtn(false);
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>Task</TableHead>
                {/* <TableHead>Assignee</TableHead> */}
                <TableHead>Priority</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Est. Time</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <TableRow className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.isCompleted}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`font-medium ${task.isCompleted
                            ? "line-through text-muted-foreground"
                            : ""
                            }`}
                        >
                          {task.title}
                        </label>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {format(task.deadline, "MMM d, yyyy")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{task.estimatedTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleTaskCompletion(task.id)}
                          aria-label={
                            task.isCompleted
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        >
                          <CheckCircle
                            className={`h-4 w-4 ${task.isCompleted
                              ? "text-green-500"
                              : "text-gray-500"
                              }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          aria-label="Delete task"
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedTasks.includes(task.id) && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-muted/50">
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Estimated Time: {task.estimatedTime}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>
                                Date Added:{" "}
                                {format(task.dateAdded, "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        {showBtn ? (
          <div className="flex space-x-4 justify-end">
            <button onClick={updateTasks}
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
              Save
            </button>
            <button className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 transition duration-300" onClick={cancelBtn}>
              Cancel
            </button>
          </div>
        ) : null}

      </CardContent>
    </Card>
  );
}
