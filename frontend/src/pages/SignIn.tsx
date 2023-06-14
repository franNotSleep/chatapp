import { useContext, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { NavLink, useNavigate } from "react-router-dom";
import { axiosService } from "../helper/axios";
import Copyright from "../components/Copyright";
import {
  Snackbar,
  Alert,
  Typography,
  Container,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Avatar,
  Button,
} from "@mui/material";
import { UserContext } from "../contexts/userContext";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axiosService
      .post("/users/auth", data)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      })
      .catch((e) => {
        let msg = JSON.stringify(e.response.data);
        console.log(e.response.data);
        setOpen(true);
        setError(msg);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/register/">
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignIn;
