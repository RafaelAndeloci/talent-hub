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
  preferencesSchema,
  PreferencesStepSchema,
} from '@/types/app/register/candidate/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormNavigationButtons } from './form-navigation-buttons'

interface PreferencesStepProps {}
export function PreferencesStep({}: PreferencesStepProps) {
  const { formData, setFormData, nextStep } = useRegisterCandidate()
  const form = useForm<PreferencesStepSchema>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: formData.preferences ?? undefined,
  })
  const isValid = form.formState.isValid
  function onSubmit(data: PreferencesStepSchema) {
    if (isValid) {
      setFormData((prev) => ({ ...prev, preferences: { ...data } }))
      nextStep()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="salary"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Expectativa salarial</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite sua expectativa salarial"
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Sua expectativa de salário mensal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentRegime"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Regime de contratação</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um regime de contratação" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Seu regime de contratação preferido.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentType"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Tipo de contratação</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo de contratação" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Integral</SelectItem>
                    <SelectItem value="Part-time">Meio período</SelectItem>
                    <SelectItem value="Contract">Contrato</SelectItem>
                    <SelectItem value="Internship">Estágio</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  O Seu tipo de contratação preferido
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workplaceType"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Local de trabalho</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Remote">Remoto</SelectItem>
                    <SelectItem value="Hybrid">Híbrido</SelectItem>
                    <SelectItem value="On-site">Presencial</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Seu local de trabalho preferido
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="positionLevel"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Intern">Estágio</SelectItem>
                    <SelectItem value="Junior">Júnior</SelectItem>
                    <SelectItem value="Mid-level">Pleno</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Seu cargo de preferência</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="benefits"
          render={() => (
            <FormItem>
              <div className="my-4">
                <FormLabel>Benefícios</FormLabel>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { id: 'Seguro saúde', label: 'Seguro saúde' },
                  { id: 'Seguro odontológico', label: 'Seguro odontológico' },
                  { id: 'Seguro de vida', label: 'Seguro de vida' },
                  { id: 'Vale Refeição', label: 'Vale Refeição' },
                  {
                    id: 'Vale Transporte',
                    label: 'Vale Transporte',
                  },
                  {
                    id: 'Auxílio Home Office',
                    label: 'Auxílio Home Office',
                  },
                  {
                    id: 'Auxílio Educação',
                    label: 'Auxílio Educação',
                  },
                ].map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="benefits"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-y-0 space-x-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormNavigationButtons skip />
      </form>
    </Form>
  )
}
