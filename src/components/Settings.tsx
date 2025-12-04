import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Settings as SettingsIcon, Type, Palette, Monitor, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AppSettings {
  fontSize: number;
  fontFamily: string;
  theme: 'light' | 'dark' | 'system';
  readingMode: boolean;
  lineHeight: number;
  letterSpacing: number;
}

const defaultSettings: AppSettings = {
  fontSize: 16,
  fontFamily: 'system',
  theme: 'system',
  readingMode: false,
  lineHeight: 1.6,
  letterSpacing: 0,
};

export function Settings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('bible_nation_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Apply settings to document
  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const applySettings = (newSettings: AppSettings) => {
    const root = document.documentElement;
    
    // Apply font size
    root.style.setProperty('--font-size-base', `${newSettings.fontSize}px`);
    
    // Apply font family
    const fontFamilies: Record<string, string> = {
      system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      serif: 'Georgia, "Times New Roman", serif',
      mono: '"Courier New", monospace',
      'open-sans': '"Open Sans", sans-serif',
      'merriweather': 'Merriweather, serif',
    };
    root.style.setProperty('--font-family-base', fontFamilies[newSettings.fontFamily] || fontFamilies.system);
    
    // Apply line height
    root.style.setProperty('--line-height-base', newSettings.lineHeight.toString());
    
    // Apply letter spacing
    root.style.setProperty('--letter-spacing-base', `${newSettings.letterSpacing}px`);
    
    // Apply theme
    if (newSettings.theme === 'dark') {
      root.classList.add('dark');
    } else if (newSettings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    
    // Apply reading mode
    if (newSettings.readingMode) {
      root.classList.add('reading-mode');
    } else {
      root.classList.remove('reading-mode');
    }
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('bible_nation_settings', JSON.stringify(newSettings));
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.setItem('bible_nation_settings', JSON.stringify(defaultSettings));
    toast.success('Settings reset to default');
  };

  const handleSave = () => {
    localStorage.setItem('bible_nation_settings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <h1 className="mb-3">Settings</h1>
        <p className="text-muted-foreground">
          Customize your reading experience and app appearance
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5" />
            <h3>Appearance</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value: 'light' | 'dark' | 'system') => updateSetting('theme', value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="reading-mode">Reading Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Optimized layout for distraction-free reading
                </p>
              </div>
              <Switch
                id="reading-mode"
                checked={settings.readingMode}
                onCheckedChange={(checked) => updateSetting('readingMode', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Typography Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Type className="w-5 h-5" />
            <h3>Typography</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="font-family">Font Family</Label>
              <Select
                value={settings.fontFamily}
                onValueChange={(value) => updateSetting('fontFamily', value)}
              >
                <SelectTrigger id="font-family">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System Default</SelectItem>
                  <SelectItem value="serif">Serif (Georgia)</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                  <SelectItem value="open-sans">Open Sans</SelectItem>
                  <SelectItem value="merriweather">Merriweather</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size">Font Size</Label>
                <span className="text-sm text-muted-foreground">{settings.fontSize}px</span>
              </div>
              <Slider
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting('fontSize', value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Small (12px)</span>
                <span>Large (24px)</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="line-height">Line Height</Label>
                <span className="text-sm text-muted-foreground">{settings.lineHeight.toFixed(1)}</span>
              </div>
              <Slider
                id="line-height"
                min={1.2}
                max={2.4}
                step={0.1}
                value={[settings.lineHeight]}
                onValueChange={([value]) => updateSetting('lineHeight', value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Compact (1.2)</span>
                <span>Spacious (2.4)</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="letter-spacing">Letter Spacing</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.letterSpacing > 0 ? '+' : ''}{settings.letterSpacing}px
                </span>
              </div>
              <Slider
                id="letter-spacing"
                min={-1}
                max={3}
                step={0.5}
                value={[settings.letterSpacing]}
                onValueChange={([value]) => updateSetting('letterSpacing', value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tight (-1px)</span>
                <span>Wide (3px)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Preview Card */}
        <Card className="p-6 bg-muted/30">
          <h3 className="mb-4">Preview</h3>
          <div className="p-6 bg-background rounded-lg border">
            <p className="mb-4">
              <strong>John 3:16</strong>
            </p>
            <p>
              For God so loved the world that he gave his one and only Son, 
              that whoever believes in him shall not perish but have eternal life.
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            This preview shows how scripture text will appear with your current settings.
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
}
