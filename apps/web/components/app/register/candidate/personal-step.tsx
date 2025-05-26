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
import { Textarea } from '@/components/ui/textarea'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import {
  personalInfoSchema,
  PersonalStepSchema,
} from '@/types/app/register/candidate/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormNavigationButtons } from './form-navigation-buttons'

interface PersonalStepProps {}
export function PersonalStep({}: PersonalStepProps) {
  const { formData, setFormData, nextStep } = useRegisterCandidate()
  const form = useForm<PersonalStepSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo ?? undefined,
  })
  const isValid = form.formState.isValid
  function onSubmit(data: PersonalStepSchema) {
    console.log(JSON.stringify(data, null, 2))
    if (isValid) {
      setFormData((prev) => ({ ...prev, personalInfo: { ...data } }))
      nextStep()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field: { value = '', ...field } }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome completo"
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={value}
                    {...field}
                    max={new Date().toISOString().split('T')[0]}
                    min="1900-01-01"
                  />
                </FormControl>
                <FormDescription>Digite sua data de nascimento</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="professionalHeadline"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Título profissional</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.x. Estudante de Análise e Desenvolvimento de sistemas"
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Uma breve descrição de sua identidade profissional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="about"
          render={({ field: { value = '', ...field } }) => (
            <FormItem>
              <FormLabel>Sobre</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Diga para os recrutadores sobre você, suas metas, e quais são seus objetivos"
                  className="min-h-[120px]"
                  value={value}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Isso irá aparecer no seu perfil público
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Redes sociais</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="social.linkedin"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/"
                      value={value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.github"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/seunome"
                      value={value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.twitter"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://twitter.com/seunome"
                      value={value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.portfolio"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>Portfolio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://seusite.com"
                      value={value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormNavigationButtons />
      </form>
    </Form>
  )
}
