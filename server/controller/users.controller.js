const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res, ) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Missing email or password' });
	}

	const user = await prisma.user.findFirst({
		where: { email },
	})

	const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
	const secret = process.env.JWT_SECRET

	if (user && isPasswordCorrect && secret) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			name: user.name,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '1h' })
		})
	}else {
		res.status(400).json({ error: 'Invalid email or password' });
	}
}

const register = async (req, res, ) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		return res.status(400).json({ error: 'Missing email or password' });
	}

	const registerUser = await prisma.user.findFirst({
		where: { email },
	})

	if (registerUser) {
		return res.status(400).json({ error: 'User already exists' });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: { email, password: hashedPassword, name },
	})

	const secret = process.env.JWT_SECRET

	if (user && secret) {
		res.status(201).json({
			id: user.id,
			email: user.email,
			name,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '1h' })
		})
	}else {
		res.status(400).json({ error: 'Invalid email or password' });
	}
}

const current = async (req, res, ) => {
	return res.status(200).json({
		id: req.user.id,
	})
}

module.exports = {
	login,
	register,
	current
}