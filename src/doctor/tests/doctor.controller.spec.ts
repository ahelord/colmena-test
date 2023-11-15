import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from '../controllers/doctor.controller';
import { DoctorService } from '../services/doctor.service';
import { when } from 'jest-when';
import { PatientStub } from '../../patient/tests/patient.stub';
import { DoctorStub } from './doctor.stub';
type DoctorServiceMock = Partial<Record<keyof DoctorService, jest.Mock>>;
const doctorServiceMock = (): DoctorServiceMock => ({
  createDoctor: jest.fn(),
  findDoctor: jest.fn(),
  findDoctors: jest.fn(),
  updateDoctor: jest.fn(),
  removeDoctor: jest.fn(),
});
describe('DoctorController', () => {
  let controller: DoctorController;
  let doctorServiceMocked: DoctorServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: doctorServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    doctorServiceMocked = module.get(DoctorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Should post doctor', async () => {
    when(doctorServiceMocked.createDoctor)
      .calledWith(DoctorStub.params.createDoctor)
      .mockReturnValue(DoctorStub.service.createDoctor);
    const response = await controller.postDoctor(DoctorStub.params.createDoctor);
    expect(response).toEqual(DoctorStub.controller.postDoctor);
  });

  it('Should get doctor', async () => {
    when(doctorServiceMocked.findDoctor)
      .calledWith(DoctorStub.params.identificationDocument)
      .mockReturnValue(DoctorStub.service.findDoctor);
    const response = await controller.getDoctor(DoctorStub.params.identificationDocument);
    expect(response).toEqual(DoctorStub.controller.getDoctor);
  });

  it('Should put doctor', async () => {
    when(doctorServiceMocked.updateDoctor)
      .calledWith(DoctorStub.params.paramId.id, DoctorStub.params.updateDoctor)
      .mockReturnValue(DoctorStub.service.findDoctor);
    const response = await controller.putDoctor(PatientStub.params.paramId, DoctorStub.params.updateDoctor);
    expect(response).toEqual(DoctorStub.controller.getDoctor);
  });

  it('Should delete doctor', async () => {
    when(doctorServiceMocked.removeDoctor)
      .calledWith(DoctorStub.params.paramId.id)
      .mockReturnValue(DoctorStub.service.removeDoctor);
    const response = await controller.deleteDoctor(DoctorStub.params.paramId);
    expect(response).toEqual(DoctorStub.controller.deleteDoctor);
  });
});
