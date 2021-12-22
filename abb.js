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

    eliminar(valor){
        if(this.raiz != null){
            this.raiz = this.eliminarNodo(this.raiz, valor);
        }else{
            console.log(`El árbol está vacío, por lo que ${valor} no se encuentra guardado aún.`)
        }
    }

    eliminarNodo(raizActual, valor){
        if(raizActual != null){
            if(valor < raizActual.dato){
                raizActual.izquierdo = this.eliminarNodo(raizActual.izquierdo, valor);
                return raizActual;
            }else if(valor > raizActual.dato){
                raizActual.derecho = this.eliminarNodo(raizActual.derecho, valor);
                return raizActual;
            }else if(valor == raizActual.dato){
                if(raizActual.izquierdo == null && raizActual.derecho == null){
                    //El nodo es hoja, no tiene hijos
                    raizActual = null;
                    return raizActual;
                }
                if(raizActual.izquierdo == null){
                    //Tiene hijo derecho
                    raizActual = raizActual.derecho;
                    return raizActual;
                }
                if(raizActual.derecho == null){
                    //Tiene hijo izquierdo
                    raizActual = raizActual.izquierdo;
                    return raizActual;
                }
                //Tiene hijo izquierdo y derecho
                //Buscamos la menor clave de los mayores (derecho)
                let menorNodo = this.obtenerMenorNodo(raizActual.derecho);
                //Sustituyendo el dato menor en el nodo a eliminar
                console.log(`Menor de los mayores: ${menorNodo.dato}, eliminando ${valor}`)
                raizActual.dato = menorNodo.dato;
                //Eliminando el menor de los mayores, que pasó a ser la raizActual
                raizActual.derecho = this.eliminarNodo(raizActual.derecho, menorNodo.dato)
                return raizActual;
            }
        }else{
            console.log(`El dato ${valor} no existe en el árbol.`)
            return null;
        }
    }

    obtenerMenorNodo(raizActual){
        if(raizActual.izquierdo == null){
            //La raíz actual es el menor
            return raizActual;
        }
        //Si no, moverse por los subárboles a la izquierda
        return this.obtenerMenorNodo(raizActual.izquierdo);
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
// console.log("***RECORRIDO PREORDEN****");
// arbol.recorridoPreorden(arbol.raiz);
// console.log("***RECORRIDO InOrden****");
// arbol.recorridoInorder(arbol.raiz);
// console.log("***RECORRIDO PostOrden****");
// arbol.recorridoPostorder(arbol.raiz);

//Eliminando hojas
// arbol.eliminar(3);
// arbol.eliminar(17);
//Eliminando nodos con hijos izquierdo, o derecho
// arbol.eliminar(7);
// arbol.eliminar(25);
//Eliminando nodos con hijos izquierdo y derecho
// arbol.eliminar(5);
// arbol.eliminar(15);
//Eliminando nodo inexistente
arbol.eliminar(6);

arbol.generarDot();