const errorHandler = (error, request, response, next)=> {
  console.log( `error ${ error.error}`) // log the error
  const status = error.status || 400
  response.status(status).send(`${error.mensaje} => ${error.error}`)
}

export default errorHandler;