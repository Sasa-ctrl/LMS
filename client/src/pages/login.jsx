import React, { useState, useEffect } from 'react'
import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react"
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
import { useLoginUserMutation, useRegisterUserMutation } from '@/feature/api/authapi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [signUpInput, setSignupInput] = useState({ name: "", email: '', password: "" });
  const [loginInput, setloginInput] = useState({ email: '', password: "" });
  const [registerUser, { data: RegisterData, error: RegisterError, isLoading: RegisterisLoading, isSuccess: RegisterisSuccess }] = useRegisterUserMutation();
  const [LoginUser, { data: LoginData, error: LoginError, isLoading: LoginisLoading, isSuccess: LoginisSuccess }] = useLoginUserMutation();
  const Navigate=useNavigate();

  const onchangeInput = (e, type) => {
    const { name, value } = e.target;
    if (type === "signUp") {

      setSignupInput({ ...signUpInput, [name]: value });
    } else {
      setloginInput({ ...loginInput, [name]: value });
    }
  }

  const handleRegistration = (type) => {
    const Inputdata = type === "signUp" ? signUpInput : loginInput;
    const action = type === "signUp" ? registerUser : LoginUser;
    action(Inputdata);
  }


  useEffect(() => {
    if (RegisterisSuccess && RegisterData) {
      toast.dismiss();
      toast.success(RegisterData.message || "sign-up succesfull");
    }
    if (RegisterError) {
      toast.dismiss();
      toast.error(RegisterError?.data?.message || "Sign-up failed");
    }

    if (LoginisSuccess && LoginData) {
      toast.dismiss();
      toast.success(LoginData.message || "login succesfull");
      Navigate("/")
    }
    if (LoginError) {
      toast.dismiss();
      toast.error(LoginError?.data?.message || "login failed");
    }

  }, [LoginisLoading, RegisterisLoading, LoginData, RegisterData, LoginError, RegisterError, RegisterisSuccess, LoginisSuccess, Navigate])

  return (
    <div className="flex w-full  justify-center items-center  gap-6 mt-20">

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
                  required
                  onChange={(e) => { onchangeInput(e, "signUp") }}
                  name="name"
                  value={signUpInput.name}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">email</Label>
                <Input
                  type="email"
                  placeholder="E.g Sabiha@gmail.com"
                  required
                  onChange={(e) => { onchangeInput(e, "signUp") }}
                  name="email"
                  value={signUpInput.email}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input
                  type="password"
                  placeholder="xyz"
                  required
                  onChange={(e) => { onchangeInput(e, "signUp") }}
                  name="password"
                  value={signUpInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={RegisterisLoading}
                onClick={() => handleRegistration("signUp")}>
                {
                  RegisterisLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin'>please wait</Loader2>
                    </>
                  ) : "signUp"
                }
              </Button>
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
                  required
                  onChange={(e) => { onchangeInput(e, "logIn") }}
                  name="email"
                  value={loginInput.email}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input
                  type="password"
                  placeholder="xyz"
                  required
                  onChange={(e) => { onchangeInput(e, "logIn") }}
                  name="password"
                  value={loginInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={LoginisLoading}
                onClick={() => handleRegistration("logIn")}>
                {
                  LoginisLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin'>please wait</Loader2>
                    </>
                  ) : "login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login
