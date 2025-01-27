import { Entity } from '../../../../shared/types/entity'
import { Benefit } from '../../../candidates/types/enums/benefit'
import { ContractType } from '../../../candidates/types/enums/contract-type'
import { EmploymentType } from '../../../candidates/types/enums/employment-type'
import { PositionLevel } from '../../../candidates/types/enums/position-level'
import { WorkplaceType } from '../../../candidates/types/enums/workplace-type'
import { JobOpeningStatus } from '../enums/job-opening-status'

export interface JobOpening extends Entity {
  title: string
  description: string
  status: JobOpeningStatus
  companyId: string
  selectedApplicationId: string | null
  positionLevel: PositionLevel
  workplaceType: WorkplaceType
  employmentType: EmploymentType
  salary: number | null
  contractType: ContractType
  benefits: Benefit[]
  deadline: Date
  responsibilities: string[]
  requirements: string[]
}
