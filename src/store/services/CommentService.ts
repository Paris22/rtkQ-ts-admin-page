import { IComment } from "../../models/IComment";
import { api } from "./BaseApiService";

export const commentAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getCommentsByPostId: build.query<IComment[], string | number | undefined>({
      query: (postId) => ({
        url: `/posts/${postId}/comments`,
      }),
    }),
  }),
});
