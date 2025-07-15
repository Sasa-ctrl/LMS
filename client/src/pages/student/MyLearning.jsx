import React from 'react'
import Course from './Course';

const MyLearning = () => {
    const isLoading=false;
    const MylearningCourses=[1,2];
  return (
    <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
      <h1 className='font-bold text-2xl'>
        MyLearning
      </h1>
      <div className='my-5'>
        {
            isLoading?(<MyLearningSkeleton/>):MylearningCourses.length===0?(<p>you are not enrolled in any course</p>):
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

                {[1,2,3,4].map((course,index)=><Course key={index}/>)}
            </div>
        
        }
      </div>
    </div>
  )
}

export default MyLearning

const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse flex space-x-4 bg-white p-4 rounded-lg shadow">
          <div className="rounded bg-gray-300 h-20 w-20" />
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};








