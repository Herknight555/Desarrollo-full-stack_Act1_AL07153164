class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.id = Date.now();
        this.destacado = false;
    }

    toggleDestacado() {
        this.destacado = !this.destacado;
    }
}
