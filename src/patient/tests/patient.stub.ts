import { IsDeletedDto } from '../../common/dtos/is-deleted.dto';

export abstract class PatientStub {
  static params = {
    createPatient: {
      identificationDocument: '10150215487',
      firstName: 'string',
      lastName: 'string',
      email: 'patient@test.com',
      phone: 'string',
      address: 'string',
      city: 'string',
    },
    updatePatient: {
      identificationDocument: '10150215487',
      firstName: 'edit',
      lastName: 'string',
      email: 'patient@test.com',
      phone: 'string',
      address: 'string',
      city: 'string',
    },
    removePatient: {
      isDelete: true,
    },
    paramId: {
      id: 'e2cf4eea-ca29-493e-9c45-f81186c7effa',
    },
  };
  static repository = {
    save: {
      id: 'e2cf4eea-ca29-493e-9c45-f81186c7effa',
      identificationDocument: '1',
      firstName: 'string',
      lastName: 'string',
      email: 'patient2@test.com',
      phone: 'string',
      address: 'string',
      city: 'string',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    delete: { raw: [], affected: 1 },
  };
  static service = {
    createPatient: {
      ...this.params.createPatient,
      id: '79e7d8be-e45f-4c00-b35e-df46948158a6',
      createdAt: '2023-11-15T08:57:43.627Z',
      updatedAt: '2023-11-15T08:57:43.627Z',
    },
    getPatient: {
      id: 'e2cf4eea-ca29-493e-9c45-f81186c7effa',
      identificationDocument: '1',
      firstName: 'string',
      lastName: 'string',
      email: 'patient2@test.com',
      phone: 'string',
      address: 'string',
      city: 'string',
      createdAt: '2023-11-14T08:08:54.128Z',
      updatedAt: '2023-11-14T08:08:54.128Z',
    },
    removePatient: {
      isDeleted: true,
    } as IsDeletedDto,
  };
  static controller = {
    postPatient: this.service.createPatient,
    getPatient: this.service.getPatient,
    deletePatient: this.service.removePatient,
  };
}
