import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface SubscriptionContextType {
  hasActiveTrial: boolean;
  trialDaysRemaining: number;
  questionsRemaining: number;
  totalQuestionsAllowed: number;
  isSubscribed: boolean;
  startTrial: () => void;
  askQuestion: () => boolean;
  subscribe: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const FREE_QUESTIONS_LIMIT = 3;
const TRIAL_DURATION_DAYS = 7;

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [hasActiveTrial, setHasActiveTrial] = useState(false);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setHasActiveTrial(false);
      setTrialDaysRemaining(0);
      setQuestionsAsked(0);
      setIsSubscribed(false);
      return;
    }

    // Load subscription data for user
    const subKey = `bible_nation_sub_${user.id}`;
    const savedSub = localStorage.getItem(subKey);

    if (savedSub) {
      const subData = JSON.parse(savedSub);
      
      // Check if subscribed
      if (subData.subscribed) {
        setIsSubscribed(true);
        setHasActiveTrial(false);
        return;
      }

      // Check trial status
      if (subData.trialStartDate) {
        const startDate = new Date(subData.trialStartDate);
        const now = new Date();
        const diffTime = now.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const daysRemaining = TRIAL_DURATION_DAYS - diffDays;

        if (daysRemaining > 0) {
          setHasActiveTrial(true);
          setTrialDaysRemaining(daysRemaining);
        } else {
          setHasActiveTrial(false);
          setTrialDaysRemaining(0);
        }
      }

      setQuestionsAsked(subData.questionsAsked || 0);
    }
  }, [user, isAuthenticated]);

  const startTrial = () => {
    if (!user) return;

    const subKey = `bible_nation_sub_${user.id}`;
    const subData = {
      trialStartDate: new Date().toISOString(),
      questionsAsked: 0,
      subscribed: false,
    };

    localStorage.setItem(subKey, JSON.stringify(subData));
    setHasActiveTrial(true);
    setTrialDaysRemaining(TRIAL_DURATION_DAYS);
    setQuestionsAsked(0);
  };

  const subscribe = () => {
    if (!user) return;

    const subKey = `bible_nation_sub_${user.id}`;
    const subData = {
      subscribed: true,
      subscribedDate: new Date().toISOString(),
      questionsAsked: 0,
    };

    localStorage.setItem(subKey, JSON.stringify(subData));
    setIsSubscribed(true);
    setHasActiveTrial(false);
  };

  const askQuestion = (): boolean => {
    if (!user) return false;

    // Subscribers have unlimited questions
    if (isSubscribed) {
      return true;
    }

    // Trial users have unlimited questions during trial
    if (hasActiveTrial && trialDaysRemaining > 0) {
      return true;
    }

    // Free users have limited questions
    if (questionsAsked >= FREE_QUESTIONS_LIMIT) {
      return false;
    }

    // Increment question count
    const newCount = questionsAsked + 1;
    setQuestionsAsked(newCount);

    const subKey = `bible_nation_sub_${user.id}`;
    const savedSub = localStorage.getItem(subKey);
    const subData = savedSub ? JSON.parse(savedSub) : {};
    subData.questionsAsked = newCount;
    localStorage.setItem(subKey, JSON.stringify(subData));

    return true;
  };

  const questionsRemaining = isSubscribed || hasActiveTrial 
    ? Infinity 
    : Math.max(0, FREE_QUESTIONS_LIMIT - questionsAsked);

  const value: SubscriptionContextType = {
    hasActiveTrial,
    trialDaysRemaining,
    questionsRemaining,
    totalQuestionsAllowed: FREE_QUESTIONS_LIMIT,
    isSubscribed,
    startTrial,
    askQuestion,
    subscribe,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
