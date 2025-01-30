"use client";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import Link from "next/link";
import { Menu, Popover, Transition } from "@headlessui/react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const MenuLink = ({ blok, closeMenu }) => {
  // console.log("menu link", blok);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !blok) {
    return null; // or a loading placeholder if preferred
  }
  const hasSubMenu = blok?.menu?.length != 0;
  // console.log("menu link", blok?.menu?.length);
  return (
    <>
      {hasSubMenu ? (
        <>
          <Menu
            as="div"
            key={`${blok?._uid}-i`}
            className="relative text-left hidden xl:inline-block mb-4 xl:mb-0 z-10"
          >
            {({ open }) => (
              <>
                <Menu.Button className="menulinks text-black hover:text-gray-900">
                  <span className="flex items-center gap-x-2">
                    {blok?.name} <IoMdArrowDropdown className="text-lg" />
                  </span>
                </Menu.Button>
                <Transition
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className={`origin-top-right absolute left-0 mt-4 ${blok?.menu?.length > 5 ? 'w-[500px]' : 'w-64' } rounded-lg shadow-lg bg-[#35384b] ring-1 ring-black ring-opacity-5`}>
                    <div className={`px-5 py-6 grid ${blok?.menu?.length > 5 ? "xl:grid-cols-2 gap-4" : "grid-cols-1"} gap-y-4`}>
                      {blok?.menu?.map((subItem, index) => (
                        <Menu.Item key={`${subItem._uid}-${index}`}>
                          {({ active }) => (
                            <Link
                              href={`/${subItem.link.cached_url}`}
                              className="drop_link"
                              aria-label="menu link"
                            >
                              {subItem.name}
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
          <Popover key={blok._uid} className="mb-3 xl:mb-0 xl:hidden">
            {({ open }) => (
              <>
                <Popover.Button className="flex justify-between text-base leading-snug items-center w-full text-black hover:text-gray-900">
                  {blok.name}
                  <span>
                    {open ? (
                      <IoMdArrowDropup className="text-lg" />
                    ) : (
                      <IoMdArrowDropdown className="text-lg" />
                    )}
                  </span>
                </Popover.Button>
                <Transition
                  show={open}
                  enter="transition-opacity ease-linear duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel
                    static
                    className="flex flex-col mb-2 bg-[#35384b] pl-3 pt-3 rounded-lg"
                  >
                    {blok?.menu?.map((subItem) => (
                      <Link
                        key={subItem._uid}
                        href={`/${subItem.link.cached_url}`}
                        className="drop_link mb-2 xl:mb-0 text-white hover:text-gray-200 text-[15px]"
                        onClick={closeMenu}
                        aria-label="menu link"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </>
      ) : (
        <div className="relative flex text-left z-10 mb-3 xl:mb-0">
          {blok?.link.cached_url !== "search" ? (
            blok?.isButton ? (
              <Link
                href={`/${blok.link.cached_url}`}
                className={`py-3 px-4 rounded-full text-base bg-[${blok?.bg_color.color}] hover:bg-opacity-90 transition-colors text-white`}
                onClick={closeMenu}
                aria-label="menu link"
              >
                {blok.name}
              </Link>
            ) : (
              <Link
                href={`/${blok.link.cached_url}`}
                className="menulinks text-base leading-snug text-black hover:text-gray-900"
                onClick={closeMenu}
                aria-label="menu link"
              >
                {blok.name}
              </Link>
            )
          ) : undefined}
        </div>
      )}
    </>
  );
};
export default MenuLink;
