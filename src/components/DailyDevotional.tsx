import { useState, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const devotionals = [
  {
    verse: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    reference: 'John 3:16',
    theme: 'love',
    colors: { bg: '#8B5CF6', text: '#FFFFFF', accent: '#DDD6FE' },
  },
  {
    verse: 'The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.',
    reference: 'Psalm 23:1-2',
    theme: 'peace',
    colors: { bg: '#10B981', text: '#FFFFFF', accent: '#D1FAE5' },
  },
  {
    verse: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    reference: 'Proverbs 3:5-6',
    theme: 'trust',
    colors: { bg: '#3B82F6', text: '#FFFFFF', accent: '#DBEAFE' },
  },
  {
    verse: 'I can do all things through Christ who strengthens me.',
    reference: 'Philippians 4:13',
    theme: 'strength',
    colors: { bg: '#EF4444', text: '#FFFFFF', accent: '#FEE2E2' },
  },
  {
    verse: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
    reference: 'Joshua 1:9',
    theme: 'courage',
    colors: { bg: '#F59E0B', text: '#FFFFFF', accent: '#FEF3C7' },
  },
];

export function DailyDevotional() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const devotional = devotionals[currentIndex];

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1080;
    canvas.height = 1080;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, devotional.colors.bg);
    gradient.addColorStop(1, adjustBrightness(devotional.colors.bg, -20));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative elements
    ctx.fillStyle = devotional.colors.accent + '20';
    ctx.beginPath();
    ctx.arc(100, 100, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width - 100, canvas.height - 100, 250, 0, Math.PI * 2);
    ctx.fill();

    // Draw Bible Nation branding
    ctx.fillStyle = devotional.colors.text + '90';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BIBLE NATION', canvas.width / 2, 80);

    // Draw date
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    ctx.font = '24px sans-serif';
    ctx.fillStyle = devotional.colors.text + '80';
    ctx.fillText(today, canvas.width / 2, 120);

    // Draw verse text
    ctx.fillStyle = devotional.colors.text;
    ctx.font = '42px serif';
    ctx.textAlign = 'center';
    
    // Word wrap the verse
    const maxWidth = canvas.width - 200;
    const words = devotional.verse.split(' ');
    let line = '';
    let y = 400;
    const lineHeight = 60;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Draw reference
    ctx.font = 'bold 38px sans-serif';
    ctx.fillStyle = devotional.colors.accent;
    ctx.fillText(`— ${devotional.reference}`, canvas.width / 2, y + 100);

    // Draw decorative line
    ctx.strokeStyle = devotional.colors.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, y + 130);
    ctx.lineTo(canvas.width / 2 + 100, y + 130);
    ctx.stroke();

    // Footer
    ctx.font = '22px sans-serif';
    ctx.fillStyle = devotional.colors.text + '70';
    ctx.fillText('Daily Devotional', canvas.width / 2, canvas.height - 60);
  };

  const adjustBrightness = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  const handleDownload = () => {
    generateImage();
    
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.toBlob((blob) => {
        if (!blob) return;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bible-nation-devotional-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success('Devotional image downloaded!');
      });
    }, 100);
  };

  const handleRefresh = () => {
    setCurrentIndex((prev) => (prev + 1) % devotionals.length);
    setTimeout(generateImage, 100);
  };

  // Generate image on mount and when devotional changes
  useState(() => {
    setTimeout(generateImage, 100);
  });

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Daily Devotional</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        
        <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: 'block' }}
          />
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Share this beautiful verse image on social media or save it for daily inspiration
        </p>
      </CardContent>
    </Card>
  );
}
