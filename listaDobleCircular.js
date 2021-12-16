class Nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaDobleCircular{
    constructor(){
        this.primero = null;
    }

    insertar(dato){
        let nuevo = new Nodo(dato);
        if(this.primero == null){
            this.primero = nuevo;
            this.primero.siguiente = this.primero;
            this.primero.anterior = this.primero;
        }else{
            let aux = this.primero;
            while(aux.siguiente != this.primero){
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
        }
    }

    mostrarSecuencial(){
        let aux = this.primero;
        console.log("***** Mostrar lista circular doble (de forma secuencial) *****")
        do{
            console.log("-> " + aux.dato);
            aux = aux.siguiente;
        }while(aux != this.primero);
    }

    mostrarInverso(){
        let aux = this.primero;
        console.log("***** Mostrar lista circular doble (de forma inversa) *****")
        do{
            console.log("-> " + aux.dato);
            aux = aux.anterior;
        }while(aux != this.primero);
    }
}

let nuevaListaDobleCircular = new ListaDobleCircular();

nuevaListaDobleCircular.insertar(10);
nuevaListaDobleCircular.insertar(15);
nuevaListaDobleCircular.insertar(20);
nuevaListaDobleCircular.insertar(25);
nuevaListaDobleCircular.insertar(30);

nuevaListaDobleCircular.mostrarSecuencial();
nuevaListaDobleCircular.mostrarInverso();