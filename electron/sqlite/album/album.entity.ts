import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Song } from '../song/song.entity';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column()
    title?: string;

    @Column()
    artist?: string;

    @CreateDateColumn()
    readonly create_at?: Date;

    @UpdateDateColumn()
    readonly update_at?: Date;

    @OneToMany(() => Song, song => song.album)
    songs?: Song[];

    @Column()
    cover?: string;
}