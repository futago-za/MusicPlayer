import { Connection } from "typeorm";
import { fileInfo } from "../../musicLoad";
import { Album } from "../album/album.entity";
import { Song } from "./song.entity";
import { Artist } from "../artist/artist.entity";
import { createArtist } from "../artist/operation";

export const findSongs = async (connection: Connection, album: string, artist:string) => {
  const songRepository = connection.getRepository(Song);
  if (!artist) {
    if (!album) {
      return await songRepository.find({relations: ["album", "artist"]});
    } else {
      return await songRepository.find({
        where: {
          album: { title: album }
        },
        relations: ["album", "artist"]
      });
    }
  } else {
    return await songRepository.find({
      where: {
        artist: { name: artist },
        album: { title: album }
      },
      relations: ["album", "artist"]
    });
  }
}

export const findSong = async (connection: Connection, id: number) => {
    const songRepository = connection.getRepository(Song);
    return await songRepository.findOne(id, {relations: ["album", "artist"]});
}

export const findAlbumsFromSongs = async (connection: Connection, artist: string) => {
  return await connection.createQueryBuilder(Song, 'song')
                         .select('album.id, album.title, album.artist, album.cover')
                         .leftJoinAndSelect('song.artist', 'artist')
                         .where('artist.name = :artist', {artist})
                         .leftJoinAndSelect('song.album', 'album')
                         .groupBy('album.title')
                         .orderBy('album.id')
                         .getRawMany();
}

export const createSong = async (connection: Connection, file: fileInfo) => {
    const songRepository = connection.getRepository(Song);
    const albumRepository = connection.getRepository(Album);
    const artistRepository = connection.getRepository(Artist);
    const album = await albumRepository.findOne({title: file.album});
    let artist = await artistRepository.findOne({name: file.artist});

    if (!artist) {
        artist = await createArtist(connection, file.artist);
    }

    const song = new Song();
    song.title = file.title;
    song.artist = artist;
    song.trackNumber = parseInt(file.trackNumber.split('/')[0]);
    song.filePath = file.src;
    song.duration = file.duration;
    song.genre = file.genre;
    song.album = album;
    return await songRepository.save(song);
}