import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ error: 'No token provided.' });
  }

  const parts = authorization.split(' ');

  if (!parts.length === 2) {
    return res.status(403).send({ error: 'Token error.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(403).send({ error: 'Poorly formatted token.' });
  }

  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: 'Invalid token.' });
    }

    req.clientId = decoded.clientId;
    return next();
  });
};

export default authMiddleware;
