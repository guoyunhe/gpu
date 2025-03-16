import { Box } from '@mui/material';
import { ReactNode } from 'react';
import TopNav from './TopNav';

// Layout of static landing pages for guests
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <TopNav />
      {children}
    </Box>
  );
}
