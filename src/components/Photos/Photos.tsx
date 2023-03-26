import React, { useState } from "react";
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { photoAPI } from "../../store/services/PhotoService";
import { useParams } from "react-router-dom";
import { Loading } from "../UI/Loading/Loading";
import { Error } from "../UI/Error/Error";

export const Photos = () => {
  const { albumId } = useParams<{ albumId: string }>();

  const {
    data: photos,
    isError,
    isLoading,
  } = photoAPI.useGetPhotosByAlbumIdQuery(albumId);

  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);

  const maxSteps = photos && photos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <Loading />}
      {isError && <Error />}
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{photos && photos[activeStep].title}</Typography>
      </Paper>
      <Box
        sx={{
          maxHeight: 600,
          maxWidth: 600,
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={photos && photos[activeStep].thumbnailUrl}
          alt={photos && photos[activeStep].title}
        />
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === (maxSteps && maxSteps - 1)}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};
