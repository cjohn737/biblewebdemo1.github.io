import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { BookOpen, Lightbulb, History, Users, Play, Download, Share2 } from 'lucide-react';

interface LectureContent {
  scripture: string;
  reference: string;
  introduction: string;
  mainPoints: Array<{
    title: string;
    content: string;
    keyVerse: string;
  }>;
  historicalContext: string;
  culturalInsights: string;
  practicalApplication: string;
  discussionQuestions: string[];
  conclusion: string;
}

export function LectureSession() {
  const [selectedScripture, setSelectedScripture] = useState('');
  const [customScripture, setCustomScripture] = useState('');
  const [lectureStyle, setLectureStyle] = useState('balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lecture, setLecture] = useState<LectureContent | null>(null);

  const popularScriptures = [
    { value: 'john-3-16', label: 'John 3:16 - God\'s Love' },
    { value: 'psalm-23', label: 'Psalm 23 - The Shepherd' },
    { value: 'matthew-5-1-12', label: 'Matthew 5:1-12 - Beatitudes' },
    { value: 'romans-8-28', label: 'Romans 8:28 - All Things Work Together' },
    { value: '1-cor-13', label: '1 Corinthians 13 - Love Chapter' },
    { value: 'genesis-1', label: 'Genesis 1 - Creation' },
  ];

  const generateLecture = async () => {
    if (!selectedScripture && !customScripture.trim()) {
      toast.error('Please select or enter a scripture passage');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const mockLecture: LectureContent = {
        scripture: customScripture || getScriptureText(selectedScripture),
        reference: customScripture ? 'Custom Scripture' : getScriptureReference(selectedScripture),
        introduction: `Today we're exploring one of the most profound passages in Scripture. This text has shaped Christian thought for centuries and continues to speak powerfully into our lives today. As we delve into this passage, we'll discover timeless truths that are just as relevant now as they were when first written.`,
        mainPoints: [
          {
            title: 'The Core Message',
            content: `At the heart of this passage lies a fundamental truth about God's character and His relationship with humanity. The original language reveals depths of meaning that transform our understanding of divine love and grace.`,
            keyVerse: 'Key insight from the central verse',
          },
          {
            title: 'Understanding the Context',
            content: `To fully appreciate this passage, we need to understand what was happening at the time. The historical and cultural setting provides crucial context for interpreting the author's intent and the original audience's reception.`,
            keyVerse: 'Supporting contextual evidence',
          },
          {
            title: 'Theological Implications',
            content: `This scripture speaks to larger theological themes that run throughout the Bible. We see connections to God's redemptive plan, the nature of faith, and the call to Christian living.`,
            keyVerse: 'Connecting verse to broader theology',
          },
        ],
        historicalContext: `This passage was written during a pivotal time in biblical history. Understanding the political climate, social structures, and religious landscape of the era helps us grasp why this message was so revolutionary. The original recipients would have understood layers of meaning that might escape modern readers without proper historical context.`,
        culturalInsights: `In the original culture, many aspects of this passage would have been immediately understood through common metaphors and imagery. The agricultural references, social customs, and religious practices mentioned were part of everyday life. By exploring these cultural elements, we can better understand the full impact of the message.`,
        practicalApplication: `How does this ancient text speak to our modern lives? The principles contained here offer guidance for daily decision-making, relationships, spiritual growth, and navigating life's challenges. Whether you're facing personal struggles, seeking direction, or desiring deeper faith, this passage provides practical wisdom and encouragement.`,
        discussionQuestions: [
          'What does this passage reveal about God\'s character?',
          'How does understanding the historical context change your interpretation?',
          'What is one specific way you can apply this teaching this week?',
          'How does this passage connect to other biblical themes?',
          'What questions or challenges does this text raise for you?',
        ],
        conclusion: `As we conclude our study, let's remember that Scripture isn't just ancient history—it's God's living Word speaking to us today. The truths we've explored challenge us to examine our lives, deepen our faith, and live more fully in God's purposes. May this passage continue to resonate in your heart and transform your daily walk.`,
      };

      setLecture(mockLecture);
      setIsGenerating(false);
      toast.success('Lecture session generated!');
    }, 2000);
  };

  const getScriptureText = (value: string): string => {
    const scriptures: Record<string, string> = {
      'john-3-16': 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      'psalm-23': 'The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul...',
      'matthew-5-1-12': 'Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him, and he began to teach them...',
      'romans-8-28': 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      '1-cor-13': 'If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal...',
      'genesis-1': 'In the beginning God created the heavens and the earth.',
    };
    return scriptures[value] || '';
  };

  const getScriptureReference = (value: string): string => {
    const references: Record<string, string> = {
      'john-3-16': 'John 3:16',
      'psalm-23': 'Psalm 23',
      'matthew-5-1-12': 'Matthew 5:1-12',
      'romans-8-28': 'Romans 8:28',
      '1-cor-13': '1 Corinthians 13',
      'genesis-1': 'Genesis 1:1',
    };
    return references[value] || '';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2">Lecture Sessions</h1>
          <p className="text-muted-foreground">
            Generate comprehensive, AI-powered lecture materials for any scripture passage
          </p>
        </div>

        {!lecture ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Lecture</CardTitle>
              <CardDescription>
                Select a scripture passage and customize your lecture preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scripture-select">Popular Scriptures</Label>
                <Select value={selectedScripture} onValueChange={setSelectedScripture}>
                  <SelectTrigger id="scripture-select">
                    <SelectValue placeholder="Choose a scripture passage..." />
                  </SelectTrigger>
                  <SelectContent>
                    {popularScriptures.map((scripture) => (
                      <SelectItem key={scripture.value} value={scripture.value}>
                        {scripture.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-scripture">Enter Your Own Scripture</Label>
                <Textarea
                  id="custom-scripture"
                  placeholder="Paste or type any scripture passage here..."
                  value={customScripture}
                  onChange={(e) => setCustomScripture(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lecture-style">Lecture Style</Label>
                <Select value={lectureStyle} onValueChange={setLectureStyle}>
                  <SelectTrigger id="lecture-style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple & Accessible</SelectItem>
                    <SelectItem value="balanced">Balanced (Recommended)</SelectItem>
                    <SelectItem value="scholarly">Scholarly & Detailed</SelectItem>
                    <SelectItem value="devotional">Devotional Focus</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose the depth and style that fits your audience
                </p>
              </div>

              <Button 
                onClick={generateLecture} 
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>Generating Lecture...</>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Generate Lecture Session
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{lecture.reference}</CardTitle>
                    <CardDescription className="text-base italic">
                      "{lecture.scripture}"
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setLecture(null)}
                    >
                      New Lecture
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Lecture Content */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="context">
                  <History className="mr-2 h-4 w-4" />
                  Context
                </TabsTrigger>
                <TabsTrigger value="points">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Main Points
                </TabsTrigger>
                <TabsTrigger value="application">
                  <Users className="mr-2 h-4 w-4" />
                  Application
                </TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {lecture.introduction}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conclusion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {lecture.conclusion}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="context" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Context</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {lecture.historicalContext}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cultural Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {lecture.culturalInsights}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="points" className="space-y-4">
                {lecture.mainPoints.map((point, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>
                        {index + 1}. {point.title}
                      </CardTitle>
                      <CardDescription className="italic">
                        "{point.keyVerse}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {point.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="application" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Practical Application</CardTitle>
                    <CardDescription>
                      How to apply this teaching in daily life
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {lecture.practicalApplication}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion Questions</CardTitle>
                    <CardDescription>
                      Use these questions for group study or personal reflection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {lecture.discussionQuestions.map((question, index) => (
                        <li key={index} className="flex items-start">
                          <span className="font-semibold text-primary mr-3 mt-0.5">
                            {index + 1}.
                          </span>
                          <span className="text-muted-foreground">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
