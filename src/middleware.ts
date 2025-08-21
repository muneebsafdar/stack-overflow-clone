import { NextResponse, NextRequest } from 'next/server'
import getOrCeateDb from './models/server/dbConfig';
import createStorageCollection from './models/server/storage.collection';

 
export async function middleware(request: NextRequest) {

    await Promise.all([
        getOrCeateDb(),
        createStorageCollection()
    ])
  return NextResponse.next()
}
 
export const config = {
  /*
   * match all request paths except for the ones that starts with:
   * - api
   * - _next/static
   * - _next/image
   * - favicon.ico
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
