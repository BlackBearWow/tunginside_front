import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import MyButton from "./MyButton";

export default function DeleteModal({ isOpen, onClose, onConfirm, title }) {
  const [password, setPassword] = useState("");
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="rounded p-6 bg-white dark:bg-gray-200 shadow-xl">
            <DialogTitle className="text-lg font-bold mb-4">
              {title}
            </DialogTitle>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded pl-1"
              ></input>
              <div className="flex justify-end gap-x-2">
                <MyButton onClick={onClose} className="px-2 py-1 text-lg">
                  취소
                </MyButton>
                <MyButton
                  onClick={() => {
                    setPassword("");
                    onConfirm({ password });
                    onClose();
                  }}
                  className="px-2 py-1 text-lg"
                >
                  확인
                </MyButton>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
