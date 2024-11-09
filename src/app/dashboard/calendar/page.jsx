"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EnhancedTaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const addTask = () => {
    if (newTask.title && selectedDate) {
      const taskDate = new Date(selectedDate);
      const deadlineDate = new Date(taskDate);
      deadlineDate.setDate(deadlineDate.getDate() + 1); // Set deadline to next day by default

      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask.title,
          description: newTask.description || "",
          date: taskDate,
          deadline: deadlineDate,
          priority: newTask.priority,
        },
      ]);
      setNewTask({ title: "", description: "", priority: "Medium" });
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getTasksForDate = (date) => {
    return tasks.filter(
      (task) =>
        task.date.getDate() === date.getDate() &&
        task.date.getMonth() === date.getMonth() &&
        task.date.getFullYear() === date.getFullYear()
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div>
          <Button
            onClick={prevMonth}
            variant="outline"
            size="icon"
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={nextMonth} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="h-24 bg-gray-100 rounded-lg"
          ></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            index + 1
          );
          const dayTasks = getTasksForDate(date);
          return (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="h-24 bg-white border rounded-lg p-2 cursor-pointer hover:bg-gray-50 overflow-hidden">
                  <div className="font-semibold">{index + 1}</div>
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs truncate mt-1 p-1 rounded ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-500 mt-1">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {date.toLocaleDateString("default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newTaskTitle">New Task</Label>
                    <Input
                      id="newTaskTitle"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newTaskDescription">Description</Label>
                    <Textarea
                      id="newTaskDescription"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newTaskPriority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) =>
                        setNewTask({ ...newTask, priority: value })
                      }
                    >
                      <SelectTrigger id="newTaskPriority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedDate(date);
                      addTask();
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Task
                  </Button>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Tasks for this day:</h3>
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-2 rounded ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-xs">{task.description}</p>
                            <p className="text-xs mt-1">
                              Deadline: {task.deadline.toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedTaskCalendar;
