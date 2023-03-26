import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { albumAPI } from "../../store/services/AlbumService";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";
import { IAlbum } from "../../models/IAlbum";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export const Albums = () => {
  const { data: albums, isError, isLoading } = albumAPI.useGetAlbumsQuery(1000);
  const [addAlbum, { isError: isErrorAddAlbum, isLoading: isLoadingAddAlbum }] =
    albumAPI.useAddAlbumMutation();
  const [
    deleteAlbum,
    { isError: isErrorDeleteAlbum, isLoading: isLoadingDeleteAlbum },
  ] = albumAPI.useDeleteAlbumMutation();

  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const navigate = useNavigate();

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAlbumTitle(event.target.value);
  };

  const addAlbumHandler = async (title: string) => {
    await addAlbum({ userId: Math.random() * 1000, title } as IAlbum);
    setNewAlbumTitle("");
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      <TextField
        label="Add album"
        variant="standard"
        value={newAlbumTitle}
        onChange={titleHandler}
        sx={{ paddingLeft: "15px" }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => addAlbumHandler(newAlbumTitle)}>
              <AddIcon fontSize="large" />
            </IconButton>
          ),
        }}
      />

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {albums &&
          albums.map((album, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card
                key={album.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: 345,
                  margin: 2,
                  height: "100%",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <CardHeader
                  sx={{ paddingBottom: "5px" }}
                  title={
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {album.title}
                      <IconButton
                        aria-label="delete"
                        sx={{ width: "40px", height: "40px" }}
                        onClick={(event: React.MouseEvent) => {
                          event.stopPropagation();
                          deleteAlbum(album);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                />
                <CardContent>
                  <Button onClick={() => navigate(`/albums/${album.id}`)}>
                    View Album
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
