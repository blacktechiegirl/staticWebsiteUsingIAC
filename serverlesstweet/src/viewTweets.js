import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Paper from '@mui/material/Paper'
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress'





const App = () => {
  const [postData, setPostData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [buttonLoad, setButtonLoad] = useState(false)
  const [modal, setModal] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [userTweet, setUserTweet] = useState('')
  const [userComment, setUserComment] = useState('')
  const [myTweets, setMyTweets] = useState(false)
  const [viewComment, setViewComment] = useState()
  const [viewCommentId, setViewCommentId] = useState()
  const [commentPostId, setCommentPostId] = useState('')
  const [allData, setAllData] = useState([])


  const userName = localStorage.getItem('userName')
  const userId = localStorage.getItem('userId')

///Pull all post data on page load
  useEffect(() => {
    const aminat = async () => {
      const data = await axios.get(`https://fw209u8orf.execute-api.us-east-1.amazonaws.com/posts`)
      if (data) {
        if (parseInt(data.status) === 200) {
          setAllData(data.data.Items)
          setPostData(data.data.Items)
          console.log(data.data.Items)
          setLoading(false)
        } else if (parseInt(data.status) === 400) {
          console.log('An error occured')
        }

      } else {
        console.log('error')
      }
    }
    aminat()

  }, [])

 

  // View Comments
  const viewComments = async (id) => {
    setViewComment(true)
    setViewCommentId(id)

    const data = await axios.get(`https://uwbdzc2na0.execute-api.us-east-1.amazonaws.com/comments/${id}`)
    if (data) {
      if (parseInt(data.status) === 200) {
        setCommentData(data.data.Items)
        console.log(data.data.Items)
        setLoading(false)
      } else if (parseInt(data.status) === 400) {
        console.log('An error occured')
      }

    } else {
      console.log('error')
    }
  }

  console.log(allData)
  // Create a post 

  const createPost = async () => {
    setButtonLoad(true)
    const postId = uuidv4()
    const content = userTweet

    const userData = {
      postId,
      userId,
      userName,
      content
    }

    const res = await axios.put("https://fw209u8orf.execute-api.us-east-1.amazonaws.com/post", userData);
    if (res) {
      if (parseInt(res.status) === 200) {
        setButtonLoad(false)
        setModal(false)
        toast.success(res.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
          transitionIn: "fadeIn",
          transitionOut: "fadeOut",
          closeOnToastrClick: true
        })
      } else if (parseInt(res.status) === 400) {
        console.log('An error occured')
      }

    } else {
      console.log('error')
    }

  }

  //View all my tweets
  const viewMyTweets = async () => {
    setMyTweets(true)
    const data = await axios.get(`https://fw209u8orf.execute-api.us-east-1.amazonaws.com/post/${userId}`)
    if (data) {
      if (parseInt(data.status) === 200) {
        setPostData(data.data.Items)
        setLoading(false)
      } else if (parseInt(data.status) === 400) {
        console.log('An error occured')
      }

    } else {
      console.log('error')
    }
  }

  // Create a comment
  const createComment = (id) => {
    setCommentModal(true)
    setCommentPostId(id)

  }

  //Post Created Comment
  const postComment = async () => {
    setButtonLoad(true)
    const commentId = uuidv4()
    const postId = commentPostId
    const comment = userComment

    const userData = {
      postId,
      commentId,
      userId,
      userName,
      comment
    }

    const res = await axios.put("https://uwbdzc2na0.execute-api.us-east-1.amazonaws.com/comment", userData);
    if (res) {
      if (parseInt(res.status) === 200) {
        setButtonLoad(false)
        setCommentModal(false)
        console.log(res)
      } else if (parseInt(res.status) === 400) {
        console.log('An error occured')
      }

    } else {
      console.log('error')
    }

  }

  const viewAllTweets = ()=>{
    setMyTweets(false) 
    setPostData(allData)
    
  }


  return (

    <div style={{ margin: 0 }}>
      <div style={{ margin: 0, display: 'flex', backgroundColor: '#363062', color: '#fff', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'Smooch', fontSize: '26px', margin: '15px 150px' }}>Serverless Tweet</p>
        <ul style={{ listStyle: 'none', width: '25%', display: 'flex', justifyContent: 'space-between', marginRight: '150px', fontFamily: 'Sora' }}>
          <li  style={{cursor: 'pointer'}} onClick={() => { setModal(true) }}>Post new tweet</li>
          {myTweets? <li style={{cursor: 'pointer'}} onClick={()=>{viewAllTweets()}}>View All Tweets</li>: <li style={{cursor: 'pointer'}} onClick={() => { viewMyTweets() }}>View my Tweets</li> }
        </ul>
      </div>
      <div style={{ width: '52%', margin: '50px auto' }}>
        {myTweets ? <h2>My Tweets</h2>: <h2 style={{ margin: '0' }}>Hey {userName}, What's Happening ?</h2> }     
      </div>

      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box style={{ backgroundColor: '#fff', width: '40%', height: '400px', padding: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'end' }} onClick={() => setModal(false)}>
            <h3 style={{ cursor: 'pointer', fontSize: '18px', color: '#d9d9d9' }}>x</h3></div>
          <div>
            <div style={{ textAlign: 'center', margin: '10px' }}>
              <h3 >Create a New Post</h3></div>
            <label style={{ margin: '10px' }}>What's Happening ?</label>
            <textarea
              value={userTweet}
              onChange={(event) => setUserTweet(event.target.value)}
              style={{ fontSize: '18px', padding: '10px', width: '96%', height: '200px', margin: '10px', borderRadius: '8px', border: '1px solid #D9D9D9' }}>
            </textarea>

          </div>
          {buttonLoad ?
            <div className='butloadingButton' style={{ width: '20%', position: 'absolute', bottom: 0, right: '20px', margin: 0 }}>
              <button type="submit"><CircularProgress style={{ width: '30px', color: '#fff' }} /></button>
              `</div>
            :
            <div className='loginButton' style={{ width: '20%', position: 'absolute', bottom: '10px', right: '20px' }}>
              <button className='loginButton' onClick={() => { createPost() }}>Tweet</button>
            </div>
          }
        </Box>
      </Modal>

      <Modal
        open={commentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box style={{ backgroundColor: '#fff', width: '40%', height: '400px', padding: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'end' }} onClick={() => setCommentModal(false)}>
            <h3 style={{ cursor: 'pointer', fontSize: '18px', color: '#d9d9d9' }}>x</h3></div>
          <div>
            <div style={{ textAlign: 'center', margin: '10px' }}>
              <h3 >Drop a Comment</h3></div>
            <textarea
              value={userComment}
              onChange={(event) => setUserComment(event.target.value)}
              style={{ fontSize: '18px', padding: '10px', width: '96%', height: '200px', margin: '10px', borderRadius: '8px', border: '1px solid #D9D9D9' }}>
            </textarea>

          </div>
          {buttonLoad ?
            <div className='butloadingButton' style={{ width: '20%', position: 'absolute', bottom: 0, right: '20px', margin: 0 }}>
              <button type="submit"><CircularProgress style={{ width: '30px', color: '#fff' }} /></button>
              `</div>
            :
            <div className='loginButton' style={{ width: '20%', position: 'absolute', bottom: '10px', right: '20px' }}>
              <button className='loginButton' onClick={() => { postComment() }}>Tweet</button>
            </div>
          }
        </Box>
      </Modal>

      {loading ?
        <>
          <div style={{ width: '50%', margin: '50px auto' }}>
            <Box sx={{ height: 600 }}>
              <Skeleton animation="wave" width={800} height={300} style={{ marginBottom: -40 }} />
              <Skeleton animation="wave" width={800} height={300} style={{ marginBottom: -40 }} />
              <Skeleton animation="wave" width={800} height={300} style={{ marginBottom: -40 }} />
              <Skeleton animation="wave" width={800} height={300} style={{ marginBottom: -40 }} />
            </Box></div></>
        :

        postData.map((item) => {
          return (
            <div>
              <div style={{ width: '50%', margin: '50px auto', backgroundColor: '#E9D5CA', borderRadius: '5px', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.07)', padding: '15px' }}>
                <h4>{item.userName}</h4>
                <p style={{margin: '10px 0'}}>{item.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{marginTop: '10px'}}><h5><b>comments:</b> {item.comments}</h5></div>
                  <div>
                    {viewComment? 
                     <button className='viewbutton'
                     onClick={() => setViewComment(false)}
                   >close comments</button>
                    :
                    <button className='viewbutton'
                      onClick={() => viewComments(item.postId)}
                    >view comments</button> }
                    <button onClick={() => createComment(item.postId)} className='viewbutton'>Add a comment</button>
                  </div>
                </div>
              </div>
              {viewComment && viewCommentId == item.postId?
                item.comments ?
                  <div style={{ width: '50%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.07)', padding: '0 15px' }}>
                    <p>Comments</p>
                    {
                      commentData.map((item) => {
                        return (
                          <div>
                            <hr />
                            <h5>{item.userName}</h5>
                            <p>{item.comment}</p>
                          </div>
                        )
                      })
                    }
                  </div> :
                  <div style={{ width: '50%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.07)', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h4>No comments</h4>
                  </div>

                : ''}

            </div>
          )
        })


      }
    </div>


  )

}


export default App;
