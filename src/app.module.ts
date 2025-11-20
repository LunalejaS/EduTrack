import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './users/usuarios.module';
import { AppDataSource } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UsuariosModule,
  ],
})
export class AppModule {}
