import { Box, Typography, CardMedia, Chip } from "@mui/material";
import { Navbar } from "../components";

const Blog = () => {
  return (
    <>
      <Navbar></Navbar>
      <Box
        sx={{
          minHeight: "96vh",
          marginTop: "70px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h3" textAlign="center">
          Blog Title
        </Typography>

        <Box
          sx={{
            // border:'2px solid red',
            textAlign: "right",
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "1rem",
            borderBottom: "1px solid grey",
          }}
        >
          <CardMedia
            component="img"
            height="50px"
            image="./user1.jpg"
            sx={{
              borderRadius: "50%",
              width: "50px",
            }}
          />
          <Typography variant="body2">Naval </Typography>
          <Chip label="4 min read" size="small" />
          <Typography variant="body2"> 15th Jan 2025 </Typography>
        </Box>
        <Box
          sx={{
            // border:'2px solid red',
            width: "60%",
            padding: "2rem",
          }}
        >
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            corporis sint sed, suscipit deserunt nulla ullam laborum maiores.
            Porro nam maiores officiis obcaecati atque! Facere, repellendus in
            aperiam quos laborum perspiciatis cumque amet laudantium ullam quia
            eligendi fugit deleniti explicabo obcaecati enim aliquam dolore
            doloremque ratione maiores voluptatum reprehenderit magni! Dolorum,
            a. Dolor non illum tempore sunt voluptate veritatis totam distinctio
            iusto explicabo, veniam maxime quidem ipsam. Illo incidunt numquam
            dolore voluptates amet veniam dolorum commodi voluptate qui eum
            ratione tempore corporis vitae, quidem consequuntur, rem neque
            pariatur accusamus placeat architecto! Reprehenderit doloremque
            provident neque maxime, laboriosam nobis quae atque sapiente numquam
            consectetur debitis quidem quibusdam, possimus aspernatur modi
            veniam itaque non voluptatem! Corporis ipsa labore harum. Reiciendis
            nesciunt totam accusamus est ratione adipisci doloribus obcaecati
            odio illo? Similique debitis in sequi tenetur. Eaque placeat
            temporibus voluptatum, consequatur modi repellat commodi
            perspiciatis quam molestias possimus error voluptas quaerat optio
            sint.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Blog;
