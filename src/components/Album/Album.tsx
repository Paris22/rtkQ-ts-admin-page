import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Photos } from "../Photos/Photos";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

import { albumAPI } from "../../store/services/AlbumService";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";

export const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();

  const {
    data: album,
    isError,
    isLoading,
  } = albumAPI.useGetAlbumQuery(albumId);

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card>
        {isLoading && <Loading />}
        {isError && <Error />}
        <CardHeader
          title={
            <Box>
              <Typography variant="h6" sx={{ paddingBottom: "16px" }}>
                Album: {album && album.title}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />
          <Photos />
        </CardContent>
      </Card>
    </Modal>
  );
};
