// ************* ARBOL B DE ORDEN P *************

// NODO ARBOL B
class nodoB{
    constructor(dato){
        this.dato = dato;
        //apuntadores de lista (tipo nodoB)
        this.siguiente = null;
        this.anterior = null;
        //apuntadores de arbol (tipo página)
        this.izquierda = null;
        this.derecha = null;
    }
}

// LISTA ORDENADA PARA ALMACENAR LOS VALORES, ESTA ESTARÁ EN LAS PÁGINAS
class listaNodoB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    insertarNodoB(nuevoNodo){
        if (this.primero == null){
            this.primero = nuevoNodo;
            this.ultimo = nuevoNodo;
            this.size++;
            return true;
        }else{
            if(nuevoNodo.dato < this.primero.dato){
                nuevoNodo.siguiente = this.primero;
                this.primero.anterior = nuevoNodo;
                //Cambiando los punteros de las páginas
                // [nuevoNodo]-puntero a página derecha- -puntero a página izquierda-[this.primero]
                this.primero.izquierda = nuevoNodo.derecha;
                // --------------------------------------------
                this.primero = nuevoNodo;
                this.size++;
                return true;
            }
            if(nuevoNodo.dato > this.ultimo.dato){
                this.ultimo.siguiente = nuevoNodo;
                nuevoNodo.anterior = this.ultimo;
                //Cambiando los punteros de las páginas
                // [this.ultimo]-puntero a página derecha- -puntero a página izquierda-[nuevoNodo]
                this.ultimo.derecha = nuevoNodo.izquierda;
                // --------------------------------------------
                this.ultimo = nuevoNodo;
                this.size++;
                return true;
            }
            // El nodo debe de estar entre el primero y el último
            let nodoActual = this.primero;
            while(nodoActual != null){
                if(nuevoNodo.dato < nodoActual.dato){
                    nuevoNodo.siguiente = nodoActual;
                    nuevoNodo.anterior = nodoActual.anterior;
                    //Cambiando los punteros de las páginas
                    // [nodoActual.anterior] v [nuevoNodo] v [nodoActual]
                    nodoActual.izquierda = nuevoNodo.derecha;
                    nodoActual.anterior.derecha = nuevoNodo.izquierda;
                    // --------------------------------------------
                    nodoActual.anterior.siguiente = nuevoNodo;
                    nodoActual.anterior = nuevoNodo;
                    this.size++;
                    return true;
                }
                if(nuevoNodo.dato == nodoActual.dato){
                    console.log(`Ya existe un nodoB en la lista con el dato ${nuevoNodo.dato}, no se pudo hacer la inserción`)
                    return false
                }
                nodoActual = nodoActual.siguiente;
            }
            console.log(`Error, el algoritmo no está ingresando el nodoB con el dato ${nuevoNodo.dato} a la lista, verificar código.`)
            return false;
        }
    }
}

// PAGINA DEL ARBOL B
class paginaArbolB{
    constructor(orden){
        this.esRaiz = false;
        this.orden = orden;
        this.clavesMinimas = (orden-1)/2;
        this.clavesMaximas = orden - 1;
        this.size = 0;
        this.listaClaves = new listaNodoB();
    }

    insertarNodoEnPagina(nodo){
        let insertado = this.listaClaves.insertarNodoB(nodo);
        if(insertado){
            this.size = this.listaClaves.size;
            if(this.size <= this.clavesMaximas){
                // Si el retorno es la instancia de una página (este caso), el tamaño de la página es el correcto, solo se asigna
                // Si el retorno es la instancia de un nodo, la página se dividió
                return this;
            }
            // this.size > this.clavesMaximas
            // this.size == this.orden
            // Retorno de un nodoB, que contendrá como páginas a la página dividida
            return this.dividirPagina(this);
        }
        //Ocurrió un error en la inserción
        return null;
    }

