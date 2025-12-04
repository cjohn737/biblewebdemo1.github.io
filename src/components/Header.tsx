import { Search, Home, LayoutDashboard, BookOpen, User, LogOut, Settings, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  currentPage: 'home' | 'read' | 'dashboard' | 'lecture' | 'admin' | 'auth' | 'chatbot' | 'progress' | 'collections' | 'continue' | 'recent' | 'profile' | 'settings';
  onNavigateHome: () => void;
  onNavigateToRead: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLecture: () => void;
  onNavigateToAdmin: () => void;
  onNavigateToAuth: () => void;
  onNavigateToChatbot: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSettings?: () => void;
}

export function Header({ 
  currentPage, 
  onNavigateHome, 
  onNavigateToRead, 
  onNavigateToDashboard,
  onNavigateToLecture,
  onNavigateToAdmin,
  onNavigateToAuth,
  onNavigateToChatbot,
  onNavigateToProfile,
  onNavigateToSettings
}: HeaderProps) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigateHome();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={onNavigateHome}>
            <Logo className="w-8 h-8 flex-shrink-0" />
            <span className="font-medium">Bible Nation</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 flex-1">
            <Button 
              variant={currentPage === 'home' ? 'secondary' : 'ghost'}
              onClick={onNavigateHome}
              size="sm"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>

            <Button 
              variant={currentPage === 'read' ? 'secondary' : 'ghost'}
              onClick={onNavigateToRead}
              size="sm"
            >
              Read
            </Button>

            {isAuthenticated && (
              <>
                <Button 
                  variant={currentPage === 'chatbot' ? 'secondary' : 'ghost'}
                  onClick={onNavigateToChatbot}
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Chat
                </Button>

                <Button 
                  variant={currentPage === 'lecture' ? 'secondary' : 'ghost'}
                  onClick={onNavigateToLecture}
                  size="sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Lectures
                </Button>

                <Button 
                  variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
                  onClick={onNavigateToDashboard}
                  size="sm"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>

                {isAdmin && (
                  <Button 
                    variant={currentPage === 'admin' ? 'secondary' : 'ghost'}
                    onClick={onNavigateToAdmin}
                    size="sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
              </>
            )}
            
            <div className="relative flex-1 max-w-md ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search scriptures..."
                className="pl-9 h-9"
              />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant={currentPage === 'home' ? 'secondary' : 'ghost'}
              onClick={onNavigateHome}
              size="sm"
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button 
              variant={currentPage === 'read' ? 'secondary' : 'ghost'}
              onClick={onNavigateToRead}
              size="sm"
            >
              Read
            </Button>
            {isAuthenticated && (
              <>
                <Button 
                  variant={currentPage === 'chatbot' ? 'secondary' : 'ghost'}
                  onClick={onNavigateToChatbot}
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button 
                  variant={currentPage === 'lecture' ? 'secondary' : 'ghost'}
                  onClick={onNavigateToLecture}
                  size="sm"
                >
                  <BookOpen className="w-4 h-4" />
                </Button>
                <Button 
                  variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
                  onClick={onNavigateToDashboard}
                  size="sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <span className="text-sm font-medium">
                    {getInitials(user?.name || 'U')}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onNavigateToDashboard}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onNavigateToProfile}>
                  <User className="mr-2 h-4 w-4" />
                  Personal Page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onNavigateToSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onNavigateToLecture}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Lectures
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={onNavigateToAdmin}>
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={onNavigateToAuth} size="sm" className="hidden md:inline-flex">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
