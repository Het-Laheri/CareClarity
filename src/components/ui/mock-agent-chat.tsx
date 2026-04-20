'use client';

import { motion } from 'framer-motion';
import { Bot, Shield, Loader2, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const MESSAGES = [
    { type: 'user', text: "My 3-year-old isn't speaking yet and I'm really scared. I don't know where to start." },
    { type: 'system', text: "Analyzing symptoms securely..." },
    { type: 'agent', text: "I completely understand how worrying this feels, but you are taking the right first step. Speech delays are very common and highly treatable with early intervention.\n\nLet's break this down together. I can help you understand the next developmental milestones, or I can connect you directly with a pediatric speech pathologist in your city. What feels most helpful right now?" }
];

export function MockAgentChat() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setStep(1); // Show user
            await new Promise(r => setTimeout(r, 2000));
            setStep(2); // Show system calculating
            await new Promise(r => setTimeout(r, 2500));
            setStep(3); // Show agent
        };
        sequence();
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl border border-border/60 bg-white shadow-xl p-4 sm:p-6 text-sm font-medium">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-muted">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1 font-semibold">
                    <Shield className="h-3.5 w-3.5 text-slate-400" />
                    Private & Confidential
                </div>
            </div>

            <div className="space-y-6">
                {/* User Message */}
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end"
                    >
                        <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm leading-relaxed">
                            <p>{MESSAGES[0].text}</p>
                        </div>
                    </motion.div>
                )}

                {/* System Tool Execution */}
                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-xs text-muted-foreground bg-muted w-fit px-4 py-2 rounded-full mx-auto"
                    >
                        <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                        {MESSAGES[1].text}
                    </motion.div>
                )}

                {/* AI Response Message */}
                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3"
                    >
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shadow-sm flex-shrink-0 mt-1 border border-blue-200">
                            <Heart className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="bg-slate-50 px-4 py-3 rounded-2xl rounded-tl-sm w-full border shadow-sm">
                            <p className="leading-relaxed text-slate-700 whitespace-pre-wrap">{MESSAGES[2].text}</p>
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: '100%' }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="h-0.5 bg-gradient-to-r from-blue-300 to-transparent mt-4 rounded-full"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
