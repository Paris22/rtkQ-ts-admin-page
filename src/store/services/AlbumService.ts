import { IAlbum } from "../../models/IAlbum";
import { api } from "./BaseApiService";

export const albumAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getAlbums: build.query<IAlbum[], number>({
      query: (limit = 5) => ({
        url: `/albums`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: ["Album"],
    }),
    getAlbum: build.query<IAlbum, string | undefined>({
      query: (albumId) => `/albums/${albumId}`,
      providesTags: ["Album"],
    }),
    addAlbum: build.mutation<IAlbum, IAlbum>({
      query: (album) => ({
        url: `/albums`,
        method: `POST`,
        body: album,
      }),
      invalidatesTags: ["Album"],
    }),
    deleteAlbum: build.mutation<IAlbum, IAlbum>({
      query: (album) => ({
        url: `/albums/${album.id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Album"],
    }),
    updateAlbum: build.mutation<IAlbum, IAlbum>({
      query: (album) => ({
        url: `/albums/${album.id}`,
        method: `PATCH`,
      }),
      invalidatesTags: ["Album"],
    }),
  }),
});
