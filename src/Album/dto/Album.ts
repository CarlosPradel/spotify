import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Cancion } from '@/cancion/dto/Cancion';
import { Artista } from '@/artista/dto/Artista';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  imagen: string;
//cancion-varios albunes 1-n
  @OneToMany(() => Cancion, (cancion) => cancion.album, { cascade: true })
  canciones: Cancion[];
//un artista- varioas albunes 1-n
  @ManyToOne(() => Artista, (artista) => artista.albums, {
    onDelete: 'CASCADE',
  })
  artista: Artista;
}
