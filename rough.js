// src/components/PostList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Box, Grid, CardMedia, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PostList = () => {
  // State to store posts
  const [posts, setPosts] = useState([]);
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State to store selected post
  const [selectedPost, setSelectedPost] = useState(null);
  // State for dialog open/close
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    // Function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        let addImg = response.data.map((data, index) => ({
          ...data,
          image:
            // index % 2
            // ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcTSk2S8VfXwOqBql8oJ0A9-pXvVUHxBy_eIgIBS0Ybi5uvEZ0YOWBHFRnH0GOV4jAGdHFx7GnpAMxV-ydo&psig=AOvVaw19JQS4OKJkFcXKrGXXyg50&ust=1694277980323000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMCh2r27m4EDFQAAAAAdAAAAABAE"
            // :
            "https://www.dsl-ltd.co.uk/wp-content/uploads/2023/02/PCB-Design-and-Testing.webp",
          // "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcSmZOZ-Y24ulcmnmhZomdika4_pkXzYoqZgU1jqOSyRJTANexU3N36sdqW2KKQUurCJsjSDNuiuOrwD-54&psig=AOvVaw33GR-IoYHiLOXTrz6cYU5F&ust=1694277463909000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCPiOyKG6m4EDFQAAAAAdAAAAABAE",
        }));

        // console.log(addImg);
        setPosts(addImg);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
    // Call the fetchPosts function on the first page load
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts]);

  // Function to handle post selection
  const handlePostSelect = (post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  // Function to handle post deletion
  const handleDeletePost = (postId) => {
    // Filter out the post to be deleted
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Function to perform fuzzy search
  const performSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Grid container spacing={2} sx={{ padding: "150px" }}>
        <Grid item md={12} lg={12} sx={12} sm={12}></Grid>

        {/* {posts.map((data, index) => (
          <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
            <Box
              sx={{
                "&hover": {
                  boxShadow: "0 12px 15px -6px rgb(0 0 0 / 30%)",
                  cursor: "pointer",
                },
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <Card
                sx={{
                  // backgroundColor: "#FCF5E5",
                  borderRadius: "0px",
                  boxShadow: "0 0 16px 0 rgb(0 0 0 / 15%)",
                  maxWidth: "320px",
                  // minHeight: "250px",
                }}
              >
                <CardMedia
                  component="img"
                  image={data.image}
                  height="210px"
                  width="100%"
                  alt="green iguana"
                  style={{
                    // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%) ",
                  }}
                />
                <CardContent>
                  <Typography
                    sx={{
                      textAlign: "left",
                      justifyContent: "left",
                      fontSize: "18px",
                      fontFamily: 'JostMedium',
                      lineHeight: "1.18",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      color: '#5756a2' ,
                      // color:"black",
                      fontWeight: "400",
                      "@media only screen and (max-width: 1100px) and (min-width: 700px) ":
                        {
                          fontSize: "21px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingLeft: "25px",
                        },
                      "@media only screen and (max-width: 699px) and (min-width: 400px) ":
                        {
                          fontSize: "20px",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          paddingLeft: "10px",
                        },
                      "@media only screen and (max-width: 399px) and (min-width: 199px) ":
                        {
                          fontSize: "19px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          paddingLeft: "25px",
                        },
                    }}
                  >
                    {data.title}
                  </Typography>
                </CardContent>
                <br/><br/><br/>
                <CardMedia>
                  <Grid sx={{ display: "flex"  , justifyContent:"space-between"  }}>

                    <Grid sx={{display:"flex"}}>

                    <IconButton
                     color="success">
                    <FavoriteIcon />
                    </IconButton>


                    <IconButton
                     color="#1A1110">
                    <ShareIcon />
                    </IconButton>


                   

                    </Grid>
                    
                  

                    <IconButton
                      color="error"
                      onClick={() => handleDeletePost(data.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>

                  {/* <IconButton
                      color="error"
                      onClick={() => handleDeletePost(data.id)}
                    >
                      <DeleteIcon />
                    </IconButton> */}
        {/* </CardMedia>
              </Card>
            </Box>
          </Grid>
        // ))} */}

        {/* <Grid item md={4} lg={4} xs={12} sm={4}>

          {posts.map((data , index)=>{
            

          })}
       
        </Grid> */}

       
      </Grid>
    </Box>

    // <div>
    //   {/* Search Box */}
    //   <input
    //     type="text"
    //     placeholder="Search posts..."
    //     value={searchQuery}
    //     onChange={(e) => performSearch(e.target.value)}
    //   />
    //  <br/> <br/>
    //   {/* Display Posts */}
    //   {filteredPosts.map((post) => (
    //     <Box
    //       sx={{
    //         "&hover": {
    //           boxShadow: "0 12px 15px -6px rgb(0 0 0 / 30%)",
    //           cursor: "pointer"
    //         },
    //         display: "block ",
    //         justifyContent: "center",
    //         padding: "5px"
    //       }}
    //     >
    //       <Card
    //         sx={{
    //           background: "#F5AC3E",
    //           borderRadius: "0px",
    //           boxShadow: "0 0 16px 0 rgb(0 0 0 / 15%)"
    //         }}
    //         key={post.id}
    //       >
    //         <CardContent>
    //           <h3 onClick={() => handlePostSelect(post)}>{post.title}</h3>
    //           <IconButton
    //             color="error"
    //             onClick={() => handleDeletePost(post.id)}
    //           >
    //             <DeleteIcon />
    //           </IconButton>
    //         </CardContent>
    //       </Card>
    //     </Box>
    //   ))}
    //   {/* Post Dialog */}
    //   <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
    //     {selectedPost && (
    //       <div>
    //         <h2>{selectedPost.title}</h2>
    //         <p>{selectedPost.body}</p>
    //         {/* Fetch and display comments here */}
    //       </div>
    //     )}
    //   </Dialog>
    // </div>
    
    {posts.map((data, index) => (
        <Grid item md={6} lg={4} xs={12} sm={12} key={index.id}>
          <Box
            sx={{
              "&hover": {
                boxShadow: "0 12px 15px -6px rgb(0 0 0 / 30%)",
                cursor: "pointer",
              },
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Card
            sx={{
              background: "#f5ac3e",  
              borderRadius: "0px",
              boxShadow: "0 0 16px 0 rgb(0 0 0 / 15%)",
              maxWidth: "370px",
            }}
          >
            <CardMedia
              component="img"
              image={data.image}
              height="225px"
              width="100%"
              alt="pcb"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
            />
            <CardContent sx={{ paddingLeft: "25px", paddingRight: "25px" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontFamily: "JostMedium",
                  lineHeight: "1.18",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  color: "#fff",
                  paddingLeft: "0px",
                  fontWeight: "900",
                  "@media only screen and (max-width: 1100px) and (min-width: 700px) ":
                    {
                      fontSize: "21px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "25px",
                    },
                  "@media only screen and (max-width: 699px) and (min-width: 400px) ":
                    {
                      fontSize: "15px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      paddingLeft: "10px",
                    },
                  "@media only screen and (max-width: 399px) and (min-width: 199px) ":
                    {
                      fontSize: "12px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      paddingLeft: "25px",
                    },
                }}
              >
                {data.title}
              </Typography>
            </CardContent>
            <CardContent
              sx={{
                background: "white",
                paddingLeft: "25px",
                paddingRight: "25px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontFamily: "JostMedium",

                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#000",
                  lineHeight: "1.15",
                  "@media only screen and (max-width: 1100px) and (min-width: 700px) ":
                    { fontSize: "19px" },
                  "@media only screen and (max-width: 699px) and (min-width: 400px) ":
                    { fontSize: "15px" },
                  "@media only screen and (max-width: 399px) and (min-width: 199px) ":
                    { fontSize: "12px" },
                }}
              >
                {formattedDate}
                <Typography
                  variant="body1"
                  sx={{
                    letterSpacing: "0.9px",
                    color: "#676055",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    minHeight: "50px",
                    marginTop: "10px",
                    wordWrap: "break-word",
                    maxHeight: "120px",
                    "@media only screen and (max-width: 1100px) and (min-width: 700px) ":
                      { fontSize: "13px" },
                    "@media only screen and (max-width: 699px) and (min-width: 400px) ":
                      { fontSize: "12px" },
                    "@media only screen and (max-width: 399px) and (min-width: 199px) ":
                      { fontSize: "11px" },
                  }}
                ></Typography>
              </Typography>
              <br />

              <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    borderRadius: "3px",
                    fontSize: "13px",
                    backgroundColor: "#cf4520",
                    fontFamily: '"PT Serif", serif',
                    color: "#fff",
                    padding: "7px 19px",
                    "&:hover": { background: "#cf4520", color: "#fff" },
                    "@media only screen and (max-width: 1100px) and (min-width: 700px) ":
                      { fontSize: "12px" },
                    "@media only screen and (max-width: 699px) and (min-width: 400px) ":
                      { fontSize: "11px" },
                    "@media only screen and (max-width: 399px) and (min-width: 199px) ":
                      { fontSize: "10px" },
                  }}
                >
                  Click Here
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDeletePost(data.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </CardContent>
          </Card>
          </Box>
          
        </Grid>
      ))}
  );
};

export default PostList;
