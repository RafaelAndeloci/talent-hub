import { Checkbox } from '@/components/ui/checkbox'
import {
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
import { Textarea } from '@/components/ui/textarea'
import { useRegisterCandidate } from '@/contexts/register/candidate'
import { ProfessionalStepSchema } from '@/types/app/register/candidate/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface ProfessionalStepProps {}
export function ProfessionalStep({}: ProfessionalStepProps) {
  const { currentStep, getStepSchema } = useRegisterCandidate()

  const form = useForm<ProfessionalStepSchema>({
    resolver: zodResolver(getStepSchema('professional')),
  })
  const isCurrentlyWorking =
    form.watch('isCurrent') && currentStep === 'professional'
  return (
    <div>
      <>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Software Engineer" {...field} />
                </FormControl>
                <FormDescription>Your job title or position</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Google" {...field} />
                </FormControl>
                <FormDescription>
                  The company or organization you worked for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The type of employment arrangement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workplaceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workplace Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select workplace type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The work location arrangement</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
                <FormDescription>
                  When you started working at this position
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date (if not current)</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    disabled={isCurrentlyWorking}
                    min={form.watch('startDate') || ''}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
                <FormDescription>
                  {isCurrentlyWorking
                    ? 'This field is disabled because you are currently working here'
                    : 'When you stopped working at this position'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isCurrent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Currently Working Here</FormLabel>
                <FormDescription>
                  Check if you are still working at this company
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your responsibilities, achievements, and skills used..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of your role and responsibilities
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    </div>
  )
}
