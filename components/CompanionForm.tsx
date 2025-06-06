"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"

// Define the schema for the form using Zod
const formSchema = z.object({
  name: z.string().min(1,{message:'Companion is required'}),
  subject: z.string().min(1,{message:'Subject is required'}),
  topic: z.string().min(1,{message:'Topic is required'}),
  voice: z.string().min(1,{message:'Voice is required'}),
  style: z.string().min(1,{message:'Style is required'}),
  duration: z.coerce.number().min(1,{message:'Duration is required'}),

})

// This is the form component for creating a Companion
const CompanionForm = () => {
  {/** Form initialization using react-hook-form with Zod schema validation
       This handles form state, validation, and submission 
  */}
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name :'',
      subject :'',
      topic :'',
      voice :'',
      style :'',
      duration :15,
    },
  })
 
  {/** This function handles form submission.*/}
  const onSubmit = (values: z.infer<typeof formSchema>) =>{
    // Do something with the form values.This will be type-safe and validated.
    console.log(values)
  }

  return (   
    /** Render the form using the Form component from the UI library */
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/** This is for Companion Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your Companion name" 
                  {...field}
                  className="input" 
                />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />

        {/** This is for Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value } // Ensure default value is set
                >
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem 
                        key={subject} 
                        value={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
        {/** This is for Topic */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel> What should the Companion help with?</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ex.Derivates &  Integrals" 
                  {...field}
                  className="input" 
                />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
        {/** This is for Voice */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value } // Ensure default value is set
                >
                  <SelectTrigger className="input ">
                    <SelectValue placeholder="Select the Voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      Male
                    </SelectItem>
                    <SelectItem value="female">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
        {/** This is for Style */}
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value } // Ensure default value is set
                >
                  <SelectTrigger className="input ">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">
                      Formal
                    </SelectItem>
                    <SelectItem value="casual">
                      Casual
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
        {/** This is for Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Session duration in minutes</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="15" 
                  {...field}
                  className="input" 
                />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
      </form>
    </Form>
  )

}

export default CompanionForm