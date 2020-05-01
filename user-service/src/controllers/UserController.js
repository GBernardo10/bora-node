import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { privateKey } from '../config/signature';

export const create = async (req, res) => {
  const { name, username, mail, password } = req.body;
  if (!username || !mail || !password) res.sendStatus(400);

  await User.create({ name, username, mail, password })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => res.status(500).send({ msg: err.name }));
};

export const findAllUsers = async (req, res) => {
  await User.findAll()
    .then(result => {
      if (!result.length) return res.sendStatus(204);
      res.json(result);
    })
    .catch(() => res.sendStatus(500));
};

export const findUserByMail = async (req, res) => {
  const { mail } = req.params;
  await User.findOne({
    where: {
      mail,
    },
  }).then(result => res.json(result));
};

export const findByUsername = async (req, res) => {
  const { username } = req.params;
  await User.findOne({
    where: {
      username,
    },
  })
    .then(result => {
      if (!result) return res.sendStatus(204);
      res.json(result);
    })
    .catch(() => res.sendStatus(500));
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  await User.findOne({ where: { username } })
    .then(async result => {
      if (!result) return res.sendStatus(204);
      if (compareSync(password, result.password)) {
        const token = sign(
          { id: result.id, mail: result.mail },
          await privateKey(),
          {
            expiresIn: '5m',
            algorithm: 'RS256',
          }
        );
        res.status(200).send({ token });
      } else {
        res.sendStatus(401);
      }
    })
    .catch(() => res.sendStatus(500));
};
