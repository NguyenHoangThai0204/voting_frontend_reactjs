import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeLayout } from './component/Home/HomeLayout/HomeLayout';
// import { ContentHome } from './component/Screens/ContentHome/ContentHome';
// import { ContentSetting } from './component/Screens/ContentSetting/ContentSetting';
import { AuthProvider } from './contextapi/AuthContext';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="home" element={<HomeLayout />} />
        <Route path="settings" element={<HomeLayout/>}/>
        <Route path="profile" element={<HomeLayout />} />
        <Route path="login" element={<HomeLayout />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
