import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { FormEvent, useRef, useState } from 'react';

export function Login() {
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // if (!username || !password) {
    //   alert('error');
    // }
    console.log(username, password);

    axios
      .post<{ access_token: string }>('/api/auth/login', {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        // setMessage(res.data?.message || null);
        // console.log(res.data);
      })
      .catch((e: AxiosError<{ message: string; statusCode: number }>) => {
        // .catch((e: any) => {
        setMessage(e.response?.data.message || null);
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
          Login
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
          Login
        </Button>
        <Typography>{message}</Typography>
      </Box>
    </Container>
  );
}
