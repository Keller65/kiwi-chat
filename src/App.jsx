import Login from "./components/Login";
import Chat from "./components/Chat"
import Avatars from "./components/Avatars";
import { useAuth } from './components/context/AuthContext';
import { Routes, Route } from 'react-router-dom';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Chat /> : <Login />} />
      <Route path="/Avatars" element={<Avatars />} />
      <Route path="/Chat" element={<Chat />} />
    </Routes>
  )
}

export default App