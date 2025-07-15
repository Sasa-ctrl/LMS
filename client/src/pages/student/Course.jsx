import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from'@/components/ui/avatar'
import React from 'react'
import { Badge } from '@/components/ui/badge'


const Course = () => {
    return (
        <div className='py-1'>
            <Card className="overflow-hidden rounded-lg dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale--105 transition-all duration-300">
                <div className='relative w-full h-36 py-0'>
                    <img src='https://www.hamedbahram.io/images/courses/nextjs/course.png'
                        alt='course'
                        className='w-full h-36 object-cover rounded-t-lg py-0 -translate-y-6' />

                </div>
                <CardContent>
                    <h1 className='hover:underline truncate font-bold text-lg -translate-y-6'>Nextjs Course Complete In hindi 2024</h1>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className='font-medium text-sm'>sabiha mernstack</h1>

                        </div>
                        <Badge className='bg-blue-600 text-white px-2 py-1 text-xs rounded-full'>
                             Advance
                        </Badge>
                    </div>
                    <div className='text-lg font-bold mt-2'>
                        <span>₹499</span>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Course
