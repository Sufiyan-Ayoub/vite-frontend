// "use client";

// import { useState, useMemo } from "react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   Button,
//   Label,
// } from "@/ui/button";

// // Deep-level dummy categories for testing (unordered)
// const categories = [
//   { id: '1', name: 'Electronics', pid: null },
//   { id: '2', name: 'Clothing', pid: null },
//   { id: '3', name: 'Mobile', pid: '1' },
//   { id: '4', name: 'Laptop', pid: '1' },
//   { id: '5', name: 'Smartphones', pid: '3' },
//   { id: '6', name: 'Gaming Laptops', pid: '4' },
//   { id: '7', name: 'Men', pid: '2' },
//   { id: '8', name: 'Women', pid: '2' },
//   { id: '9', name: 'Shirts', pid: '7' },
//   { id: '10', name: 'Dresses', pid: '8' },
//   { id: '11', name: 'Accessories', pid: '8' },
//   { id: '12', name: 'Tablets', pid: '1' },
//   { id: '13', name: 'iPad', pid: '12' },
// ];

// export default function ShopifyStyleCategorySelect() {
//   const [currentParent, setCurrentParent] = useState<string | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

//   const categoryMap = useMemo(() => {
//     const map: Record<string, typeof categories[0]> = {};
//     categories.forEach(c => { map[c.id] = c; });
//     return map;
//   }, []);

//   const currentChildren = useMemo(() => {
//     return categories.filter(c => c.pid === currentParent);
//   }, [currentParent]);

//   const breadcrumbs = useMemo(() => {
//     const crumbs: typeof categories[0][] = [];
//     let temp = currentParent;
//     while (temp) {
//       const cat = categoryMap[temp];
//       if (!cat) break;
//       crumbs.unshift(cat);
//       temp = cat.pid;
//     }
//     return crumbs;
//   }, [currentParent, categoryMap]);

//   const handleSelect = (id: string) => {
//     const hasChildren = categories.some(c => c.pid === id);
//     if (hasChildren) {
//       setCurrentParent(id);
//     } else {
//       setSelectedCategory(id);
//       setCurrentParent(null);
//     }
//   };

//   const handleBreadcrumbClick = (pid: string | null) => {
//     setCurrentParent(pid);
//   };

//   return (
//     <div className="w-80 font-sans">
//       <Label className="text-gray-700 font-medium mb-1">Category</Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="outline" className="w-full text-left rounded-md border border-gray-300 shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-indigo-500">
//             {selectedCategory ? getFullPath(selectedCategory, categoryMap) : 'Select Category'}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full max-h-64 overflow-auto rounded-lg shadow-lg border border-gray-200">
//           {/* Breadcrumbs */}
//           {breadcrumbs.length > 0 && (
//             <div className="flex items-center space-x-1 p-2 border-b bg-gray-50">
//               <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={() => handleBreadcrumbClick(null)}>
//                 Root
//               </Button>
//               {breadcrumbs.map(b => (
//                 <Button key={b.id} size="sm" variant="ghost" className="text-gray-600 hover:text-gray-800" onClick={() => handleBreadcrumbClick(b.pid)}>
//                   {b.name}
//                 </Button>
//               ))}
//             </div>
//           )}

//           {/* Children */}
//           <div className="flex flex-col p-2">
//             {currentChildren.map(c => (
//               <Button key={c.id} className="w-full mb-1 justify-start text-gray-700 hover:bg-gray-100 rounded-md" variant="ghost" onClick={() => handleSelect(c.id)}>
//                 {c.name}
//               </Button>
//             ))}
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// function getFullPath(id: string, map: Record<string, { id: string; name: string; pid: string | null }>) {
//   const parts: string[] = [];
//   let current = map[id];
//   while (current) {
//     parts.unshift(current.name);
//     if (!current.pid) break;
//     current = map[current.pid];
//   }
//   return parts.join(' / ');
// }
