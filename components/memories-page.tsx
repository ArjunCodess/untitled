'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { pageKeys } from '@/constants';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function MemoriesPage({ slug }: { slug: string }) {
    const router = useRouter();

    const handleNext = () => {
        const currentIndex = pageKeys.indexOf(slug);
        const nextIndex = (currentIndex + 1) % pageKeys.length;
        router.push(`/memories/${pageKeys[nextIndex]}`);
    };

    const handlePrevious = () => {
        const currentIndex = pageKeys.indexOf(slug);
        const prevIndex = (currentIndex - 1 + pageKeys.length) % pageKeys.length;
        router.push(`/memories/${pageKeys[prevIndex]}`);
    };

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center px-4 py-2 border-b border-gray-300">
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <Button variant="ghost" className='gap-2 flex items-center'>
                        <Home className="h-4 w-4" />Home
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2 mt-2 md:mt-0">
                {pageKeys.map((key) => (
                    <Link key={key} href={`/memories/${key}`}>
                        <Button
                            variant={key === slug ? 'default' : 'ghost'}
                            className={cn('text-sm', { 'bg-blue-500 text-white rounded-full': key === slug })}
                        >
                            {key}
                        </Button>
                    </Link>
                ))}
            </div>

            <div className="flex items-center space-x-4 mt-2 md:mt-0">
                <Button onClick={handlePrevious} className='gap-2 flex items-center'>
                    <ArrowLeft className="h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNext} className='gap-2 flex items-center'>
                    Next <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </nav>
    );
}