import { IPost } from "../../models/IPost";
import { api } from "./BaseApiService";
import { IAlbum } from "../../models/IAlbum";

export const postAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<IPost[], number>({
      query: (limit = 5) => ({
        url: `/posts`,
        params: {
          _limit: limit,
        },
      }),
    }),
    getPost: build.query<IPost, string | undefined>({
      query: (postId) => `/posts/${postId}`,
    }),
    addPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts`,
        method: `POST`,
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: `PATCH`,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
