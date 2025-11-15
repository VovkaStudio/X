import { Header } from "@/components/Header";
import type { PropsWithChildren } from "react";

export default function Layout({ children }:
PropsWithChildren<unknown>) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center px-4 py-8">
            <div className="w-full max-w-xl">
                {children}
            </div>
        </div>
        </div>
}