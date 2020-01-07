const fs = require('fs');


let listadoPorHacer = [];


const guardadDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {

        if (err) {

            throw new Error('No se pudo grabar', err);
        }
    });

}

const getListado = () => {

    cargarDB();

    return listadoPorHacer;

}

const cargarDB = () => {


    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {

        listadoPorHacer = [];
    }


}



const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardadDB();




    return porHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {

        listadoPorHacer[index].completado = completado;

        guardadDB();
        return true;
    } else {

        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {

        listadoPorHacer.splice(index, 1);


        guardadDB();
        return true;
    } else {

        return false;
    }

    /*
    OTRA FORMA DE HACERLO

    let nuevoListado - listadoPorHacer.filter( tarea => {
        return tarea.descripcion !== descripcion
    });

    //devuelve el arreglo sin el elemento( filtra el arreglo)

    if( listadoPorHacer.length === nuevoListado.length){
        return false
    }else {

        listadoPorHacer = nuevoListado;
        return true;
    }
    
    */



}

module.exports = {
    crear,
    guardadDB,
    getListado,
    actualizar,
    borrar
}