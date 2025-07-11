import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
  createdAt: string;
  author: {
    userName: string;
  };
}

interface BlogsProps {
  blogs: Blog[];
}
const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <Box
      sx={{
        marginTop: "70px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          borderBottom: "2px solid lightblue",
          width: "30%",
          padding: ".5rem",
        }}
      >
        Stay up to date with our latest articles
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          padding: "1.5rem",
        }}
      >
        {blogs.map((blog, index) => (
          <Grid size={3} key={index}>
            <Card
              sx={{
                // border:'2px solid red',
                minheight: "450px",
                width: "100%",
                boxShadow: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              <CardMedia
                component="img"
                image={blog.featuredImg}
                sx={{
                  objectFit: "cover",
                  height: "300px",
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component={Link}
                  to={`/blog/${blog.id}`}
                >
                  {blog.title}
                </Typography>
                <Typography variant="body2">{blog.synopsis}</Typography>

                <Box
                  sx={{
                    // border:'2px solid red',
                    textAlign: "right",
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="50px"
                    image="./profile-picture.png"
                    sx={{
                      borderRadius: "50%",
                      width: "50px",
                    }}
                  />
                  <Box>
                    <Typography variant="body2">
                      {blog.author.userName}
                    </Typography>
                    <Typography variant="body2">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
