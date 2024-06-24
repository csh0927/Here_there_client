import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import MyPage from "@/pages/MyPage";
import MyReview from "@/pages/MyReview";
import SearchPage from "@/pages/SearchPage";
import PostPage from "@/pages/PostPage";
import ReviewPage from "@/pages/ReviewPage";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/mypage" element={<MyPage />}/>
        <Route path="/my-reviews" element={<MyReview />}/>
        <Route path="/search" element={<SearchPage />}/>
        <Route path="/page/:id" element={<PostPage />}/>
        <Route path="/review" element={<ReviewPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
