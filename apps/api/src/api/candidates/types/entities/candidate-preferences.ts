import { Benefit } from '../enums/benefit'
import { ContractType } from '../enums/contract-type'
import { EmploymentType } from '../enums/employment-type'
import { PositionLevel } from '../enums/position-level'
import { WorkplaceType } from '../enums/workplace-type'

export interface CandidatePreferences {
  salary: number | null
  contractType: ContractType | null
  employmentType: EmploymentType | null
  workplaceType: WorkplaceType | null
  benefits: Benefit[]
  positionLevel: PositionLevel | null
}
