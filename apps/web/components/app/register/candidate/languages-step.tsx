'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
import { sonner } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import { toast } from '@/hooks/use-toast'
import {
  languagesAndSkillsSchema,
  LanguagesAndSkillsStepSchema,
} from '@/types/app/register/candidate/form/schemas'
import {
  Language,
  LanguageProficiency,
  languageProficiencySchema,
  languageSchema,
} from '@/types/language'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormNavigationButtons } from './form-navigation-buttons'
interface LanguagesStepProps {}
export function LanguagesStep({}: LanguagesStepProps) {
  const { formData } = useRegisterCandidate()
  const form = useForm<LanguagesAndSkillsStepSchema>({
    resolver: zodResolver(languagesAndSkillsSchema),
    defaultValues: formData.languagesAndSkills ?? undefined,
  })

  function onSubmit(data: LanguagesAndSkillsStepSchema) {}

  const [activeTab, setActiveTab] = useState('languages')

  const addLanguage = () => {
    const currentLanguages = form.getValues('languages') || []
    form.setValue('languages', [
      ...currentLanguages,
      {
        language: '',
        writtenLevel: '',
        spokenLevel: '',
        readingLevel: '',
        listeningLevel: '',
      },
    ])
  }
  const removeLanguage = (index: number) => {
    const currentLanguages = form.getValues('languages') || []
    if (currentLanguages.length > 1) {
      form.setValue(
        'languages',
        currentLanguages.filter((_, i) => i !== index)
      )
    } else {
      toast({
        title: 'Cannot remove',
        description: 'You must have at least one language entry.',
        variant: 'destructive',
      })
    }
  }
  const addSkill = () => {
    const currentSkills = form.getValues('skills') || []
    form.setValue('skills', [
      ...currentSkills,
      {
        skillName: '',
        skillType: '',
        skillLevel: '',
      },
    ])
  }
  const removeSkill = (index: number) => {
    const currentSkills = form.getValues('skills') || []
    if (currentSkills.length > 1) {
      form.setValue(
        'skills',
        currentSkills.filter((_, i) => i !== index)
      )
    } else {
      sonner('Não foi possível excluir a habilidade.')
    }
  }

  form.watch('languages')
  form.watch('skills')
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="languages">Línguas</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
          </TabsList>
          <TabsContent value="languages" className="space-y-6 pt-4">
            {!form.getValues('languages') ? (
              <div className="text-accent flex min-h-80 w-full items-center justify-center text-2xl font-medium">
                Nenhuma língua adicionada
              </div>
            ) : (
              form.getValues('languages').map((_, index) => (
                <div key={index} className="space-y-4">
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Língua N°{index + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLanguage(index)}
                      className="text-destructive h-8 px-2"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Remover
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name={`languages.${index}.language`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Língua</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma língua" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languageSchema.options.map((language, i) => {
                              return (
                                <SelectItem key={language} value={language}>
                                  {Language[language]}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`languages.${index}.writtenLevel`}
                      render={({ field: { value = '', ...field } }) => (
                        <FormItem>
                          <FormLabel>Nível de escrita</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um nível" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languageProficiencySchema.options.map((lp) => {
                                return (
                                  <SelectItem value={lp} key={lp}>
                                    {LanguageProficiency[lp]}
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
                      name={`languages.${index}.spokenLevel`}
                      render={({ field: { value = '', ...field } }) => (
                        <FormItem>
                          <FormLabel>Nível de fala</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um nível" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languageProficiencySchema.options.map((lp) => {
                                return (
                                  <SelectItem value={lp} key={lp}>
                                    {LanguageProficiency[lp]}
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
                      name={`languages.${index}.readingLevel`}
                      render={({ field: { value = '', ...field } }) => (
                        <FormItem>
                          <FormLabel>Nível de leitura</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um nível" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languageProficiencySchema.options.map((lp) => {
                                return (
                                  <SelectItem value={lp} key={lp}>
                                    {LanguageProficiency[lp]}
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
                      name={`languages.${index}.listeningLevel`}
                      render={({ field: { value = '', ...field } }) => (
                        <FormItem>
                          <FormLabel>Nível de escuta</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um nível" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languageProficiencySchema.options.map((lp) => {
                                return (
                                  <SelectItem value={lp} key={lp}>
                                    {LanguageProficiency[lp]}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addLanguage}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar outra língua
            </Button>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6 pt-4">
            {form.getValues('skills')?.map((_, index) => (
              <div key={index} className="space-y-4">
                {index > 0 && <Separator className="my-4" />}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Skill {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(index)}
                    className="text-destructive h-8 px-2"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`skills.${index}.skillName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., JavaScript, Project Management"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.skillType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select skill type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Programming">
                              Programming
                            </SelectItem>
                            <SelectItem value="Framework">Framework</SelectItem>
                            <SelectItem value="Database">Database</SelectItem>
                            <SelectItem value="Cloud">Cloud</SelectItem>
                            <SelectItem value="Tools">Tools</SelectItem>
                            <SelectItem value="Soft Skills">
                              Soft Skills
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`skills.${index}.skillLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select skill level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 - Beginner</SelectItem>
                            <SelectItem value="2">2 - Basic</SelectItem>
                            <SelectItem value="3">3 - Intermediate</SelectItem>
                            <SelectItem value="4">4 - Advanced</SelectItem>
                            <SelectItem value="5">5 - Expert</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addSkill}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar outra habilidade
            </Button>
          </TabsContent>
        </Tabs>
        <FormNavigationButtons skip />
      </form>
    </Form>
  )
}
