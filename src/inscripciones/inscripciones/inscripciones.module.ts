import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';

@Module({
  providers: [InscripcionesService],
  controllers: [InscripcionesController]
})
export class InscripcionesModule {}
