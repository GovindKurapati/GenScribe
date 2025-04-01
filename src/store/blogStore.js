import { create } from "zustand";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
const useBlogStore = create((set) => ({
  blogs: [],

  fetchBlogs: async (userEmail) => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((blog) => blog.userEmail == userEmail);
    set({ blogs });
  },

  filterBlogs: async (userEmail, blogId) => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const filteredBlogs = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((blog) => blog.userEmail == userEmail && blog.id == blogId);
    console.log(filteredBlogs);
    return filteredBlogs;
  },

  addBlog: async (content, user) => {
    const newBlog = {
      content,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "blogs"), newBlog);
    set((state) => ({
      blogs: [...state.blogs, { id: docRef.id, ...newBlog }],
    }));
  },

  deleteBlog: async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id),
    }));
  },
}));

export default useBlogStore;
