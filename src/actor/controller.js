import { ObjectId } from 'mongodb'
import client from '../common/db.js'


const actorCollection = client.db('cine').collection('actores')
const peliculaCollection = client.db('cine').collection('peliculas')


async function handleInsertActorRequest(req, res) {
    const data = req.body;

    // Validar si la película existe por su _id (idPelicula)
    let pelicula;
    try {
        pelicula = await peliculaCollection.findOne({ _id: new ObjectId(data.idPelicula) });
    } catch (e) {
        return res.status(400).send('Id mal formado de película');
    }

    if (!pelicula) {
        return res.status(404).send('Película no encontrada');
    }

    const actor = {
        _id: new ObjectId(),
        idPelicula: pelicula._id.toString(),
        nombre: data.nombre,
        edad: data.edad,
        estaRetirado: data.estaRetirado,
        premios: data.premios || []
    };

    try {
        const result = await actorCollection.insertOne(actor);
        return res.status(201).send(result.ops[0]);
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}


async function handleGetActoresRequest(req, res) {
    try {
        const actores = await actorCollection.find({}).toArray()
        return res.status(200).send(actores)
    } catch (e) {
        return res.status(500).send({ error: e })
    }
}

async function handleGetActorByIdRequest(req, res) {
    const id = req.params.id

    try {
        const oid = ObjectId.createFromHexString(id)
        const actor = await actorCollection.findOne({ _id: oid })

        if (!actor) {
            return res.status(404).send('Actor no encontrado')
        }

        return res.status(200).send(actor)
    } catch (e) {
        return res.status(400).send('Id mal formado')
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    const id = req.params.id

    try {
        const oid = ObjectId.createFromHexString(id);
        const actores = await actorCollection.find({ idPelicula: oid.toString() }).toArray()

        return res.status(200).send(actores)
    } catch (e) {
        return res.status(400).send('Id mal formado')
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
