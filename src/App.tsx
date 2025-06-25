import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import { ThemeProvider } from "@/components/utils/theme-provider"
import { Toaster } from "./components/ui/sonner";
import Attributes from "./pages/Attributes/Attributes";
import Games from "./pages/Games/Games";
import Slots from "./pages/Slots/Slots";
import Roulette from "./pages/Roulette/Roulette";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/attributes" element={<Attributes />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/slots" element={<Slots />} />
            <Route path="/games/roulette" element={<Roulette />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}