import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import { getUser, updateUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const UpdateUserForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        console.log("user", res);
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setUsername(res.userName);
        setEmail(res.email);
        setProfilePic(res.profilePic);
      } catch (error) {
        console.log(`Error fetching user`, error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userData = { firstName, lastName, userName, email, profilePic };
      await updateUser(userData);
      navigate("/");
    } catch (error) {
      console.log("error updating user", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setProfilePic(data.secure_url);
    } catch (error) {
      console.error("Cloudinary upload failed", error);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "96vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: 5,
            boxShadow: 2,
            marginTop: "25px",
            minHeight: "500px",
          }}
          elevation={6}
          variant="outlined"
        >
          <Typography variant="h5" mb={3} textAlign="center">
            Update User
          </Typography>
          <form onSubmit={handleUpdate}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    label="First Name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Last Name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Username"
                type="text"
                required
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                {profilePic && (
                  <Box>
                    <Typography variant="body2" mb={1}>
                      Current Profile Picture:
                    </Typography>
                    <img
                      src={profilePic}
                      alt="Profile"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}

                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />

                  <Button
                    variant="outlined"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    sx={{
                      width: "100%",
                      height: 120,
                      borderRadius: 2,
                      borderStyle: "dashed",
                      borderWidth: 2,
                      background: "rgba(102, 126, 234, 0.05)",
                      "&:hover": {
                        background: "rgba(102, 126, 234, 0.1)",
                      },
                    }}
                  >
                    <Box textAlign="center">
                      <Typography variant="body1" fontWeight={600}>
                        {isUploading
                          ? "Uploading Image..."
                          : "Choose Profile Picture"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        PNG, JPG, WebP or GIF
                      </Typography>
                    </Box>
                  </Button>

                  {isUploading && (
                    <Box mt={2}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                        }}
                      />
                      <Typography variant="body2" textAlign="center" mt={1}>
                        {Math.round(uploadProgress)}% uploaded
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                // disabled={!profilePic}
              >
                Update User
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default UpdateUserForm;
