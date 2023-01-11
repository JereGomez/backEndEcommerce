# proyectoFinalCoderHouse
proyectoFinalCoderHouse

Routers:
    mainApi:   GET uri => home
               GET uri/info => informacion del servidor


    apiUser:   POST uri/api/user/signup => se hace signUp y se crea un usuario nuevo
               POST uri/api/user/login  => se hace login y se responde con un token jwt para futuras peticiones
                GET uri/api/user/logout => se hace logOut y se elimina la session


    apiProd:    GET     uri/api/productos/ => se devuelven todos los productos disponibles
                GET     uri/api/productos/:id => se devuelve producto deseado segun ID
                GET     uri/api/productos/cat/:categoria => se devuelve categoria deseada
                POST    uri/api/productos/ => crea nuevo producto
                PUT     uri/api/productos/:id => actualiza poducto por ID (necesario ser administrador)
                DELETE  uri/api/productos/:id => elimina producto por ID (necesario ser administrador)

    apiOrdenes: GET     uri/api/ordenes/ => devuelve todas las ordenes en la base de datos (necesario ser administrador)
                GET     uri/api/ordenes/user => devuelve las ordenes del usuario iniciado en session
                GET     uri/api/ordenes/:id => devuelve orden por ID
                POST    uri/api/ordenes => crea una orden nueva
                PUT     uri/api/ordenes/:id => actualiza orden por ID
                DELETE  uri/api/ordenes/:id => elimina orden por ID

    apiCarrito  GET     uri/api/carrito/productos => devuelce productos de un carrito especifico
                POST    uri/api/carrito/productos/:id_prod => agrega productos al carrito de session por ID
                PUT     uri/api/carrito/vaciar => Vacia carrito de session
                DELETE  uri/api/carrito/:id => Elimina carrito completo
                DELETE  uri/api/carrito/productos/:id_prod =>elimina producto por ID de carrito de session