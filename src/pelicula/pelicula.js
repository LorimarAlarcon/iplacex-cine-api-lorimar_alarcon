import {BSONType, ObjectId } from 'mongodb'

export const Pelicula = { 
    _id: ObjectId,
    nombre: BSONType.string,
    generos: [BSONType.string],
    anioEstreno: BSONType.int,
}