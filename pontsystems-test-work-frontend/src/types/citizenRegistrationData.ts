import { ICitizenBaseData } from './CitizenBaseData';

export interface ICitizenRegistrationData extends ICitizenBaseData {
    id: number;
    dateOfBirth: string;
}