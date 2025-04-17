"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagInputProps {
  placeholder?: string
  tags: string[]
  availableTags: string[]
  onTagsChange: (tags: string[]) => void
  className?: string
}

export default function TagInput({
  placeholder = "Ajouter un tag...",
  tags,
  availableTags,
  onTagsChange,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Filtrer les suggestions en fonction de la saisie
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions(availableTags.filter((tag) => !tags.includes(tag)))
    } else {
      setFilteredSuggestions(
        availableTags
          .filter((tag) => !tags.includes(tag))
          .filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase())),
      )
    }
  }, [inputValue, availableTags, tags])

  // Fermer les suggestions lors d'un clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const addTag = (tag: string) => {
    if (tag.trim() !== "" && !tags.includes(tag)) {
      onTagsChange([...tags, tag])
    }
    setInputValue("")
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault()
      if (filteredSuggestions.length > 0) {
        addTag(filteredSuggestions[0])
      } else if (availableTags.includes(inputValue)) {
        addTag(inputValue)
      }
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[56px] focus-within:ring-2 focus-within:ring-black focus-within:ring-opacity-20">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
            <span>{tag}</span>
            <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-gray-500 hover:text-gray-700">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-grow outline-none min-w-[120px] bg-transparent"
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div key={index} onClick={() => addTag(suggestion)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
