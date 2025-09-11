import { Gender, BloodGroup,MaritalStatus } from "@prisma/client";

export type IPatientFilterRequest = {
    searchTerm?: string | undefined;
    email?: string | undefined;
    contactNo?: string | undefined;
  };
  
  type IPatientHealthData = {
    gender: Gender
    dateOfBirth: string
    bloodGroup: BloodGroup
    hasAllergies?: boolean
    hasDiabetes?: boolean
    height: string
    weight: string
    smokingStatus?: boolean
    dietaryPreferences?: string
    pregnancyStatus?: boolean
    mentalHealthHistory?: string
    immunizationStatus?: string
    hasPastSurgeries?: boolean
    recentAnxiety?: boolean
    recentDepression?: boolean
    maritalStatus?: MaritalStatus
  }
 