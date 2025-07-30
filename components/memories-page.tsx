"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { pageKeys, pageYears } from "@/constants"
import { ArrowRight, ArrowLeft, Home, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MemoriesPage({ slug }: { slug: string }) {
  const router = useRouter()

  const handleNext = () => {
    const currentIndex = pageKeys.indexOf(slug)
    const nextIndex = (currentIndex + 1) % pageKeys.length
    router.push(`/memories/${pageKeys[nextIndex]}`)
  }

  const handlePrevious = () => {
    const currentIndex = pageKeys.indexOf(slug)
    const prevIndex = (currentIndex - 1 + pageKeys.length) % pageKeys.length
    router.push(`/memories/${pageKeys[prevIndex]}`)
  }

  // Group page keys by year for display
  const years = Array.from(new Set(Object.values(pageYears))).sort((a, b) => Number(b) - Number(a))

  return (
    <nav className="bg-neutral-800 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top navigation bar */}
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <Button variant="outline" className="gap-2 flex items-center hover:bg-neutral-700 transition-colors rounded-full border-neutral-500">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrevious}
              size="sm"
              variant="outline"
              className="gap-1 hover:bg-neutral-700 transition-colors bg-transparent rounded-full border-neutral-500"
            >
              <ArrowLeft className="h-3 w-3" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            <Button
              onClick={handleNext}
              size="sm"
              variant="outline"
              className="gap-1 hover:bg-neutral-700 transition-colors bg-transparent rounded-full border-neutral-500"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Year navigation */}
        <div className="pb-8 overflow-x-auto">
          <div className="flex flex-col-reverse md:flex-row-reverse gap-6 lg:gap-8 min-w-max lg:justify-center">
            {years.map((year) => (
              <div key={year} className="flex flex-col items-center min-w-fit">
                {/* Year header */}
                <div className="flex items-center gap-2 mb-3 px-3 py-1 bg-gray-50 rounded-full">
                  <Calendar className="h-3 w-3 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">{year}</span>
                </div>

                {/* Page buttons for this year */}
                <div className="flex flex-wrap gap-1.5 justify-center max-w-[220px] md:max-w-[180px]">
                  {pageKeys
                    .filter((key) => pageYears[key] === year)
                    .sort((a, b) => Number(a) - Number(b))
                    .map((key) => (
                      <Link key={key} href={`/memories/${key}`}>
                        <Button
                          variant={key === slug ? "default" : "outline"}
                          size="sm"
                          className={cn("min-w-[36px] h-8 font-medium transition-all duration-200 rounded-full border-neutral-500", {
                            "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-md transform scale-105":
                              key === slug,
                            "hover:bg-neutral-700 hover:border-neutral-500 hover:shadow-sm": key !== slug,
                          })}
                        >
                          {key}
                        </Button>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30"></div>
    </nav>
  )
}