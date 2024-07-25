import instance from "./AWS_Fetch.js";

export const agregarUsuario = async (nombre, correo, edad) => {
    
    const form = new FormData();
    form.append('correo', correo);
    form.append('edad', edad);
    form.append('nombre', nombre);

    await instance.post('/agregar', form) 
    .then(function (response) {
 
      alert(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

    }

export  async function eliminarUsuario(nombre) {

    const form = new FormData();
    form.append('nombre', nombre);
    await instance.put('/borrar', form)
    .then(function (response) {
 
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

export async function cambiarCorreo(correo, nombre) {
    const form = new FormData();
    form.append('nombre', nombre);
    form.append('correo', correo);
    await instance.put('/modificarCorreo', form)
    .then(function (response) {
 
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

export async function cambiarNombre(correo, nombre) {
    const form = new FormData();
    form.append('nombre', nombre);
    form.append('correo', correo);
    await instance.put('/modificarNombre', form)
    .then(function (response) {
 
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

