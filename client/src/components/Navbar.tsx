import React, { useState, MouseEvent } from "react";
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

const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorNav(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          boxShadow: 3,
          // backgroundColor:'white'
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
          <Button color="inherit" href="null">
            Blogs
          </Button>
          <Button color="inherit" href="null">
            Login
          </Button>
          <Button color="inherit" href="null">
            Sign Up
          </Button>
          <IconButton size="large" edge="start" color="inherit">
            <FaUser />
          </IconButton>
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
