import React, { useState } from 'react'
import '../css/gg.css'
import quiz1 from "../images/search_3277438.png"
import study from "../images/education_3181724.png"
import video from "../images/video_7214114.png"
import walkthrough from "../images/team_9068396.png"
import Quiz from './Quiz'
export default function Popup() {
    const [quiz, setquiz] = useState(false)
  return (
    
    <div className="popup">
       <div className="tip" style={{marginTop:"20px"}}>Learn about Basics of Finance</div> 
      {!quiz?
      <div className="edu">
        
        <div className="popcard" id="study">
            <img style={{height:"120px" ,marginBottom:"20px"}} src={study} alt="" />
            <div className="poptext">Learn and Study</div>
        </div>
        <div className="popcard" id="quiz" onClick={()=>{setquiz(true)}}>
            <img style={{height:"120px",marginBottom:"20px"}} src={quiz1} alt="" />
            <div className="poptext">Take Quiz</div>
        </div>
        <div className="popcard" id="walk">
            <img style={{height:"120px" ,marginBottom:"20px"}} src={walkthrough} alt="" />
            <div className="poptext">Walkthrough</div>
        </div>
        <div className="popcard" id="video">
            <img style={{height:"120px" ,marginBottom:"20px"}} src={video} alt="" />
            <div className="poptext">Video Tutorials</div>
        </div>
        </div>:<Quiz   />}
      </div>
  )
}
