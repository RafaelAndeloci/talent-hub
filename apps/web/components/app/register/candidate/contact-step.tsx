'use client'

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
import { Separator } from '@/components/ui/separator'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import {
  contactAddressSchema,
  ContactAddressStepSchema,
} from '@/types/app/register/candidate/form/schemas'
import { Uf, ufSchema } from '@/types/uf'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormNavigationButtons } from './form-navigation-buttons'

interface ContactStepProps {}
export function ContactStep({}: ContactStepProps) {
  const { formData, setFormData, nextStep } = useRegisterCandidate()
  const form = useForm<ContactAddressStepSchema>({
    resolver: zodResolver(contactAddressSchema),
    defaultValues: formData.contactAddress ?? undefined,
  })
  const isValid = form.formState.isValid
  function onSubmit(data: ContactAddressStepSchema) {
    console.log(JSON.stringify(data, null, 2))
    if (isValid) {
      setFormData((prev) => ({ ...prev, contactAddress: { ...data } }))
      nextStep()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 space-y-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="contact.phone"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>Número de telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., (123) 456-7890"
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Seu número de telefone para contato
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact.email"
            render={({ field: { value = '', ...field } }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@exemplo.com"
                    type="email"
                    value={value}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Forneça um e-mail para contato
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <Separator />
          <h3 className="text-base font-medium">Informações de endereço</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field: { value = '', ...field } }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua João da Silva"
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
              name="address.number"
              render={({ field: { value = '', onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      type="number"
                      value={value}
                      onChange={(e) => onChange(Number(e.target.value))}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Ribeirão Preto"
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
              name="address.uf"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ufSchema.options.map((uf) => {
                        return (
                          <SelectItem value={uf} key={uf}>
                            {Uf[uf]}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000000" value={value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.neighborhood"
              render={({ field: { value = '', ...field } }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jardim paulista"
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
