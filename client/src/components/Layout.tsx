import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useUser } from '../context/user.context';
import { useHistory } from 'react-router';
import { useRef } from 'react';

export default function ButtonAppBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useUser();

  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {user && (
            <>
              <Button color="inherit" onClick={() => history.push('/cities')}>
                cities
              </Button>
              <Button
                color="inherit"
                onClick={() => history.push('/video-upload')}
              >
                Upload video
              </Button>
            </>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PodWorld.in
          </Typography>
          {!loading &&
            (user ? (
              <>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
                <Typography>{user.username}</Typography>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => history.push('/signup')}>
                  Signup
                </Button>

                <Button color="inherit" onClick={() => history.push('/login')}>
                  Login
                </Button>
              </>
            ))}
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </Box>
  );
}
