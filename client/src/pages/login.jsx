import React, { useState } from 'react'
import { AppWindowIcon, CodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const Login = () => {
  const [signUpInput, setSignupInput] = useState({ name: "", email: '', password: "" });
  const [loginInput, setloginInput] = useState({ email: '', password: "" });
  const onchangeInput=(e,type)=>{
    const {name,value}=e.target;
    if (type==="signUp"){
      setSignupInput({...signUpInput,[name]:value});
    }else{
      setloginInput({...loginInput,[name]:value});
    }
  }

  const handleRegistration=(type)=>{
      const Inputdata = type === "signUp" ? signUpInput : loginInput
      console.log(Inputdata);
      
  }
  return (
    <div className="flex w-full  justify-center items-center  gap-6">
      <Tabs defaultValue="SignUp">
        <TabsList>
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
          <TabsTrigger value="LogIn">LogIn</TabsTrigger>
        </TabsList>
        <TabsContent value="SignUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                register yourself using the proper gmail account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input 
                type="text"
                 placeholder="E.g Sabiha" 
                 required="true"
                 onChange={(e)=>{onchangeInput(e,"signUp")}}
                 name="name"
                 value={signUpInput.name}
                 />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">email</Label>
                <Input 
                type="email"
                placeholder="E.g Sabiha@gmail.com" 
                 required="true"
                 onChange={(e)=>{onchangeInput(e,"signUp")}}
                 name="email"
                 value={signUpInput.email}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input 
                type="password" 
                placeholder="xyz" 
                required="true" 
                onChange={(e)=>{onchangeInput(e,"signUp")}}
                 name="password"
                 value={signUpInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=>handleRegistration("signUp")}>SignUp</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="LogIn">
          <Card>
            <CardHeader>
              <CardTitle>LogIn</CardTitle>
              <CardDescription>
                login with email and password and gett he access of the website
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">email</Label>
                <Input 
                type="email"
                placeholder="E.g Sabiha@gmail.com" 
                required="true"
                onChange={(e)=>{onchangeInput(e,"logIn")}}
                name="email"
                value={loginInput.email}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input 
                type="password" 
                placeholder="xyz" 
                required="true"
                onChange={(e)=>{onchangeInput(e,"logIn")}}
                 name="password"
                 value={loginInput.password}
                 />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=>handleRegistration("logIn")}>Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login
