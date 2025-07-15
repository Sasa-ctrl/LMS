import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';


const Herosection = () => {
  return (
    <div className='relative bg-gradient-to-r from-blue-500 to-indigo-800 dark:from-gray-700 dark:to-gray-950 py-20 px-4 text-center flex justify-center'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-white text-4xl font-bold mb-4'> find the best courses for you</h1>
        <p className='text-gray-200 dark:text-gray-400 mb-8'>Discover,learn And upskill with our wide range of courses</p>
      <form action="" className='flex items-center overflow-hidden dark:text-gray-500 shadow-lg rounded-full max-w-full mx-auto mb-6'>
        <Input type="text" className="bg-white flex border-none focus-visible:ring-0 px-6 py-3 text-gray-900"/>
        <Button className="bg-blue-600 dark:bg-gray-950 hover:bg-blue-800 dark:hover:bg-gray-400 text-white px-6 py-3 rounded-r-full">Search</Button>
      
      </form>
      <Button className="bg-white dark:bg-gray-500 text-blue-600 dark:text-gray-950 hover:bg-gray-500 dark:hover:bg-gray-200 rounded-full text-lg">Explore Courses</Button>
      
      </div>
    </div>
  )
}

export default Herosection














