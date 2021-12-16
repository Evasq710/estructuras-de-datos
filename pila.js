class nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }
}

class Pila{
    constructor(){
        this.tope = null;
        this.size = 0;
    }

    push(dato){
        let nuevo = new nodo(dato);

        if(this.pilaVacia()){
            this.tope = nuevo;
        }else{
            //Inserción al inicio de la lista
            //Según está logica, tope = primero, esto será una pila porque al hacer pop, se saca el tope o primero de la misma manera
            nuevo.siguiente = this.tope;
            this.tope = nuevo;
        }
        this.size++;
    }

    pop(){
        let aux = this.tope;
        //Se saca el primero, que es el último que ha sido guardado en la pila (el tope -ver push-)
        this.tope = this.tope.siguiente;
        this.size--;
        return aux;
    }

    peek(){
        return this.tope.dato;
    }

    pilaVacia(){
        if(this.tope == null){
            return true;
        }
        return false;
    }

    mostrarPila(){
        let aux = this.tope;
        console.log("***** Mostrar Pila *****");
        while(aux != null){
            console.log("-> " + aux.dato);
            aux = aux.siguiente;
        }
    }

    getSize(){
        return this.size;
    }
}

function nuevaPila(){
    let pilaNueva = new Pila();
    
    pilaNueva.push(15);
    pilaNueva.mostrarPila();
    pilaNueva.push(1);
    pilaNueva.mostrarPila();
    pilaNueva.push(5);
    pilaNueva.mostrarPila();
    pilaNueva.push(7);
    pilaNueva.mostrarPila();
    console.log("Tamaño de la pila: " + pilaNueva.getSize() + "\n");
    
    let tope = pilaNueva.pop();
    console.log("Se elimina: " + tope.dato);
    pilaNueva.mostrarPila();
    console.log("Tamaño de la pila: " + pilaNueva.getSize() + "\n");
    
    tope = pilaNueva.pop();
    console.log("Se elimina: " + tope.dato);
    pilaNueva.mostrarPila();
    console.log("Tamaño de la pila: " + pilaNueva.getSize() + "\n");
    
    console.log("Nuevo tope: " + pilaNueva.peek())
}
