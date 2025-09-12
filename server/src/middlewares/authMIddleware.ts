
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface DecodedToken {
  id: string;
}

export const authMiddleware = (req: Request & { user?: DecodedToken }, res: Response, next: NextFunction): any => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized User' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = { id: decoded.id }; 
    console.log(token,'hai from authMIddleware')
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
