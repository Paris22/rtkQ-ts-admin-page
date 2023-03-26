import { ITodo } from "../../models/ITodo";
import { api } from "./BaseApiService";

export const todoAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], number>({
      query: (limit = 5) => ({
        url: `/todos`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: ["Todo"],
    }),
    updateTodo: build.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});
