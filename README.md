# Api banco

Esta api fue pensada para el usuario y el administrador del banco.
El futuro usuario puede:
registrarse:Se le pide varios datos y se usan validators que proveen mas seguridad a la api.
loguearse:Se le pide el email y la contraseña y se verifica en la base de datos.
retirar o ingresar dinero:Con un token previamente creado cuando el usuario se registra o se loguea,el usuario puede retirar o ingresar dinero a su caja de ahorro.
resetear su contraseña:se le pide el email al usuario y via mailtrap le llega un link con una pagina para crear una nueva contraseña.
Enviar un comentario al banco:El usuario puede enviar un comentario al banco,con el token previamente generado en su login o registro.



El administrador del banco tiene acceso:
Todos los datos de los usuarios registrados.
Los datos de un usuario ingresando una caja de ahorro como parametro.
Todos los comentarios echo por los usuarios.
A eliminar un usuario segun su caja de ahorro.
Al dinero depositado en la caja de ahorro de todos los usuarios.
Al dinero depositado de un usuario ingresando su caja de ahorro como parametro.
A cambiar la cantidad de dinero que tenga un usuario poniendo su caja de ahorro como parametro.
A cambiar el numero de caja de ahorro poniendo su antigua caja de ahorro como parametro.