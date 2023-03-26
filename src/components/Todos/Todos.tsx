import React from "react";
import { TodoColumn } from "../TodoColumn/TodoColumn";
import { Box, TextField } from "@mui/material";
import {
  DragDropContext,
  DropResult as IDropResult,
} from "react-beautiful-dnd";
import { ITodo } from "../../models/ITodo";
import { todoAPI } from "../../store/services/TodoService";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

type IAccOfReduceTodos = {
  [index: string]: ITodo[];

  todo: ITodo[];
  done: ITodo[];
};

export const Todos = () => {
  const { data: todos, isError, isLoading } = todoAPI.useGetTodosQuery(20);
  const [
    updateTodo,
    { isError: isErrorUpdating, isLoading: isLoadingUpdating },
  ] = todoAPI.useUpdateTodoMutation();

  const todosByStatusOfCompleted = todos?.reduce(
    (acc: IAccOfReduceTodos, todo: ITodo) => {
      if (!todo.completed) acc.todo.push(todo);
      if (todo.completed) acc.done.push(todo);
      return acc;
    },
    { todo: [], done: [] }
  );

  const deleteItem = (list: ITodo[] | undefined, index: number) => {
    return list?.splice(index, 1);
  };

  const onDragEndHandler = async (result: IDropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "todo") {
        let tempList = todosByStatusOfCompleted?.todo;
        const removed: ITodo[] | undefined = deleteItem(tempList, source.index);
        // @ts-ignore
        tempList?.splice(destination.index, 0, removed);
      } else {
        let tempList = todosByStatusOfCompleted?.done;
        const removed = deleteItem(tempList, source.index);
        // @ts-ignore
        tempList?.splice(destination.index, 0, removed);
      }
    } else {
      let tempList1 = todosByStatusOfCompleted?.todo;
      let tempList2 = todosByStatusOfCompleted?.done;
      if (source.droppableId === "todo") {
        const removed = deleteItem(tempList1, source.index);
        // @ts-ignore
        tempList2?.splice(destination.index, 0, removed);
      } else {
        const removed = deleteItem(tempList2, source.index);
        // @ts-ignore
        tempList1?.splice(destination.index, 0, removed);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {isLoading && <Loading />}
      {isError && <Error />}
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        sx={{ width: "400px" }}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <TodoColumn
            droppableId="todo"
            title="Todo:"
            todos={todosByStatusOfCompleted?.todo}
          />
          <TodoColumn
            droppableId="done"
            title="Done:"
            todos={todosByStatusOfCompleted?.done}
          />
        </DragDropContext>
      </Box>
    </Box>
  );
};
