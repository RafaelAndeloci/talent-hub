This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Candidate DTO

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
    employmentRegime: string;
    employmentType: string;
    workplaceType: string;
    benefits: string[];
    positionLevel: string;
  };
  academicBackgrounds: {
    status: string;
    id: string;
    candidate: {
      id: string;
    };
    course: {
      id: string;
      name: string | null;
      degreeType: string | null;
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
    candidate: {
      id: string;
    };
    period: {
      start: moment.Moment;
      end: moment.Moment | null;
    };
    isCurrent: boolean;
    employmentType: string;
    workplaceType: string;
    positionLevel: string;
    position: string;
    description: string | null;
    company: string;
    address: {
      number: string;
      street: string;
      complement: string | null;
      neighborhood: string;
      city: string;
      uf: Uf;
      zipCode: string;
    };
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
    candidate: {
      id: string;
    };
    name: string;
    position: string;
    company: string | null;
    contact: {
      email: string;
      phone: string;
    };
    relationship: string;
  }[];
  achievements: {
    type: AchievementType;
    id: string;
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
      type: SkillType | null;
      id: string;
      name: string | null;
    };
    level: number;
  }[];
};
```
