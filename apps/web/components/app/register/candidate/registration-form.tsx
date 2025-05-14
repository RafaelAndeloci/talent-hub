"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema definitions remain the same...
// Step 1: Personal Info Schema
const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  birthDate: z.string().min(1, "Birth date is required"),
  professionalHeadline: z.string().optional(),
  about: z.string().optional(),
  social: z
    .object({
      linkedin: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
      github: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
      portfolio: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
    })
    .optional(),
});

// Step 2: Preferences Schema
const preferencesSchema = z.object({
  salary: z.string().optional(),
  employmentRegime: z.string().optional(),
  employmentType: z.string().optional(),
  workplaceType: z.string().optional(),
  positionLevel: z.string().optional(),
  benefits: z.array(z.string()).optional(),
});

// Step 3: Academic Schema
const academicSchema = z.object({
  courseName: z.string().min(2, "Course name must be at least 2 characters"),
  institutionName: z
    .string()
    .min(2, "Institution name must be at least 2 characters"),
  degreeType: z.string().min(1, "Please select a degree type"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  gradePointAverage: z.string().optional(),
});

// Step 4: Professional Schema
const professionalSchema = z.object({
  position: z.string().min(2, "Position must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  employmentType: z.string().min(1, "Please select an employment type"),
  workplaceType: z.string().min(1, "Please select a workplace type"),
});

// Step 5: Languages and Skills Schema
const languagesAndSkillsSchema = z.object({
  languages: z
    .array(
      z.object({
        language: z.string().min(1, "Language is required"),
        writtenLevel: z.string().min(1, "Written level is required"),
        spokenLevel: z.string().min(1, "Spoken level is required"),
        readingLevel: z.string().min(1, "Reading level is required"),
        listeningLevel: z.string().min(1, "Listening level is required"),
      }),
    )
    .min(1, "Please add at least one language"),
  skills: z
    .array(
      z.object({
        skillName: z.string().min(1, "Skill name is required"),
        skillType: z.string().min(1, "Skill type is required"),
        skillLevel: z.string().min(1, "Skill level is required"),
      }),
    )
    .min(1, "Please add at least one skill"),
});

// Combined schema for all steps
const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...preferencesSchema.shape,
  ...academicSchema.shape,
  ...professionalSchema.shape,
  ...languagesAndSkillsSchema.shape,
});

type FormValues = z.infer<typeof formSchema>;

