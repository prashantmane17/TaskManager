"use client";

import { useEffect, useState } from "react";
import { Calendar as CheckCircle, Clock, Users } from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTasksDB } from "@/axios/taskService";
import { getMember } from "@/axios/teamUser";

const data = [
  { name: "Mon", tasks: 3 },
  { name: "Tue", tasks: 7 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 8 },
  { name: "Fri", tasks: 12 },
  { name: "Sat", tasks: 4 },
  { name: "Sun", tasks: 6 },
];

const recentTasks = [
  {
    id: 1,
    title: "Design new landing page",
    status: "In Progress",
    assignee: "Alice Johnson",
  },
  {
    id: 2,
    title: "Fix navigation bug",
    status: "Completed",
    assignee: "Bob Smith",
  },
  {
    id: 3,
    title: "Update user documentation",
    status: "Not Started",
    assignee: "Charlie Brown",
  },
  {
    id: 4,
    title: "Implement new feature",
    status: "In Progress",
    assignee: "Diana Prince",
  },
  {
    id: 5,
    title: "Refactor authentication module",
    status: "In Review",
    assignee: "Ethan Hunt",
  },
];

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [taskData, setTaskData] = useState([]);
  const [totalTasks, setTotalTasks] = useState("0");
  const [completedTask, setCompletedTask] = useState("0");
  const [pendingTask, setPendingTask] = useState("0");
  const [teamCount, setTeamCount] = useState("0");

  const fecthTasks = async () => {
    try {
      const employees = await getMember();
      setTeamCount(employees.length);
      const userTasks = await getTasksDB();
      setTaskData(userTasks);
      setTotalTasks(userTasks.length);
      setCompletedTask("1");
      setPendingTask("2");
      console.log(userTasks);
    } catch {}
  };
  useEffect(() => {
    fecthTasks();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTask}</div>
            <p className="text-xs text-muted-foreground">62% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTask}</div>
            <p className="text-xs text-muted-foreground">33% of total tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamCount}</div>
            <p className="text-xs text-muted-foreground">
              Active collaborators
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>
              Number of tasks completed per day this week
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0 md:pl-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="tasks" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Keep track of important dates and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
