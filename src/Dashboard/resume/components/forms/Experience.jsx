import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import GlobalApi from './../../../../../service/GlobalApi'
import { Editor, EditorProvider } from 'react-simple-wysiwyg'
import {
    Toolbar,
    BtnBold,
    BtnItalic,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    Separator,
    BtnBulletList,
    BtnNumberedList
  

} from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../../service/AIModal'


//const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume and  dont add position title  and no JSON Array and give only experience result and no need for experience and return in html format without  tactics'
const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

const Experience = () => {

    const [experienceList, setExperienceList] = useState([{
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummery: ''
    }])
    const [loading,setLoading]=useState(false)
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const params=useParams()
    

    const GenerateSummeryFromAi=async (index)=>{
        setLoading(true)
        if(!resumeInfo.experience[index].title){
          toast('Please add Position Title')
          return
        }
       
        const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
       
        const result=await AIChatSession.sendMessage(prompt)
        const resp=result.response.text()
        resumeInfo.experience[index].workSummery=resp.replace('[','').replace(']','')
        setLoading(false)
      }
    
    const handleChange = (index, event) => {
        const newEntries=experienceList.slice()
        const {name,value}=event.target
        newEntries[index][name]=value
        setExperienceList(newEntries)
    }
    const AddNewExperience=()=>{
        setExperienceList(
            [...experienceList,
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                workSummery: ''
            
            }]
        )
    }

    const RemoveExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }
    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experienceList.slice()
        newEntries[index][name]=e.target.value
        setExperienceList(newEntries)
    }
    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                experience:experienceList.map(({id,...rest})=>rest)
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data)
        .then(resp=>
            {
             setLoading(false)
            toast('Details Updated')
        },(error)=>{
            setLoading(false)
            toast('Server Error,pls try again')
        })
    }
    
    useEffect(()=>{
     setResumeInfo({
        ...resumeInfo,
        experience:experienceList
    })
    },[experienceList])
    useEffect(()=>{
        resumeInfo&&setExperienceList(resumeInfo?.experience)
    },[])
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your Previous Job Experience</p>
                <div>
                    {experienceList?.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title" 
                                    defaultValue={item?.title}
                                    onChange={(event) => handleChange(index,event)}></Input>
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName" 
                                    defaultValue={item?.companyName}
                                    onChange={(event) => handleChange(index, event)}></Input>
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city" 
                                    defaultValue={item?.city}
                                    onChange={(event) => handleChange(index, event)}></Input>
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state" 
                                    defaultValue={item?.state}
        
                                    onChange={(event) => handleChange(index, event)}></Input>
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type='date' 
                                    defaultValue={item?.startDate}
                                    name="startDate" onChange={(event) => handleChange(index, event)}></Input>
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type='date' 
                                    defaultValue={item?.endDate}
                                    
                                    name="endDate" onChange={(event) => handleChange(index, event)}></Input>
                                </div>
                                <div className='col-span-2'>
                                <div className='flex justify-between my-2'> 
        <label className='text-base font-bold'>Summery</label>
        <Button variant='outline' 
        size='sm'
        disabled={loading}

        onClick={()=>GenerateSummeryFromAi(index)}
        className='flex gap-2 border-primary text-primary'>
        {
          loading?<LoaderCircle className='animate-spin'/>: <>
          <Brain className='h-4 w-4'/>Generate from AI
          </> 
          }
         </Button>
       </div>
    <EditorProvider>
        <Editor className='text-xs' 
        defaultValue={item?.workSummery}
        name='workSummery' value={experienceList[index].workSummery} 
        onChange={(e)=>{
          handleRichTextEditor(e,'workSummery',index)
        }}>
    <Toolbar>
    <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <BtnBulletList/>
          <BtnNumberedList/>
        
      
    </Toolbar>
        </Editor>
    </EditorProvider>
 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-between'>
                    <div className='flex gap-2'>
                    <Button variant='outline' onClick={AddNewExperience} className='text-primary'>+ Add More Experience</Button>
                    <Button variant='outline' onClick={RemoveExperience} className='text-primary'>- Remove</Button>
                        
                    </div>
                    <Button disabled={loading} onClick={()=>onSave()} size='sm'>
                        {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                    </Button>
                </div>

        </div>
    )
}

export default Experience
