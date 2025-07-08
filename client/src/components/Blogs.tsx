import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const Blogs = () => {
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
        <Grid size={3}>
          <Card
            sx={{
              // border:'2px solid red',
              maxHeight: "420px",
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
              image="./dollars.jpg"
              sx={{
                objectFit: "cover",
                maxHeight: "280px",
              }}
            />
            <CardContent>
              <Typography variant="h5">How to get Rich</Typography>
              <Typography variant="body2">
                A collection of all Naval's ideas from his tweetstorm how to get
                rich without getting lucky
              </Typography>

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
                  image="./user1.jpg"
                  sx={{
                    borderRadius: "50%",
                    width: "50px",
                  }}
                />
                <Typography variant="body2">Naval 15th Jan 2025 </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Blogs;
