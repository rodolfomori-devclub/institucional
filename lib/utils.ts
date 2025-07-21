import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Safely parses JSON content that might be wrapped in markdown code blocks
 * @param content - The content to parse, which might be wrapped in ```json or ```
 * @returns Parsed JSON object
 * @throws Error if parsing fails
 */
export function parseJsonFromAI(content: string): any {
    if (!content || typeof content !== 'string') {
        throw new Error('Content must be a non-empty string')
    }

    // Remove leading/trailing whitespace
    let cleanContent = content.trim()

    // Check if content is wrapped in markdown code blocks
    const codeBlockRegex = /^```(?:json)?\s*([\s\S]*?)\s*```$/
    const match = cleanContent.match(codeBlockRegex)

    if (match) {
        // Extract JSON from code block
        cleanContent = match[1].trim()
    }

    // Try to parse the JSON
    try {
        return JSON.parse(cleanContent)
    } catch (error) {
        throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
} 