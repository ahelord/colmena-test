import { Module } from '@nestjs/common';
// Modules
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Configs
import appConfig from './config/app.config';
import TypeormConfig from './config/typeorm.config';
import { CommonModule } from './common/common.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicamentModule } from './medicament/medicament.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async function () {
        return TypeormConfig as TypeOrmModuleOptions;
      },
    }),
    CommonModule,
    PatientModule,
    DoctorModule,
    AppointmentModule,
    MedicamentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
