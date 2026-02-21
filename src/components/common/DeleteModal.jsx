import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from 'react'

export default function DeleteModal({ isOpen, onClose, onConfirm, title }) {
    const [password, setPassword] = useState("");
    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
                <div className="fixed inset-0 bg-black/30"></div>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className='rounded p-6 bg-white shadow-xl'>
                        <DialogTitle className='text-lg font-bold mb-4'>{title}</DialogTitle>
                        <div className="flex flex-col gap-2">
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded pl-1"></input>
                            <div className="flex justify-end gap-x-2">
                                <button className="bg-red-200 px-1 rounded" onClick={onClose} >취소</button>
                                <button className="bg-cyan-200 px-1 rounded" onClick={()=>{setPassword("");onConfirm({password});onClose();}}>확인</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}