    dividirPagina(pagina){
        let nodoMedio = pagina.listaClaves.primero;
        let posNodoMedio;
        for(posNodoMedio = 0; posNodoMedio < (pagina.clavesMaximas/2); posNodoMedio++){
            //Para posicionarnos en la mediana, la mitad de la página
            //Si el orden = 5, claves máximas = 4, for posNodoMedio = 0; posNodoMedio < 2; posNodoMedio++
            nodoMedio = nodoMedio.siguiente;
        }

        //Pasar todos los valores de la página a nodos independientes
        let nodosPagina = [];
        let actual = pagina.listaClaves.primero;
        while(actual != null){
            nodosPagina.push(actual);
            actual = actual.siguiente;
        }
        pagina.listaClaves.primero = null;
        pagina.listaClaves.ultimo = null;
        pagina.listaClaves.size = 0;

        //Creando las nuevas páginas izquerda y derecha, resultado de la división de la página
        let paginaIzquierda = new paginaArbolB(pagina.orden);
        let paginaDerecha = new paginaArbolB(pagina.orden);

        let contador = 0;
        nodosPagina.forEach(nodo => {
            nodo.anterior = null;
            nodo.siguiente = null;
            if(contador < posNodoMedio){
                // Si el orden = 5, contador0, contador1, contador2 == posNodoMedio se ignora
                paginaIzquierda.insertarNodoEnPagina(nodo);
            }else if(contador > posNodoMedio){
                // Si el orden = 5, contador2 == posNodoMedio se ignora, contador3, contador4
                paginaDerecha.insertarNodoEnPagina(nodo);
            }
            contador++;
        });
        nodoMedio.izquierda = paginaIzquierda;
        nodoMedio.derecha = paginaDerecha;
        // Retorno de un nodoB, que contendrá como páginas a la página dividida
        return nodoMedio;
    }

    paginaEsHoja(){
        if(this.listaClaves.primero.izquierda == null){
            return true;
        }
        return false;
    }
}

// ARBOL B
class arbolB{
    constructor(orden){
        this.raiz = null;
        this.orden = orden;
        this.altura = 0;
    }

