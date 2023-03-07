# backEndSistemEcommerce

En este proyecto se replica el sistema backEnd de un Ecommerce. Desde la creación de usuario e inicio de sesión con autenticación utilizando JWT. La posibilidad de agregar productos a un carrito y realizar una orden. Mails de confirmación a la hora de crear una nueva cuenta, y realizar un pedido. 
Usuario de tipo Admin, el cual con permisos especiales puede realizar CRUD completo de todas las áreas del sistema. Al mismo le ingresan mails de notificación en el momento en el que se creó un nuevo usuario o se realizó una nueva orden.


Se realizó una arquitectura en capas MVC, el cual muestra una organización en la organización del proyecto y permite una escalabilidad del mismo.
Utiliza middlewares de autenticación de datos.  Cuenta con controladores dedicados  para cada router, los cuales manejan la información previamente para luego enviarla a la parte de persistencia y también a la hora de procesar la información antes de realizar una respuesta.

El proyecto cuenta con Patrones de diseño, DAOS para las clases que manejan información con la base de datos, interfaces para declaración de las clases, patrón singleton para evitar la creación de múltiples instancias de una misma clase, y Factory para la creación de los DAO. Codeados con TypeScript, código el cual luego fue compilado utilizando webpack.

El sistema se implementó con MongoDB, con su respectiva creación de esquemas, utilizando TypeScript para mantener un tipado y orden permitiendo manejar interfaces.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
