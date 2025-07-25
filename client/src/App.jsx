
import './App.css'

import Login from './pages/login';
import Navbar from './components/Navbar';

import Herosection from './pages/student/Herosection';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mainlayout from './layout/mainlayout';
import Courses from './pages/student/Courses';
import MyLearning from './pages/student/MyLearning';
import Profile from './pages/student/Profile';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element:
          (<>
            <Herosection />
            <Courses/>
          </>),
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <Profile />
      },

    ]
  }
])
function App() {
  return (
    <main>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </main>
  );
}


export default App
