import { Connection } from "typeorm";
import { fileInfo } from "../../musicLoad";
import { Album } from "./album.entity";

export const findAlbums = async (connection: Connection) => {
    const albumRepository = connection.getRepository(Album);
    return await albumRepository.find();
}

export const findAlbum = async (connection: Connection, id: number) => {
    const albumRepository = connection.getRepository(Album);
    return await albumRepository.findOne(id);
}

export const createAlbum = async (connection: Connection, file: fileInfo) => {
    const albumRepository = connection.getRepository(Album);
    const album = await albumRepository.findOne({title: file.album});
    if (!album) {
        const newAlbum = new Album();
        newAlbum.title = file.album;
        newAlbum.artist = file.artist;
        newAlbum.cover = `data:${file.format};base64,${file.cover.toString("base64")}`;
        return await albumRepository.save(newAlbum);
    } else {
        if (album !== "V.A.") {
            if (album.artist !== file.artist) {
                album.artist = "V.A.";
                await albumRepository.save(album);
            }
        }
        return album;
    }
}