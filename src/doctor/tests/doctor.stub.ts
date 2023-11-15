import { IsDeletedDto } from '../../common/dtos/is-deleted.dto';

export abstract class DoctorStub {
  static params = {
    createDoctor: {
      identificationDocument: '10150215487',
      firstName: 'string',
      lastName: 'string',
      email: 'doctor@test.com',
      phone: 'string',
      address: 'string',
      city: 'string',
      professionalCard: 'string',
      admissionAt: new Date(),
    },
    updateDoctor: {
      identificationDocument: '10150215487',
      firstName: 'string',
      lastName: 'string',
      email: 'doctor@test.com',
      phone: 'string',
      address: 'string',
      city: 'string',
      professionalCard: 'string',
      admissionAt: new Date(),
    },
    paramId: {
      id: 'e2cf4eea-ca29-493e-9c45-f81186c7effa',
    },
    identificationDocument: '10150215487',
  };
  static repository = { delete: { raw: [], affected: 1 } };
  static service = {
    createDoctor: {
      ...this.params.createDoctor,
      id: '79e7d8be-e45f-4c00-b35e-df46948158a6',
      createdAt: '2023-11-15T08:57:43.627Z',
      updatedAt: '2023-11-15T08:57:43.627Z',
    },
    findDoctor: {
      ...this.params.createDoctor,
      id: '79e7d8be-e45f-4c00-b35e-df46948158a6',
      createdAt: '2023-11-15T08:57:43.627Z',
      updatedAt: '2023-11-15T08:57:43.627Z',
    },

    removeDoctor: {
      isDeleted: true,
    } as IsDeletedDto,
  };
  static controller = {
    postDoctor: this.service.createDoctor,
    getDoctor: this.service.findDoctor,
    deleteDoctor: this.service.removeDoctor,
  };
}
