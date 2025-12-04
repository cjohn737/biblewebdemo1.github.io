import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, Send, Sparkles, Lock, Gift } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTrialDialog, setShowTrialDialog] = useState(false);
  const { isAuthenticated } = useAuth();
  const { 
    questionsRemaining, 
    totalQuestionsAllowed, 
    hasActiveTrial, 
    trialDaysRemaining,
    isSubscribed,
    askQuestion,
    startTrial 
  } = useSubscription();



  useEffect(() => {
    // Add welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! I\'m your AI Bible study assistant. Ask me anything about scripture, theology, biblical history, or how to apply God\'s Word to your life. How can I help you today?',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!isAuthenticated) {
      toast.error('Please sign in to use the AI chatbot');
      return;
    }

    // Check if user can ask a question
    const canAsk = askQuestion();
    if (!canAsk) {
      setShowTrialDialog(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes('love') || q.includes('1 corinthians 13')) {
      return 'Love is beautifully described in 1 Corinthians 13. The passage teaches us that love is patient, kind, and never fails. It\'s not just an emotion, but a choice and commitment. In the biblical context, love (agape) is selfless and unconditional - the same love God shows us. This kind of love seeks the good of others above our own interests and reflects God\'s character. How can you practice this kind of love in your daily relationships?';
    }

    if (q.includes('prayer') || q.includes('pray')) {
      return 'Prayer is our direct communication with God. Jesus taught us to pray in Matthew 6:9-13 with the Lord\'s Prayer. Prayer involves worship, confession, thanksgiving, and supplication (ACTS). It\'s not about perfect words, but a sincere heart. Philippians 4:6-7 encourages us to present our requests to God with thanksgiving. Prayer changes us as much as our circumstances. What specific area of your life would you like to bring before God in prayer?';
    }

    if (q.includes('faith')) {
      return 'Faith is confidence in what we hope for and assurance about what we do not see (Hebrews 11:1). It\'s trusting God even when we can\'t see the outcome. Romans 10:17 tells us faith comes from hearing God\'s Word. Faith isn\'t blind - it\'s based on God\'s proven character and promises throughout Scripture. Like a muscle, faith grows stronger through use and testing. James 2:14-26 reminds us that genuine faith produces action. How is God calling you to step out in faith today?';
    }

    if (q.includes('forgive') || q.includes('forgiveness')) {
      return 'Forgiveness is central to the Christian faith. Just as God forgave us through Christ (Ephesians 4:32), we\'re called to forgive others. Matthew 18:21-22 teaches us to forgive "seventy times seven" - meaning unlimited forgiveness. Forgiveness doesn\'t mean the offense didn\'t matter, but that we release the person from our judgment, trusting God as the ultimate judge. It frees us from bitterness and reflects God\'s grace. Is there someone you need to forgive today?';
    }

    if (q.includes('purpose') || q.includes('calling')) {
      return 'God has a unique purpose for your life! Jeremiah 29:11 reminds us that God has plans to prosper us and give us hope. Your purpose involves glorifying God (1 Corinthians 10:31) and serving others with your unique gifts (1 Peter 4:10). Ephesians 2:10 says we are God\'s workmanship, created for good works He prepared in advance. Discovering your purpose involves prayer, studying Scripture, using your gifts, and staying open to God\'s leading. What gifts and passions has God given you?';
    }

    // Default response
    return `That's a great question about "${question}". The Bible offers deep wisdom on this topic. While I'm providing general guidance, I encourage you to study the relevant scriptures yourself and pray for the Holy Spirit's guidance. Some key principles to consider: God's Word is living and active (Hebrews 4:12), all Scripture is God-breathed and useful for teaching (2 Timothy 3:16), and the Holy Spirit guides us into all truth (John 16:13). Would you like me to explore any specific aspect of this question further?`;
  };

  const handleStartTrial = () => {
    startTrial();
    setShowTrialDialog(false);
    toast.success('7-day free trial activated! Enjoy unlimited questions.');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="flex items-center gap-2">
              <MessageCircle className="h-8 w-8" />
              AI Bible Assistant
            </h1>
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                {isSubscribed ? (
                  <Badge variant="default" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Premium
                  </Badge>
                ) : hasActiveTrial ? (
                  <Badge variant="secondary" className="gap-1">
                    <Gift className="h-3 w-3" />
                    Trial: {trialDaysRemaining} days left
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1">
                    <Lock className="h-3 w-3" />
                    {questionsRemaining} questions left
                  </Badge>
                )}
              </div>
            )}
          </div>
          <p className="text-muted-foreground">
            Ask questions about scripture, theology, and Christian living
          </p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Chat</CardTitle>
            <CardDescription>
              {isAuthenticated ? (
                isSubscribed || hasActiveTrial ? (
                  'Unlimited questions available'
                ) : (
                  `${questionsRemaining} of ${totalQuestionsAllowed} free questions remaining`
                )
              ) : (
                'Sign in to start asking questions'
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                      <div className="flex items-center gap-2">
                        <div className="animate-pulse">Thinking...</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="border-t p-4">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask a question about the Bible..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={!isAuthenticated || isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!isAuthenticated || !input.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Trial Prompt Dialog */}
      <Dialog open={showTrialDialog} onOpenChange={setShowTrialDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Free Questions Used
            </DialogTitle>
            <DialogDescription>
              You've used all {totalQuestionsAllowed} free questions. Start your 7-day free trial to continue asking unlimited questions!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Trial Benefits:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Unlimited AI questions for 7 days
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Advanced lecture generation
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Save unlimited notes and highlights
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  No credit card required
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowTrialDialog(false)}>
              Maybe Later
            </Button>
            <Button onClick={handleStartTrial}>
              Start Free Trial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
