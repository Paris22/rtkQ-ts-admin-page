import { IPhoto } from "../../models/IPhoto";
import { api } from "./BaseApiService";

export const photoAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getPhotosByAlbumId: build.query<IPhoto[], string | undefined>({
      query: (albumId) => ({
        url: `/albums/${albumId}/photos`,
      }),
    }),
  }),
});
