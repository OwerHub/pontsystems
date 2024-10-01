import { ICitizenBaseData } from './citizenBaseData';

export interface ICitizenRegistrationData extends ICitizenBaseData {
    id: number;
    dateOfBirth: string;
}