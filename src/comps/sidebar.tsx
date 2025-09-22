// import { useLayout } from '@/context/layout-provider'
import {
  Sidebar as LSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/ui/sidebar'
// import { AppTitle } from './app-title'

import { NavGroup } from './nav-group'
import { useLayout } from '@/context/layout-provider'
import { sidebarData } from '@/config'


const Sidebar = () => {
  const { collapsible, variant } = useLayout()

  return (
    <LSidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
            Hello
        {/* Replace <TeamSwitch /> with the following <AppTitle />
         /* if you want to use the normal app title instead of TeamSwitch dropdown */}
        {/* <AppTitle /> */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={sidebarData.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </LSidebar>
  )
}
export default Sidebar;