class Nodo{
    constructor(dato){
        this.dato = dato;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class Abb{
    constructor(){
        this.raiz = null;
    }

    insertar(valor){
        let nuevo = new Nodo(valor)

        if (this.raiz == null){
            this.raiz = nuevo;
        } else {
            this.raiz = this.insertarNodo(this.raiz, nuevo);
        }
    }

    insertarNodo(raiz_actual, nuevo){
        if(raiz_actual != null){
            // Recorriendo los subárboles hijos hasta que termine de hacer la inserción, para retornar el raiz actual (this.raiz) con la inserción
            if (nuevo.dato < raiz_actual.dato){
                //Tomando el camino de la izquierda
                raiz_actual.izquierdo = this.insertarNodo(raiz_actual.izquierdo, nuevo);
            } else if (nuevo.dato > raiz_actual.dato){
                //Tomando el camino de la derecha
                raiz_actual.derecho = this.insertarNodo(raiz_actual.derecho, nuevo);
            } else {
                console.log(`No se insertó el dato ${nuevo.dato}, ya que ya existe`)
            }

            // Devuelve el this.raiz con el nuevo dato ya insertado
            return raiz_actual;
        } else {
            //El hijo es nulo, por lo que metemos el nodo en él, luego de hacer los recorridos
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    recorridoPreorden(raiz_actual){
        if(raiz_actual != null){
            console.log(raiz_actual.dato);
            this.recorridoPreorden(raiz_actual.izquierdo);
            this.recorridoPreorden(raiz_actual.derecho);
        }
    }

    recorridoInorder(raiz_actual){
        if(raiz_actual != null){
            this.recorridoInorder(raiz_actual.izquierdo);
            console.log(raiz_actual.dato);
            this.recorridoInorder(raiz_actual.derecho);
        }
    }

    recorridoPostorder(raiz_actual){
        if(raiz_actual != null){
            this.recorridoPostorder(raiz_actual.izquierdo);
            this.recorridoPostorder(raiz_actual.derecho);
            console.log(raiz_actual.dato);
        }
    }

    generarDot(){
        let cadena = "digraph arbol {\ngraph[label=\"Arbol binario\"] node[style=\"filled\", fillcolor=\"palegreen\"]\n"
        cadena += this.generarNodos(this.raiz);
        cadena+="\n";
        cadena+=this.enlazar(this.raiz);
        cadena+="\n}";
        console.log(cadena);
    }

    generarNodos(raiz_actual){
        let nodos = "";
        if(raiz_actual != null){
            nodos += `n${raiz_actual.dato}[label=\"${raiz_actual.dato}\"];\n`
            nodos += this.generarNodos(raiz_actual.izquierdo);
            nodos += this.generarNodos(raiz_actual.derecho);
        }
        return nodos;
    }

    enlazar(raiz_actual){
        let cadena="";
        if(raiz_actual != null){
            //Raiz actual padre       
            if(raiz_actual.izquierdo != null){
                cadena+= `n${raiz_actual.dato} -> n${raiz_actual.izquierdo.dato};\n`;
            }
            if(raiz_actual.derecho != null){
                cadena+= `n${raiz_actual.dato} -> n${raiz_actual.derecho.dato};\n`;
            }
            cadena += this.enlazar(raiz_actual.izquierdo);
            cadena += this.enlazar(raiz_actual.derecho);            
        }
        return cadena;
    }
}

let arbol = new Abb()
arbol.insertar(10);
arbol.insertar(5);
arbol.insertar(3);
arbol.insertar(7);
arbol.insertar(8);
arbol.insertar(15);
arbol.insertar(14);
arbol.insertar(25);
arbol.insertar(17);
console.log("***RECORRIDO PREORDEN****");
arbol.recorridoPreorden(arbol.raiz);
console.log("***RECORRIDO InOrden****");
arbol.recorridoInorder(arbol.raiz);
console.log("***RECORRIDO PostOrden****");
arbol.recorridoPostorder(arbol.raiz);

arbol.generarDot();