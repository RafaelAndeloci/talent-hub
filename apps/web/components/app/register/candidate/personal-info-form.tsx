"use client";
import { AnimatedButton } from "@/components/ui/animated/button";
import { AnimatedInput } from "@/components/ui/animated/input";
import { AnimatedTextarea } from "@/components/ui/animated/text-area";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRegisterCandidate } from "@/contexts/register/candidate";
import { cn } from "@/lib/utils";
import {
  PersonalInfo,
  personalInfoSchema,
} from "@/types/app/register/candidate/form/personal-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const hobbyVariant = {
  hidden: { opacity: 0, x: -400 },
  visible: () => {
    return {
      x: 0,
      opacity: 1,
      transition: {
        type: "easeOut",
        duration: 0.3,
        opacity: {
          delay: 0.15,
        },
      },
    };
  },
};

export function PersonalInfoForm() {
  const { goToStep } = useRegisterCandidate();
  const [userImage, setUserImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    null,
  );
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      hobbies: [],
    },
  });

  function handleUserImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 5MB limit");
        return;
      }
      setUserImage(file);
      setUserImagePreview(URL.createObjectURL(file));
    }
  }

  function handleBannerImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 5MB limit");
        return;
      }
      setBannerImage(file);
      setBannerImagePreview(URL.createObjectURL(file));
    }
  }

  function addHobby() {
    const currentHobbies = form.getValues().hobbies;
    form.setValue("hobbies", [...currentHobbies, ""]);
  }

  function removeHobby(index: number) {
    const currentHobbies = form.getValues().hobbies;
    form.setValue(
      "hobbies",
      currentHobbies.filter((_, i) => i !== index),
    );
  }

  function addSocialMedia() {
    const currentLinks = form.getValues().social;
    // form.setValue("social", [
    //   ...currentLinks,
    //   { platform: "", url: "" },
    // ]);
  }

  function removeSocialMedia(index: number) {
    const currentLinks = form.getValues().social;
    // if (currentLinks.length > 1) {
    //   form.setValue(
    //     "socialMediaLinks",
    //     currentLinks.filter((_, i) => i !== index),
    //   );
    // }
  }

  return (
    <Form {...form}>
      <CardContent className="flex flex-1">
        <div className="flex h-full w-full flex-col items-center gap-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-medium">Informação pessoal</h3>

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nome Completo
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <AnimatedInput
                        custom={1}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Data de nascimento
                      <FormMessage />
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <AnimatedButton
                            custom={2}
                            variant={"outline"}
                            className={cn(
                              "w-full text-left font-normal [&_button]:w-full",
                              !field.value && "text-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </AnimatedButton>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(d) => field.onChange(d)}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field: { value = "", ...field } }) => (
                  <FormItem>
                    <FormLabel>
                      Sobre <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <AnimatedTextarea
                        custom={3}
                        placeholder="Nos diga sobre você, suas habilidades, e suas metas de carreira..."
                        className="[&_textarea]:min-h-[120px]"
                        value={value!}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Isso será exibido no seu perfil. Máx 500 caracteres.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            {/* Hobbies */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Hobbies</h3>
                <AnimatedButton
                  custom={4}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addHobby}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </AnimatedButton>
              </div>

              {form.watch("hobbies")?.map((_, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-2"
                >
                  <FormField
                    control={form.control}
                    name={`hobbies.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <AnimatedTextarea
                            variants={hobbyVariant}
                            custom={index + 1}
                            placeholder="Ex: Fotografia, Basquete, Ler"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHobby(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Links sociais</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  // onClick={addSocialMedia}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>

              {/* {form.watch("social").map((_, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`social.${index}.platform`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AnimatedInput
                              placeholder="Platform (e.g., LinkedIn)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`socialMediaLinks.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AnimatedInput placeholder="URL (https://...)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    // onClick={() => removeSocialMedia(index)}
                    disabled={form.watch("socialMediaLinks").length <= 1}
                    className="mt-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))} */}
            </div>

            {/* Profile Images */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-medium">Images do perfil</h3>

              <div className="space-y-4">
                <div>
                  <div className="font-medium">Imagem de perfil</div>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border">
                      {userImagePreview ? (
                        <img
                          src={userImagePreview || "/placeholder.svg"}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="dark:bg-muted bg-accent flex h-full w-full items-center justify-center">
                          <Upload className="text-muted dark:text-foreground h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <AnimatedInput
                        custom={3}
                        type="file"
                        accept="image/*"
                        title=""
                        onChange={handleUserImageChange}
                      />
                      <p className="text-foreground mt-1 text-xs">
                        Recomendamos escolher uma imagem quadrada (Máx 5 MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium">Imagem do fundo de perfil</div>
                  <div className="mt-2 space-y-2">
                    {bannerImagePreview && (
                      <div className="relative h-40 w-full overflow-hidden rounded-md border">
                        <img
                          src={bannerImagePreview || "/placeholder.svg"}
                          alt="Banner preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <AnimatedInput
                      custom={4}
                      type="file"
                      accept="image/*"
                      onChange={handleBannerImageChange}
                    />
                    <p className="text-foreground text-xs">
                      Recomendamos uma imagem 1200×300 pixels (Máx 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-medium">Contato</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contact.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email para contato
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <AnimatedInput
                          custom={5}
                          type="email"
                          placeholder="Ex:john@doe.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de celular</FormLabel>
                      <FormControl>
                        <AnimatedInput
                          custom={6}
                          placeholder="+55 (16) 1234-5678"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-end">
        <Button onClick={() => goToStep("professional-experience")}>
          Continuar
        </Button>
      </CardFooter>
    </Form>
  );
}
