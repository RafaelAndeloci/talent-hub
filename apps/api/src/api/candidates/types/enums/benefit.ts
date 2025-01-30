export const Benefit = Object.freeze({
    TransportationVoucher: 'transportation_voucher',
    MealVoucher: 'meal_voucher',
    FoodVoucher: 'food_voucher',
    HealthInsurance: 'health_insurance',
    DentalPlan: 'dental_plan',
    LifeInsurance: 'life_insurance',
    DaycareAssistance: 'daycare_assistance',
    EducationAssistance: 'education_assistance',
    HomeOfficeAssistance: 'home_office_assistance',
    GymAssistance: 'gym_assistance',
    FuelVoucher: 'fuel_voucher',
    PsychologicalAssistance: 'psychological_assistance',
});

export type Benefit = (typeof Benefit)[keyof typeof Benefit];
