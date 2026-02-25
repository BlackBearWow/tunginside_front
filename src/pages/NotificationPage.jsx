import { useState } from "react";
import { useAnnouncementsStore } from "../store";

export default function NotificationPage() {
  const [selectedId, setSelectedId] = useState(0);
  const { announcements, readAnnouncements, addReadAnnouncementId } =
    useAnnouncementsStore();
  return (
    <div className="p-10 bg-white dark:bg-black grow">
      <p className="text-xl font-bold mb-4 w-full text-center">공지사항</p>
      <div className="flex flex-col gap-3">
        {announcements.map((v) => {
          const isRead = readAnnouncements.includes(Number(v.id));
          return (
            <div
              key={v.id}
              onClick={() => addReadAnnouncementId(v.id)}
              className={`p-4 border rounded-lg cursor-pointer ${isRead ? "opacity-50" : "border-orange-500 shadow-sm"}`}
            >
              <div className="flex items-center gap-2">
                {!isRead && (
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                )}
                <p className="font-semibold text-lg">{v.title}</p>
              </div>
              <p className="mt-1">{v.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
