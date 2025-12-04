import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Dashboard } from "./components/Dashboard";
import { BibleReader } from "./components/BibleReader";
import { LectureSession } from "./components/LectureSession";
import { AdminEnhanced } from "./components/AdminEnhanced";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ForgotPassword } from "./components/ForgotPassword";
import { AIChatbot } from "./components/AIChatbot";
import { ViewProgress } from "./components/ViewProgress";
import { MyCollections } from "./components/MyCollections";
import { ContinueReading } from "./components/ContinueReading";
import { RecentlyViewed } from "./components/RecentlyViewed";
import { PersonalPage } from "./components/PersonalPage";
import { Settings } from "./components/Settings";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { NotificationProvider } from "./contexts/NotificationContext";

type Page = 'home' | 'read' | 'dashboard' | 'lecture' | 'admin' | 'auth' | 'chatbot' | 'progress' | 'collections' | 'continue' | 'recent' | 'profile' | 'settings';
type AuthMode = 'login' | 'signup' | 'forgot-password';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isAuthenticated } = useAuth();

  const navigateTo = (page: Page) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Small delay for smooth transition
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 150);
  };

  const navigateHome = () => navigateTo('home');
  const navigateToRead = () => navigateTo('read');
  const navigateToDashboard = () => {
    if (isAuthenticated) {
      navigateTo('dashboard');
    } else {
      navigateToAuth();
    }
  };
  const navigateToLecture = () => {
    if (isAuthenticated) {
      navigateTo('lecture');
    } else {
      navigateToAuth();
    }
  };
  const navigateToChatbot = () => {
    if (isAuthenticated) {
      navigateTo('chatbot');
    } else {
      navigateToAuth();
    }
  };
  const navigateToAdmin = () => {
    if (isAuthenticated) {
      navigateTo('admin');
    } else {
      navigateToAuth();
    }
  };
  const navigateToAuth = () => {
    setAuthMode('login');
    navigateTo('auth');
  };
  
  const navigateToProfile = () => {
    if (isAuthenticated) {
      navigateTo('profile');
    } else {
      navigateToAuth();
    }
  };
  
  const navigateToSettings = () => {
    if (isAuthenticated) {
      navigateTo('settings');
    } else {
      navigateToAuth();
    }
  };

  const handleLoginSuccess = () => {
    navigateTo('dashboard');
  };

  const handleSignupSuccess = () => {
    navigateTo('dashboard');
  };

  // Add fade effect on page transitions
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.remove('opacity-0');
      mainContent.classList.add('opacity-100');
    }
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        currentPage={currentPage}
        onNavigateHome={navigateHome}
        onNavigateToRead={navigateToRead}
        onNavigateToDashboard={navigateToDashboard}
        onNavigateToLecture={navigateToLecture}
        onNavigateToAdmin={navigateToAdmin}
        onNavigateToAuth={navigateToAuth}
        onNavigateToChatbot={navigateToChatbot}
        onNavigateToProfile={navigateToProfile}
        onNavigateToSettings={navigateToSettings}
      />
      
      <div 
        id="main-content"
        className={`flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {currentPage === 'home' && (
          <HomePage 
            onNavigateToRead={navigateToRead}
            onNavigateToDashboard={navigateToDashboard}
          />
        )}

        {currentPage === 'read' && (
          <main className="bg-background min-h-[calc(100vh-4rem)]">
            <div className="container mx-auto px-4 py-8">
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
                <h1 className="mb-3">Read & Study Scripture</h1>
                <p className="text-muted-foreground max-w-3xl">
                  Select a Bible version, navigate to any book and chapter, then click on any verse to get AI-powered insights and notes.
                </p>
              </div>
              
              <BibleReader />
            </div>
          </main>
        )}

        {currentPage === 'dashboard' && (
          <Dashboard 
            onNavigateToRead={navigateToRead}
            onNavigateToProgress={() => navigateTo('progress')}
            onNavigateToCollections={() => navigateTo('collections')}
            onNavigateToContinue={() => navigateTo('continue')}
            onNavigateToRecent={() => navigateTo('recent')}
            onNavigateToChatbot={() => navigateTo('chatbot')}
          />
        )}

        {currentPage === 'lecture' && (
          <LectureSession />
        )}

        {currentPage === 'admin' && (
          <AdminEnhanced />
        )}

        {currentPage === 'auth' && (
          <>
            {authMode === 'login' ? (
              <Login 
                onSwitchToSignup={() => setAuthMode('signup')}
                onLoginSuccess={handleLoginSuccess}
                onForgotPassword={() => setAuthMode('forgot-password')}
              />
            ) : authMode === 'signup' ? (
              <Signup 
                onSwitchToLogin={() => setAuthMode('login')}
                onSignupSuccess={handleSignupSuccess}
              />
            ) : (
              <ForgotPassword 
                onBackToLogin={() => setAuthMode('login')}
              />
            )}
          </>
        )}

        {currentPage === 'chatbot' && <AIChatbot />}
        
        {currentPage === 'progress' && <ViewProgress />}
        
        {currentPage === 'collections' && <MyCollections />}
        
        {currentPage === 'continue' && <ContinueReading />}
        
        {currentPage === 'recent' && <RecentlyViewed />}
        
        {currentPage === 'profile' && <PersonalPage />}
        
        {currentPage === 'settings' && <Settings />}
      </div>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}