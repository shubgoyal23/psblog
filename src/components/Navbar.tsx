"use client";

import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import cx from "clsx";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeSwitcher from "./themeSwitcher";

export default function Navbar() {
   const leftmenu = [
      {
         label: "Home",
         href: "/",
      },
      {
         label: "Contact",
         href: "/contact",
      },
      {
         label: "All Blogs",
         href: "/blogs",
      },
   ];

   const rightmenu = [
      {
         label: "Archive",
         href: "/archive",
      },
      {
         label: "Category",
         children: [
            { label: "Fitness", href: "/category/fitness" },
            { label: "Fitness", href: "/category/fitness" },
            { label: "Fitness", href: "/category/fitness" },
         ],
      },
      {
         label: "Account",
         children: [
            { label: "Log In", href: "/login" },
            { label: "Sign up", href: "/signup" },
         ],
      },
   ];

   const mobilemenu = [...leftmenu, ...rightmenu];

   return (
      <nav className="w-full h-16 py-4 fixed top-0 z-50 backdrop-blur-sm bg-white/30 ">
         <Disclosure>
            {({ open }) => (
               <>
                  <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                     <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                        {leftmenu.map((item, index) => (
                           <Fragment key={`${item.label}${index}`}>
                              {item.children && item.children.length > 0 ? (
                                 <DropdownMenu
                                    menu={item}
                                    key={`${item.label}${index}`}
                                    items={item.children}
                                 />
                              ) : (
                                 <Link
                                    href={item.href}
                                    key={`${item.label}${index}`}
                                    className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300"
                                    target={item.external ? "_blank" : ""}
                                    rel={item.external ? "noopener" : ""}
                                 >
                                    {item.label}
                                 </Link>
                              )}
                           </Fragment>
                        ))}
                     </div>
                     <div className="flex w-full items-center justify-between md:w-auto ml-2 md:ml-0">
                        <Link href="/" className="w-36 dark:hidden">
                           <Image src={'/logo.png'} width={250} height={100} alt="logo of ps blogs"/>
                        </Link>
                        <Link href="/" className="hidden w-36 dark:block">
                        <Image src={'/logodark.png'} width={250} height={100} alt="logo of ps blogs"/>
                        </Link>
                        <Disclosure.Button
                           aria-label="Toggle Menu"
                           className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 md:hidden "
                        >
                           <svg
                              className="h-6 w-6 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                           >
                              {open && (
                                 <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                 />
                              )}
                              {!open && (
                                 <path
                                    fillRule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                 />
                              )}
                           </svg>
                        </Disclosure.Button>
                     </div>

                     <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                        {rightmenu.map((item, index) => (
                           <Fragment key={`${item.label}${index}`}>
                              {item.children && item.children.length > 0 ? (
                                 <DropdownMenu
                                    menu={item}
                                    key={`${item.label}${index}`}
                                    items={item.children}
                                 />
                              ) : (
                                 <Link
                                    href={item.href}
                                    key={`${item.label}${index}`}
                                    className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300"
                                    target={item.external ? "_blank" : ""}
                                    rel={item.external ? "noopener" : ""}
                                 >
                                    <span> {item.label}</span>
                                    {item.badge && (
                                       <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-cyan-200 dark:text-blue-800 ">
                                          {item.badge}
                                       </span>
                                    )}
                                 </Link>
                              )}
                           </Fragment>
                        ))}
                     </div>
                  </div>

                  <Disclosure.Panel>
                     <div className="order-2 mt-2 flex w-full bg-white/80 dark:bg-white/30 backdrop-blur-sm flex-col items-center justify-center md:hidden">
                        {mobilemenu.map((item, index) => (
                           <Fragment key={`${item.label}${index}`}>
                              {item.children && item.children.length > 0 ? (
                                 <DropdownMenu
                                    menu={item}
                                    key={`${item.label}${index}`}
                                    items={item.children}
                                    mobile={true}
                                 />
                              ) : (
                                 <Link
                                    href={item.href}                                   
                                    key={`${item.label}${index}`}
                                    className="w-full text-center px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300"
                                    target={item.external ? "_blank" : ""}
                                    rel={item.external ? "noopener" : ""}
                                 >
                                    {item.label}
                                 </Link>
                              )}
                           </Fragment>
                        ))}
                     </div>
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
         <ThemeSwitcher />
      </nav>
   );
}

const DropdownMenu = ({ menu, items, mobile }) => {
   return (
      <Menu as="div" className={cx("relative text-center", mobile && "w-full")}>
         {({ open }) => (
            <>
               <Menu.Button
                  className={cx(
                     "flex items-center justify-center gap-x-1 rounded-md px-5 py-2 text-sm font-medium  outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
                     open
                        ? "text-blue-500 hover:text-blue-500"
                        : " text-gray-700 dark:text-gray-300 ",
                     mobile ? "w-full px-4 py-2 " : "inline-block px-4 py-2"
                  )}
               >
                  <span>{menu.label}</span>
                  <FontAwesomeIcon
                     icon={faChevronDown}
                     className="mt-0.5 h-4 w-4"
                  />
               </Menu.Button>
               <Transition
                  as={Fragment}
                  enter="lg:transition lg:ease-out lg:duration-100"
                  enterFrom="lg:transform lg:opacity-0 lg:scale-95"
                  enterTo="lg:transform lg:opacity-100 lg:scale-100"
                  leave="lg:transition lg:ease-in lg:duration-75"
                  leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
                  leaveTo="lg:transform lg:opacity-0 lg:scale-95"
               >
                  <Menu.Items
                     className={cx(
                        "z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0  lg:w-56",
                        !mobile && "bg-white shadow-lg  dark:bg-gray-800"
                     )}
                  >
                     <div className={cx(!mobile && "py-3")}>
                        {items.map((item, index) => (
                           <Menu.Item as="div" key={`${item.label}${index}`}>
                              {({ active }) => (
                                 <Link
                                    href={item?.href ? item.href : "#"}
                                    className={cx(
                                       "flex items-center justify-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
                                       active
                                          ? "text-blue-500"
                                          : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                                    )}
                                 >
                                    <span> {item.label}</span>
                                 </Link>
                              )}
                           </Menu.Item>
                        ))}
                     </div>
                  </Menu.Items>
               </Transition>
            </>
         )}
      </Menu>
   );
};
