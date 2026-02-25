import { create } from "zustand";
import { persist } from "zustand/middleware";
import memberApi from "./api/memberApi.mjs";
import categoryApi from "./api/categoryApi.mjs";
import postApi from "./api/postApi.mjs";

const useMemberStore = create((set) => ({
  member: null,
  updateMember: (newMember) => set({ member: newMember }),
  logoutMember: () => set({ member: null }),
  fetchMember: async () => {
    try {
      const response = await memberApi.get();
      set({ member: response.data });
      console.log(response.data);
    } catch (error) {
      console.error("멤버정보를 불러오는데 실패했습니다.", error);
    }
  },
}));

const usePostStore = create((set) => ({
  post: null,
  posts: [],
  fetchPost: async (post_id) => {
    try {
      // 글 정보
      const response = await postApi.getDetail(post_id);
      if (response.status === 200 || response.status === 201) {
        set({ post: response.data });
        console.log(response.data);
      }
    } catch (error) {
      console.error("글 정보 가져오기 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  },
  fetchPosts: async (params) => {
    try {
      // 글목록 가져오기
      const response = await postApi.getList(params);
      if (response.status === 200 || response.status === 201) {
        set({ posts: response.data.posts });
        console.log(response.data);
      }
    } catch (error) {
      console.error("글목록 가져오기 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  },
}));

const useCategoriesStore = create(
  persist(
    (set) => ({
      categories: [],
      fetchCategories: async () => {
        try {
          const response = await categoryApi.get();
          set({ categories: response.data });
          console.log(response.data);
        } catch (error) {
          console.error("카테고리를 불러오는데 실패했습니다.", error);
        }
      },
    }),
    { name: "categories" },
  ),
);

const useAnnouncementsStore = create(
  persist(
    (set, get) => ({
      announcements: [],
      readAnnouncements: [],
      // 공지사항 데이터 불러오기 함수.
      fetchAnnouncements: async () => {
        // const response = await announcementApi.get();
        // set({announcements: response.data});
        set({
          announcements: [
            {
              id: 1,
              title: "첫번째 공지사항",
              content: "퉁인사이드 첫번째 공지사항!",
            },
            {
              id: 2,
              title: "2월 25일 공지",
              content: "2월 25일부로 공지사항 알림이 추가됩니다",
            },
            {
              id: 3,
              title: "세번째 공지사항",
              content: "퉁인사이드 세번째 공지사항!",
            },
          ],
        });
      },
      addReadAnnouncementId: (id) =>
        set((state) => ({
          readAnnouncements: state.readAnnouncements.includes(id)
            ? state.readAnnouncements
            : [...state.readAnnouncements, id],
        })),
      //미읽음 개수 계산 함수(Derived State)
      getUnreadCount: () => {
        const { announcements, readAnnouncements } = get();
        const allIds = announcements.map((v) => v.id);
        return allIds.filter((id) => !readAnnouncements.includes(id)).length;
      },
    }),
    {
      name: "announcement-storage",
      // announcements는 저장하지 않고, readAnnouncements만 저장한다.
      partialize: (state) => ({ readAnnouncements: state.readAnnouncements }),
    },
  ),
);

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    { name: "isDarkMode" },
  ),
);

export {
  useMemberStore,
  useCategoriesStore,
  usePostStore,
  useThemeStore,
  useAnnouncementsStore,
};
