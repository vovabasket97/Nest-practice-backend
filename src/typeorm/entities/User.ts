import { IsEmail } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @IsEmail()
  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column()
  createdAt: Date

  @Column({ nullable: true })
  authStrategy: string

  @Column({ default: false })
  isAdmin: boolean
}
