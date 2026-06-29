import jwt from 'jsonwebtoken';

// POST /api/auth/login
export const login = (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ id: username }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};
