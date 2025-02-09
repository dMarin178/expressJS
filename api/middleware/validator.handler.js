import boom from '@hapi/boom';

const validatorHandler = ( schema, property ) => {
  return (req, res, next) => {
    //Eschema de Joi
    const data = req[property];
    //abortEarly: false, para que muestre todos los errores que encuentre - si es true, solo muestra el primer error
    const { error } = schema.validate(data, { abortEarly: false })
    if(error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

export default validatorHandler;
