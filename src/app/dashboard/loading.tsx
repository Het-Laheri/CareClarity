import { Logo } from "@/components/logo";

export default function DashboardLoading() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center">
            <Logo />
            <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
    );
}
