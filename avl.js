class Nodo{
    constructor(dato){
        this.dato = dato;
        this.izquierdo = null;
        this.derecho = null;
        this.altura = 0;
    }
}

class Avl{
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
                
                //Si se inserta en el subarbol izquierdo, validar el posible FE negativo (Hd - Hi)
                let factorEquilibrio = this.getAltura(raiz_actual.derecho) - this.getAltura(raiz_actual.izquierdo);
                if(factorEquilibrio == -2){
                    //Se insertó en el hijo de raiz actual.izquierdo, Caso 1 o Caso 4
                    if(nuevo.dato < raiz_actual.izquierdo.dato){
                        //FE -1 de raiz_actual.izquierdo, Caso 1, Rotación Izq-Izq
                        //Haciendo la rotación
                        console.log("Caso 1, Rotación Izq-Izq");
                        raiz_actual = this.rotacionSimpleIzquierda(raiz_actual);
                    }else{
                        //FE 1 de raiz_actual.izquierdo, Caso 4, Rotación Izq-Der
                        console.log("Caso 4, Rotación Izq-Der");
                        raiz_actual = this.rotacionIzquierdaDerecha(raiz_actual);
                    }
                }
            } else if (nuevo.dato > raiz_actual.dato){
                //Tomando el camino de la derecha
                raiz_actual.derecho = this.insertarNodo(raiz_actual.derecho, nuevo);
                
                //Si se inserta en el subarbol derecho, validar el posible FE positivo 2 (Hd - Hi)
                let factorEquilibrio = this.getAltura(raiz_actual.derecho) - this.getAltura(raiz_actual.izquierdo);
                if(factorEquilibrio == 2){
                    //Se insertó en el hijo de raiz actual.derecho, Caso 2 o Caso 3
                    if(nuevo.dato < raiz_actual.derecho.dato){
                        //FE -1 de raiz_actual.derecho, Caso 3, Rotación Der-Izq
                        console.log("Caso 3, Rotación Der-Izq");
                        raiz_actual = this.rotacionDerechaIzquierda(raiz_actual);
                    }else{
                        //FE 1 de raiz_actual.derecho, Caso 2, Rotación Der-Der
                        console.log("Caso 2, Rotación Der-Der");
                        raiz_actual = this.rotacionSimpleDerecha(raiz_actual);
                    }
                }
            } else {
                console.log(`No se insertó el dato ${nuevo.dato}, ya que ya existe`)
            }
            

            //Una vez insertado el nodo, se recalcula la altura de la raiz actual, con la altura máxima de los hijos
            //AQUI ERA EL ERROR, NO SE LE HABÍA SUMADO 1 A LA RAIZ ACTUAL
            raiz_actual.altura = this.alturaMaxima(this.getAltura(raiz_actual.izquierdo), this.getAltura(raiz_actual.derecho)) + 1;

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
                let factorEquilibrio = this.getAltura(raizActual.derecho) - this.getAltura(raizActual.izquierdo);
                console.log(`F.E. valor < raiz.dato ---> ${factorEquilibrio}`);
                if(factorEquilibrio == -2){
                    let factorEquilibrioIzq = this.getAltura(raizActual.izquierdo.derecho) - this.getAltura(raizActual.izquierdo.izquierdo);
                    if(factorEquilibrioIzq == -1){
                        console.log("Caso 1, Rotación Izq-Izq");
                        raizActual = this.rotacionSimpleIzquierda(raizActual);
                    }else{
                        console.log("Caso 4, Rotación Izq-Der");
                        raizActual = this.rotacionIzquierdaDerecha(raizActual);
                    }
                }else if(factorEquilibrio == 2){
                    let factorEquilibrioDer = this.getAltura(raizActual.derecho.derecho) - this.getAltura(raizActual.derecho.izquierdo);
                    if(factorEquilibrioDer == 1){
                        console.log("Caso 2, Rotación Der-Der");
                        raizActual = this.rotacionSimpleDerecha(raizActual);
                    }else{
                        console.log("Caso 3, Rotación Der-Izq");
                        raizActual = this.rotacionDerechaIzquierda(raizActual);
                    }
                }
                raizActual.altura = this.alturaMaxima(this.getAltura(raizActual.izquierdo), this.getAltura(raizActual.derecho)) + 1;
                return raizActual;
            }else if(valor > raizActual.dato){
                raizActual.derecho = this.eliminarNodo(raizActual.derecho, valor);
                let factorEquilibrio = this.getAltura(raizActual.derecho) - this.getAltura(raizActual.izquierdo);
                console.log(`F.E. valor > raiz.dato ---> ${factorEquilibrio}`);
                if(factorEquilibrio == -2){
                    let factorEquilibrioIzq = this.getAltura(raizActual.izquierdo.derecho) - this.getAltura(raizActual.izquierdo.izquierdo);
                    if(factorEquilibrioIzq == -1){
                        console.log("Caso 1, Rotación Izq-Izq");
                        raizActual = this.rotacionSimpleIzquierda(raizActual);
                    }else{
                        console.log("Caso 4, Rotación Izq-Der");
                        raizActual = this.rotacionIzquierdaDerecha(raizActual);
                    }
                }else if(factorEquilibrio == 2){
                    let factorEquilibrioDer = this.getAltura(raizActual.derecho.derecho) - this.getAltura(raizActual.derecho.izquierdo);
                    if(factorEquilibrioDer == 1){
                        console.log("Caso 2, Rotación Der-Der");
                        raizActual = this.rotacionSimpleDerecha(raizActual);
                    }else{
                        console.log("Caso 3, Rotación Der-Izq");
                        raizActual = this.rotacionDerechaIzquierda(raizActual);
                    }
                }
                raizActual.altura = this.alturaMaxima(this.getAltura(raizActual.izquierdo), this.getAltura(raizActual.derecho)) + 1;
                return raizActual;
            }else if(valor == raizActual.dato){
                if(raizActual.izquierdo == null && raizActual.derecho == null){
                    //El nodo es hoja, no tiene hijos
                    raizActual = null;
                }
                else if(raizActual.izquierdo == null){
                    //Tiene hijo derecho
                    raizActual = raizActual.derecho;
                }
                else if(raizActual.derecho == null){
                    //Tiene hijo izquierdo
                    raizActual = raizActual.izquierdo;
                }
                else {
                    //Tiene hijo izquierdo y derecho
                    //Buscamos la menor clave de los mayores (derecho)
                    let menorNodo = this.obtenerMenorNodo(raizActual.derecho);
                    //Sustituyendo el dato menor en el nodo a eliminar
                    console.log(`Menor de los mayores: ${menorNodo.dato}, eliminando ${valor}`)
                    raizActual.dato = menorNodo.dato;
                    //Eliminando el menor de los mayores, que pasó a ser la raizActual
                    raizActual.derecho = this.eliminarNodo(raizActual.derecho, menorNodo.dato)
                }
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

    getAltura(nodo){
        if(nodo != null){
            return nodo.altura;
        }
        //Si es nulo
        return -1;
    }

    alturaMaxima(altura1, altura2){
        if(altura2 > altura1){
            return altura2;
        }
        return altura1;
    }

    rotacionSimpleIzquierda(nodo){
        //Caso 1
        //Declarando como auxiiar al subarbol izquierdo, esta será la nueva raíz nodo
        let auxiliar = nodo.izquierdo;
        //Quitando el subarbol hijo derecho del auxiliar, y poniendolos como hijos izquierdos del nodo
        //El auxiliar queda solo con su subarbol izquierdo
        nodo.izquierdo = auxiliar.derecho;
        //El subarbol derecho del auxiliar será el que antes era el nodo, con nuevo subarbol izquierdo hijo
        auxiliar.derecho = nodo;
        //Recalculando las alturas de los nodos
        auxiliar.altura = this.alturaMaxima(this.getAltura(auxiliar.derecho), this.getAltura(auxiliar.izquierdo)) + 1;
        nodo.altura = this.alturaMaxima(this.getAltura(nodo.derecho), this.getAltura(nodo.izquierdo)) + 1;

        //Retornando el auxiliar, que funge como nodo raíz
        return auxiliar;
    }

    rotacionSimpleDerecha(nodo){
        //Caso 2
        //Declarando como auxiiar al subarbol derecho, esta será la nueva raíz nodo
        let auxiliar = nodo.derecho;
        //Quitando el subarbol hijo izquierdo del auxiliar, y poniendolos como hijos derechos del nodo
        //El auxiliar queda solo con su subarbol derecho
        nodo.derecho = auxiliar.izquierdo;
        //El subarbol izquierdo del auxiliar será el que antes era el nodo, con nuevo subarbol derecho hijo
        auxiliar.izquierdo = nodo;
        //Recalculando las alturas de los nodos
        auxiliar.altura = this.alturaMaxima(this.getAltura(auxiliar.derecho), this.getAltura(auxiliar.izquierdo)) + 1;
        nodo.altura = this.alturaMaxima(this.getAltura(nodo.derecho), this.getAltura(nodo.izquierdo)) + 1;

        //Retornando el auxiliar, que funge como nodo raíz
        return auxiliar;
    }

    rotacionDerechaIzquierda(nodo){
        //Caso 3
        nodo.derecho = this.rotacionSimpleIzquierda(nodo.derecho);
        nodo = this.rotacionSimpleDerecha(nodo)

        return nodo;
    }

    rotacionIzquierdaDerecha(nodo){
        //Caso 4
        nodo.izquierdo = this.rotacionSimpleDerecha(nodo.izquierdo);
        nodo = this.rotacionSimpleIzquierda(nodo)

        return nodo;
    }



    recorridoPreorden(raiz_actual){
        if(raiz_actual != null){
            console.log(`${raiz_actual.dato}, con altura ${raiz_actual.altura}`);
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

let arbol = new Avl()
// //EJEMPLO 1 ELIMINACION AVL
// arbol.insertar(8);
// arbol.insertar(5);
// arbol.insertar(11);
// arbol.insertar(2);
// arbol.insertar(6);
// arbol.insertar(9);
// arbol.insertar(15);
// arbol.insertar(0);
// arbol.insertar(3);
// arbol.insertar(7);
// arbol.insertar(10);
// arbol.insertar(14);
// arbol.insertar(18);
// arbol.insertar(4);
// arbol.eliminar(15);
// arbol.eliminar(6);
// //EJEMPLO 2 ELIMINACION AVL
arbol.insertar(10);
arbol.insertar(100);
arbol.insertar(20);
arbol.insertar(80);
arbol.insertar(40);
arbol.insertar(70);
arbol.eliminar(40);
// //Caso 2
// arbol.insertar(10);
// arbol.insertar(20);
// arbol.insertar(30);
// //Caso 3
// arbol.insertar(10);
// arbol.insertar(30);
// arbol.insertar(20);
// //Caso 4
// arbol.insertar(30);
// arbol.insertar(10);
// arbol.insertar(20);
// console.log("***RECORRIDO PREORDEN****");
// arbol.recorridoPreorden(arbol.raiz);
// console.log("***RECORRIDO InOrden****");
// arbol.recorridoInorder(arbol.raiz);
// console.log("***RECORRIDO PostOrden****");
// arbol.recorridoPostorder(arbol.raiz);
arbol.generarDot();