import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './index.css'
import { Suspense } from 'react'
import Login from './pages/user/LoginRegisterForm'
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import EditProfile from './pages/user/EditProfile'
import NotFound from './pages/404'
import AdminPanel from './pages/admin/adminPanel'

import { ProtectedRoute } from './components/protectedRoute'
import { PublicRoute } from './components/publicRoute'
import { AdminProtectedRoute } from './components/AdminProtectedRoute'
import { Toaster } from 'sonner'
import {  useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { fetchUserProfile } from './services/fetchUserProfile'; // API that hits backend

import { setUser } from './context/userSlice'
import AddUserForm from './pages/admin/addUser'
import EditUser from './pages/admin/editUser'



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    
      fetchUserProfile()
        .then(userData => {
          dispatch(setUser(userData));
          console.log("User data fetched and stored in Redux:", userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          console.log(error.message)
        });
    
  }, []); 
  
  return (
    
    <BrowserRouter>
    <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/authForm" element={
          <PublicRoute>
          <Login />
          </PublicRoute>  
          } />
        <Route path="/" element={
          <ProtectedRoute>
         <Suspense fallback={'loading'}>
          <Home/>
        </Suspense>
          </ProtectedRoute>
         } />
        <Route path="/profile" element={
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
          } />
        <Route path="/editProfile" element={
          <ProtectedRoute>
          <EditProfile />
          </ProtectedRoute>
          } />
        <Route path='/adminDashboard' element={
         <AdminProtectedRoute>
          <AdminPanel />
         </AdminProtectedRoute>
          }  />
        
        <Route path='/addUser' element={
          <AdminProtectedRoute>
          <AddUserForm />
          </AdminProtectedRoute>
        } />
        <Route path='/editUser/:userId' element={
          <AdminProtectedRoute>
          <EditUser/>
          </AdminProtectedRoute>
        } />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
