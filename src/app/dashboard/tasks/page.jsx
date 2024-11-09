// 'use client'

// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Trash2, CheckCircle } from 'lucide-react'

// const initialTasks = [
//   { id: 1, title: 'Design new landing page', status: 'In Progress', assignee: 'Alice Johnson', completed: false },
//   { id: 2, title: 'Fix navigation bug', status: 'Completed', assignee: 'Bob Smith', completed: true },
//   { id: 3, title: 'Update user documentation', status: 'Not Started', assignee: 'Charlie Brown', completed: false },
//   { id: 4, title: 'Implement new feature', status: 'In Progress', assignee: 'Diana Prince', completed: false },
//   { id: 5, title: 'Refactor authentication module', status: 'In Review', assignee: 'Ethan Hunt', completed: false },
// ]

// export default function TaskList() {
//   const [tasks, setTasks] = useState(initialTasks)
//   const [selectAll, setSelectAll] = useState(false)

//   const handleSelectAll = () => {
//     setSelectAll(!selectAll)
//     setTasks(tasks.map(task => ({ ...task, completed: !selectAll })))
//   }

//   const handleTaskCheck = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ))
//     setSelectAll(tasks.every(task => task.completed))
//   }

//   const handleDelete = (id) => {
//     setTasks(tasks.filter(task => task.id !== id))
//   }

//   const handleMarkComplete = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, status: 'Completed', completed: true } : task
//     ))
//   }

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-semibold text-gray-800">Tasks List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[50px]">
//                   <Checkbox
//                     checked={selectAll}
//                     onCheckedChange={handleSelectAll}
//                     aria-label="Select all tasks"
//                   />
//                 </TableHead>
//                 <TableHead>Task</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Assignee</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {tasks.map((task) => (
//                 <TableRow key={task.id}>
//                   <TableCell>
//                     <Checkbox
//                       checked={task.completed}
//                       onCheckedChange={() => handleTaskCheck(task.id)}
//                       aria-label={`Select task ${task.title}`}
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium">{task.title}</TableCell>
//                   <TableCell>{task.status}</TableCell>
//                   <TableCell>{task.assignee}</TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-2">
//                       <button
//                         onClick={() => handleMarkComplete(task.id)}
//                         className="p-2 text-green-600 hover:text-green-800"
//                         aria-label="Mark as complete"
//                       >
//                         <CheckCircle className="h-5 w-5" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(task.id)}
//                         className="p-2 text-red-600 hover:text-red-800"
//                         aria-label="Delete task"
//                       >
//                         <Trash2 className="h-5 w-5" />
//                       </button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import React from "react";
import LaptopTask from "./LaptopTask";
import MobileTask from "./MobileTask";

export default function page() {
  return (
    <>
      <div className="hidden md:block">
        <LaptopTask />
      </div>
      <div className="block md:hidden">
        <MobileTask />
      </div>
    </>
  );
}
