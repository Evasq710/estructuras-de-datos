class nodoDoble{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
        //Nodo que apuntara a las pilas que habrán por cada nodo doble de la lista (PILAS en LISTA DOBLE)
        this.pila = new Pila();
    }
}

class listaDoble{
    constructor(){
        this.primero = null;
    }

    insertar(dato){
        let nuevo = new nodoDoble(dato);
        if(this.primero == null){
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                aux = aux.siguiente;
            };
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
    }

    mostrar(){
        let aux = this.primero;
        console.log("***** Mostrar lista *****")
        while(aux != null){
            console.log("> " + aux.dato);
            //mostrando todos los datos que hayan en la pila, por nodo en la lista doble
            aux.pila.mostrarPila();
            aux = aux.siguiente;
        }
    }

    insertarNodoPilaEnNodoDoble(datoLista, valorInsertar){
        let aux = this.primero;
        while(aux!=null){
            if(datoLista == aux.dato){
                aux.pila.push(valorInsertar);
                console.log(`Se insertó el dato ${valorInsertar} en la pila ubicada en el dato ${datoLista} de la lista doble.`)
                return
            }
            aux = aux.siguiente;
        }
        console.log(`No se encontró el dato ${datoLista} en la lista Doble.`)
        return null
    }
}

class nodoPila{
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
        let nuevo = new nodoPila(dato);

        if(this.pilaVacia()){
            this.tope = nuevo;
        }else{
            nuevo.siguiente = this.tope;
            this.tope = nuevo;
        }
        this.size++;
    }

    pop(){
        let aux = this.tope;
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
        // console.log("***** Mostrar Pila *****");
        while(aux != null){
            console.log("   -> " + aux.dato);
            aux = aux.siguiente;
        }
    }

    getSize(){
        return this.size;
    }
}

let lista = new listaDoble();
lista.insertar(1);
lista.insertar(2);
lista.insertar(3);
lista.insertar(4);
lista.insertar(5);

lista.insertarNodoPilaEnNodoDoble(2, 10);
lista.insertarNodoPilaEnNodoDoble(2, 20);
lista.insertarNodoPilaEnNodoDoble(2, 30);

lista.insertarNodoPilaEnNodoDoble(5, 100);
lista.insertarNodoPilaEnNodoDoble(5, 200);
lista.insertarNodoPilaEnNodoDoble(5, 300);

lista.mostrar();