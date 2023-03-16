import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity'

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column()
    title?: string;

    @ManyToOne(() => Artist, artsit => artsit.songs)
    artist?: Artist;

    @Column()
    trackNumber?: number;

    @Column()
    filePath?: string;

    @Column()
    duration?: number;

    @Column()
    genre?: string;

    @CreateDateColumn()
    readonly create_at?: Date;

    @UpdateDateColumn()
    readonly update_at?: Date;

    @ManyToOne(() => Album, album => album.songs)
    album?: Album;
}