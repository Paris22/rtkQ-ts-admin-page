import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const MorePanel = (props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
};
