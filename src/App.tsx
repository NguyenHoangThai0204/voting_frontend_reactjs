import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeLayout } from './component/Home/HomeLayout/HomeLayout';
import { ContentHome } from './component/Screens/ContentHome/ContentHome';
import { ContentSetting } from './component/Screens/ContentSetting/ContentSetting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
