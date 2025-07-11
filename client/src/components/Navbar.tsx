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
  const [anchorUserMenu, setAnchorUserMenu] = useState<null | HTMLElement>(
    null,
  );
  const [anchorMobileMenu, setAnchorMobileMenu] = useState<null | HTMLElement>(
    null,
  );

  const openUserMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(e.currentTarget);
  };
  const closeUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const openMobileMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorMobileMenu(e.currentTarget);
  };
  const closeMobileMenu = () => {
    setAnchorMobileMenu(null);
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
                Create Blog
              </Button>
              <Button color="inherit" component={Link} to="/blogs">
                My Blogs
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={openUserMenu}
              >
                <FaUser />
              </IconButton>
              <Menu
                open={Boolean(anchorUserMenu)}
                onClose={closeUserMenu}
                anchorEl={anchorUserMenu}
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
                    width: "180px",
                  }}
                >
                  <MenuItem
                    onClick={closeUserMenu}
                    component={Link}
                    to="/update-user"
                  >
                    Update User
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  <MenuItem
                    onClick={closeUserMenu}
                    component={Link}
                    to="/update-password"
                  >
                    Update Password
                  </MenuItem>
                </MenuList>
              </Menu>
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
          onClick={openMobileMenu}
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
          open={Boolean(anchorMobileMenu)}
          onClose={closeMobileMenu}
          anchorEl={anchorMobileMenu}
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
            <MenuItem onClick={closeMobileMenu} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={closeMobileMenu} component={Link} to="/blogs">
              Blogs
            </MenuItem>
            <MenuItem onClick={closeMobileMenu} component={Link} to="/login">
              Login
            </MenuItem>
            <MenuItem onClick={closeMobileMenu} component={Link} to="sign-up">
              SignUp
            </MenuItem>
          </MenuList>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
