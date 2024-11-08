'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tasks = [
  { id: 1, title: 'Design new landing page', status: 'In Progress', assignee: 'Alice Johnson' },
  { id: 2, title: 'Fix navigation bug', status: 'Completed', assignee: 'Bob Smith' },
  { id: 3, title: 'Update user documentation', status: 'Not Started', assignee: 'Charlie Brown' },
  { id: 4, title: 'Implement new feature', status: 'In Progress', assignee: 'Diana Prince' },
  { id: 5, title: 'Refactor authentication module', status: 'In Review', assignee: 'Ethan Hunt' },
]

export default function TaskList() {
  return (
    <div className="container mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">Tasks List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
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
    </div>
  )
}
