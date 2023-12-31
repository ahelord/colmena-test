export enum Errors {
  PATIENT_ALREADY_EXISTS = 'El paciente ya existe',
  DOCTOR_ALREADY_EXISTS = 'El medico ya existe',
  INTERNAL_ERROR = 'Ocurrió un error interno. Intente nuevamente',
  DOCTOR_NOT_FOUND = 'El medico no existe',
  PATIENT_NOT_FOUND = 'El paciente no existe',
  MEDICAMENT_NOT_FOUND = 'El medicamento no existe',
  APPOINTMENT_NOT_FOUND = 'La cita no existe',
  APPOINTMENT_IN_PAST = 'La fecha de la cita esta en el pasado',
  APPOINTMENT_NO_AVAILABILITY = 'No hay disponibilidad para esa fecha',
  PASSWORD_MUST_HAVE_NINE_CHAR = 'La contraseña debe tener por lo menos 9 caracteres',
  PASSWORD_MUST_HAVE_LOWERCASE = 'La contraseña debe tener minúsculas',
  PASSWORD_MUST_HAVE_NUMBER = 'La contraseña debe tener al menos 1 número',
  PASSWORD_INVALID = 'Contraseña invalida',
  CREDENTIALS_INVALID = 'Credenciales inválidas',
  EMAIL_ALREADY_EXISTS = 'Hay una cuenta asociada al correo electrónico',
}
