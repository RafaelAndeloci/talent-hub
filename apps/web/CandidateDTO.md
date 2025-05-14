```typescript
type CandidateDto = {
  id: string;
  fullName: string;
  cvUrl: string | null;
  bannerUrl: string | null;
  birthDate: moment.Moment;
  professionalHeadline: string | null;
  contact: {
    email: string;
    phone: string;
  };
  address: {
    number: string;
    street: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    uf: Uf;
    zipCode: string;
  };
  about: string | null;
  hobbies: string[];
  social: {
    linkedin: string | null;
    github: string | null;
    website: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    medium: string | null;
    youtube: string | null;
  };
  isAvailableForWork: boolean;
  allowThirdPartyApplications: boolean;
  preferences: {
    salary: number;
    employmentRegime: EmploymentRegime;
    employmentType: EmploymentType;
    workplaceType: WorkplaceType;
    benefits: Benefit[];
    positionLevel: PositionLevel;
  };
  academicBackgrounds: {
    id: string;
    status: AcademicStatus;
    candidate: {
      id: string;
    };
    course: {
      id: string;
      name: string | null;
      degreeType: AcademicDegreeLevel | null;
    };
    institution: {
      id: string;
      name: string | null;
    };
    period: {
      start: moment.Moment;
      end: moment.Moment | null;
    };
    isCurrent: boolean;
    semesters: number | null;
    currentSemester: number | null;
    institutionRegistrationNumber: string | null;
    gradePointAverage: number | null;
    expectedGraduation: moment.Moment | null;
  }[];
  professionalExperiences: {
    id: string;
    address: {
      number: string;
      street: string;
      complement: string | null;
      neighborhood: string;
      city: string;
      uf: Uf;
      zipCode: string;
    };
    employmentType: EmploymentType;
    workplaceType: WorkplaceType;
    positionLevel: PositionLevel;
    candidate: {
      id: string;
    };
    period: {
      start: moment.Moment;
      end: moment.Moment | null;
    };
    isCurrent: boolean;
    position: string;
    description: string | null;
    company: string;
    responsabilities: string[];
  }[];
  languages: {
    id: string;
    candidate: {
      id: string;
    };
    language: Language;
    writtenLevel: LanguageProficiency;
    spokenLevel: LanguageProficiency;
    readingLevel: LanguageProficiency;
    listeningLevel: LanguageProficiency;
  }[];
  references: {
    id: string;
    contact: {
      email: string;
      phone: string;
    };
    candidate: {
      id: string;
    };
    name: string;
    position: string;
    company: string | null;
    relationship: string;
  }[];
  achievements: {
    id: string;
    type: AchievementType;
    candidate: {
      id: string;
    };
    name: string;
    issuer: string;
    workload: number | null;
    issueDate: moment.Moment | null;
    expirationDate: moment.Moment | null;
    credential: {
      id: string | null;
      url: string | null;
    };
  }[];
  skills: {
    id: string;
    candidate: {
      id: string;
    };
    skill: {
      id: string;
      type: SkillType | null;
      name: string | null;
    };
    level: number;
  }[];
};
```
