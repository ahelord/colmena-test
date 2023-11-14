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
import { TodosModule } from './todos/todos.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async function () {
        console.log(TypeormConfig);
        return TypeormConfig as TypeOrmModuleOptions;
      },
    }),
    CommonModule,
    TodosModule,
    PatientModule,
    DoctorModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
