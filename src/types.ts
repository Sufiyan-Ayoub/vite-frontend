import type { LinkProps } from "react-router-dom"

export type BaseNavItem = {
  title: string
  badge?: string
  icon?: React.ElementType
}

export type NavLink = BaseNavItem & {
  url: LinkProps['to'] | (string & {})
  items?: never
}

export type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] | (string & {}) })[]
  url?: never
}

export type NavItem = NavCollapsible | NavLink

export type NavGroup = {
  title: string
  items: NavItem[]
}

export type SidebarData = {
//   user: User
//   teams: Team[]
  navGroups: NavGroup[]
}