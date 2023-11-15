import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '../controllers/patient.controller';
import { PatientService } from '../services/patient.service';
import { when } from 'jest-when';
import { PatientStub } from './patient.stub';

type PatientServiceMock = Partial<Record<keyof PatientService, jest.Mock>>;
const patientServiceMock = (): PatientServiceMock => ({
  createPatient: jest.fn(),
  getPatient: jest.fn(),
  updatePatient: jest.fn(),
  removePatient: jest.fn(),
});
describe('PatientController', () => {
  let controller: PatientController;
  let patientServiceMocked: PatientServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: patientServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    patientServiceMocked = module.get(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should post patient', async () => {
    when(patientServiceMocked.createPatient)
      .calledWith(PatientStub.params.createPatient)
      .mockReturnValue(PatientStub.service.createPatient);
    const response = await controller.postPatient(PatientStub.params.createPatient);
    expect(response).toEqual(PatientStub.controller.postPatient);
  });

  it('Should get patient', async () => {
    when(patientServiceMocked.getPatient)
      .calledWith(PatientStub.params.paramId.id)
      .mockReturnValue(PatientStub.service.getPatient);
    const response = await controller.getPatient(PatientStub.params.paramId);
    expect(response).toEqual(PatientStub.controller.getPatient);
  });

  it('Should put patient', async () => {
    when(patientServiceMocked.updatePatient)
      .calledWith(PatientStub.params.paramId.id, PatientStub.params.updatePatient)
      .mockReturnValue(PatientStub.service.getPatient);
    const response = await controller.putPatient(PatientStub.params.paramId, PatientStub.params.updatePatient);
    expect(response).toEqual(PatientStub.controller.getPatient);
  });

  it('Should delete patient', async () => {
    when(patientServiceMocked.removePatient)
      .calledWith(PatientStub.params.paramId.id)
      .mockReturnValue(PatientStub.service.removePatient);
    const response = await controller.deletePatient(PatientStub.params.paramId);
    expect(response).toEqual(PatientStub.controller.deletePatient);
  });
});