export function StudentRegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormValues>>({
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
    },
    benefits: [],
    isCurrent: false,
    languages: [
      {
        language: "",
        writtenLevel: "",
        spokenLevel: "",
        readingLevel: "",
        listeningLevel: "",
      },
    ],
    skills: [
      {
        skillName: "",
        skillType: "",
        skillLevel: "",
      },
    ],
  });
  const [initialData, setInitialData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("languages");

  useEffect(() => {
    // Retrieve the initial registration data
    const storedData = sessionStorage.getItem("registrationData");
    if (storedData) {
      setInitialData(JSON.parse(storedData));
    }
  }, []);

  // Get the schema for the current step
  const getCurrentSchema = () => {
    switch (step) {
      case 1:
        return personalInfoSchema;
      case 2:
        return preferencesSchema;
      case 3:
        return academicSchema;
      case 4:
        return professionalSchema;
      case 5:
        return languagesAndSkillsSchema;
      default:
        return personalInfoSchema;
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(getCurrentSchema()),
    defaultValues: {
      ...formData,
    },
  });

  const onSubmit = (values: Partial<FormValues>) => {
    const updatedData = { ...formData, ...values };
    setFormData(updatedData);

    if (step < 5) {
      setStep(step + 1);
    } else {
      // Final submission - combine with initial registration data
      const completeData = {
        ...initialData,
        profile: updatedData,
      };

      console.log("Complete registration data:", completeData);

      toast({
        title: "Registration successful!",
        description: "Your student account has been created.",
      });
      // Here you would typically send the data to your API
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Watch the isCurrent field to conditionally disable the endDate field
  const isCurrentlyStudying = form.watch("isCurrent") && step === 3;
  const isCurrentlyWorking = form.watch("isCurrent") && step === 4;

  // Functions to add and remove languages and skills
  const addLanguage = () => {
    const currentLanguages = form.getValues("languages") || [];
    form.setValue("languages", [
      ...currentLanguages,
      {
        language: "",
        writtenLevel: "",
        spokenLevel: "",
        readingLevel: "",
        listeningLevel: "",
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    const currentLanguages = form.getValues("languages") || [];
    if (currentLanguages.length > 1) {
      form.setValue(
        "languages",
        currentLanguages.filter((_, i) => i !== index),
      );
    } else {
      toast({
        title: "Cannot remove",
        description: "You must have at least one language entry.",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    const currentSkills = form.getValues("skills") || [];
    form.setValue("skills", [
      ...currentSkills,
      {
        skillName: "",
        skillType: "",
        skillLevel: "",
      },
    ]);
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills") || [];
    if (currentSkills.length > 1) {
      form.setValue(
        "skills",
        currentSkills.filter((_, i) => i !== index),
      );
    } else {
      toast({
        title: "Cannot remove",
        description: "You must have at least one skill entry.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
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
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          max={new Date().toISOString().split("T")[0]}
                          min="1900-01-01"
                        />
                      </FormControl>
                      <FormDescription>Your date of birth</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professionalHeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Headline</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Computer Science Student | Web Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description of your professional identity
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
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell employers about yourself, your goals, and what you're looking for..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will appear on your public profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Social Media</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="social.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/yourprofile"
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://github.com/yourusername"
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://twitter.com/yourusername"
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourportfolio.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Salary</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 50000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your expected annual salary
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employmentRegime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Regime</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment regime" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CLT">CLT</SelectItem>
                          <SelectItem value="PJ">PJ</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Your preferred employment regime
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
                        Your preferred employment type
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
                      <FormDescription>
                        Your preferred workplace arrangement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="positionLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Intern">Intern</SelectItem>
                          <SelectItem value="Junior">Junior</SelectItem>
                          <SelectItem value="Mid-level">Mid-level</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Lead">Lead</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Your preferred position level
                      </FormDescription>
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
                    <div className="mb-4">
                      <FormLabel>Desired Benefits</FormLabel>
                      <FormDescription>Select all that apply</FormDescription>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {[
                        { id: "Health Insurance", label: "Health Insurance" },
                        { id: "Dental Insurance", label: "Dental Insurance" },
                        { id: "Life Insurance", label: "Life Insurance" },
                        { id: "Meal Voucher", label: "Meal Voucher" },
                        {
                          id: "Transportation Voucher",
                          label: "Transportation Voucher",
                        },
                        {
                          id: "Remote Work Allowance",
                          label: "Remote Work Allowance",
                        },
                        {
                          id: "Education Assistance",
                          label: "Education Assistance",
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
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Computer Science"
                          {...field}
                        />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select degree type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="High School">
                            High School
                          </SelectItem>
                          <SelectItem value="Bachelor">Bachelor</SelectItem>
                          <SelectItem value="Master">Master</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                          <SelectItem value="Technologist">
                            Technologist
                          </SelectItem>
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
                      <FormDescription>
                        Your GPA (if applicable)
                      </FormDescription>
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
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormDescription>
                        When you started your studies
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
                      <FormLabel>End Date (if completed)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          disabled={isCurrentlyStudying}
                          min={form.watch("startDate") || ""}
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormDescription>
                        {isCurrentlyStudying
                          ? "This field is disabled because you are currently studying"
                          : "When you completed or expect to complete your studies"}
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
          )}

          {step === 4 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Software Engineer"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your job title or position
                      </FormDescription>
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
                      <FormDescription>
                        The work location arrangement
                      </FormDescription>
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
                          max={new Date().toISOString().split("T")[0]}
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
                          min={form.watch("startDate") || ""}
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormDescription>
                        {isCurrentlyWorking
                          ? "This field is disabled because you are currently working here"
                          : "When you stopped working at this position"}
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
          )}

          {step === 5 && (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="languages" className="space-y-6 pt-4">
                {form.getValues("languages")?.map((_, index) => (
                  <div key={index} className="space-y-4">
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        Language {index + 1}
                      </h3>
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
                              <SelectItem value="Portuguese">
                                Portuguese
                              </SelectItem>
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
                                <SelectItem value="Advanced">
                                  Advanced
                                </SelectItem>
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
                                <SelectItem value="Advanced">
                                  Advanced
                                </SelectItem>
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
                                <SelectItem value="Advanced">
                                  Advanced
                                </SelectItem>
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
                                <SelectItem value="Advanced">
                                  Advanced
                                </SelectItem>
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
                {form.getValues("skills")?.map((_, index) => (
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
                                <SelectItem value="Framework">
                                  Framework
                                </SelectItem>
                                <SelectItem value="Database">
                                  Database
                                </SelectItem>
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
                                <SelectItem value="3">
                                  3 - Intermediate
                                </SelectItem>
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
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit">
              {step === 5 ? (
                "Complete Registration"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
