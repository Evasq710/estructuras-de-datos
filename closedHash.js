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

function ejemploDotHashConListasAnidadas(){
    let tabla = `digraph G {
        subgraph cluster_0 {
            label = "Tabla hash";
            style=filled;
            color=lightgrey;
            fillcolor="palegreen";
            edge[color="palegreen"];
            node [shape = "box" fillcolor="white:grey" style="filled"];
            node[shape=record label= "{0}|<p0>"]0;
            node[shape=record label= "{1}|<p0>"]1;
            node[shape=record label= "{2\\nVendedor: vendedor2\\nCliente: cliente1\\nTotal: Q 100}|<p0>"]2;
            node[shape=record label= "{3}|<p0>"]3;
            node[shape=record label= "{4\\nVendedor: vendedor4\\nCliente: cliente1\\nTotal: Q 100}|<p0>"]4;
            node[shape=record label= "{5}|<p0>"]5;
            node[shape=record label= "{6\\nVendedor: vendedor6\\nCliente: cliente1\\nTotal: Q 100}|<p0>"]6;
            node[shape=record label= "{7\\nVendedor: vendedor8\\nCliente: cliente1\\nTotal: Q 100}|<p0>"]7;
            node[shape=record label= "{8\\nVendedor: vendedor8\\nCliente: cliente1\\nTotal: Q 100}|<p0>"]8;
            node[shape=record label= "{9}|<p0>"]9;
            node[shape=record label= "{10}|<p0>"]10;
            node[shape=record label= "{11}|<p0>"]11;
            
            0->1->2->3->4->5->6->7->8->9->10->11;
        }
    
        subgraph cluster_1 {
            label = "Productos vendidos";
            fillcolor="grey";
            style="filled";
            node [shape = "box" fillcolor="white" style="filled"];
            nodo11[label= "[110] producto1\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo12[label= "[112] producto2\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo13[label= "[13] producto3\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo14[label= "[144] producto4\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            
            nodo11 -> nodo12;
            nodo12 -> nodo13;
            nodo13 -> nodo14;
            {rank = same; nodo11; nodo12; nodo13; nodo14};
        }
    
        subgraph cluster_2 {
            label = "Productos vendidos";
            fillcolor="grey";
            style="filled";
            node [shape = "box" fillcolor="white" style="filled"];
            nodo21[label= "[110] producto1\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo22[label= "[112] producto2\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo23[label= "[13] producto3\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo24[label= "[144] producto4\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            
            nodo21 -> nodo22;
            nodo22 -> nodo23;
            nodo23 -> nodo24;
            {rank = same; nodo21; nodo22; nodo23; nodo24};
        }
    
        subgraph cluster_3 {
            label = "Productos vendidos";
            fillcolor="grey";
            style="filled";
            node [shape = "box" fillcolor="white" style="filled"];
            nodo31[label= "[110] producto1\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo32[label= "[112] producto2\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo33[label= "[13] producto3\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo34[label= "[144] producto4\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            
            nodo31 -> nodo32;
            nodo32 -> nodo33;
            nodo33 -> nodo34;
            {rank = same; nodo31; nodo32; nodo33; nodo34};
        }
    
        subgraph cluster_4 {
            label = "Productos vendidos";
            fillcolor="grey";
            style="filled";
            node [shape = "box" fillcolor="white" style="filled"];
            nodo41[label= "[110] producto1\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo42[label= "[112] producto2\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo43[label= "[13] producto3\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo44[label= "[144] producto4\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            
            nodo41 -> nodo42;
            nodo42 -> nodo43;
            nodo43 -> nodo44;
            {rank = same; nodo41; nodo42; nodo43; nodo44};
        }
    
        subgraph cluster_5 {
            label = "Productos vendidos";
            fillcolor="grey";
            style="filled";
            node [shape = "box" fillcolor="white" style="filled"];
            nodo51[label= "[110] producto1\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo52[label= "[112] producto2\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo53[label= "[13] producto3\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            nodo54[label= "[144] producto4\\nPrecio: Q 10, Cantidad: 10\\nSubtotal: Q 100"];
            
            nodo51 -> nodo52;
            nodo52 -> nodo53;
            nodo53 -> nodo54;
            {rank = same; nodo51; nodo52; nodo53; nodo54};
        }
        
        2:p0 -> nodo11;
        4:p0 -> nodo21;
        6:p0 -> nodo31;
        7:p0 -> nodo41;
        8:p0 -> nodo51;
    }`
    return tabla;
}