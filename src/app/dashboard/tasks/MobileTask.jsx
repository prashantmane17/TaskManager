"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarIcon,
  Clock,
  Search,
  Tag,
  Trash,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";

// Define tasks as a constant array of objects
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
    completed: false,
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
    completed: false,
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
    completed: false,
  },
];

export default function MobileTask() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState(initialTasks);

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

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Tasks</CardTitle>
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
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`mb-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow ${
                task.completed ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`text-base font-semibold ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              <p
                className={`text-sm text-gray-600 mb-2 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <Avatar className="h-5 w-5 mr-1">
                    <AvatarImage
                      src={task.assignee.avatar}
                      alt={task.assignee.name}
                    />
                    <AvatarFallback>
                      {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{task.assignee.name}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>{format(task.deadline, "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{task.estimatedTime}</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {task.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-1 py-0"
                  >
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleComplete(task.id)}
                >
                  <CheckCircle
                    className={`h-5 w-5 ${
                      task.completed ? "text-green-500" : "text-gray-500"
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
