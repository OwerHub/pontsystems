// NOTE: birthday type is missing, cause its need several types to another useCase

export interface ICitizenBaseData {
    id: number; //  (number - required, unique)
    title: string; //  (select - required)
    lastName: string; //  (text - required)
    firstName: string; // (text - required)
    middleName: string | null; // (text - required)
    gender: 'male' | 'female' | 'other'; //  (select - required)
    maidenName?: string | null; //  (text - required if gender is 'female')
    placeOfBirth: string; //  (text - required)
    // dateOfBirth: string; //  (datepicker - required)
    nationality: string; //  (text - required)
    taxIdentifier: string; //  (string - 11 characters long, must contain '8' and at least one '2')
    creditEligible?: boolean; //  (select - fixed disabled) 
}

