import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'

const FormSection = () => {
  const [activeFormIndex,setActiveFormIndex]=useState(1)
  const [enabledNext,setEnableNext]=useState(true)
  const {resumeId}=useParams()
  return (
    <div>
      <div className='flex justify-between items-center'> 
        <div className='flex gap-5'>
          <Link to={'/dashboard'}>
          <Button><Home/></Button> 
          </Link>
         <ThemeColor/>
        </div>
        <div className='flex gap-2'>
          {
            activeFormIndex>1&&<Button size='sm'
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}
            ><ArrowLeft/></Button>
          }
          <Button 
          disabled={!enabledNext}
          className='flex gap-2' 
          size='sm'
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          >Next
            <ArrowRight/>
          </Button>
        </div>
      </div>
      {/* Personal Details */}
     {activeFormIndex==1? <PersonalDetails enabledNext={(v)=>setEnableNext(v)}/>:
      activeFormIndex==2?<Summery enabledNext={(v)=>setEnableNext(v)}/>:
      activeFormIndex==3?<Experience enabledNext={(v)=>setEnableNext(v)}/>:
      activeFormIndex==4?<Education enabledNext={(v)=>setEnableNext(v)}/>:
      activeFormIndex==5?<Skills enabledNext={(v)=>setEnableNext(v)}/>:
      activeFormIndex==6?<Navigate to={'/my-resume/'+resumeId+'/view'}/>:null
}
      {/* Summary */}

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}
    </div>
  )
}

export default FormSection
