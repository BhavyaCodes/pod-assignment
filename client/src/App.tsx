import './App.css';
import CityTable from './components/CityTable';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Signup, Upload } from './pages';
import { UserProvider, useUser } from './context/user.context';
import Layout from './components/Layout';
import { useEffect, useRef, useState } from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function App() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<null | File>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  // const [percent,setPercent] = useState<Number| null>(0)
  const [uploadingMessage, setUploadingMessage] =
    useState<string>('Upload Progress');
  const { token } = useUser();

  useEffect(() => {
    console.log('useeffect', file);
    if (file) {
      setUploading(true);

      const fd = new FormData();
      const files = fileRef.current?.files;
      if (files) {
        fd.append('file', files[0]);
      }
      setOpen(true);
      axios
        .post('/api/media/upload', fd, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            console.log(
              `Upload Progress ${Math.round(
                (progressEvent.loaded / progressEvent.total) * 100,
              )}%`,
            );
            setUploadingMessage(
              `Upload Progress ${Math.round(
                (progressEvent.loaded / progressEvent.total) * 100,
              )}%`,
            );
          },
        })
        .then((res: any) => {
          setUploading(false);
          if (res.data.path) {
            setUploadingMessage(res.data.path as string);
          }
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [file, token]);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
  };

  const action = (
    <>
      {!uploading && (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );

  console.log(open);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route path="/" exact>
              <h1>Home</h1>
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/cities" exact>
              <CityTable />
            </Route>
            <Route path="/video-upload" exact>
              <Upload fileRef={fileRef} setFile={setFile} />
            </Route>
            <Snackbar
              open={open}
              autoHideDuration={Infinity}
              onClose={handleClose}
              message={uploadingMessage}
              action={action}
            />
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
