import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        // Get the current URL to build the process-queue URL
        const url = new URL(request.url)
        const baseUrl = `${url.protocol}//${url.host}`

        // Call the process-queue endpoint
        const response = await fetch(`${baseUrl}/api/process-queue`, {
            method: 'POST',
        })

        const data = await response.json()

        return NextResponse.json({
            success: true,
            message: 'Processing triggered',
            result: data
        })

    } catch (error: any) {
        console.error('Error triggering processing:', error)
        return NextResponse.json(
            { error: 'Failed to trigger processing', details: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    // Same as GET - allows both methods
    return GET(request)
} 