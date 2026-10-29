import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Systems from "./Pages/Systems";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TransitionWrapper from "./components/TransitionWrapper";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import { BootProvider } from "./components/Boot";

const App = () => {
  return (
    <BootProvider>
      <TransitionWrapper>
        <div className="scanlines">
          <a
            href="#content"
            className="sr-only-focusable t-label fixed top-3 left-3 z-[95] bg-phos px-4 py-3 text-void"
          >
            Skip to content
          </a>
          <Header />
          <SmoothScroll>
            <div id="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/systems" element={<Systems />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </SmoothScroll>
        </div>
        <Cursor />
      </TransitionWrapper>
    </BootProvider>
  );
};

export default App;
