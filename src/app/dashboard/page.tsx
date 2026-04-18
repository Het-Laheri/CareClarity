'use client';

import ChatBot from "@/components/chat-bot";
import { ResilienceCard } from "@/components/resilience-card";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col h-full w-full bg-background relative overflow-hidden">
      {/* Main Feature: AI Chat (Full Screen) */}
      <div className="flex-1 w-full relative overflow-hidden flex flex-col z-0">
        <ChatBot />
      </div>

      {/* Floating Side Task: Wellness Hub */}
      <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full h-14 w-14 shadow-2xl hover:scale-110 transition-transform bg-primary text-primary-foreground border-4 border-background"
            >
              <Heart className="h-6 w-6 fill-current" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[380px] sm:w-[500px] border-r shadow-2xl p-0 overflow-y-auto">
            <div className="p-6">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-headline font-bold">Resilience Hub</SheetTitle>
                <SheetDescription>
                  Your personal space to recharge. Take a moment for yourself.
                </SheetDescription>
              </SheetHeader>
              <ResilienceCard />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
