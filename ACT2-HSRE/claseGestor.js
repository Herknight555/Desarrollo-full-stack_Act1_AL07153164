class GestorTareas {
    constructor() {
        const guardados = localStorage.getItem('tareas');
        if (guardados) {
            const datos = JSON.parse(guardados);
            this.tareas = datos.map(p => {
                const tarea = new Tarea(p.nombre);
                tarea.id = p.id;
                tarea.destacado = p.destacado;
                return tarea;
            });
        } else {
            this.tareas = [];
        }
    }

    agregarTarea(nombre) {
        const nuevaTarea = new Tarea(nombre);
        this.tareas.push(nuevaTarea);
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
        return nuevaTarea;
    }

    listarTareas() {
        return this.tareas;
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(p => p.id !== id);
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    editarTarea(id, nuevoNombre) {
        const tarea = this.tareas.find(p => p.id === id);
        if (tarea) {
            tarea.nombre = nuevoNombre;
            localStorage.setItem('tareas', JSON.stringify(this.tareas));
        }
    }

    toggleDestacado(id) {
        const tarea = this.tareas.find(p => p.id === id);
        if (tarea) {
            tarea.toggleDestacado();
            localStorage.setItem('tareas', JSON.stringify(this.tareas));
        }
    }
}
