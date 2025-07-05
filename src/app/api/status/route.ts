import { NextResponse } from 'next/server'
import { testSupabaseConnection, isSupabaseConfigured } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const status = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      supabase: {
        configured: isSupabaseConfigured(),
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configured' : 'missing',
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'configured' : 'missing'
      },
      fileStorage: {
        dataDirectoryExists: false,
        indexFileExists: false,
        problemSetCount: 0
      }
    }

    // Check file storage
    try {
      const dataDir = path.join(process.cwd(), 'data')
      const indexPath = path.join(dataDir, 'index.json')
      
      status.fileStorage.dataDirectoryExists = fs.existsSync(dataDir)
      status.fileStorage.indexFileExists = fs.existsSync(indexPath)
      
      if (status.fileStorage.indexFileExists) {
        const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
        status.fileStorage.problemSetCount = indexData.problem_sets?.length || 0
      }
    } catch (error) {
      console.error('Error checking file storage:', error)
    }

    // Test Supabase connection
    let supabaseStatus = { connected: false, error: 'Not tested', hasData: false }
    if (status.supabase.configured) {
      const testResult = await testSupabaseConnection()
      supabaseStatus = {
        connected: testResult.connected,
        error: testResult.error || '',
        hasData: testResult.hasData || false
      }
    }

    return NextResponse.json({
      ...status,
      supabase: {
        ...status.supabase,
        connection: supabaseStatus
      }
    })
  } catch (error) {
    console.error('Error in status check:', error)
    return NextResponse.json({ 
      error: 'Status check failed',
      details: String(error)
    }, { status: 500 })
  }
}