    insertarNuevoNodo(dato){
        let nuevoNodo = new nodoB(dato);

        if(this.raiz == null){
            this.raiz = new paginaArbolB(this.orden);
            this.raiz.raiz = true;
            // Retorna una instancia de pagina en este punto
            this.raiz = this.raiz.insertarNodoEnPagina(nuevoNodo);
        }else if(this.altura == 0){
            // Insertando en la raíz
            let respuesta = this.raiz.insertarNodoEnPagina(nuevoNodo);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página, la raiz no se dividió
                this.raiz = respuesta;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es una página dividida, la raíz se dividió
                this.altura++;
                this.raiz = new paginaArbolB(this.orden);
                this.raiz = this.raiz.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 1, un retorno de insertarNodoEnPagina no fue ni página ni nodo.")
            }
        }else{
            // Existe más de una página, se debe recorrer el árbol para hacer la inserción
            let respuesta = this.insertarRecorrer(nuevoNodo, this.raiz);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página, la raiz no se dividió
                this.raiz = respuesta;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es una página dividida, la raíz se dividió
                this.altura++;
                this.raiz = new paginaArbolB(this.orden);
                this.raiz = this.raiz.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 2, un retorno de insertarRecorrer no fue ni página ni nodo.")
            }
        }
    }

    insertarRecorrer(nuevoNodo, paginaActual){
        if(paginaActual.paginaEsHoja()){
            let respuesta = paginaActual.insertarNodoEnPagina(nuevoNodo);
            // instancia de una página, o de un nodo B en caso se haya dividido
            return respuesta;
        }
        if(nuevoNodo.dato < paginaActual.listaClaves.primero.dato){
            let respuesta = this.insertarRecorrer(nuevoNodo, paginaActual.listaClaves.primero.izquierda);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página
                paginaActual.listaClaves.primero.izquierda = respuesta;
                return paginaActual;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es la página izquierda dividida, se debe insertar en la página actual
                return paginaActual.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 3, un retorno de insertarRecorrer no fue ni página ni nodo.")
            }
        }else if(nuevoNodo.dato > paginaActual.listaClaves.ultimo.dato){
            let respuesta = this.insertarRecorrer(nuevoNodo, paginaActual.listaClaves.ultimo.derecha);
            if(respuesta instanceof paginaArbolB){
                // La inserción está dentro del tamaño permitido de la página
                paginaActual.listaClaves.ultimo.derecha = respuesta;
                return paginaActual;
            }else if(respuesta instanceof nodoB){
                // respuesta es un nodoB, el cual es la página derecha dividida, se debe insertar en la página actual
                return paginaActual.insertarNodoEnPagina(respuesta);
            }else{
                console.log("Caso no reportado 4, un retorno de insertarRecorrer no fue ni página ni nodo.")
            }
        }else{
            //El nuevoNodo se ubica entre los apuntadores de en medio
            let nodoActual = paginaActual.listaClaves.primero;
            while(nodoActual != null){
                if(nuevoNodo.dato < nodoActual.dato){
                    let respuesta = this.insertarRecorrer(nuevoNodo, nodoActual.izquierda);
                    if(respuesta instanceof paginaArbolB){
                        // La inserción está dentro del tamaño permitido de la página
                        nodoActual.izquierda = respuesta;
                        nodoActual.anterior.derecha = respuesta;
                        return paginaActual;
                    }else if(respuesta instanceof nodoB){
                        // respuesta es un nodoB, el cual es la página izquierda dividida, se debe insertar en la página actual
                        return paginaActual.insertarNodoEnPagina(respuesta);
                    }
                }
                if(nuevoNodo.dato == nodoActual.dato){
                    return paginaActual;
                }
                nodoActual = nodoActual.siguiente;
            }
        }

        return this;
    }

    graficarArbolB(){
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        cadena+= this.graficarNodos(this.raiz);
        cadena+=  this.graficarEnlaces(this.raiz);
        cadena+="}\n"

        return cadena;
    }

    graficarNodos(raizActual){
        let cadena="";

        if(raizActual.paginaEsHoja()){
            // Graficando la página con todos los nodos
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raizActual.listaClaves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.dato+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raizActual.listaClaves.primero.dato+";\n";
            return cadena;
        }else{
            // Graficando la página raiz con todos los nodos
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raizActual.listaClaves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.dato+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raizActual.listaClaves.primero.dato+";\n";

            //recorrer los hijos de cada nodo
            aux = raizActual.listaClaves.primero;
            while(aux != null){
                cadena+= this.graficarNodos(aux.izquierda);
                aux = aux.siguiente;
            }
            cadena+= this.graficarNodos(raizActual.listaClaves.ultimo.derecha);
            return cadena;
        }   
    }

    graficarEnlaces(raizActual){
        let cadena="";
        if(raizActual.paginaEsHoja()){
            return ""+raizActual.listaClaves.primero.dato+";\n";
        }else{
            let aux = raizActual.listaClaves.primero;
            let contador =0;
            let txtRaizActual = raizActual.listaClaves.primero.dato;
            while(aux != null){
                cadena+= "\n"+txtRaizActual+":p"+contador+"->"+this.graficarEnlaces(aux.izquierda);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+txtRaizActual+":p"+contador+"->"+this.graficarEnlaces(raizActual.listaClaves.ultimo.derecha);
            return cadena;
        }
    }
}

//El parámetro es el orden del árbol, el código está pensado para que sea siempre IMPAR, MAYOR IGUAL A 3
let nuevoArbolB = new arbolB(5);

nuevoArbolB.insertarNuevoNodo(5);
nuevoArbolB.insertarNuevoNodo(1);
nuevoArbolB.insertarNuevoNodo(7);
nuevoArbolB.insertarNuevoNodo(3);
nuevoArbolB.insertarNuevoNodo(13);
nuevoArbolB.insertarNuevoNodo(8);
nuevoArbolB.insertarNuevoNodo(35);
nuevoArbolB.insertarNuevoNodo(14);
nuevoArbolB.insertarNuevoNodo(10);
nuevoArbolB.insertarNuevoNodo(9);
nuevoArbolB.insertarNuevoNodo(12);
nuevoArbolB.insertarNuevoNodo(17);
nuevoArbolB.insertarNuevoNodo(22);
nuevoArbolB.insertarNuevoNodo(25);
nuevoArbolB.insertarNuevoNodo(100);
nuevoArbolB.insertarNuevoNodo(150);
nuevoArbolB.insertarNuevoNodo(220);
nuevoArbolB.insertarNuevoNodo(325);
console.log(nuevoArbolB.graficarArbolB());