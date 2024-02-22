import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware( req ) {
  const authorizationHeader = req.headers.get( 'apiKey' )
  const authorizationEnvironment = process.env.AUTHORIZATION_API_KEY

  if ( authorizationHeader !== authorizationEnvironment ) {
    return NextResponse.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}