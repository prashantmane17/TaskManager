'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, X } from 'lucide-react'
import { addMember, getMember } from '@/axios/teamUser'

const initialTeamMembers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Project Manager', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Designer', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '4', name: 'Diana Ross', email: 'diana@example.com', role: 'Developer', avatar: '/placeholder.svg?height=40&width=40' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', role: 'QA Tester', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function TeamMemberSection() {
  const [teamMembers, setTeamMembers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '' })

  const fecthMember = async()=>{
    try {
      const user = await getMember();
      // setTeamMembers(user);
      setTeamMembers(user.map(member => ({ ...member, id: member._id || member.email }))) 
      console.log(user);
    } catch {}
  }
useEffect(()=>{
  fecthMember();
},[])
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addTeamMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      setTeamMembers([...teamMembers, {
        id: Date.now().toString(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        avatar: '/placeholder.svg?height=40&width=40'
      }])
      setNewMember({ name: '', email: '', role: '' })
    }
  }

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const data = await addMember(newMember);
      if (data.success) alert("Task added successfully");
    } catch (error) {
      console.log("error: ", error);
    }
    
  }
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Team Members</CardTitle>
          <CardDescription>Manage your team and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <form >
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                  <DialogDescription>Enter the details of the new team member.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Role</Label>
                    <Select
                      value={newMember.role}
                      onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Project Manager">Project Manager</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="QA Tester">QA Tester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={(e)=>{handleSubmit(e); addTeamMember}}>Add Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          </form>
          <ScrollArea className="h-[400px] border rounded-md">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{member.role}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => removeTeamMember(member.id)}>
                    <span className="sr-only">Remove team member</span>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
