"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const teamMembers = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Brown" },
  { id: "4", name: "Diana Ross" },
];

export default function AddTaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
    deadline: new Date(),
    dateAdded: new Date(),
    estimatedTime: "",
    tags: [],
    attachments: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    if (date) {
      setTask((prev) => ({ ...prev, [field]: date }));
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setTask((prev) => ({ ...prev, tags }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setTask((prev) => ({
        ...prev,
        attachments: Array.from(e.target.files || []),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted task:", task);
    // Here you would typically send the task data to your backend or state management system
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
        <CardDescription>
          Fill in the details to create a new task
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={task.priority}
              onValueChange={(value) => handleSelectChange("priority", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assign To</Label>
            <Select
              value={task.assignee}
              onValueChange={(value) => handleSelectChange("assignee", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !task.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {task.deadline ? (
                    format(task.deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={task.deadline}
                  onSelect={(date) => handleDateChange(date, "deadline")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Date Added</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !task.dateAdded && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {task.dateAdded ? (
                    format(task.dateAdded, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={task.dateAdded}
                  onSelect={(date) => handleDateChange(date, "dateAdded")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time</Label>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <Input
                id="estimatedTime"
                name="estimatedTime"
                value={task.estimatedTime}
                onChange={handleInputChange}
                placeholder="e.g., 2 hours"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              value={task.tags.join(", ")}
              onChange={handleTagsChange}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <Input
              id="attachments"
              name="attachments"
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Add Task
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
