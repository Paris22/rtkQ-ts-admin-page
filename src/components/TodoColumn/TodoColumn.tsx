import React from "react";
import { Button, Card, CardHeader, Grid, Typography } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ITodo } from "../../models/ITodo";

type IProps = {
  droppableId: "todo" | "done";
  title: string;
  todos: ITodo[] | undefined;
};

export const TodoColumn: React.FC<IProps> = (props) => {
  const { droppableId, title, todos } = props;
  return (
    <Droppable droppableId={String(droppableId)}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            {title}
          </Typography>
          {todos &&
            todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={String(todo.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      maxWidth: 345,
                      margin: 2,
                    }}
                  >
                    <CardHeader
                      sx={{ paddingBottom: "5px" }}
                      title={todo.title}
                    />
                  </Card>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
