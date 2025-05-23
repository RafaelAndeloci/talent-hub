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
import { useRegisterCandidate } from '@/contexts/register/candidate'
import { AcademicStepSchema } from '@/types/app/register/candidate/form/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface AcademicStepProps {}
export function AcademicStep({}: AcademicStepProps) {
  const { currentStep, getStepSchema } = useRegisterCandidate()

  const form = useForm<AcademicStepSchema>({
    resolver: zodResolver(getStepSchema('academic')),
  })
  const isCurrentlyStudying =
    form.watch('isCurrent') && currentStep === 'academic'
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Computer Science" {...field} />
              </FormControl>
              <FormDescription>
                Your field of study or course name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institutionName"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Institution Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., University of California"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The school or university you attended
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="degreeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Technologist">Technologist</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Your degree or certification type
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gradePointAverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Point Average</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 3.5"
                  step="0.01"
                  min="0"
                  max="4"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your GPA (if applicable)</FormDescription>
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
              <FormDescription>When you started your studies</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date (if completed)</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  disabled={isCurrentlyStudying}
                  min={form.watch('startDate') || ''}
                  max={new Date().toISOString().split('T')[0]}
                />
              </FormControl>
              <FormDescription>
                {isCurrentlyStudying
                  ? 'This field is disabled because you are currently studying'
                  : 'When you completed or expect to complete your studies'}
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
              <FormLabel>Currently Studying</FormLabel>
              <FormDescription>
                Check if you are still studying at this institution
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </>
  )
}
