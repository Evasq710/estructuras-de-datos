'use strict'
//3 tipos de nodos, nodo interno, nodo cabecera (M y N), nodo matriz

/**
 * ==================LISTA INTERNA==================
 */

class NodoInterno{
    constructor(valor, m, n){
        //m -> filas
        //n -> columnas
        //      n1  n2
        //      v   v
        //m1 ->
        //m2 ->
        this.valor = valor;
        this.m = m;
        this.n = n;

        //Apuntadores para insertar en m, la n delimita el orden o la posición
        this.siguiente = null;
        this.anterior = null;
        //Apuntadores para insertar en n, la m delimita el orden o la posición
        this.arriba = null;
        this.abajo = null;
    }
}

class ListaInterna{
    constructor(){
        this.primero = null;
    }

    // Insertando en una fila ------->
    insertarEnM(valor, m, n){
        let nuevoNodo = new NodoInterno(valor, m, n);

        if(this.primero == null){
            this.primero = nuevoNodo;
        }else if(nuevoNodo.n < this.primero.n){
            nuevoNodo.siguiente = this.primero;
            this.primero.anterior = nuevoNodo;
            this.primero = nuevoNodo;
        }else{
            let actual = this.primero;
            while(actual != null){
                if(nuevoNodo.n < actual.n){
                    nuevoNodo.siguiente = actual;
                    nuevoNodo.anterior = actual.anterior;
                    actual.anterior.siguiente = nuevoNodo;
                    actual.anterior = nuevoNodo;
                    break;
                }else if(nuevoNodo.n == actual.n){
                    console.log(`No fue posible insertar el nodo en (${m}, ${n}), ya existe uno en esa posición`);
                    break;
                }else if(actual.siguiente == null){
                    actual.siguiente = nuevoNodo;
                    nuevoNodo.anterior = actual;
                    break
                }
                actual = actual.siguiente;
            }
        }
    }

    // Insertando en una columna v v v v v v v v v
    insertarEnN(valor, m, n){
        let nuevoNodo = new NodoInterno(valor, m, n);

        if(this.primero == null){
            this.primero = nuevoNodo;
        }else if(nuevoNodo.m < this.primero.m){
            nuevoNodo.abajo = this.primero;
            this.primero.arriba = nuevoNodo;
            this.primero = nuevoNodo;
        }else{
            let actual = this.primero;
            while(actual != null){
                if(nuevoNodo.m < actual.m){
                    nuevoNodo.abajo = actual;
                    nuevoNodo.arriba = actual.arriba;
                    actual.arriba.abajo = nuevoNodo;
                    actual.arriba = nuevoNodo;
                    break;
                }else if(nuevoNodo.m == actual.m){
                    console.log(`No fue posible insertar el nodo en (${m}, ${n}), ya existe uno en esa posición`);
                    break;
                }else if(actual.abajo == null){
                    actual.abajo = nuevoNodo;
                    nuevoNodo.arriba = actual;
                    break
                }
                actual = actual.abajo;
            }
        }
    }

    recorrerM(){
        let actual = this.primero;
        console.log("Datos en M: ");
        while(actual != null){
            console.log(`\t${actual.valor} en (${actual.m}, ${actual.n})`);
            actual = actual.siguiente;
        }
    }

    recorrerN(){
        let actual = this.primero;
        console.log("Datos en N: ");
        while(actual != null){
            console.log(`\t${actual.valor} en (${actual.m}, ${actual.n})`);
            actual = actual.abajo;
        }
    }
}

/**
 * ==================CABECERAS (LISTAS DOBLES) PARA FILAS-COLUMNAS CON LISTAS INTERNAS==================
 */

class nodoCabecera{
    constructor(posicion){
        this.posicion = posicion;
        this.siguiente = null;
        this.anterior = null;
        this.listaInterna = new ListaInterna()
    }
}

class ListaCabecera{
    constructor(){
        this.primero = null;
    }

