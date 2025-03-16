import { GitHub } from '@mui/icons-material';
import { Box, colors, Link, Stack } from '@mui/material';

const date = new Date();

export default function Footer() {
  return (
    <Box component="footer" p={3} display="flex" fontSize="14px" color={colors.grey[700]}>
      <Box>&copy; {date.getFullYear()} Guo Yunhe</Box>
      <Box flex="1 1 auto" />
      <Stack direction="row" spacing={2}>
        <Link href="https://github.com/guoyunhe/gpu" color="inherit" underline="hover">
          <GitHub fontSize="inherit" />
          GitHub
        </Link>
      </Stack>
    </Box>
  );
}
