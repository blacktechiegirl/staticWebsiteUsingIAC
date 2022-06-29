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
  const [loading, setLoading] = useState(true)
  const [buttonLoad, setButtonLoad] = useState(false)
  const [userId, setUserId] = useState('')
  const [modal, setModal] = useState(false)
  const [userTweet, setUserTweet] = useState('')
  

  const userName = localStorage.getItem('userName')

  useEffect(() => {
    const aminat = async () => {
      setUserId(localStorage.getItem('userId'))
      const data = await axios.get(`https://fw209u8orf.execute-api.us-east-1.amazonaws.com/posts`)
      if (data) {
        if (parseInt(data.status) === 200) {
          setPostData(data.data.Items)
          // console.log(data.data.Items)
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





  console.log(userId)

  const posts = [
    {
      id: '101',
      username: 'BlackTechieGirl',
      post: 'Can you identify the true facts about TBhic from the misinformation? TB is the second leading cause of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today',
      comments: 10
    },
    {
      id: '102',
      username: 'Ada Lovelace',
      post: 'How much do you know about HIV? Since the peak of AIDS-related deaths in 2004/05, the number of deaths dropped by 64%, due to initiatives like the Global Fund. But, progress slowed due to COVID-19, where 1.5 million people were infected with HIV in 2020',
      date: 'Today'
    },
    {
      id: '103',
      username: 'Mr Climate',
      post: 'When you were contesting, did you submit your spreadsheet or not as stated in the requirements? Or you told sub dean that you are Brilliant and you do assignment very well? There are simple requirements stated clearly and you are defending such with indeed “common sense”',
      date: 'Today',
      comments: 3,
    },
    {
      id: '104',
      username: 'Fiona',
      post: 'Can you identify the true facts about TB from the misinformation? TB is the second leading cause of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    },
    {
      id: '105',
      username: 'Mr President',
      post: 'Can you identify the true facts about TB from the misinformation? TB is the second leading cause of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today',
      comments: 7
    },
    {
      id: '106',
      username: 'Ryan Jones',
      post: 'Can you identify the true facts about TB from the misinformation? TB is the second leading cause of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    },
    {
      id: '107',
      username: 'Jaymit Bahans',
      post: 'Can you identify the true facts about TB from the misinformation? TB is the second leading cause of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    }
  ]


  const comments = [
    {
      id: '101',
      username: 'BlackTechieGirl',
      comment: ' after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    },
    {
      id: '102',
      username: 'Ada Lovelace',
      comment: ' dropped by 64%, due to initiatives like the Global Fund. But, progress slowed due to COVID-19, where 1.5 million people were infected with HIV in 2020',
      date: 'Today'
    },
    {
      id: '103',
      username: 'Mr Climate',
      comment: 'you told sub dean that you are Brilliant and you do assignment very well? There are simple requirements stated clearly and you are defending such with indeed “common sense”',
      date: 'Today'
    },
    {
      id: '104',
      username: 'Fiona',
      comment: 'cause of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    },
    {
      id: '105',
      username: 'Mr President',
      comment: ' infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    },
    {
      id: '106',
      username: 'Ryan Jones',
      comment: 'of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    },
    {
      id: '107',
      username: 'Jaymit Bahans',
      comment: ' of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
      date: 'Today'
    }
  ]

  const [viewComment, setViewComment] = useState()
  const [viewCommentId, setViewCommentId] = useState()

  const viewComments = (id) => {
    setViewComment(true)
    setViewCommentId(id)
  }

  const createPost = async() => {
    setButtonLoad(true)
    const postId = uuidv4()
    const date = "10"
    const content = userTweet

    const userData = {
      postId,
      userId,
      userName,
      date,
      content
    }

    const res= await axios.put("https://fw209u8orf.execute-api.us-east-1.amazonaws.com/post", userData);
    if (res) {
      if (parseInt(res.status) === 200) {
        setButtonLoad(false)
        setModal(false)
       console.log(res)
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

  const viewMyTweets = async() =>{
    const data = await axios.get(`https://fw209u8orf.execute-api.us-east-1.amazonaws.com/post/${userId}`)
    if (data) {
      if (parseInt(data.status) === 200) {
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




  return (

    <div style={{ margin: 0 }}>
      <div style={{ margin: 0, display: 'flex', backgroundColor: '#363062', color: '#fff', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'Smooch', fontSize: '26px', margin: '15px 150px' }}>Serverless Tweet</p>
        <ul style={{ listStyle: 'none', width: '25%', display: 'flex', justifyContent: 'space-between', marginRight: '150px', fontFamily: 'Sora' }}>
          <li onClick={() => { setModal(true) }}>Post new tweet</li>
          <li onClick={()=> {viewMyTweets()}}>View my Tweets</li>
        </ul>
      </div>
      <div style={{ width: '52%', margin: '50px auto' }}>
        <h2 style={{ margin: '0' }}>Hey {userName}, What's Happening ?</h2>
      </div>

      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box style={{ backgroundColor: '#fff', width: '40%', height: '400px', padding: '20px', position: 'relative' }}>
          <div style={{display: 'flex', justifyContent: 'end'}} onClick={()=> setModal(false)}>
            <h3 style={{cursor: 'pointer', fontSize: '18px', color: '#d9d9d9'}}>x</h3></div>
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
            <div className='butloadingButton' style={{ width: '20%', position: 'absolute', bottom: 0, right: '20px', margin: 0  }}>
              <button type="submit"><CircularProgress style={{ width: '30px', color: '#fff' }} /></button>
          `</div>
            :
            <div className='loginButton' style={{ width: '20%', position: 'absolute', bottom: '10px', right: '20px' }}>
              <button className='loginButton' onClick={()=>{createPost()}}>Tweet</button>
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
                <h5>{item.userName}</h5>
                <p>{item.content}</p>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <button className='viewbutton'
                    onClick={() => viewComments(item.postId)}
                  >view comments</button>
                  <button className='viewbutton'>Add a comment</button>
                </div>
              </div>
              {viewComment && viewCommentId == item.id ?
                item.comments ?
                  <div style={{ width: '50%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.07)', padding: '0 15px' }}>
                    <p>Comments</p>
                    {
                      comments.map((item) => {
                        return (
                          <div>
                            <hr />
                            <h5>{item.username}</h5>
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
