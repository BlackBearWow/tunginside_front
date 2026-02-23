import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";

export default function NavigationDrawer({ title, icon, children, className }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeDrawer() {
    setIsOpen(false);
  }

  function openDrawer() {
    setIsOpen(true);
  }

  return (
    <>
      {/* Drawer를 여는 버튼 (예: 햄버거 메뉴 아이콘) */}
      <button onClick={openDrawer} className={className}>
        {icon}
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeDrawer}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30"></div>
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 right-0 overflow-hidden flex">
              <div className="fixed inset-y-0 right-0 flex pl-10">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-100"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-100"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="w-screen max-w-3xs">
                    <div className="flex h-full flex-col overflow-y-auto bg-white dark:bg-gray-900 dark:text-gray-50 p-6 border-l">
                      <div className="flex justify-between mb-5">
                        <DialogTitle className="font-extrabold text-xl">
                          {title}
                        </DialogTitle>
                        <Button onClick={closeDrawer}>X</Button>
                      </div>
                      <hr />
                      <div
                        className="flex flex-col mt-5 gap-1"
                        onClick={closeDrawer}
                      >
                        {children}
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
