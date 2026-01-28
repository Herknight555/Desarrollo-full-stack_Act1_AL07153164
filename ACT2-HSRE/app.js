const botton=document.getElementById('agregarbtn');
const lista=document.getElementById('listatareas');
const input=document.getElementById('tareainput');
const mensaje=document.getElementById('mensaj');
function rederlista(){
    lista.innerHTML='';

    const tareas=gestor.listarTareas();
    tareas.forEach((tarea)=>{
        const li = crearTareaLI(tarea);
        lista.appendChild(li);
    });
}
//crear el li sin insertarlo 
function crearTareaLI(tarea){
    const li=document.createElement('li');
    
    const nombreSpan = document.createElement('span');
    nombreSpan.className = 'tarea-nombre';
    nombreSpan.textContent = tarea.nombre;
    
    const botonesDiv = document.createElement('div');
    botonesDiv.className = 'botones';
    
    // Botón Destacar
    const btnDestacar = document.createElement('button');
    btnDestacar.className = 'btn-destacar';
    btnDestacar.textContent = tarea.destacado ? 'Destacado' : 'Destacar';
    btnDestacar.addEventListener('click', () => {
        gestor.toggleDestacado(tarea.id);
        rederlista();
    });
    
    // Botón Editar
    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => {
        const nuevoNombre = prompt('Ingrese el nuevo nombre de la tarea:', tarea.nombre);
        if(nuevoNombre && nuevoNombre.trim()){
            gestor.editarTarea(tarea.id, nuevoNombre.trim());
            rederlista();
        }
    });
    
    // Botón Eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => {
        if(confirm('¿Está seguro de que desea eliminar esta tarea?')){
            gestor.eliminarTarea(tarea.id);
            rederlista();
        }
    });
    
    botonesDiv.appendChild(btnDestacar);
    botonesDiv.appendChild(btnEditar);
    botonesDiv.appendChild(btnEliminar);
    
    li.appendChild(nombreSpan);
    li.appendChild(botonesDiv);
    
    if(tarea.destacado){
        li.classList.add('destacado');
    }
    
    return li;
}

//evento para agregar tarea
botton.addEventListener('click',()=>{
    const nombre=input.value.trim();
    if(nombre){
        gestor.agregarTarea(nombre);
        input.value='';
        rederlista();
    }else{
        mensaje.textContent='Por favor ingresa un nombre válido';
    }
});

// Crear la instancia DESPUÉS de que las clases estén definidas
const gestor = new GestorTareas();

