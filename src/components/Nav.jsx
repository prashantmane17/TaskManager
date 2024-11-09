"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Plus,
  Calendar as CalendarIcon,
  BarChart,
  CheckCircle,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AddTaskForm from "./addTask";

const data = [
  { name: "Mon", tasks: 3 },
  { name: "Tue", tasks: 7 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 8 },
  { name: "Fri", tasks: 12 },
  { name: "Sat", tasks: 4 },
  { name: "Sun", tasks: 6 },
];

export default function Nav({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="text-2xl font-semibold text-gray-800">
            TaskMaster
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tasks">
                <Button variant="ghost" className="w-full justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Tasks
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/calendar">
                <Button variant="ghost" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendar
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/team">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Team
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-64 mr-4"
            />
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Button>

            {isModalOpen && (
              <div className="fixed inset-0 flex z-50 h-[100-dvh] pt-[50vh] md:pt-[100vh] overflow-y-auto items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl mx-auto">
                  <button onClick={toggleModal} className="text-red-500 mb-4">
                    Close
                  </button>
                  <AddTaskForm />
                </div>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <img
                  className="rounded-full"
                  src="/placeholder.svg?height=32&width=32"
                  alt="Avatar"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
