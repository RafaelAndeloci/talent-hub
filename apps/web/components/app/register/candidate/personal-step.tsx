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
import { PersonalStepSchema } from '@/types/app/register/candidate/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface PersonalStepProps {}
export function PersonalStep({}: PersonalStepProps) {
  const { getStepSchema } = useRegisterCandidate()
  const form = useForm<PersonalStepSchema>({
    resolver: zodResolver(getStepSchema('personal')),
  })
  return (
    <Form {...form}>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input
                  type="date"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título profissional</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.x. Estudante de Análise e Desenvolvimento de sistemas"
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sobre</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Diga para os recrutadores sobre você, suas metas, e quais são seus objetivos"
                className="min-h-[120px]"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social.github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/seunome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="https://twitter.com/seunome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social.portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio</FormLabel>
                <FormControl>
                  <Input placeholder="https://seusite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  )
}
