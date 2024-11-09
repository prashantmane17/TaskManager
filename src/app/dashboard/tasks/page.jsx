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



// 'use client'

// import React, { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Checkbox } from "@/components/ui/checkbox"
// import { CalendarIcon, Clock, Search, Tag, ChevronDown, ChevronUp } from "lucide-react"
// import { format } from "date-fns"

// const initialTasks = [
//   {
//     id: '1',
//     title: 'Implement user authentication',
//     description: 'Set up JWT-based authentication for the application',
//     priority: 'High',
//     assignee: { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=32&width=32' },
//     deadline: new Date(2023, 5, 30),
//     dateAdded: new Date(2023, 5, 1),
//     estimatedTime: '3 days',
//     tags: ['backend', 'security'],
//     completed: false
//   },
//   {
//     id: '2',
//     title: 'Design landing page',
//     description: 'Create a responsive design for the new landing page',
//     priority: 'Medium',
//     assignee: { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=32&width=32' },
//     deadline: new Date(2023, 6, 15),
//     dateAdded: new Date(2023, 5, 5),
//     estimatedTime: '5 days',
//     tags: ['design', 'frontend'],
//     completed: true
//   },
//   {
//     id: '3',
//     title: 'Optimize database queries',
//     description: 'Improve performance of slow database queries',
//     priority: 'Low',
//     assignee: { id: '3', name: 'Charlie Brown', avatar: '/placeholder.svg?height=32&width=32' },
//     deadline: new Date(2023, 7, 1),
//     dateAdded: new Date(2023, 5, 10),
//     estimatedTime: '2 days',
//     tags: ['backend', 'performance'],
//     completed: false
//   },
// ]

// export default function CheckboxTaskListView() {
//   const [tasks, setTasks] = useState(initialTasks)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [expandedTasks, setExpandedTasks] = useState([])

//   const filteredTasks = tasks.filter(task =>
//     task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
//   )

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'Low': return 'bg-green-100 text-green-800'
//       case 'Medium': return 'bg-yellow-100 text-yellow-800'
//       case 'High': return 'bg-red-100 text-red-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const toggleTaskExpansion = (taskId) => {
//     setExpandedTasks(prev =>
//       prev.includes(taskId)
//         ? prev.filter(id => id !== taskId)
//         : [...prev, taskId]
//     )
//   }

//   const toggleTaskCompletion = (taskId) => {
//     setTasks(prev => prev.map(task =>
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ))
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
//         <div className="relative">
//           <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//           <Input
//             placeholder="Search tasks..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-8"
//           />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[600px] pr-4">
//           {filteredTasks.map((task) => (
//             <div key={task.id} className="mb-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
//               <div className="p-4">
//                 <div className="flex items-start mb-2">
//                   <Checkbox
//                     id={`task-${task.id}`}
//                     checked={task.completed}
//                     onCheckedChange={() => toggleTaskCompletion(task.id)}
//                     className="mt-1 mr-2"
//                   />
//                   <div className="flex-grow">
//                     <div className="flex justify-between items-start">
//                       <label
//                         htmlFor={`task-${task.id}`}
//                         className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}
//                       >
//                         {task.title}
//                       </label>
//                       <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
//                     </div>
//                     <p className={`text-sm text-gray-600 mb-2 line-clamp-2 md:line-clamp-none ${task.completed ? 'line-through' : ''}`}>
//                       {task.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <Avatar className="h-6 w-6 mr-2">
//                       <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
//                       <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <span>{task.assignee.name}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CalendarIcon className="h-4 w-4 mr-1" />
//                     <span>{format(task.deadline, 'MMM d, yyyy')}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1" />
//                     <span>{task.estimatedTime}</span>
//                   </div>
//                 </div>
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {task.tags.map((tag, index) => (
//                     <Badge key={index} variant="secondary" className="text-xs">
//                       <Tag className="h-3 w-3 mr-1" />
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//               <div className="hidden md:flex">
//                 <Button
//                   variant="ghost"
//                   className="w-full flex items-center justify-center py-2 border-t"
//                   onClick={() => toggleTaskExpansion(task.id)}
//                 >
//                   {expandedTasks.includes(task.id) ? (
//                     <>
//                       <ChevronUp className="h-4 w-4 mr-2" />
//                       Less Details
//                     </>
//                   ) : (
//                     <>
//                       <ChevronDown className="h-4 w-4 mr-2" />
//                       More Details
//                     </>
//                   )}
//                 </Button>
//                 {expandedTasks.includes(task.id) && (
//                   <div className="p-4 border-t">
//                     <p className="text-sm text-gray-600 mb-2">{task.description}</p>
//                     <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                       <Clock className="h-4 w-4" />
//                       <span>Estimated Time: {task.estimatedTime}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <CalendarIcon className="h-4 w-4" />
//                       <span>Date Added: {format(task.dateAdded, 'MMM d, yyyy')}</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }



'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
import { Button } from '../../../components/ui/button'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Clock, Search, Tag, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"

const initialTasks = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up JWT-based authentication for the application',
    priority: 'High',
    assignee: { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=32&width=32' },
    deadline: new Date(2023, 5, 30),
    dateAdded: new Date(2023, 5, 1),
    estimatedTime: '3 days',
    tags: ['backend', 'security'],
    completed: false
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create a responsive design for the new landing page',
    priority: 'Medium',
    assignee: { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=32&width=32' },
    deadline: new Date(2023, 6, 15),
    dateAdded: new Date(2023, 5, 5),
    estimatedTime: '5 days',
    tags: ['design', 'frontend'],
    completed: true
  },
  {
    id: '3',
    title: 'Optimize database queries',
    description: 'Improve performance of slow database queries',
    priority: 'Low',
    assignee: { id: '3', name: 'Charlie Brown', avatar: '/placeholder.svg?height=32&width=32' },
    deadline: new Date(2023, 7, 1),
    dateAdded: new Date(2023, 5, 10),
    estimatedTime: '2 days',
    tags: ['backend', 'performance'],
    completed: false
  },
]

export default function page() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedTasks, setExpandedTasks] = useState([])

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleTaskExpansion = (taskId) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
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
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Est. Time</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <TableRow className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {task.title}
                        </label>
                        <p className={`text-sm text-muted-foreground ${task.completed ? 'line-through' : ''}`}>
                          {task.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                          <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">{format(task.deadline, 'MMM d, yyyy')}</span>
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
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => toggleTaskExpansion(task.id)}
                      >
                        {expandedTasks.includes(task.id) ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            More
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedTasks.includes(task.id) && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-muted/50">
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Estimated Time: {task.estimatedTime}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>Date Added: {format(task.dateAdded, 'MMM d, yyyy')}</span>
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
      </CardContent>
    </Card>
  )
}
