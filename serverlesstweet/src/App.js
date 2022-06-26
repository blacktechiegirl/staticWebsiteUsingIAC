import React from 'react'
import { useState } from 'react'
import './App.css'




const App = () => {

  const posts=[
    {
      id: '101',
      username: 'BlackTechieGirl',
      post: 'Can you identify the true facts about TB from the misinformation? TB is the second leading cause of death from infectious disease worldwide after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
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
  

  const comments=[
    {
      id: '101',
      username: 'BlackTechieGirl',
      comment :' after COVID-19. Yet, many don’t know much about it or misinformation from pop culture. Test your knowledge now',
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






  return (
    <div style={{margin: 0}}>
      <div style={{margin: 0,display:'flex', backgroundColor: '#363062',color:'#fff', justifyContent: 'space-between'}}>
        <p style={{fontFamily: 'Smooch', fontSize: '26px', margin: '15px 150px'}}>Serverless Tweet</p>
        <ul style={{listStyle: 'none', width: '25%', display:'flex', justifyContent: 'space-between', marginRight: '150px', fontFamily: 'Sora'}}>
          <li>Post new tweet</li>
          <li>View my Tweets</li>
        </ul>
      </div>
      <div style={{width: '52%', margin: '50px auto'}}>
        <h2 style={{margin:'0'}}>Hey Toyosi, What's Happening ?</h2>
      </div>

      {posts.map((item)=>{
        return(
          <div>
          <div style={{width: '50%', margin: '50px auto', backgroundColor: '#E9D5CA', borderRadius: '5px', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.07)', padding: '15px'}}>
          <h5>{item.username}</h5>
          <p>{item.post}</p>
          <div style={{display: 'flex', justifyContent: 'end'}}>
            <button
              onClick={()=>viewComments(item.id)}
            >view comments</button>
            <button>Add a comment</button>
          </div>
        </div>
        {viewComment && viewCommentId == item.id?
        item.comments?
        <div style={{width: '50%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.07)', padding: '0 15px'}}>
        <p>Comments</p>
        {
          comments.map((item)=>{
            return(
              <div>
                <hr/>
                <h5>{item.username}</h5>
                <p>{item.comment}</p>
              </div>
            )
          })
        }
        </div>: 
        <div style={{width: '50%', margin: '0 auto', backgroundColor: '#fff', boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.07)', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h4>No comments</h4>
        </div>
         
          : ''}

        </div>
      )})}
      

    </div>
  )
}


export default App;
