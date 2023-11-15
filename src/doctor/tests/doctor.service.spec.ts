import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from '../services/doctor.service';
import { DoctorRepository } from '../repositories/doctor.repository';
import { DoctorStub } from './doctor.stub';
type DoctorRepositoryMock = Partial<Record<keyof DoctorRepository, jest.Mock>>;
const doctorRepositoryMock = (): DoctorRepositoryMock => ({
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});
describe('DoctorService', () => {
  let service: DoctorService;
  let doctorRepositoryMocked: DoctorRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: DoctorRepository,
          useValue: doctorRepositoryMock(),
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    doctorRepositoryMocked = module.get(DoctorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should create doctor', async () => {
    jest.spyOn(doctorRepositoryMocked, 'save').mockReturnValue(DoctorStub.service.createDoctor as any);
    const response = await service.createDoctor(DoctorStub.params.createDoctor);
    expect(response).toEqual(DoctorStub.service.createDoctor);
  });
  it('Should get doctor', async () => {
    jest.spyOn(doctorRepositoryMocked, 'findOne').mockReturnValue(DoctorStub.service.findDoctor as any);
    const response = await service.findDoctor(DoctorStub.params.paramId.id);
    expect(response).toEqual(DoctorStub.service.findDoctor);
  });

  it('Should update doctor', async () => {
    jest.spyOn(doctorRepositoryMocked, 'findOne').mockReturnValue(DoctorStub.service.findDoctor as any);
    jest.spyOn(doctorRepositoryMocked, 'save').mockReturnValue(DoctorStub.service.findDoctor as any);
    const response = await service.updateDoctor(DoctorStub.params.paramId.id, DoctorStub.params.updateDoctor);
    expect(response).toEqual(DoctorStub.service.createDoctor);
  });

  it('Should remove doctor', async () => {
    jest.spyOn(doctorRepositoryMocked, 'delete').mockReturnValue(DoctorStub.repository.delete as any);
    const response = await service.removeDoctor(DoctorStub.params.paramId.id);
    expect(response).toEqual(DoctorStub.service.removeDoctor);
  });
});
