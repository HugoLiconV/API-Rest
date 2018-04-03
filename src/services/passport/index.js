import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
// eslint-disable-next-line import/named
import { jwtSecret, masterKey } from '../../config'
import User, { schema } from '../../api/user/model'

export const password = () => (req, res, next) =>
	passport.authenticate('password', { session: false }, (err, user, info) => {
		if (err && err.param) {
			return res.status(400).json(err)
		} else if (err || !user) {
			return res.status(401).end()
		}
		req.logIn(user, { session: false }, (err) => {
			if (err) return res.status(401).end()
			next()
		})
	})(req, res, next)

export const master = () =>
	passport.authenticate('master', { session: false })

export const token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
	passport.authenticate('token', { session: false }, (err, user, info) => {
		if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
			return res.status(401).end()
		}
		req.logIn(user, { session: false }, (err) => {
			if (err) return res.status(401).end()
			next()
		})
	})(req, res, next)

//  Verificación de correo y contraseña.
passport.use('password', new BasicStrategy((email, password, done) => {
	const userSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })

	// Verifica que el email y la contraseña sean válidos con respecto al esquema.
	userSchema.validate({ email, password }, (err) => {
		if (err) done(err)
	});
	// Busca al usuario mediante el email.
	User.findOne({ email }).then((user) => {
		if (!user) {
			done(true);
			return null
		}
		return user.authenticate(password, user.password).then((user) => {
			done(null, user)
			return null
		}).catch(done)
	})
}))

// La master_key sirve para que el rest API solo sea usado por ciertos clientes.
passport.use('master', new BearerStrategy((token, done) => {
	if (token === masterKey) {
		done(null, {})
	} else {
		done(null, false)
	}
}))

passport.use('token', new JwtStrategy({
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromExtractors([
		ExtractJwt.fromUrlQueryParameter('access_token'),
		ExtractJwt.fromBodyField('access_token'),
		ExtractJwt.fromAuthHeaderWithScheme('Bearer')
	])
}, ({ id }, done) => {
	User.findById(id).then((user) => {
		done(null, user)
		return null
	}).catch(done)
}))
