import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const Skills = () => {
    const [loading,setLoading]=useState(false)
    const {resumeId}=useParams()
    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice()
        newEntries[index][name]=value
        setSkillsList(newEntries)
    }
    const AddNewSkill=()=>{
        setSkillsList([
            ...skillsList,
            {
                name:'',
                rating:0
            }
        ])
    }
    const RemoveSkill=()=>{
         setSkillsList(skillsList=>skillsList.slice(0,-1))
    }
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                skills:skillsList.map(({id,...rest})=>rest)
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp)
            setLoading(false)
            toast('Details Uploaded Successfully')
        },(error)=>{
            setLoading(false)
            toast('Server Error,Try Again')
        })
        
    }
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
    },[])
    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
    return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add your top Professional key skills & Rate them</p>
        <div>
            {
                skillsList?.map((skill,index)=>(
                    <div key={index}
                    className='flex justify-between border rounded-lg p-3 mb-2'
                    >
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className='w-full' 
                            defaultValue={skill.name}
                            onChange={(e)=>handleChange(index,'name',e.target.value)}/>
                        </div>
                        <Rating style={{ maxWidth: 150 }} value={skill.rating} onChange={(v)=>handleChange(index,'rating',v)} />
                    </div>
                ))
            }
        </div>
                        <div className='flex justify-between my-2'>
                            <div className='flex gap-2 '>
                                <Button variant='outline' onClick={AddNewSkill} className='text-primary'>+ Add More Skill</Button>
                                <Button variant='outline' onClick={RemoveSkill} className='text-primary'>- Remove</Button>
                            </div>
                            <Button disabled={loading} onClick={() => onSave()} size='sm'>
                                {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                            </Button>
                        </div>
        
    </div>
  )
}

export default Skills
