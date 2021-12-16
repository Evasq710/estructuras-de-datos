class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }
}

class Cola{
    constructor(){
        this.frente = null;
        this.fondo = null;
        this.size = 0;
    }

    //encolar
    enQueue(dato){
        let nuevo = new Nodo(dato);
        
        if(this.frente == null){
            this.frente = nuevo;
            this.fondo = nuevo;
        } else {
            //Inserción al final
            this.fondo.siguiente = nuevo;
            this.fondo = nuevo;
        }
        this.size++;
    }

    //desencolar
    deQueue(){
        let aux = this.frente;
        this.frente = this.frente.siguiente;
        this.size--;
        return aux
    }

    mostrarCola(){
        let aux = this.frente;
        console.log("***** Mostrar Cola *****");
        while(aux != null){
            console.log("-> " + aux.dato);
            aux = aux.siguiente;
        }
        if(this.frente != null){
            console.log("FRENTE: " + this.frente.dato);
            console.log("FONDO: " + this.fondo.dato);
        }
    }
}

let colaNueva = new Cola();

colaNueva.enQueue(5);
colaNueva.mostrarCola();
colaNueva.enQueue(4);
colaNueva.mostrarCola();
colaNueva.enQueue(50);
colaNueva.mostrarCola();
colaNueva.enQueue(60);
colaNueva.mostrarCola();
console.log("Tamaño de la cola: " + colaNueva.size + "\n");

let frente = colaNueva.deQueue();
console.log("Frente eliminado: " + frente.dato);
colaNueva.mostrarCola();
console.log("Tamaño de la cola: " + colaNueva.size + "\n");

frente = colaNueva.deQueue();
console.log("Frente eliminado: " + frente.dato);
colaNueva.mostrarCola();
console.log("Tamaño de la cola: " + colaNueva.size + "\n");

frente = colaNueva.deQueue();
console.log("Frente eliminado: " + frente.dato);
colaNueva.mostrarCola();
console.log("Tamaño de la cola: " + colaNueva.size + "\n");

frente = colaNueva.deQueue();
console.log("Frente eliminado: " + frente.dato);
colaNueva.mostrarCola();
console.log("Tamaño de la cola: " + colaNueva.size + "\n");