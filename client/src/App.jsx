import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import CreatePage from './scenes/createPage';
import ProfilePage from "./scenes/profilePage";
import PostPage from "./scenes/postPage";
import FeedPage from "./scenes/feedPage";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (<div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/create" element={ isAuth ? <CreatePage /> : <Navigate to="/login"/>}/>
        <Route path="/create/item" element={ isAuth ? <CreatePage isItem /> : <Navigate to="/login"/>}/>
        <Route path="/create/:draftId" element={ isAuth ? <CreatePage isDraft/> : <Navigate to="/login"/>}/>
        <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}/>
        <Route path="/post/:postId" element={isAuth ? <PostPage /> : <Navigate to="/login" />}/>
        <Route path="/feed" element={ isAuth ? <FeedPage /> : <Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  </div>)
};

export default App;


