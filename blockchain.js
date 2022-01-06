class bloque {
    constructor(indice, data, hashAnterior, dificultad = 0) {
        let fechaActual = new Date()
        let fecha = fechaActual.getDate() + '-' + (fechaActual.getMonth() + 1) + '-' + fechaActual.getFullYear();
        var hora = fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();
        this.fecha = `${fecha}::${hora}`;

        this.indice = indice;
        this.data = data;
        this.hashAnterior = hashAnterior;
        this.hash = this.crearHash();
        this.nonce = 0;

        this.pruebaDeTrabajo(dificultad);
    }

    crearHash() {
        let shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
        shaObj.update(this.indice + this.fecha + this.previusHash + this.data + this.nonce);
        return shaObj.getHash("HEX");
    }

    pruebaDeTrabajo(dificultad) {
        while (this.hash.substring(0, dificultad) !== Array(dificultad + 1).join("0")) {
            // Si entra aquí, no están los ceros que se esperan al principio
            // recalculando el hash, al cambiar la prueba de trabajo (nonce)
            this.nonce++;
            this.hash = this.crearHash();
        }
        // hash que cumple con la condición de los ceros iniciales
        return this.hash;
    }
}

class cadena {
    constructor() {
        this.indice = 0;
        this.cadena = [];
        this.cadena.push(this.bloqueGenesis());
    }

    bloqueGenesis() {
        let genesis = new bloque(this.indice, "Bloque Genesis", "");
        this.indice++;
        return genesis;
    }

    agregar(data, dificultad) {
        let nuevoBloque = new bloque(this.indice, data, this.cadena[this.indice - 1].hash, dificultad);
        this.indice++;
        this.cadena.push(nuevoBloque);
    }

    recorrer() {
        for (let item of this.cadena) {
            console.log(item);
        }
    }

}



function a() {

    let blockChain = new cadena();

    let info = []
    info.push({
        "id": 3,
        "vendedor": "vendedor3",
        "cliente": "cliente1",
        "productos": [
            {
                "id": 1,
                "cantidad": 3
            }
        ]
    });
    info.push({
        "id": 1,
        "vendedor": "vendedor1",
        "cliente": "cliente1",
        "productos": [
            {
                "id": 1,
                "cantidad": 3
            }
        ]
    });
    
    blockChain.agregar(JSON.stringify(info), 3);
    info = [];

    blockChain.agregar(JSON.stringify(info), 3);
    blockChain.recorrer();
}

function pruebas(){
    // const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
    // shaObj.update("This is a ");
    // const hash = shaObj.getHash("HEX");
    // console.log(hash);

    // let shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
    // shaObj.update("This is a ");
    // shaObj.update("test");
    // console.log(shaObj.getHash("HEX"))

    // block = new bloque(0,"prueba",'000', 3);
    // console.log(block);
}
// var a = 0;

// setTimeout(function imprimirFecha() {
//     let fechaActual = new Date()
//     let fecha = fechaActual.getDate() + '-' + ( fechaActual.getMonth() + 1 ) + '-' + fechaActual.getFullYear();
//     var hora = fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();
//     console.log(`${fecha}::${hora}`);
//     a++;
//     console.log(a);
//     if(a < 10){
//         setTimeout(imprimirFecha, 2000);
//     }
// }, 2000);