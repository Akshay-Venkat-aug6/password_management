import Joi from 'joi-browser';

const Schema = (
  Joi
    .object()
    .keys(
      {
        username: Joi.string().min(5).label('Username'),
        email: Joi.string().email().label('Email'),
        password: Joi.string().min(8).label('Password')
      }
    )
  )

export default Schema