import { CreateProfesoreDto } from './create-profesore.dto';
declare const UpdateProfesoreDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProfesoreDto>>;
export declare class UpdateProfesoreDto extends UpdateProfesoreDto_base {
    especialidad?: string;
}
export {};
