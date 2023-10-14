import { useEffect } from 'react';
import ErrorPage from './views/ErrorPage/ErrorPage';
import NewChat from './views/NewChat/NewChat';
import Chat from './views/Chat/Chat';
import { Routes, Route, useNavigate } from 'react-router-dom';

const RedirectToNew = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/new');
  }, [navigate]);

  return null;
}

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<RedirectToNew />} />
      <Route path="/new" element={<NewChat />} />
      <Route path="/chat" element={<Chat />} />

      {/* catch all */}
      <Route path="*" element={<ErrorPage error="404" />} />
    </Routes>
  );
}

export default App;