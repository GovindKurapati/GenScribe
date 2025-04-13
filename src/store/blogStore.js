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
  updateDoc,
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

  fetchPublicBlogs: async () => {
    set({ loading: true });
    try {
      const q = query(
        collection(db, "blogs"),
        where("public", "==", true),
        orderBy("createdAt", "desc")
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
        public: false,
        likes: 0,
        likedBy: [],
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

  updateBlog: async (content, id, user) => {
    set({ loading: true });
    try {
      const updatedBlog = {
        content,
        userEmail: user.email,
        userName: user.name,
        userPhoto: user.photo,
        createdAt: new Date().toISOString(),
      };

      await updateDoc(doc(db, "blogs", id), updatedBlog);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? { ...blog, ...updatedBlog } : blog
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },

  updateBlogVisibility: async (id, isPublic) => {
    set({ loading: true });
    try {
      await updateDoc(doc(db, "blogs", id), { public: isPublic });
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? { ...blog, public: isPublic } : blog
        ),
      }));
    } finally {
      set({ loading: false });
    }
  },

  updateLikes: async (id, userEmail) => {
    set({ loading: true });
    try {
      const blogRef = doc(db, "blogs", id);
      const blogSnapshot = await getDocs(
        query(collection(db, "blogs"), where(documentId(), "==", id))
      );
      if (!blogSnapshot.empty) {
        const blogData = blogSnapshot.docs[0].data();
        const likedBy = blogData.likedBy || [];
        const likes = blogData.likes || 0;

        let updatedLikes, updatedLikedBy;
        if (likedBy.includes(userEmail)) {
          // If user already liked, remove their email and decrement likes
          updatedLikedBy = likedBy.filter((email) => email !== userEmail);
          updatedLikes = likes - 1;
        } else {
          // If user hasn't liked, add their email and increment likes
          updatedLikedBy = [...likedBy, userEmail];
          updatedLikes = likes + 1;
        }

        await updateDoc(blogRef, {
          likes: updatedLikes,
          likedBy: updatedLikedBy,
        });
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === id
              ? { ...blog, likes: updatedLikes, likedBy: updatedLikedBy }
              : blog
          ),
        }));
      }
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBlogStore;
