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
  Box,
} from "@mui/material";
import { FaUser, FaFeather } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";

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
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        color: "black",
      }}
    >
      <Toolbar
        sx={{
          boxShadow: 3,
          // backgroundColor:'white'
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 35,
              height: 35,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
            }}
          >
            <FaFeather color="white" size={16} />
          </Box>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "black",
              fontWeight: 750,
              fontSize: "25px",
              "&:hover": {
                color: "mediumslateblue",
                transition: "color 0.2s ease",
              },
            }}
          >
            Blogit
          </Typography>
        </Box>
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
            alignItems: "center",
          }}
        >
          {isLoggedIn() ? (
            <>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "#4a5568",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "20px",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(102, 126, 234, 0.08)",
                    color: "#667eea",
                  },
                }}
              >
                Blogs
              </Button>
              <Button
                component={Link}
                to="/blog"
                sx={{
                  color: "#4a5568",
                  fontWeight: 500,
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  fontSize: "20px",
                  "&:hover": {
                    backgroundColor: "rgba(102, 126, 234, 0.08)",
                    color: "#667eea",
                  },
                }}
              >
                Create
              </Button>

              <IconButton
                size="large"
                edge="start"
                onClick={openUserMenu}
                sx={{
                  width: 35,
                  height: 35,
                  fontSize: "15px",
                  fontWeight: 600,
                  backgroundImage:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
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
                sx={{
                  mt: 1,
                  "& .MuiPaper-root": {
                    borderRadius: "10px",
                    minWidth: 180,
                    boxShadow: 2,
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    overflow: "visible",
                  },
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
                    to="/user-profile"
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      User Profile
                      <ImProfile size={18} />
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      Logout
                      <FaPowerOff size={18} />
                    </Box>
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
