import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { ChangeEvent, Dispatch, FormEvent, useRef, useState } from 'react';
import { useUser } from '../context/user.context';

interface UploadProps {
  fileRef: React.RefObject<HTMLInputElement>;
  // file: File | null;
  setFile: Dispatch<React.SetStateAction<File | null>>;
  // setUploader: React.Dispatch<React.SetStateAction<Function | null>>;
}

export function Upload(props: UploadProps) {
  const { fileRef, setFile } = props;
  // const [file, setFile] = useState<File | null>(null);
  const { token } = useUser();

  // const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   // setFile(event.currentTarget!?.files[0]);
  //   const files = fileRef.current?.files;
  //   if (files) {
  //     console.log(files);
  //     setFile(files[0]);
  //   }
  //   // if (fileRef.current == null) {
  //   //   return;
  //   // }
  //   // if (fileRef.current!?.files) {
  //   //   const file = fileRef.current!.files[0];
  //   //   if (!file) {
  //   //     setPreviewSource(null);
  //   //     return;
  //   //   }
  //   //   previewFile(file);
  //   // }
  // };

  // const clearImage = () => {
  //   setPreviewSource(null);
  //   fileRef!.current!.value = '';
  // };

  const handlePostSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const files = fileRef.current?.files;
    if (files) {
      console.log(files);
      setFile(files[0]);
    }
  };

  // const handlePostSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const fd = new FormData();
  //     const files = fileRef.current?.files;
  //     if (files) {
  //       fd.append('file', files[0]);
  //     }
  //     await axios.post('/api/media/upload', fd, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       onUploadProgress: (progressEvent) => {
  //         console.log(
  //           `Upload Progress ${Math.round(
  //             (progressEvent.loaded / progressEvent.total) * 100,
  //           )}%`,
  //         );
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Box>
      <Typography>Upload Video</Typography>
      <Typography>Supported formats: m4v, webm, mp4, mkv</Typography>
      <form onSubmit={handlePostSubmit}>
        <input
          type="file"
          accept=".m4v,.webm,.mp4,.mkv"
          // onChange={fileChangedHandler}
          multiple={false}
          ref={fileRef}
        />
        <button type="submit">Post</button>
      </form>
    </Box>
  );
}
