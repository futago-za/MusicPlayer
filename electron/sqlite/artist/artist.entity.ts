import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Song } from '../song/song.entity';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column()
    name?: string;

    @CreateDateColumn()
    readonly create_at?: Date;

    @UpdateDateColumn()
    readonly update_at?: Date;

    @OneToMany(() => Song, song => song.artist)
    songs?: Song[];
}