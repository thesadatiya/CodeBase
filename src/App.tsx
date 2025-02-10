import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignIn from "./components/auth/SignIn";
import PricingPage from "./components/marketing/PricingPage";
import ChatHistory from "./components/dashboard/ChatHistory";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={<ChatHistory />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
