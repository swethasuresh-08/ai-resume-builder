
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/clerk-react"
import { Link, useParams } from "react-router-dom"
import Header from "@/components/custom/Header"
import ResumePreview from "@/Dashboard/resume/components/ResumePreview"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useEffect, useState } from "react"
import GlobalApi from "./../../../../service/GlobalApi"
import { RWebShare } from "react-web-share"

const ViewResume = () => {
  const [resumeInfo,setResumeInfo]=useState()
  const {resumeId}=useParams()
  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeId).then((resp)=>{
      setResumeInfo(resp.data.data.attributes)
    })
  }
  const HandleDownload=()=>{
    window.print()
  }
  useEffect(()=>{
    GetResumeInfo()
  },[])
  return(  
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div id='no-print'>

    <Header />
    <div className="my-10 mx-10 md:mx-20 lg:mx-36">
      <h2 className="text-center text-2xl font-medium">Congrats! Your Ultimate AI Generated Resume is Ready</h2>
     <p className="text-center text-gray-400">Now you are ready to download your resume and you can share your unique resume url with friends and recruiters </p>
      <div className="flex justify-between px-44 my-10">
        <Button onClick={HandleDownload}>DownLoad</Button>
        <RWebShare
        data={{
          text: "Hello, Everyone, This is my resume please open the url to see",
          url: import.meta.env.VITE_BASE_URL+'/my-resume/'+resumeId+'/view',
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+' Resume',
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button>Share 🔗</Button>
      </RWebShare>
      </div>
    </div>
    </div>
   
    <div id="print-area">
        <ResumePreview/>
      </div>
   
    </ResumeInfoContext.Provider> 
    )
}

export default ViewResume
