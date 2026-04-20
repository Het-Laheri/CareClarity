'use client';

import { motion } from 'framer-motion';
import { Bot, Shield, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const MESSAGES = [
    { type: 'user', text: "Can you help me understand what an IEP is?" },
    { type: 'system', text: "Executing Agentic RAG Pipeline..." },
    { type: 'agent', text: "I can help with that. An Individualized Education Program (IEP) is a legal document that maps out your child's special education instruction, supports, and services under the law. Would you like me to find local specialists who assist with IEPs?" }
];

export function MockAgentChat() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setStep(1); // Show user
            await new Promise(r => setTimeout(r, 1500));
            setStep(2); // Show system calculating
            await new Promise(r => setTimeout(r, 2000));
            setStep(3); // Show agent
        };
        sequence();
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl p-4 sm:p-6 text-sm font-medium">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mr-1">
                    <Shield className="h-3.5 w-3.5 text-emerald-500" />
                    End-to-End Encrypted
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
                        <div className="bg-primary/10 text-foreground px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] border border-primary/20 shadow-sm">
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
                        className="flex items-center gap-3 text-xs text-primary/70 bg-primary/5 w-fit px-4 py-2 rounded-full mx-auto"
                    >
                        <Loader2 className="h-3 w-3 animate-spin" />
                        {MESSAGES[1].text}
                    </motion.div>
                )}

                {/* AI Response Message */}
                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-4"
                    >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center shadow-md flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm w-full border shadow-sm">
                            <p className="leading-relaxed text-foreground opacity-90">{MESSAGES[2].text}</p>
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: '100%' }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="h-0.5 bg-gradient-to-r from-emerald-400/50 to-transparent mt-4 rounded-full"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
        </div>
    );
}