    insertarCabecera(nuevaCabecera){

        if(this.primero == null){
            this.primero = nuevaCabecera;
        }else if(nuevaCabecera.posicion < this.primero.posicion){
            nuevaCabecera.siguiente = this.primero;
            this.primero.anterior = nuevaCabecera;
            this.primero = nuevaCabecera;
        }else{
            let actual = this.primero;
            while(actual != null){
                if(nuevaCabecera.posicion < actual.posicion){
                    nuevaCabecera.siguiente = actual;
                    nuevaCabecera.anterior = actual.anterior;
                    actual.anterior.siguiente = nuevaCabecera;
                    actual.anterior = nuevaCabecera;
                    break;
                }else if(nuevaCabecera.posicion == actual.posicion){
                    console.log(`No fue posible insertar el nodo cabecera con posicion ${nuevaCabecera.posicion}, ya existe uno con este dato`);
                    break;
                }else if(actual.siguiente == null){
                    actual.siguiente = nuevaCabecera;
                    nuevaCabecera.anterior = actual;
                    break
                }
                actual = actual.siguiente;
            }
        }
    }

    obtenerCabecera(posicion){
        let actual = this.primero;
        while(actual != null){
            if(actual.posicion == posicion){
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    recorrer(){
        let actual = this.primero;
        while(actual != null){
            console.log(`${actual.posicion}`);
            actual = actual.siguiente;
        }
    }
}


/**
 * ==================MATRIZ DINÁMICA CON LISTAS DE CABECERAS==================
 */

class Matriz{
    constructor(){
        this.cabecerasM = new ListaCabecera();
        this.cabecerasN = new ListaCabecera();
    }

    insertar(valor, m, n){
        let nodoCabeceraM = this.cabecerasM.obtenerCabecera(m);
        let nodoCabeceraN = this.cabecerasN.obtenerCabecera(n);

        // Creando la cabecera en dado caso no exista
        if(nodoCabeceraM == null){
            nodoCabeceraM = new nodoCabecera(m);
            this.cabecerasM.insertarCabecera(nodoCabeceraM);
        }
        if(nodoCabeceraN == null){
            nodoCabeceraN = new nodoCabecera(n);
            this.cabecerasN.insertarCabecera(nodoCabeceraN)
        }

        //Insertando en la fila (M)
        nodoCabeceraM.listaInterna.insertarEnM(valor, m, n);
        //Insertando en columna (N)
        nodoCabeceraN.listaInterna.insertarEnN(valor, m, n);
    }

    recorrerMatriz(){
        console.log("*****CABECERAS EN FILAS (M)******");
        let actualCabeceraM = this.cabecerasM.primero;
        while(actualCabeceraM != null){
            console.log(`>FILA: ${actualCabeceraM.posicion}`);
            actualCabeceraM.listaInterna.recorrerM();
            actualCabeceraM = actualCabeceraM.siguiente;
        }
        console.log("\n*****CABECERAS EN COLUMNAS (N)******");
        let actualCabeceraN = this.cabecerasN.primero;
        while(actualCabeceraN != null){
            console.log(`>COLUMNA: ${actualCabeceraN.posicion}`);
            actualCabeceraN.listaInterna.recorrerN();
            actualCabeceraN = actualCabeceraN.siguiente;
        }
    }

    graficarMatriz(){
        let cadena = "digraph Matriz{\nlayout = neato;\n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        // Nodo matriz
        // pos = (n, m) = (x, y) IV Cuadrante
        //Al empezar en (0, 0), solo se grafican correctamente valores de 1 en adelante, tanto en M como en N
        //Si se quiere que los valores admitidos sean de 0 en adelante, cambiar el inicio a -1, 1, y las cabeceras en base a esto
        cadena+="node[label = \"Nodo Matriz\", fillcolor=\"darkolivegreen1\", pos = \"0,0!\"]principal;\n"

        //***************************************CABECERAS******************************************
        // Cabeceras N para columnas(SUPERIORES, INSERTADAS EN M = 0)
        let actualN = this.cabecerasN.primero;
        while(actualN!=null){
            cadena+= "node[label = "+actualN.posicion+" fillcolor=\" azure1\" pos = \""+actualN.posicion+",0!\"]n"+actualN.posicion+";\n"
            actualN = actualN.siguiente;
        }
        // Enlaces dobles en las cabeceras de las columnas
        actualN = this.cabecerasN.primero;
        while(actualN.siguiente != null){
            cadena+="n"+actualN.posicion+"->"+"n"+actualN.siguiente.posicion+";\n"
            cadena+="n"+actualN.siguiente.posicion+"->"+"n"+actualN.posicion+";\n"
            actualN = actualN.siguiente;
        }
        // Enlace de Nodo matriz a las cabeceras N
        if(this.cabecerasN.primero!= null){
            cadena+="principal->n"+this.cabecerasN.primero.posicion+";\n";
        }

        // Cabeceras M para filas (IZQUIERDA, INSERTADAS EN N = 0)
        let actualM = this.cabecerasM.primero;
        while(actualM!=null){
            cadena+="node[label = "+actualM.posicion+" fillcolor=\" azure1\" pos = \"0,-"+actualM.posicion+"!\"]m"+actualM.posicion+";\n"
            actualM = actualM.siguiente;
        }
        // Enlaces dobles en las cabeceras de las filas
        actualM = this.cabecerasM.primero;
        while(actualM.siguiente != null){
            cadena+="m"+actualM.posicion+"->"+"m"+actualM.siguiente.posicion+";\n"
            cadena+="m"+actualM.siguiente.posicion+"->"+"m"+actualM.posicion+";\n"
            actualM = actualM.siguiente;
        }
        // Enlace simple de Nodo matriz a las cabeceras M
        if(this.cabecerasM.primero!= null){
            cadena+="principal->m"+this.cabecerasM.primero.posicion+";\n";
        }

        //***************************************NODOS INTERNOS******************************************
        //Recorriendo las cabeceras en N (columnas) para ingresar a sus listas internas, y CREAR LOS NODOS
        actualN = this.cabecerasN.primero;
        while(actualN != null){
            let actualInterno = actualN.listaInterna.primero;
            while(actualInterno!=null){
                cadena+="\tnode[label = "+actualInterno.valor+" fillcolor=\" gold2\" pos = \""+actualInterno.n+",-"+actualInterno.m+"!\"]n"+actualInterno.n+"m"+actualInterno.m+";\n"
                actualInterno = actualInterno.abajo;
            }

            // Enlaces dobles entre nodos internos, recorriendo N
            actualInterno = actualN.listaInterna.primero;
            while(actualInterno.abajo!= null){
                cadena+="   n"+actualInterno.n+"m"+actualInterno.m+"->n"+actualInterno.abajo.n+"m"+actualInterno.abajo.m+";\n";
                cadena+="   n"+actualInterno.abajo.n+"m"+actualInterno.abajo.m+"->n"+actualInterno.n+"m"+actualInterno.m+";\n";
                actualInterno= actualInterno.abajo;
            }
            // Enlace simple de cabecera N a su primer nodo interno
            if(actualN.listaInterna.primero != null){
                cadena+="n"+actualN.posicion+"->"+"n"+actualN.listaInterna.primero.n+"m"+actualN.listaInterna.primero.m+";\n";
            }

            actualN = actualN.siguiente;
        }

        actualM = this.cabecerasM.primero;
        // Enlaces dobles entre nodos internos, recorriendo M
        while(actualM!=null){
            let actualInterno = actualM.listaInterna.primero;
            while(actualInterno.siguiente!= null){
                cadena+="   n"+actualInterno.n+"m"+actualInterno.m+"->n"+actualInterno.siguiente.n+"m"+actualInterno.siguiente.m+";\n";
                cadena+="   n"+actualInterno.siguiente.n+"m"+actualInterno.siguiente.m+"->n"+actualInterno.n+"m"+actualInterno.m+";\n";
                actualInterno= actualInterno.siguiente;
            }
            // Enlace simple de cabecera M a su primer nodo interno
            if(actualM.listaInterna.primero!= null){
                cadena+="m"+actualM.posicion+"->"+"n"+actualM.listaInterna.primero.n+"m"+actualM.listaInterna.primero.m+";\n";
            }
            actualM = actualM.siguiente;
        }

        cadena+= "\n}"
        console.log(cadena);
    }
}

let matrizDinamica = new Matriz();

matrizDinamica.insertar(5, 1, 1);
matrizDinamica.insertar(6, 2, 1);
matrizDinamica.insertar(1, 2, 2);
matrizDinamica.insertar(2, 3, 2);
matrizDinamica.insertar(7, 4, 3);
matrizDinamica.insertar(7, 4, 4);
matrizDinamica.insertar(7, 2, 10);

matrizDinamica.recorrerMatriz();
matrizDinamica.graficarMatriz();