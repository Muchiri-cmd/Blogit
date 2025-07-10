import { useState } from "react";
import type { MouseEvent } from "react";
import { isLoggedIn } from "../utils/auth";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Menu,
  MenuList,
  MenuItem,
} from "@mui/material";
import { FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorNav(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  const navigate = useNavigate();

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          boxShadow: 3,
          // backgroundColor:'white'
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          component={Link}
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          Blogit
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
            },
          }}
        >
          {isLoggedIn() ? (
            <>
              <Button color="inherit" component={Link} to="/blog">
                Blog
              </Button>
              <Button color="inherit" component={Link} to="/blogs">
                Blogs
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <IconButton size="large" edge="start" color="inherit">
                <FaUser />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/sign-up">
                Sign Up
              </Button>
            </>
          )}
        </Stack>
        <IconButton
          onClick={openMenu}
          sx={{
            color: "white",
            display: {
              md: "none",
            },
          }}
        >
          <MdMenu />
        </IconButton>
        <Menu
          open={Boolean(anchorNav)}
          onClose={closeMenu}
          anchorEl={anchorNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuList
            sx={{
              width: "120px",
            }}
          >
            <MenuItem onClick={closeMenu} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={closeMenu} component={Link} to="/blogs">
              Blogs
            </MenuItem>
            <MenuItem onClick={closeMenu} component={Link} to="/login">
              Login
            </MenuItem>
            <MenuItem onClick={closeMenu} component={Link} to="sign-up">
              SignUp
            </MenuItem>
          </MenuList>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
