import { CircularProgress, Box } from "@mui/material";

type Color = "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";

const Loading = ({ color }: { color: Color }) => {
  return (
    <Box sx={{ margin: "auto", textAlign: "center", width: "100%", mt: 3 }}>
      <CircularProgress color={color}/>
    </Box>
  );
}

export default Loading;
