import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'khaborghor_bangla_news_secret_key_2026_super_secure';

export function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function authenticate(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
      return res.status(401).json({ error: 'অনুগ্রহ করে লগইন করুন' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ error: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'অবৈধ অথবা মেয়াদোত্তীর্ণ টোকেন' });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'এই কার্যক্রমের জন্য আপনার অনুমতি নেই' });
    }
    next();
  };
}
