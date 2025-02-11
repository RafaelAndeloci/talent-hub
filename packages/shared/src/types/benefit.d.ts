export const Benefit = Object.freeze({
    /**
     * Vale Transporte
     */
    TransportationVoucher: 'transportation_voucher',
    /**
     * Vale Refeição
     */
    MealVoucher: 'meal_voucher',
    /**
     * Vale Alimentação
     */
    FoodVoucher: 'food_voucher',
    /**
     * Plano de Saúde
     */
    HealthInsurance: 'health_insurance',
    /**
     * Plano Odontológico
     */
    DentalPlan: 'dental_plan',
    /**
     * Seguro de Vida
     */
    LifeInsurance: 'life_insurance',
    /**
     * Auxílio Creche
     */
    DaycareAssistance: 'daycare_assistance',
    /**
     * Auxílio Educação
     */
    EducationAssistance: 'education_assistance',
    /**
     * Auxílio Home Office
     */
    HomeOfficeAssistance: 'home_office_assistance',
    /**
     * Auxílio Academia
     */
    GymAssistance: 'gym_assistance',
    /**
     * Vale Combustível
     */
    FuelVoucher: 'fuel_voucher',
    /**
     * Assistência Psicológica
     */
    PsychologicalAssistance: 'psychological_assistance',
    /**
     * Opção de Compra de Ações
     */
    StockOptions: 'stock_options',
    /**
     * Participação nos Lucros
     */
    ProfitSharing: 'profit_sharing',
    /**
     * Bônus de Desempenho
     */
    PerformanceBonus: 'performance_bonus',
    /**
     * Plano de Aposentadoria
     */
    RetirementPlan: 'retirement_plan',
    /**
     * Plano de Pensão
     */
    PensionPlan: 'pension_plan',
    /**
     * Auxílio para Celular
     */
    MobilePhoneAllowance: 'mobile_phone_allowance',
    /**
     * Auxílio Internet
     */
    InternetAssistance: 'internet_assistance',
    /**
     * Descontos para Funcionários
     */
    EmployeeDiscounts: 'employee_discounts',
    /**
     * Tempo Remunerado para Voluntariado
     */
    VolunteerTimeOff: 'volunteer_time_off',
    /**
     * Assistência Jurídica
     */
    LegalAssistance: 'legal_assistance',
    /**
     * Auxílio para Mudança
     */
    RelocationAssistance: 'relocation_assistance',
    /**
     * Licença Sabática
     */
    SabbaticalLeave: 'sabbatical_leave',
    /**
     * Equipamento Ergonômico
     */
    ErgonomicEquipment: 'ergonomic_equipment',
    /**
     * Equipamento para Home Office
     */
    WorkFromHomeEquipment: 'work_from_home_equipment',
    /**
     * Programa de Assistência ao Funcionário
     */
    EmployeeAssistanceProgram: 'employee_assistance_program',
    /**
     * Auxílio Viagem
     */
    TravelAllowance: 'travel_allowance',
    /**
     * Horário Flexível
     */
    FlexibleWorkingHours: 'flexible_working_hours',
    /**
     * Programa de Bem-estar
     */
    WellnessProgram: 'wellness_program',

    /**
     * Outros
     */
    Other: 'other',
});

export type Benefit = (typeof Benefit)[keyof typeof Benefit];
