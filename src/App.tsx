
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import Summary from "./pages/Summary";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Login />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/signup" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Signup />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/dashboard" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Dashboard />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/questionnaire" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Questionnaire />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/summary/:sessionId" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Summary />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/history" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <History />
                </div>
                <Footer />
              </div>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <NotFound />
                </div>
                <Footer />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
