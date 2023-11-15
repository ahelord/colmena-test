import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from '../services/patient.service';
import { PatientRepository } from '../repositories/patient.repository';
import { PatientStub } from './patient.stub';
type PatientRepositoryMock = Partial<Record<keyof PatientRepository, jest.Mock>>;
const patientRepositoryMock = (): PatientRepositoryMock => ({
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});
describe('PatientService', () => {
  let service: PatientService;
  let patientRepositoryMocked: PatientRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: PatientRepository,
          useValue: patientRepositoryMock(),
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    patientRepositoryMocked = module.get(PatientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create patient', async () => {
    jest.spyOn(patientRepositoryMocked, 'save').mockReturnValue(PatientStub.service.createPatient as any);
    const response = await service.createPatient(PatientStub.params.createPatient);
    expect(response).toEqual(PatientStub.service.createPatient);
  });

  it('Should get patient', async () => {
    jest.spyOn(patientRepositoryMocked, 'findOne').mockReturnValue(PatientStub.service.getPatient as any);
    const response = await service.getPatient(PatientStub.params.paramId.id);
    expect(response).toEqual(PatientStub.service.getPatient);
  });

  it('Should update patient', async () => {
    jest.spyOn(patientRepositoryMocked, 'findOne').mockReturnValue(PatientStub.service.getPatient as any);
    jest.spyOn(patientRepositoryMocked, 'save').mockReturnValue(PatientStub.service.createPatient as any);
    const response = await service.updatePatient(PatientStub.params.paramId.id, PatientStub.params.updatePatient);
    expect(response).toEqual(PatientStub.service.createPatient);
  });

  it('Should remove patient', async () => {
    jest.spyOn(patientRepositoryMocked, 'delete').mockReturnValue(PatientStub.repository.delete as any);
    const response = await service.removePatient(PatientStub.params.paramId.id);
    expect(response).toEqual(PatientStub.service.removePatient);
  });
});
