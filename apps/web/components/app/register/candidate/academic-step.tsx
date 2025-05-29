import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import {
  academicSchema,
  AcademicStepSchema,
} from '@/types/app/register/candidate/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormNavigationButtons } from './form-navigation-buttons'

interface AcademicStepProps {}
export function AcademicStep({}: AcademicStepProps) {
  const { formData, setFormData, currentStep, nextStep } =
    useRegisterCandidate()
  const form = useForm<AcademicStepSchema>({
    resolver: zodResolver(academicSchema),
    defaultValues: formData.academic ?? undefined,
  })

  const isValid = form.formState.isValid
  function onSubmit(academic: AcademicStepSchema) {
    if (isValid) {
      setFormData((prev) => ({ ...prev, academic }))
      nextStep()
    }
  }

  const isCurrentlyStudying =
    form.watch('isCurrent') && currentStep === 'academic'
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="courseName"
            render={({ field: { value = '', ...field } }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Nome do curso</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome do seu curso..."
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Seu campo de estudo ou o nome do seu curso
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institutionName"
            render={({ field: { value = '', ...field } }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Nome da instituição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome da sua instituição de ensino"
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Nome da universidade ou escola
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="degreeType"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Tipo de graduação</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="High School">Ensino médio</SelectItem>
                    <SelectItem value="Bachelor">Bacharel</SelectItem>
                    <SelectItem value="Master">Mestrado</SelectItem>
                    <SelectItem value="PhD">Pós Doutorado</SelectItem>
                    <SelectItem value="Technologist">Tecnólogo</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  O tipo de graduação em que você serviu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gradePointAverage"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Média adquirida no curso</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Máximo 10"
                    step="0.01"
                    min="0"
                    max="10"
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Sua nota média no curso (se aplicável)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Data de início</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={value}
                    {...field}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
                <FormDescription>
                  Quando você começou os seus estudos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Data final (caso completado)</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={value}
                    {...field}
                    disabled={isCurrentlyStudying}
                    min={form.watch('startDate') || ''}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
                <FormDescription>
                  {isCurrentlyStudying
                    ? 'Este campo está desabilitado pois você ainda está cursando-o'
                    : 'Quando você completou o curso ou está previsto terminar'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isCurrent"
          render={({ field: { value = false, ...field } }) => (
            <FormItem className="mt-2 flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox checked={value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Cursando atualmente</FormLabel>
                <FormDescription>
                  Marque caso esteja atualmente cursando
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormNavigationButtons />
      </form>
    </Form>
  )
}
