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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import { toast } from '@/hooks/use-toast'
import {
  languagesAndSkillsSchema,
  LanguagesAndSkillsStepSchema,
} from '@/types/app/register/candidate/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
      toast({
        title: 'Cannot remove',
        description: 'You must have at least one skill entry.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="languages" className="space-y-6 pt-4">
            {form.getValues('languages')?.map((_, index) => (
              <div key={index} className="space-y-4">
                {index > 0 && <Separator className="my-4" />}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Language {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                    className="text-destructive h-8 px-2"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`languages.${index}.language`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="Portuguese">Portuguese</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Written Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`languages.${index}.spokenLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spoken Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`languages.${index}.readingLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reading Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`languages.${index}.listeningLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listening Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
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
              onClick={addLanguage}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Language
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
              Add Another Skill
            </Button>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
