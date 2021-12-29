class nodo{
    constructor(dato){
        this.dato = dato;
    }
}

class hashCerrado{
    constructor(size, porcentajeMax){
        this.claves = this.iniciarLista(size);
        this.clavesUsadas = 0;
        this.size = size;
        this.porcentajeMax = porcentajeMax;
    }

    iniciarLista(size){
        let claves = [];
        for(let i = 0; i < size; i++){
            claves[i] = null;
        }
        return claves;
    }

    insertar(dato){
        let nuevoNodo = new nodo(dato);
        let index = this.funcionDivision(dato);
        if(this.claves[index] == null){
            this.claves[index] = nuevoNodo;
            this.clavesUsadas++;
        }else{
            //colisión
            index = this.resolucionColisiones(index);
            this.claves[index] = nuevoNodo;
            this.clavesUsadas++;
        }
        this.rehashing();
    }

    funcionDivision(dato){
        return dato % this.size;
    }

    resolucionColisiones(index){
        // Método de exploración cuadrática, moverse 0^2, 1^2, 3^2, ... posiciones, hasta encontrar un campo disponible
        let newIndex = 0;
        let i = 0;
        let disponible = false;

        while(!disponible){
            newIndex = index + Math.pow(i, 2);
            if(newIndex >= this.size){
                newIndex = newIndex % this.size;
            }
            if(this.claves[newIndex] == null){
                disponible = true;
            }
            i++;
        }
        // Retornando el nuevo indice, en caso hayan ocurrido saltos debido a colisiones
        return newIndex;
    }

    rehashing(){
        let porcentajeUso = this.clavesUsadas*100/this.size;
        if (porcentajeUso >= this.porcentajeMax){
            this.printTabla();
            console.log(">>> REHASHING MÉTODO NUMEROS PRIMOS")
            // Buscando el siguiente número primo, este será el nuevo tamaño del arreglo
            let esPrimo = false;
            let newSize = this.size;
            while(!esPrimo){
                newSize++;
                let divisiones = 0;
                for(let i = newSize; i > 0; i--){
                    if((newSize % i) == 0){
                        // división exacta
                        divisiones++;
                    }
                }
                if(divisiones == 2){
                    // es primo
                    esPrimo = true;
                }
            }
            console.log(`>>> NUEVO TAMAÑO: ${newSize}`);
            // Creando el arreglo con el nuevo tamaño
            let clavesAuxiliar = this.claves;
            this.size = newSize;
            this.claves = this.iniciarLista(newSize);
            this.clavesUsadas = 0;
            clavesAuxiliar.forEach(clave => {
                if(clave != null){
                    this.insertar(clave.dato);
                }
            })
        }else{
            this.printTabla();
        }
    }

    printTabla(){
        let tabla = "["
        this.claves.forEach(clave => {
            if(clave == null){
                tabla += " --"
            }else{
                tabla += ` ${clave.dato}`
            }
        });
        tabla += ` ] ${this.clavesUsadas*100/this.size}% usado, ${this.porcentajeMax}% máximo`
        console.log(tabla);
    }
}

let newTabla = new hashCerrado(7, 50);
newTabla.insertar(10);
newTabla.insertar(8);
newTabla.insertar(2);
newTabla.insertar(9);