import React from 'react'
import Uq from '../components/Tems'

export default function AboutPage() {
  return (
    <div className='min-h-screen'>
        <Uq/>
        <About/>
        
    </div>
  )
}

function About (){
    return (
        <div>
            <h2 className='font-semibold'>About</h2>
            <p className='text-sm prose'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cum neque possimus odit voluptates assumenda magnam dolorum id minus aliquam magni temporibus, quidem officiis facilis quisquam repellendus iure ad provident.</p>
        </div>
    )
}

function EduTL(children: React.ReactNode) {
    return (
        <div className='relative'>
            {children}
        </div>
    )
}