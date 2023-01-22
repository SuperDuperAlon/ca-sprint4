import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 3,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#222222',
  },
}));

// Inspired by the former Facebook spinners.
const style = {
    flexGrow: 0.5,
    marginTop: 'auto',
    marginBottom: 'auto'
}

export function CustomizedProgressBars() {
  return (
    <Box sx={style}>
      <BorderLinearProgress variant="determinate" value={55} />
    </Box>
  );
}