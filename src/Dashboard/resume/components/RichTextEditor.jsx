import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useState } from 'react'
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
import { AIChatSession } from './../../../../service/AIModal'
import { toast } from 'sonner'

const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume and  dont add position title  and no JSON Array and give only experience result and no need for experience and return in html format without  tactics'
function RichTextEditor({onRichTextEditorChange,index}) {
    const [value,setValue]=useState()
    //const newData=[]
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false)
    const GenerateSummeryFromAi=async ()=>{
      setLoading(true)
      if(!resumeInfo.experience[index].title){
        toast('Please add Position Title')
        return
      }
     
      const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
     
      const result=await AIChatSession.sendMessage(prompt)
      const resp=result.response.text()
      setValue(resp.replace('[','').replace(']',''))
      setLoading(false)
    }
 
  return (
    <div>
      <div className='flex justify-between my-2'> 
        <label className='text-base font-bold'>Summery</label>
        <Button variant='outline' 
        size='sm'
        disabled={loading}
        onClick={GenerateSummeryFromAi}
        className='flex gap-2 border-primary text-primary'>
        {
          loading?<LoaderCircle className='animate-spin'/>: <>
          <Brain className='h-4 w-4'/>Generate from AI
          </> 
          }
         </Button>
       </div>
    <EditorProvider>
        <Editor className='text-xs' value={value} 
        onChange={(e)=>{
          setValue(e.target.value)
          onRichTextEditorChange(e)
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
  )
}

export default RichTextEditor
