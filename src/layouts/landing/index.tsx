import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Footer from '~/components/footer';
import TopNav from './TopNav';

// Layout of static landing pages for guests
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <TopNav />
      <Box sx={{ flex: '1 1 auto' }}>{children}</Box>
      <Footer />
    </Box>
  );
}
