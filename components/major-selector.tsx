'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2 } from 'lucide-react'

const COMMON_MAJORS = [
  'Computer Science',
  'Software Engineering',
  'Data Science',
  'Business Administration',
  'Economics',
  'Finance',
  'Marketing',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Psychology',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'Statistics',
  'Accounting',
  'Management',
  'Information Technology',
  'Nursing',
  'Medicine',
  'Engineering Management',
  'Product Management',
  'Design',
  'Graphic Design',
  'Industrial Design',
  'Architecture',
  'Environmental Science',
  'Biotechnology',
  'Pharmaceutical Science',
  'Communications',
  'Journalism',
  'Law',
  'Political Science',
  'International Relations',
  'Environmental Engineering',
  'Biomedical Engineering',
  'Aerospace Engineering',
]

interface MajorSelectorProps {
  onSelect: (major: string) => void
}

export function MajorSelector({ onSelect }: MajorSelectorProps) {
  const [input, setInput] = useState('')
  const [filtered, setFiltered] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMajor, setSelectedMajor] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (input.trim()) {
      const matches = COMMON_MAJORS.filter(major =>
        major.toLowerCase().includes(input.toLowerCase())
      )
      setFiltered(matches)
      setIsOpen(true)
    } else {
      setFiltered([])
      setIsOpen(false)
    }
  }, [input])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (major: string) => {
    setSelectedMajor(major)
    setInput(major)
    setIsOpen(false)
    onSelect(major)
  }

  const handleContinue = () => {
    if (selectedMajor) {
      onSelect(selectedMajor)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-foreground">
          What major are you considering or pursuing?
        </label>
        <div className="relative" ref={containerRef}>
          <Input
            type="text"
            placeholder="Search majors..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => input && setIsOpen(true)}
            className="w-full"
          />
          
          {isOpen && filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {filtered.map((major, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(major)}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center justify-between group border-b border-border last:border-b-0"
                >
                  <span className="text-sm text-foreground">{major}</span>
                  {selectedMajor === major && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedMajor}
        className="w-full"
        size="lg"
      >
        Continue
      </Button>
    </div>
  )
}
