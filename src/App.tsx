import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeLayout } from './component/Home/HomeLayout/HomeLayout';
import PrivateRoute from './contextapi/PrivateRoute';
import { AuthProvider } from './contextapi/AuthContext';
import { FormLayout } from './component/LoginAndRegister/FormLayout/FormLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />

          <Route element={<PrivateRoute />}>
            <Route path="home" element={<HomeLayout />} />
            <Route path="vote" element={<HomeLayout />} />
            <Route path="personal-page" element={<HomeLayout />} />
            <Route path="setting" element={<HomeLayout />} />
            <Route path="create-vote" element={<HomeLayout />} />
            <Route path="comment" element={<HomeLayout />} />
            
          </Route>
          
          <Route path="detail-vote" element={<HomeLayout/>} />
          <Route path="comment" element={<HomeLayout />} />
          <Route path="logout" element={<HomeLayout />} />
          <Route path="login" element={<FormLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
