import packageJson from "../package.json"
import { Uom } from "@/types"

export const APP_NAME = `Cloud POS`
export const APP_TAGLINE = ``
export const APP_DESCRIPTION = ``
export const APP_URL = ``
export const API_URL = ``
export const APP_VERSION = packageJson.version

export const SUPPORT_EMAIL = ``;

export const REDIRECT_AFTER_OAUTH = `/`;

export const UOMOptions = [
    { value: Uom.EA, label: 'Each/Piece' },
    { value: Uom.PC, label: 'Piece' },
    { value: Uom.PK, label: 'Pack' },
    { value: Uom.BX, label: 'Box' },
    { value: Uom.CT, label: 'Carton' },
    { value: Uom.PL, label: 'Pallet' },
    { value: Uom.G, label: 'Gram' },
    { value: Uom.KG, label: 'Kilogram' },
    { value: Uom.OZ, label: 'Ounce' },
    { value: Uom.LB, label: 'Pound' },
    { value: Uom.ML, label: 'Milliliter' },
    { value: Uom.LTR, label: 'Liter' },
    { value: Uom.GAL, label: 'Gallon' },
    { value: Uom.IN, label: 'Inch' },
    { value: Uom.FT, label: 'Foot' },
    { value: Uom.YD, label: 'Yard' },
    { value: Uom.M, label: 'Meter' },
];

// export const sidebarData : SidebarData = {
// //   user: {
// //     name: 'satnaing',
// //     email: 'satnaingdev@gmail.com',
// //     avatar: '/avatars/shadcn.jpg',
// //   },
// //   teams: [
// //     {
// //       name: 'Shadcn Admin',
// //       logo: Command,
// //       plan: 'Vite + ShadcnUI',
// //     },
// //     {
// //       name: 'Acme Inc',
// //       logo: GalleryVerticalEnd,
// //       plan: 'Enterprise',
// //     },
// //     {
// //       name: 'Acme Corp.',
// //       logo: AudioWaveform,
// //       plan: 'Startup',
// //     },
// //   ],
//   navGroups: [
//     {
//       title: 'General',
//       items: [
//         {
//           title: 'Dashboard',
//           url: '/',
//           icon: LayoutDashboard,
//         },
//         {
//           title: 'Notifications',
//           url: '/tasks',
//           icon: ListTodo,
//         },
//         {
//           title: 'Clients',
//           url: '/apps',
//           icon: Package,
//         },
//         {
//           title: 'Matters',
//           url: '/chats',
//           badge: '3',
//           icon: MessagesSquare,
//         },
//         {
//           title: 'Tasks',
//           url: '/users',
//           icon: Users,
//         }
//       ],
//     },
    

//   ],
// }
