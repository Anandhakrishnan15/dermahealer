"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FollowUpPageInner from "./FollowUpPageInner";


const queryClient = new QueryClient();

export default function PageWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <FollowUpPageInner />
        </QueryClientProvider>
    );
}