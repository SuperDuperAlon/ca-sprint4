import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// export function BorderLinearProgress({styled, })

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 3,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#000000" : "#222222",
  },
}));

// Inspired by the former Facebook spinners.
const style = {
  flexGrow: 0.5,
  marginTop: "auto",
  marginBottom: "auto",
};

export function CustomizedProgressBars({ bar }) {
  const val = Math.round((bar / 5) * 100);
  return (
    <Box sx={style}>
      <BorderLinearProgress variant="determinate" value={val} />
    </Box>
  );
}
