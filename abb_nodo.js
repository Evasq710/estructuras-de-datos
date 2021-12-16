'use strict'

class NodoBinario{
    constructor(dato){
        this.dato = dato;
        this.izquierdo = null;
        this.derecho = null;
        this.strNodosGraphviz = "";
    }

    imprimirDato(){
        console.log(this.dato);
    }

    insertarDato(dato){
        if(dato < this.dato){
            // Si el dato es menor al actual, tomamos el camino izquierdo
            if(this.izquierdo != null){
                //Si el hijo izquierdo no es nulo, se manda a insertar a su subárbol
                this.izquierdo.insertarDato(dato);
            }else{
                //Si el hijo izquierdo es nulo, el hijo izquierdo pasa a ser el nuevo nodo
                this.izquierdo = new NodoBinario(dato);
            }
        }else if(dato > this.dato){
            //El dato es mayor al actual, tomamos el camino derecho
            if(this.derecho != null){
                //Si el hijo derecho no es nulo, se manda a insertar a su subárbol
                this.derecho.insertarDato(dato);
            }else{
                //Si el hijo derecho es nulo, el hijo derecho pasa a ser el nuevo nodo
                this.derecho = new NodoBinario(dato);
            }
        }else{
            console.log(`${dato} No se pudo insertar, ya existe un dato en el árbol con este valor`);
        }
    }

    imprimirArbolPreorden(){
        console.log(this.dato);
        if(this.izquierdo != null){
            this.izquierdo.imprimirArbolPreorden();
        }
        if(this.derecho != null){
            this.derecho.imprimirArbolPreorden();
        }
    }

    imprimirArbolInOrder(){
        if(this.izquierdo != null){
            this.izquierdo.imprimirArbolInOrder();
        }
        console.log(this.dato);
        if(this.derecho != null){
            this.derecho.imprimirArbolInOrder();
        }
    }

    imprimirArbolPostOrden(){
        if(this.izquierdo != null){
            this.izquierdo.imprimirArbolPostOrden();
        }
        if(this.derecho != null){
            this.derecho.imprimirArbolPostOrden();
        }
        console.log(this.dato);
    }

    crearNodosGraphviz(datoPadre){
        if(datoPadre == null){
            this.strNodosGraphviz += `node${this.dato}[label="${this.dato}", fillcolor="cyan3"];\n`
        }else{
            this.strNodosGraphviz += `node${this.dato}[label="${this.dato}"];\n`
            this.strNodosGraphviz += `node${datoPadre} -> node${this.dato};\n`
        }

        if(this.izquierdo != null){
            this.strNodosGraphviz += this.izquierdo.crearNodosGraphviz(this.dato);
        }
        if(this.derecho != null){
            this.strNodosGraphviz += this.derecho.crearNodosGraphviz(this.dato);
        }
            
        return this.strNodosGraphviz
    }
}

class ArbolGraphviz{
    constructor(strNodos){
        this.strGraphviz = "digraph G {" +
        "graph[label=\"Arbol binario\"]" +
        "node[style=\"filled\", fillcolor=\"palegreen\"]\n"
        this.strGraphviz += strNodos
        this.strGraphviz += '}'
    }
}

var arbol = new NodoBinario(30)
arbol.insertarDato(40);
arbol.insertarDato(20);
arbol.insertarDato(10);
arbol.insertarDato(5);
arbol.insertarDato(70);
arbol.insertarDato(20);
arbol.insertarDato(7);
arbol.insertarDato(5);
arbol.insertarDato(100);
arbol.insertarDato(100);
console.log("***RECORRIDO PREORDEN****");
arbol.imprimirArbolPreorden();
console.log("***RECORRIDO InOrden****");
arbol.imprimirArbolInOrder();
console.log("***RECORRIDO PostOrden****");
arbol.imprimirArbolPostOrden();

let strNodos = arbol.crearNodosGraphviz();
let arbolGraphviz = new ArbolGraphviz(strNodos);
console.log(arbolGraphviz.strGraphviz);