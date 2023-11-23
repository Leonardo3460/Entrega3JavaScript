document.getElementById('registrarBtn').addEventListener('click', function() {
    document.getElementById('registro').style.display = 'block';
    document.getElementById('listado').style.display = 'none';
    document.getElementById('registrarBtn').style.display = 'none';
    document.getElementById('consultarBtn').style.display = 'block';
});
  
document.getElementById('consultarBtn').addEventListener('click', function() {
    document.getElementById('listado').style.display = 'block';
    document.getElementById('registro').style.display = 'none';
    document.getElementById('consultarBtn').style.display = 'none';
    document.getElementById('registrarBtn').style.display = 'block';
});

let editando = false;

function cargar() {
    const lista = document.getElementById("lista");
    
    fetch("http://localhost/prueba/recibir.php")
        .then(response => response.json())
        .then(vehiculos => {
            lista.innerHTML = "";
            vehiculos.forEach((vehiculo, index) => {
                const row = lista.insertRow();
                const imagenCell = row.insertCell(0);
                const unoCell = row.insertCell(1);
                const dosCell = row.insertCell(2);
                const actionsCell = row.insertCell(3);
                    
                imagenCell.innerHTML = '<img src="'+vehiculo.imagen+'" width="200" height="200">'+vehiculo.id;
                imagenCell.id = "imagenid";
                unoCell.innerHTML = "Marca del Vehículo:<br>"+vehiculo.marca+"<hr>Modelo del Vehículo:<br>"+vehiculo.modelo+"<hr>Año del Vehículo:<br>"+vehiculo.año;
                unoCell.id = "uno";
                dosCell.innerHTML = "Tipo del vehículo:<br>"+vehiculo.tipo+"<hr>Descripción del Vehículo:<br>"+vehiculo.descripcion;
            
                const editarBoton = document.createElement('button');
                editarBoton.textContent = 'Modificar Registro';
                editarBoton.id = 'modificar';
                editarBoton.classList.add('btn', 'btn-secondary');
                editarBoton.addEventListener('click', () => {
                    editando = true;
                    document.getElementById('registro').style.display = 'block';
                    document.getElementById('listado').style.display = 'none';
                    document.getElementById('registrarBtn').style.display = 'none';
                    document.getElementById('consultarBtn').style.display = 'block';

                    document.getElementById("marca").value = vehiculo.marca;
                    document.getElementById("modelo").value = vehiculo.modelo;
                    document.getElementById("descripcion").value = vehiculo.descripcion;
                    document.getElementById("tipo").value = vehiculo.tipo;
                    document.getElementById("año").value = vehiculo.año;
                    document.getElementById("id").value = vehiculo.id;
                    document.getElementById("imagen").style.display = 'none';
                    document.getElementById("imagen1").style.display = 'none';

                    document.querySelector("button[type=submit]").textContent = "Modificar vehiculo";
                    document.querySelector("h1").textContent = "Modificar vehiculo";
                });

                const borrarBoton = document.createElement('button');
                borrarBoton.textContent = 'Eliminar Registro';
                borrarBoton.id = 'eliminar';
                borrarBoton.classList.add('btn', 'btn-danger');
                borrarBoton.addEventListener('click', () => {
                    document.getElementById("id").value = vehiculo.id;
                    const formData = new FormData();
                    const confirmar = confirm("¿Estás seguro de que quieres eliminar este vehiculo?");
                    const id = document.getElementById("id").value;
                    formData.append("id", id);
                    if (confirmar) {
                        fetch("http://localhost/prueba/eliminar.php", {
                            method: "POST",
                            body: formData
                        })
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                            form.reset();
                            cargar();
                        })
                        .catch(error => {
                            console.error("Error al eliminar la vehiculo: " + error);
                            cargar();
                        });
                    }
                });

                var espacio1 = document.createElement("br");
                var espacio2 = document.createElement("br");
                    
                actionsCell.appendChild(editarBoton);
                actionsCell.appendChild(espacio1);
                actionsCell.appendChild(espacio2);
                actionsCell.appendChild(borrarBoton);
                
        });
    })
    .catch(error => {
        console.error("Error al cargar los vehiculos: " + error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    cargar();

    const form = document.getElementById("formulario");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData();

        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const descripcion = document.getElementById("descripcion").value;
        const tipo = document.getElementById("tipo").value;
        const año = document.getElementById("año").value;
        const imagenInput = document.getElementById("imagen");
        const imagenFile = imagenInput.files[0];

        formData.append("imagen", imagenFile);
        formData.append("marca", marca);
        formData.append("modelo", modelo);
        formData.append("descripcion", descripcion);
        formData.append("tipo", tipo);
        formData.append("año", año);

        if (editando) {
            const id = document.getElementById("id").value;
            formData.append("id", id);
            fetch("http://localhost/prueba/editar.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                editando = false;
                document.querySelector("button[type=submit]").textContent = "Registrar vehiculo";
                document.querySelector("h1").textContent = "Registrar vehiculo";
                form.reset();
                cargar();

                document.getElementById('listado').style.display = 'block';
                document.getElementById('registro').style.display = 'none';
                document.getElementById('consultarBtn').style.display = 'none';
                document.getElementById('registrarBtn').style.display = 'block';
                
                document.getElementById("imagen").style.display = 'block';
                document.getElementById("imagen1").style.display = 'block';
            })
            .catch(error => {
                console.error("Error al enviar los datos de actualización: " + error);
                cargar();
                document.querySelector("button[type=submit]").textContent = "Registrar vehiculo";
                document.querySelector("h1").textContent = "Registrar vehiculo";
                form.reset();

                document.getElementById('listado').style.display = 'block';
                document.getElementById('registro').style.display = 'none';
                document.getElementById('consultarBtn').style.display = 'none';
                document.getElementById('registrarBtn').style.display = 'block';

                document.getElementById("imagen").style.display = 'block';
                document.getElementById("imagen1").style.display = 'block';
            });
        }else{
            fetch("http://localhost/prueba/enviar.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                cargar();
                form.reset();
            })
            .catch(error => {
                console.error("Error al enviar los datos: " + error);
                cargar();
                form.reset();
            });
        }
    });
});