import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { LogIn, User } from "lucide-react";
import { Fragment, useState } from "react";
import { useMemberStore } from "../store";

export default function NavigationDrawerAuth({ className, word }) {
  const { member, logoutMember } = useMemberStore();

  const [isOpen, setIsOpen] = useState(false);

  function closeDrawer() {
    setIsOpen(false);
  }

  function openDrawer() {
    setIsOpen(true);
  }

  const handleLogout = async (e) => {
    try {
      // jwt방식으로는 로컬스토리지에서 토큰만 삭제하면 된다.
      logoutMember();
      localStorage.removeItem("authorization");
    } catch (error) {
      console.error("로그아웃 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };

  return (
    <>
      <button onClick={openDrawer} className={className}>
        {member ? (
          <User className="w-5 h-5 mx-auto" />
        ) : (
          <LogIn className="w-5 h-5 mx-auto" />
        )}
        {word}
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
                          {member ? member.nickname : "익명"}
                        </DialogTitle>
                        <Button onClick={closeDrawer}>X</Button>
                      </div>
                      <hr />
                      <div
                        className="flex flex-col mt-5 gap-1"
                        onClick={closeDrawer}
                      >
                        {member == null ? (
                          <>
                            <Link
                              to="/login"
                              className="font-semibold hover:underline"
                            >
                              로그인
                            </Link>
                            <Link
                              to="/signup"
                              className="font-semibold hover:underline"
                            >
                              회원가입
                            </Link>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={handleLogout}
                              className="font-semibold hover:underline text-start"
                            >
                              로그아웃
                            </button>
                            <Link
                              to="/myinfo"
                              className="font-semibold hover:underline"
                            >
                              내정보
                            </Link>
                            {member.role === "ADMIN" && (
                              <Link
                                to="/adminPage"
                                className="font-semibold hover:underline"
                              >
                                관리자페이지
                              </Link>
                            )}
                          </>
                        )}
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
