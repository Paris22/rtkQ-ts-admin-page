import React from "react";
import { commentAPI } from "../../store/services/CommentService";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

export const Comments = ({ postId }: { postId: string | number }) => {
  const {
    data: comments,
    isError,
    isLoading,
  } = commentAPI.useGetCommentsByPostIdQuery(postId);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "15px",
      }}
    >
      {isLoading && <Loading />}
      {isError && <Error />}
      {comments &&
        comments.map((comment) => (
          <Box key={comment.id}>
            <Divider />
            <Typography variant="caption">{comment.email}</Typography>
            <Typography variant="h6">{comment.name}</Typography>
            <Typography>{comment.body}</Typography>
            <Divider />
          </Box>
        ))}
    </Container>
  );
};
