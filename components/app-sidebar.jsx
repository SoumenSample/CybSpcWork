"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Project Management",
      url: "/dashboard/admin",
      icon: (
        <LayoutDashboardIcon />
      ),
    },
    {
      title: "Billing",
      url: "/dashboard/admin/users",
      icon: (
        <ListIcon />
      ),
    },
    {
      title: "User",
      url: "/dashboard/admin",
      icon: (
        <ChartBarIcon />
      ),
    },
    {
      title: "Messages",
      url: "/dashboard/admin",
      icon: (
        <FolderIcon />
      ),
    },
    {
      title: "Notification",
      url: "/dashboard/admin",
      icon: (
        <UsersIcon />
      ),
    },
    {
      title: "Ticket",
      url: "/dashboard/admin",
      icon: (
        <UsersIcon />
      ),
    },
    {
      title: "Schedule Events",
      url: "/dashboard/admin",
      icon: (
        <UsersIcon />
      ),
    },
    {
      title: "Product Publish",
      url: "/dashboard/admin",
      icon: (
        <UsersIcon />
      ),
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <CameraIcon />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <FileTextIcon />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <FileTextIcon />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/admin",
      icon: (
        <Settings2Icon />
      ),
    },
    {
      title: "Get Help",
      url: "/contact-us",
      icon: (
        <CircleHelpIcon />
      ),
    },
    {
      title: "Search",
      url: "/services",
      icon: (
        <SearchIcon />
      ),
    },
  ],
  documents: [
    // {
    //   name: "Data Library",
    //   url: "/dashboard/admin",
    //   icon: (
    //     <DatabaseIcon />
    //   ),
    // },
    // {
    //   name: "Reports",
    //   url: "/dashboard/admin",
    //   icon: (
    //     <FileChartColumnIcon />
    //   ),
    // },
    // {
    //   name: "Word Assistant",
    //   url: "/dashboard/admin/users",
    //   icon: (
    //     <FileIcon />
    //   ),
    // },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
