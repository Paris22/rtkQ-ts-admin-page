import React, { useState } from "react";
import { postAPI } from "../../store/services/PostService";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
} from "@mui/material";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MorePanel } from "../UI/MorePanel/MorePanel";
import { Comments } from "../Comments/Comments";

export const Posts = () => {
  const { data: posts, isError, isLoading } = postAPI.useGetPostsQuery(6);

  const [addPost, { isError: isErrorAddPost, isLoading: isLoadingAddPost }] =
    postAPI.useAddPostMutation();

  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  const handleExpand = (postId: number) => {
    if (expandedPosts.includes(postId)) {
      return setExpandedPosts((prev) => prev.filter((id) => id !== postId));
    }

    setExpandedPosts((prev) => prev.concat([postId]));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {isLoading && <Loading />}
      {isError && <Error />}
      {posts &&
        posts.map((post) => (
          <Card
            key={post.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: 345,
              margin: 2,
              height: "100%",
            }}
          >
            <CardHeader
              title={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {post.title}
                </Box>
              }
            />
            <Divider />
            <CardContent>{post.body}</CardContent>
            <Divider />
            <CardActions>
              <Box>
                Comments
                <MorePanel
                  expand={expandedPosts.includes(post.id)}
                  onClick={() => handleExpand(post.id)}
                >
                  <ExpandMoreIcon />
                </MorePanel>
              </Box>
            </CardActions>
            <Collapse in={expandedPosts.includes(post.id)} unmountOnExit>
              <Comments postId={post.id} />
            </Collapse>
          </Card>
        ))}
    </Box>
  );
};
