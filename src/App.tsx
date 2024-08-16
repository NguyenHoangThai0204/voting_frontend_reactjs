import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeLayout } from './component/Home/HomeLayout/HomeLayout';

import { AuthProvider } from './contextapi/AuthContext';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="home" element={<HomeLayout />} />
        <Route path="vote" element={<HomeLayout/>}/>
        <Route path="logout" element={<HomeLayout />} />
        <Route path="login" element={<HomeLayout />} />
        <Route path="comment" element={<HomeLayout />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider> 
    
  );
}

export default App;
