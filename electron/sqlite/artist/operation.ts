import { Connection } from "typeorm";
import { fileInfo } from "../../musicLoad";
import { Artist } from "./artist.entity";

export const findArtists = async (connection: Connection) => {
    const artistRepository = connection.getRepository(Artist);
    return await artistRepository.find();
}

export const findArtist = async (connection: Connection, id: number) => {
    const artistRepository = connection.getRepository(Artist);
    return await artistRepository.findOne(id);
}

export const createArtist = async (connection: Connection, artistName: string) => {
    const artistRepository = connection.getRepository(Artist);
    const artist = new Artist();
    artist.name = artistName;
    return await artistRepository.save(artist);
}