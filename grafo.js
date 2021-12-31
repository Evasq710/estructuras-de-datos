// El grafo se representará por medio de una lista doble enlazada
// Cada nodo del grafo, tendrá a su vez, 
class nodoDoble{
    constructor(id, nodoPrincipal = true, peso = null){
        this.id = id;
        this.siguiente = null;
        this.anterior = null;
        this.peso = peso;
        // Cada nodo principal tendra una lista doble, con sus nodos adyacentes en ella
        if(nodoPrincipal){
            this.listaAdyacentes = new listaAdyacentes();
        }else{
            // Si no es nodo principal, es nodo adyacente
            this.listaAdyacentes = null;
        }
    }
}

class listaAdyacentes{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertarAdyacente(id, peso){
        let nuevoNodo = new nodoDoble(id, false, peso);
        if(this.primero == null){
            this.primero = nuevoNodo;
            this.ultimo = nuevoNodo;
        }else if(this.primero == this.ultimo){
            this.primero.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.primero;
            this.ultimo = nuevoNodo;
        }else{
            this.ultimo.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.ultimo;
            this.ultimo = nuevoNodo;
        }
    }
}

class grafo{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertarNodo(id){
        let nuevoNodo = new nodoDoble(id);
        if(this.primero == null){
            this.primero = nuevoNodo;
            this.ultimo = nuevoNodo;
        }else if(this.primero == this.ultimo){
            this.primero.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.primero;
            this.ultimo = nuevoNodo;
        }else{
            this.ultimo.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.ultimo;
            this.ultimo = nuevoNodo;
        }
    }

    obtenerNodo(id){
        let actual = this.primero;
        while(actual != null){
            if(actual.id == id){
                return actual;
            }
            actual =  actual.siguiente;
        }
        return null;
    }

    agregarAdyacente(idNodo, idAdyacente, peso){
        let nodoPrincipal = this.obtenerNodo(idNodo);
        if(nodoPrincipal != null){
            nodoPrincipal.listaAdyacentes.insertarAdyacente(idAdyacente, peso);
        }else{
            console.log(`El nodo principal con el id ${idNodo} no existe.`)
        }
    }

    mostrarGrafo(){
        let actual = this.primero;
        console.log("***** LISTA DE ADYACENCIA DEL GRAFO *****");
        while(actual != null){
            console.log(`[ ${actual.id} ]`);
            let actualAdyacente = actual.listaAdyacentes.primero;
            while(actualAdyacente != null){
                console.log(`  > ${actualAdyacente.id}`);
                actualAdyacente = actualAdyacente.siguiente;
            }
            console.log("-------------------")
            actual =  actual.siguiente;
        }
    }

    generarDotGrafo(){
        // NO DIRIGIDO
        let cadena= "graph grafo{\nrankdir=\"LR\"\n"
        let nodoActual = this.primero;
        while(nodoActual != null){
            cadena += `n${nodoActual.id}[label= \"${nodoActual.id}\"];\n`
            nodoActual = nodoActual.siguiente;
        }
        // relaciones entre nodos
        nodoActual = this.primero;
        while(nodoActual != null){
            let adyacenteActual = nodoActual.listaAdyacentes.primero;
            while(adyacenteActual != null){
                cadena += `n${nodoActual.id} -- n${adyacenteActual.id} [label=\"${adyacenteActual.peso}km\"];\n`
                // cadena += `n${nodoActual.id} -- n${adyacenteActual.id};\n`
                // cadena+= "n"+nodoActual.id+"";
                adyacenteActual = adyacenteActual.siguiente;
            }
            nodoActual = nodoActual.siguiente;
        }
        cadena += "}"
        console.log(cadena);
    }
}

let nuevoGrafo = new grafo();
// Nodos principales
nuevoGrafo.insertarNodo(4);
nuevoGrafo.insertarNodo(6);
nuevoGrafo.insertarNodo(9);
nuevoGrafo.insertarNodo(11);
nuevoGrafo.insertarNodo(7);
nuevoGrafo.insertarNodo(10);

// Indicando los adyacentes
nuevoGrafo.agregarAdyacente(4,6,5);
nuevoGrafo.agregarAdyacente(6,4,5);
nuevoGrafo.agregarAdyacente(6,9,2);
nuevoGrafo.agregarAdyacente(9,6,2);
nuevoGrafo.agregarAdyacente(7,9,4);
nuevoGrafo.agregarAdyacente(9,7,4);
nuevoGrafo.agregarAdyacente(4,10,4);
nuevoGrafo.agregarAdyacente(10,4,4);
nuevoGrafo.agregarAdyacente(9,11,9);
nuevoGrafo.agregarAdyacente(11,9,9);
nuevoGrafo.agregarAdyacente(10,11,1);
nuevoGrafo.agregarAdyacente(11,10,1);
nuevoGrafo.agregarAdyacente(7,10,8);
nuevoGrafo.agregarAdyacente(10,7,8);
nuevoGrafo.agregarAdyacente(6,11,6);
nuevoGrafo.agregarAdyacente(11,6,6);

nuevoGrafo.mostrarGrafo();
nuevoGrafo.generarDotGrafo();