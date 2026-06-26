import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Tools from "./pages/Tools.jsx";
import Conditions from "./pages/Conditions.jsx";
import Resources from "./pages/Resources.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";

export default function App() {
  const [lang, setLang] = useState("ES");
  return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", background:"#F5F7FF", fontFamily:"Plus Jakarta Sans, sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <Navbar lang={lang} setLang={setLang}/>
      <div style={{flex:1}}>
        <Routes>
          <Route path="/" element={<Home lang={lang}/>}/>
          <Route path="/tools" element={<Tools lang={lang}/>}/>
          <Route path="/conditions" element={<Conditions lang={lang}/>}/>
          <Route path="/resources" element={<Resources lang={lang}/>}/>
          <Route path="/blog" element={<Blog lang={lang}/>}/>
          <Route path="/about" element={<About lang={lang}/>}/>
        </Routes>
      </div>
      <Footer lang={lang}/>
    </div>
  );
}
