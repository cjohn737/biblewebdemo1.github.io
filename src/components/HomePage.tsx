import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Brain, Search, Users, TrendingUp, BookMarked, Sparkles } from "lucide-react";
import { DailyDevotional } from "./DailyDevotional";

interface HomePageProps {
  onNavigateToRead: () => void;
  onNavigateToDashboard: () => void;
}

export function HomePage({ onNavigateToRead, onNavigateToDashboard }: HomePageProps) {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/50 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              AI-Powered Bible Study
            </Badge>
            <div className="space-y-4 mb-8">
              <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                Deepen Your Understanding of Scripture
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-900">
                Experience the Bible like never before with AI-powered insights, historical context, 
                and personalized study tools designed to transform your spiritual journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Button size="lg" onClick={onNavigateToRead} className="group">
                <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Reading
              </Button>
              <Button size="lg" variant="outline" onClick={onNavigateToDashboard}>
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-3">
              Everything You Need to Study Scripture
            </h2>
            <p className="text-muted-foreground">
              Powerful tools and insights to help you understand and apply God's Word
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Brain className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Get instant, comprehensive breakdowns of any verse with themes, context, and practical applications.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Search className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Find any passage instantly with our intelligent search that understands context and meaning.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2">Multiple Versions</h3>
              <p className="text-muted-foreground">
                Access KJV, NIV, ESV, NLT, and more Bible translations all in one place for deeper study.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookMarked className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2">Save & Organize</h3>
              <p className="text-muted-foreground">
                Bookmark your favorite verses and create custom collections for easy reference and study.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your reading journey with detailed statistics and achieve your spiritual goals.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2">Community Notes</h3>
              <p className="text-muted-foreground">
                Share insights and learn from a community of believers studying God's Word together.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Daily Devotional Section */}
      <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-3">
              Daily Devotional
            </h2>
            <p className="text-muted-foreground">
              Download and share beautiful verse images for daily inspiration
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <DailyDevotional />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Three simple steps to transform your Bible study experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">
                1
              </div>
              <h3 className="mb-2">Select a Passage</h3>
              <p className="text-muted-foreground">
                Choose any book, chapter, or verse from multiple Bible translations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">
                2
              </div>
              <h3 className="mb-2">Get AI Insights</h3>
              <p className="text-muted-foreground">
                Receive instant analysis with themes, context, and cross-references
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl">
                3
              </div>
              <h3 className="mb-2">Study & Apply</h3>
              <p className="text-muted-foreground">
                Save your insights and apply biblical wisdom to your daily life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <h2 className="mb-2">66</h2>
              <p className="text-muted-foreground">Books</p>
            </div>
            <div>
              <h2 className="mb-2">1,189</h2>
              <p className="text-muted-foreground">Chapters</p>
            </div>
            <div>
              <h2 className="mb-2">31,102</h2>
              <p className="text-muted-foreground">Verses</p>
            </div>
            <div>
              <h2 className="mb-2">5+</h2>
              <p className="text-muted-foreground">Translations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">
              Begin Your Journey Today
            </h2>
            <p className="mb-8 opacity-90">
              Join thousands of believers discovering deeper meaning in Scripture with Bible Nation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={onNavigateToRead}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Reading Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={onNavigateToDashboard}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="mb-4">Bible Nation</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered insights for deeper Bible study and spiritual growth.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Study Guides</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Bible Nation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
