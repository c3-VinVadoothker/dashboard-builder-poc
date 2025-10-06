"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Send, Copy, Check } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  industry: z.string().min(1, {
    message: "Please select a C3 AI application.",
  }),
  useCase: z.string().min(5, {
    message: "Use case must be at least 5 characters.",
  }),
  dataTypes: z.string().min(5, {
    message: "Data types must be at least 5 characters.",
  }),
  visualizations: z.string().min(5, {
    message: "Visualizations must be at least 5 characters.",
  }),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function CustomScenarioForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      title: "",
      description: "",
      industry: "c3-ai-reliability", // Default to C3 AI Reliability
      useCase: "",
      dataTypes: "",
      visualizations: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Format the message for Teams (plain text, no markdown or emojis)
      const message = `New Custom Scenario Request

Basic Information:
- Title: ${data.title}
- C3 Application: ${data.industry}

Description:
${data.description}

Use Case:
${data.useCase}

Data Requirements:
- Data Types: ${data.dataTypes}
- Visualizations: ${data.visualizations}

Additional Notes:
${data.additionalNotes || "None provided"}

---
Submitted via Dashboard Builder Demo`;

      // Create Teams URL with the formatted message
      const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=vin.vadoothker@c3.ai&message=${encodeURIComponent(message)}`;
      
      // Store the message for the success dialog
      setSuccessMessage(message);
      
      // Open Teams chat
      window.open(teamsUrl, '_blank');
      
      // Reset form and close dialog
      form.reset();
      setIsOpen(false);
      
      // Show success dialog
      setShowSuccessDialog(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(successMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Want to create your own scenario?
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] min-w-[80vw] max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Scenario</DialogTitle>
          <DialogDescription>
            Tell us about your use case and we&apos;ll create a custom dashboard scenario for you.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Basic Information
              </h3>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scenario Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Supply Chain Analytics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>C3 Application</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a C3 AI application" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[400px]">
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50">
                        Asset Performance Suite
                      </div>
                      <SelectItem value="c3-ai-reliability">C3 AI Reliability</SelectItem>
                      <SelectItem value="c3-ai-process-optimization">C3 AI Process Optimization</SelectItem>
                      <SelectItem value="c3-ai-energy-management">C3 AI Energy Management</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                        Supply Chain Suite
                      </div>
                      <SelectItem value="c3-ai-inventory-optimization">C3 AI Inventory Optimization</SelectItem>
                      <SelectItem value="c3-ai-supply-network-risk">C3 AI Supply Network Risk</SelectItem>
                      <SelectItem value="c3-ai-production-schedule-optimization">C3 AI Production Schedule Optimization</SelectItem>
                      <SelectItem value="c3-ai-sourcing-optimization">C3 AI Sourcing Optimization</SelectItem>
                      <SelectItem value="c3-ai-demand-forecasting">C3 AI Demand Forecasting</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                        Sustainability Suite
                      </div>
                      <SelectItem value="c3-ai-esg">C3 AI ESG</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                        AI CRM Suite
                      </div>
                      <SelectItem value="c3-ai-crm">C3 AI CRM</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                        Financial Services Suite
                      </div>
                      <SelectItem value="c3-ai-anti-money-laundering">C3 AI Anti-Money Laundering</SelectItem>
                      <SelectItem value="c3-ai-smart-lending">C3 AI Smart Lending</SelectItem>
                      <SelectItem value="c3-ai-cash-management">C3 AI Cash Management</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                        Defense & Intelligence Suite
                      </div>
                      <SelectItem value="c3-ai-readiness">C3 AI Readiness</SelectItem>
                      <SelectItem value="c3-ai-intelligence-analysis">C3 AI Intelligence Analysis</SelectItem>
                      <SelectItem value="c3-ai-decision-advantage">C3 AI Decision Advantage</SelectItem>
                      <SelectItem value="c3-ai-contested-logistics">C3 AI Contested Logistics</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                        State & Local Government Suite
                      </div>
                      <SelectItem value="c3-ai-property-appraisal">C3 AI Property Appraisal</SelectItem>
                      <SelectItem value="c3-law-enforcement">C3 Law Enforcement</SelectItem>
                      <SelectItem value="c3-generative-ai-government-programs">C3 Generative AI for Government Programs</SelectItem>
                      <SelectItem value="c3-generative-ai-constituent-services">C3 Generative AI for Constituent Services</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                        Health Suite
                      </div>
                      <SelectItem value="c3-ai-health">C3 AI Health</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Requirements Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Requirements
              </h3>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what this dashboard should help users understand and accomplish..."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the business problem this dashboard should solve.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="useCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Use Case</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Monitor real-time inventory levels, track supplier performance, optimize warehouse operations..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      What are some sample tasks should users be able to accomplish with this dashboard?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Technical Requirements Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Technical Requirements
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dataTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Types</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., Inventory levels, supplier metrics, order history, delivery times..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        What types of data could this dashboard display?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="visualizations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visualizations</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., Bar charts for inventory levels, line charts for trends, maps for locations..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        What types of charts and visualizations do you think users would like?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Additional Information
              </h3>
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional requirements, constraints, or special considerations..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button 
                type="submit" 
                disabled={isSubmitting || !form.formState.isValid} 
                className="px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

    {/* Success Dialog */}
    <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <DialogContent className="w-[80vw] min-w-[80vw] max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Sent Successfully!</DialogTitle>
          <DialogDescription>
            Your custom scenario request has been sent. If Teams didn&apos;t open automatically, you can copy the message below and send it manually.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Teams Link */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Teams Chat Link:</h4>
            <div className="flex items-center space-x-2">
              <Input 
                value="https://teams.microsoft.com/l/chat/0/0?users=vin.vadoothker@c3.ai" 
                readOnly 
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText("https://teams.microsoft.com/l/chat/0/0?users=vin.vadoothker@c3.ai");
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Message to Send:</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center space-x-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Message</span>
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={successMessage}
              readOnly
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          {/* Instructions */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Click the Teams link above to open the chat with vin.vadoothker@c3.ai</li>
              <li>If Teams doesn&apos;t open, copy the message above and paste it into your Teams chat</li>
              <li>Send the message to complete your custom scenario request</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setShowSuccessDialog(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
