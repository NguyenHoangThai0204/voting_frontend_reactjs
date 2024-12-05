import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomeLayout } from './component/Home/HomeLayout/HomeLayout';
import PrivateRoute from './contextapi/PrivateRoute';
import { AuthProvider } from './contextapi/AuthContext';
import { FormLayout } from './component/LoginAndRegister/FormLayout/FormLayout';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route element={<PrivateRoute />}>
            <Route path="home" element={<HomeLayout />} />
            <Route path="poll" element={<HomeLayout />} />
            <Route path="personal-page" element={<HomeLayout />} />
            <Route path="setting" element={<HomeLayout />} />
            <Route path="create-poll" element={<HomeLayout />} />
            <Route path="home/getUserByid" element={<HomeLayout />} />
          </Route>
          <Route path="detail-poll/:id" element={<HomeLayout />} />
          <Route path="thenew" element={<HomeLayout />} />
          <Route path="instruction" element={<HomeLayout />} />
          <Route path="logout" element={<HomeLayout />} />
          <Route path="login" element={<FormLayout formType={'login'} onLoginClick={function (): void {
            throw new Error('Function not implemented.');
          }} onSignUpClick={function (): void {
            throw new Error('Function not implemented.');
          }} onCloseForm={function (): void {
            throw new Error('Function not implemented.');
          }} />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
