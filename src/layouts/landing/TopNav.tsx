import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { ThemeToggle } from 'material-app';
import { Link } from 'wouter';

export interface TopNavProps {
  onMenuButtonClick: () => void;
}

export default function TopNav({ onMenuButtonClick }: TopNavProps) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuButtonClick}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component={Link}
          to="/"
          style={{ display: 'flex', color: 'inherit', textDecoration: 'none' }}
        >
          <Box
            component="img"
            src="/logo.svg"
            width={32}
            height={32}
            sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}
          />
          <Typography fontSize={20} color="inherit" component="div">
            GPU 比价
          </Typography>
        </Box>
        <Stack direction="row" ml={3} sx={{ display: { xs: 'none', sm: 'flex' } }} />
        <Box flex="1 1 auto" />
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
