import { create } from "zustand";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  where,
  query,
  documentId,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const useBlogStore = create((set) => ({
  blogs: [],
  loading: false,

  fetchBlogs: async (userEmail) => {
    if (!userEmail) return;
    set({ loading: true });
    try {
      const q = query(
        collection(db, "blogs"),
        where("userEmail", "==", userEmail),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ blogs });
    } finally {
      set({ loading: false });
    }
  },

  getBlogById: async (blogId) => {
    set({ loading: true });
    try {
      const q = query(
        collection(db, "blogs"),
        where(documentId(), "==", blogId)
      );
      const querySnapshot = await getDocs(q);
      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return blogs;
    } finally {
      set({ loading: false });
    }
  },

  filterBlogs: async (userEmail, blogId) => {
    set({ loading: true });
    try {
      const q = query(
        collection(db, "blogs"),
        where("userEmail", "==", userEmail),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const filteredBlogs = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((blog) => blog.id == blogId);
      return filteredBlogs;
    } finally {
      set({ loading: false });
    }
  },

  addBlog: async (content, user) => {
    set({ loading: true });
    try {
      const newBlog = {
        content,
        userEmail: user.email,
        userName: user.name,
        userPhoto: user.photo,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "blogs"), newBlog);
      set((state) => ({
        blogs: [...state.blogs, { id: docRef.id, ...newBlog }],
      }));
    } finally {
      set({ loading: false });
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true });
    try {
      await deleteDoc(doc(db, "blogs", id));
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBlogStore;
