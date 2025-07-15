import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Separator
} from '@radix-ui/react-dropdown-menu'
import { Menu, School, Sheet as SheetIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar';
import DarkMode from '@/DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from './ui/sheet';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/feature/api/authapi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';



const Navbar = () => {
    const {user}=useSelector(store=>store.auth);
    const[logoutUser,{data,isSuccess}]=useLogoutUserMutation();
    const navigate=useNavigate();
    const handleLogout=async()=>{
        await logoutUser();
    };
    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message||"user logged out")
            navigate("/login");
        }
    },[isSuccess, data, navigate])
   console.log(user);
    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-gray-800 border-b-gray-200 fixed top-0 right-0 left-0  shadow-sm duration-300 z-10'>
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center'>
                <div className='flex items-center gap-2 pt-2'>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>E-learning</h1>
                </div>
                <div className='flex  items-center gap-8 text-xl'>{
                    user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="top-1.5">
                                    <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56 p-4 shadow-lg rounded-2xl mt-2 flex flex-col gap-y-2 ' align='center' >
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem> <Link to="my-learning">MyLearning</Link></DropdownMenuItem>
                                <DropdownMenuItem> <Link to="/profile">Edit Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>) : (
                        <div className='flex items-center gap-2 top-2 pt-2'>
                            <Button variant="Outline">Sign-up</Button>
                            <Button>Login</Button>
                        </div>
                    )}
                    <DarkMode className="top-1.5" />

                </div>
            </div>


            {/* mobile device */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'>E-Learning</h1>
                <MobileNavbar />

            </div>

        </div>
    )
}

export default Navbar



const MobileNavbar = () => {
     const role="instructor"
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size='icon' className="rounded-full bg-gray-200">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="slide-in-from-end flex flex-col" >
                <SheetHeader className="flex flex-row justify-between items-center mt-5">
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr-2'/>
                 <nav className='flex flex-col space-y-4 px-5'>
                    <span>Mylearning</span>
                    <span>Edit-Profile</span>
                    <p>log-Out</p>
                 </nav>
                 {
                    role==="instructor" && (
                <SheetFooter>
                    <Button type="submit" className="bg-amber-900">Dashboard</Button>
                </SheetFooter>

                    )
                 }
                    <SheetClose asChild className="mb-3">
                        <Button variant="outline">Close</Button>
                    </SheetClose>
            </SheetContent>
        </Sheet>
    )
}

