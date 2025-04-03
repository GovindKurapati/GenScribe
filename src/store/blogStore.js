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
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
const useBlogStore = create((set) => ({
  blogs: [],

  fetchBlogs: async (userEmail) => {
    if (!userEmail) return;
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
  },

  filterBlogs: async (userEmail, blogId) => {
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
