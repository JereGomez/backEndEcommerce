const errorHandler = (error, request, response, next)=> {
  console.log( `error ${error.error}`) // log the error
  let mensaje = error.mensaje;
  const status = error.status || 400
  response.status(status).send({error: error.mensaje+" "+error.error})
}

export default errorHandler;