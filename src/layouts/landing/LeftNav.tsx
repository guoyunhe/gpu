import {
  AutoAwesome as AutoAwesomeIcon,
  Sell as SellIcon,
  SupportAgent as SupportAgentIcon,
} from '@mui/icons-material';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import { drawerWidth } from './config';

export interface LeftNavProps {
  drawerOpen: boolean;
  onDrawerClose: () => void;
}

export default function LeftNav({ drawerOpen, onDrawerClose }: LeftNavProps) {
  const { t } = useTranslation();
  const [location] = useLocation();

  return (
    <Drawer open={drawerOpen} onClose={onDrawerClose} sx={{ width: drawerWidth }}>
      <List sx={{ width: drawerWidth }} onClick={onDrawerClose}>
        <ListItemButton selected={location === '/features'} component={Link} to="/features">
          <ListItemIcon>
            <AutoAwesomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('Features')} />
        </ListItemButton>
        <ListItemButton selected={location === '/pricing'} component={Link} to="/pricing">
          <ListItemIcon>
            <SellIcon />
          </ListItemIcon>
          <ListItemText primary={t('Pricing')} />
        </ListItemButton>
        <ListItemButton selected={location === '/support'} component={Link} to="/support">
          <ListItemIcon>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText primary={t('Support')} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
