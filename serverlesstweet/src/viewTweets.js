import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";
import { faPen, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "timeago.js";

const App = () => {
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [commentLoader, setCommentLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [userTweet, setUserTweet] = useState("");
  const [userComment, setUserComment] = useState("");
  const [myTweets, setMyTweets] = useState(false);
  const [viewComment, setViewComment] = useState();
  const [viewCommentId, setViewCommentId] = useState();
  const [commentPostId, setCommentPostId] = useState("");
  const [allData, setAllData] = useState([]);
  const [commentUserId, setCommentUserId] = useState("");

  const username = localStorage.getItem("userName");
  const userName= username.split(' ')[0]
  const userId = localStorage.getItem("userId");

  ///Pull all post data on page load
  useEffect(() => {
    const aminat = async () => {
      const data = await axios.get(
        `https://fw209u8orf.execute-api.us-east-1.amazonaws.com/posts`
      );
      if (data) {
        if (parseInt(data.status) === 200) {
          setAllData(data.data.Items);
          setPostData(data.data.Items);
          console.log(data.data.Items);
          setLoading(false);
        } else if (parseInt(data.status) === 400) {
          console.log("An error occured");
        }
      } else {
        console.log("error");
      }
    };
    aminat();
  }, []);

  // View Comments
  const viewComments = async (id) => {
    setCommentLoader(true)
    setViewComment(true);
    setViewCommentId(id);

    const data = await axios.get(
      `https://uwbdzc2na0.execute-api.us-east-1.amazonaws.com/comments/${id}`
    );
    if (data) {
      if (parseInt(data.status) === 200) {
        setCommentLoader(false)
        setCommentData(data.data.Items);
        console.log(data.data.Items);
        setLoading(false);
      } else if (parseInt(data.status) === 400) {
        console.log("An error occured");
      }
    } else {
      console.log("error");
    }
  };

  console.log(allData);
  // Create a post

  const createPost = async () => {
    setButtonLoad(true);
    const postId = uuidv4();
    const content = userTweet;

    const userData = {
      postId,
      userId,
      userName,
      content,
    };

    const res = await axios.put(
      "https://fw209u8orf.execute-api.us-east-1.amazonaws.com/post",
      userData
    );
    if (res) {
      if (parseInt(res.status) === 200) {
        setButtonLoad(false);
        setModal(false);
        toast.success(res.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
          transitionIn: "fadeIn",
          transitionOut: "fadeOut",
          closeOnToastrClick: true,
        });
      } else if (parseInt(res.status) === 400) {
        console.log("An error occured");
      }
    } else {
      console.log("error");
    }
  };

  //delete my post

  const deleteMyPost = async (postId, user) => {
    const res = await axios.delete(
      `https://fw209u8orf.execute-api.us-east-1.amazonaws.com/post/${postId}/${user}`
    );
  };

  //View all my tweets
  const viewMyTweets = async () => {
    setMyTweets(true);
    const data = await axios.get(
      `https://fw209u8orf.execute-api.us-east-1.amazonaws.com/post/${userId}`
    );
    if (data) {
      if (parseInt(data.status) === 200) {
        setPostData(data.data.Items);
        setLoading(false);
      } else if (parseInt(data.status) === 400) {
        console.log("An error occured");
      }
    } else {
      console.log("error");
    }
  };

  // Create a comment
  const createComment = (id, user) => {
    setCommentModal(true);
    setCommentPostId(id);
    setCommentUserId(user);
  };

  //Post Created Comment
  const postComment = async () => {
    setButtonLoad(true);
    const commentId = uuidv4();
    const postId = commentPostId;
    const comment = userComment;
    const postUserId = commentUserId;

    const userData = {
      postId,
      commentId,
      userId,
      userName,
      comment,
      postUserId,
    };

    console.log(userData);

    const res = await axios.put(
      "https://uwbdzc2na0.execute-api.us-east-1.amazonaws.com/comment",
      userData
    );
    if (res) {
      if (parseInt(res.status) === 200) {
        setButtonLoad(false);
        setCommentModal(false);
        console.log(res);
      } else if (parseInt(res.status) === 400) {
        console.log("An error occured");
      }
    } else {
      console.log("error");
    }
  };

  const viewAllTweets = () => {
    setMyTweets(false);
    setPostData(allData);
  };

  return (
    <div style={{ margin: 0 }}>
      <nav class="navbar navbar-expand-lg navbar-dark tweetnavbar px-md-5 ">
        <div class="container">
          <p
            style={{
              fontFamily: "Smooch",
              fontSize: "28px",
              color: '#fff',
              margin: 0
            }}
          >
            Serverless Tweet
          </p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <FontAwesomeIcon icon={faBars}/>
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto ">
              <li
                className="nav-item mx-lg-4 "
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModal(true);
                }}
              >
                <a class="nav-link active" aria-current="page" href="#">
                  Post new tweet
                </a>
              </li>

              {myTweets ? (
                <li
                  className="nav-item  "
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    viewAllTweets();
                  }}
                >
                  <a class="nav-link active" aria-current="page" href="#">
                    View All Tweets
                  </a>
                </li>
              ) : (
                <li
                  className="nav-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    viewMyTweets();
                  }}
                >
                  <a class="nav-link active" aria-current="page" href="#">
                    View my Tweets
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
     
      <div className="tweetwidth">
        <div style={{ margin: "50px auto" }}>
          {myTweets ? (
            <h2>My Tweets</h2>
          ) : (
            <p style={{ margin: "0 auto", fontSize: '2vw' }}>
              Hey {userName}, What's Happening ?
            </p>
          )}
        </div>

        <Modal
          open={modal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              backgroundColor: "#fff",
              height: "400px",
              padding: "20px",
              position: "relative",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "end" }}
              onClick={() => setModal(false)}
            >
              <h3
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#d9d9d9",
                }}
              >
                x
              </h3>
            </div>
            <div>
              <div style={{ textAlign: "center", margin: "10px" }}>
                <h3>Create a New Post</h3>
              </div>
              <label style={{ margin: "10px" }}>What's Happening ?</label>
              <textarea
                value={userTweet}
                onChange={(event) => setUserTweet(event.target.value)}
                style={{
                  fontSize: "18px",
                  padding: "10px",
                  width: "96%",
                  height: "200px",
                  margin: "10px",
                  borderRadius: "8px",
                  border: "1px solid #D9D9D9",
                }}
              ></textarea>
            </div>
            {buttonLoad ? (
              <div
                className="butloadingButton"
                style={{
                  width: "20%",
                  position: "absolute",
                  bottom: 0,
                  right: "20px",
                  margin: 0,
                }}
              >
                <button type="submit">
                  <CircularProgress style={{ width: "30px", color: "#fff" }} />
                </button>
                `
              </div>
            ) : (
              <div
                className="loginButton"
                style={{
                  width: "20%",
                  position: "absolute",
                  bottom: "10px",
                  right: "20px",
                }}
              >
                <button
                  className="loginButton"
                  onClick={() => {
                    createPost();
                  }}
                >
                  Tweet
                </button>
              </div>
            )}
          </Box>
        </Modal>

        <Modal
          open={commentModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              backgroundColor: "#fff",
              width: '600px',
              height: "400px",
              padding: "10px",
              position: "relative",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "end" }}
              onClick={() => setCommentModal(false)}
            >
              <h3
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#d9d9d9",
                }}
              >
                x
              </h3>
            </div>
            <div>
              <div style={{ textAlign: "center", margin: "10px" }}>
                <h3>Drop a Comment</h3>
              </div>
              <textarea
                value={userComment}
                onChange={(event) => setUserComment(event.target.value)}
                style={{
                  fontSize: "18px",
                  padding: "10px",
                  width: "96%",
                  height: "200px",
                  margin: "10px",
                  borderRadius: "8px",
                  border: "1px solid #D9D9D9",
                }}
              ></textarea>
            </div>
            {buttonLoad ? (
              <div
                className="butloadingButton"
                style={{
                  width: "20%",
                  position: "absolute",
                  bottom: 0,
                  right: "20px",
                  margin: 0,
                }}
              >
                <button type="submit">
                  <CircularProgress style={{ width: "30px", color: "#fff" }} />
                </button>
                `
              </div>
            ) : (
              <div
                className="loginButton"
                style={{
                  width: "20%",
                  position: "absolute",
                  bottom: "10px",
                  right: "20px",
                }}
              >
                <button
                  className="loginButton"
                  onClick={() => {
                    postComment();
                  }}
                >
                  Tweet
                </button>
              </div>
            )}
          </Box>
        </Modal>

        {loading ? (
          <>
            <div style={{ margin: "50px auto" }}>
              <Box sx={{ height: 600 }}>
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  height={300}
                  style={{ marginBottom: -40 }}
                />
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  height={300}
                  style={{ marginBottom: -40 }}
                />
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  height={300}
                  style={{ marginBottom: -40 }}
                />
                <Skeleton
                  animation="wave"
                  width={"100%"}
                  height={300}
                  style={{ marginBottom: -40 }}
                />
              </Box>
            </div>
          </>
        ) : (
          postData.map((item) => {
            return (
              <div>
                <div className="tweetsCard">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4>{item.userName}</h4>
                    {myTweets ? (
                      <div>
                        <FontAwesomeIcon
                          label="View Project"
                          style={{
                            fontSize: "15px",
                            color: "#363062",
                            margin: "5px",
                          }}
                          icon={faPen}
                        />
                        <FontAwesomeIcon
                          label="View Project"
                          onClick={() => {
                            deleteMyPost(item.postId, item.userId);
                          }}
                          style={{
                            fontSize: "15px",
                            color: "#363062",
                            margin: "5px",
                            cursor: "pointer",
                          }}
                          icon={faTrash}
                        />
                      </div>
                    ) : (
                      <i><p className="tweetdate">{format(item.date, "en_US")}</p></i>
                    )}
                  </div>
                  
                  <p style={{ margin: "10px 0" }}>{item.content}</p>
                  <div
                    className='row'
                    style={{ display: "row"}}
                  >
                    <div className= 'col-lg-4 col-md-12 ' style={{ marginTop: "10px" }}>
                      <p>
                        <b>comments:</b> {item.xyz}
                      </p>
                    </div>
                    <div className= 'col-lg-8  col-md-12 d-flex justify-content-end'>
                      {viewComment ? (
                        <button
                          className="viewbutton"
                          onClick={() => setViewComment(false)}
                        >
                         <p style={{color: 'black'}}>close comments</p> 
                        </button>
                      ) : (
                        <button
                          className="viewbutton"
                          onClick={() => viewComments(item.postId)}
                        >
                          <p style={{color: 'black'}}>view comments</p>
                        </button>
                      )}
                      <button
                        onClick={() => createComment(item.postId, item.userId)}
                        className="viewbutton"
                      >
                        <p style={{color: 'black'}}>Add a comment</p>
                      </button>
                    </div>
                  </div>
                </div>
                {viewComment && viewCommentId == item.postId ? (
                  commentLoader? <div className= 'text-center'><CircularProgress style={{ width: "30px", color: "#363062" }} /></div>:
                  item.xyz ? (
                    <div
                      style={{
                        width: "50%",
                        margin: "0 auto",
                        backgroundColor: "#fff",
                        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.07)",
                        padding: "0 15px",
                      }}
                    >
                      <p>Comments</p>
                      {commentData.map((item) => {
                        return (
                          <div>
                            <hr />
                            <h5>{item.userName}</h5>
                            <p>{item.comment}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "50%",
                        margin: "0 auto",
                        backgroundColor: "#fff",
                        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.07)",
                        padding: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h4>No comments</h4>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
