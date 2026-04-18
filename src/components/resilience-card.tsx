'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Smile, CloudRain, Zap, Coffee, Sparkles, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const affirmations = [
  "Your presence is your child's greatest intervention.",
  "It's okay to feel overwhelmed; your love is still enough.",
  "You are doing hard things with great love every single day.",
  "Taking care of yourself is taking care of your child.",
  "Progress is not linear, and that's okay.",
  "Your advocacy is changing your child's future.",
  "Small wins are still wins. Celebrate that eye contact, that smile, that step.",
];

const selfCareTips = [
  "Take 3 slow, deep breaths. Inhale for 4, hold for 4, exhale for 4.",
  "Drink a full glass of water. Your brain needs it.",
  "Step outside for 2 minutes and feel the air on your skin.",
  "Do a quick 30-second neck and shoulder stretch.",
  "Listen to one song that makes you feel calm or happy.",
  "Allow yourself to say 'no' to one non-essential task today.",
];

const moods = [
  { emoji: '☀️', label: 'Hopeful', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { emoji: '🌿', label: 'Calm', color: 'text-green-500', bg: 'bg-green-500/10' },
  { emoji: '☁️', label: 'Tired', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { emoji: '⛈️', label: 'Heavy', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { emoji: '⚡', label: 'Sharp', color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export function ResilienceCard() {
  const [affirmation, setAffirmation] = useState('');
  const [tip, setTip] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    setTip(selfCareTips[Math.floor(Math.random() * selfCareTips.length)]);
  }, []);

  const refreshAffirmation = () => {
    const next = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(next);
  };

  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/20 dark:via-background dark:to-purple-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Heart className="h-5 w-5 text-primary fill-primary/20" />
            </div>
            <CardTitle className="font-headline text-xl">Caregiver Wellness</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={refreshAffirmation} className="h-8 w-8 hover:bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
          </Button>
        </div>
        <CardDescription>A small space just for you, to recharge and breathe.</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Affirmation Area */}
        <div className="relative min-h-[80px] flex items-center justify-center p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-white/20 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.p
              key={affirmation}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center font-medium italic text-indigo-700 dark:text-indigo-300"
            >
              &ldquo;{affirmation}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Mood Check-in */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">How are you feeling right now?</p>
          <div className="flex justify-between gap-1">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => setSelectedMood(m.label)}
                className={`flex flex-col items-center gap-1 flex-1 p-2 rounded-xl transition-all ${
                  selectedMood === m.label 
                    ? `${m.bg} ring-2 ring-primary scale-105` 
                    : 'hover:bg-muted/50'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Self-Care Action */}
        <div className="pt-2">
          {!showTip ? (
            <Button 
              onClick={() => setShowTip(true)} 
              variant="outline" 
              className="w-full h-12 rounded-xl border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 group"
            >
              <Zap className="mr-2 h-4 w-4 text-primary group-hover:animate-pulse" />
              Need a 1-minute recharge?
            </Button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-primary/5 rounded-2xl border border-primary/10 relative"
            >
              <div className="flex items-start gap-3">
                <Coffee className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary uppercase">Quick Recharge</p>
                  <p className="text-sm font-medium leading-tight">{tip}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTip(false)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground text-xs p-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
