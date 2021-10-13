import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { FormEvent, useRef, useState } from 'react';

export function Signup() {
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;

    console.log(username, password);

    axios
      .post<{ message: string }>('/api/users/signup', {
        username,
        password,
      })
      .then((res) => {
        setMessage(res.data?.message || null);
      })
      .catch((e: AxiosError<{ error: string; message: string[] }>) => {
        setMessage(e.response?.data.message[0] || null);
        console.log(e.response);
      });
  }

  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    >
      <Box
        component="form"
        my={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleFormSubmit}
      >
        <Typography variant="h3" gutterBottom>
          Sign up
        </Typography>
        <TextField
          required
          label="username"
          type="text"
          margin="normal"
          inputRef={usernameRef}
        />
        <TextField
          required
          label="password"
          type="password"
          margin="normal"
          inputRef={passwordRef}
        />
        <Button type="submit" variant="contained">
          SignUp
        </Button>
        <Typography>{message}</Typography>
      </Box>
    </Container>
  );
}
