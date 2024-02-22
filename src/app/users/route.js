import { NextResponse } from 'next/server'

import MySQL from '../../libs/mysql'

export async function GET( req ) {
  const params = req.nextUrl.searchParams
	const email = params.get( 'email' )

	try {
		let query = null

		if ( email !== null ) {
			query = `SELECT * FROM users WHERE email = '${ email }'`
		} else {
			query = `SELECT * FROM users`
		}

		const result = await MySQL( query )

		if ( result.length === 1 ) {
			return NextResponse.json({ users: result, statusCode: 200, statusMessage: 'OK' }, { status: 200 })
		} else {
			if ( result.length === 0 ) {
				const error = {
					message: 'Usuário não encontrado.',
					statusCode: 404,
					statusMessage: 'Not Found',
				}

				return NextResponse.json({ error }, { status: error.statusCode } )
			} else {
				const error = {
					message: 'Encontramos mais de um usuário com esse email. Entre em contato com o administrador do sistema.',
					statusCode: 409,
					statusMessage: 'Conflict',
				}

				return NextResponse.json({ error }, { status: error.statusCode } )
			}			
		}
	} catch ( error ) {
		return NextResponse.json({ error }, { status: 500 } )
	}
}