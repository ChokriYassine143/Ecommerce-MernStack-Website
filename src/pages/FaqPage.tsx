import MainLayout from "@/components/layout/MainLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, MessageSquare } from "lucide-react";

const faqData = {
  ordering: [
    {
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the steps to enter your shipping and payment information to complete your order."
    },
    {
      question: "Can I modify or cancel my order after it's been placed?",
      answer: "You can modify or cancel your order within 1 hour of placing it. Please contact our customer service team immediately. After this window, we begin processing orders and may not be able to make changes."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. Shipping rates and delivery times vary by location. You can see the shipping options available to your country during checkout."
    }
  ],
  shipping: [
    {
      question: "How long will it take to receive my order?",
      answer: "Domestic orders typically arrive within 3-5 business days. International orders may take 7-14 business days depending on the destination and customs processing. You'll receive tracking information once your order ships."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with tracking information. You can also track your order by going to the 'Order Tracking' page and entering your order number."
    },
    {
      question: "What if my package is lost or damaged?",
      answer: "If your package is lost or arrives damaged, please contact our customer service within 48 hours of the delivery date. We'll work with you to resolve the issue through replacement or refund."
    }
  ],
  returns: [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery. Items must be unused, in their original packaging, and in the same condition you received them. Some products have specific return policies, which are noted on their product pages."
    },
    {
      question: "How do I start a return?",
      answer: "To start a return, go to your account, find the order, and select 'Return Items'. Follow the instructions to print a return label. If you checked out as a guest, contact customer service with your order number."
    },
    {
      question: "When will I receive my refund?",
      answer: "Once we receive and inspect your return (usually within 3-5 business days), we'll process your refund. Depending on your payment method, it may take an additional 5-10 business days for the refund to appear in your account."
    }
  ],
  products: [
    {
      question: "Are your products really eco-friendly?",
      answer: "Yes, all our products meet strict sustainability standards. We prioritize products made from renewable, recycled, or biodegradable materials, and we evaluate the full lifecycle impact of everything we sell."
    },
    {
      question: "How do you verify product sustainability claims?",
      answer: "We require our suppliers to provide documentation of their sustainability practices and third-party certifications. We also conduct regular audits and testing to ensure products meet our standards."
    },
    {
      question: "Do you offer bulk or wholesale purchasing?",
      answer: "Yes, we offer wholesale options for businesses interested in our products. Please contact our wholesale department at wholesale@ecoshop.com for more information and pricing."
    }
  ]
};

const FaqPage = () => {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your question has been submitted. We'll respond within 24-48 hours.");
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, ordering process, shipping, and returns.
            If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="ordering" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="ordering">Ordering</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ordering" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {faqData.ordering.map((item, index) => (
                  <AccordionItem key={index} value={`ordering-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 mr-2 shrink-0 text-green-600" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-7">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {faqData.shipping.map((item, index) => (
                  <AccordionItem key={index} value={`shipping-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 mr-2 shrink-0 text-green-600" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-7">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="returns" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {faqData.returns.map((item, index) => (
                  <AccordionItem key={index} value={`returns-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 mr-2 shrink-0 text-green-600" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-7">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {faqData.products.map((item, index) => (
                  <AccordionItem key={index} value={`products-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 mr-2 shrink-0 text-green-600" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-7">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-sm">
          <div className="flex items-start mb-6">
            <MessageSquare className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold">Still have questions?</h2>
              <p className="text-gray-600 mt-1">Contact our support team and we'll get back to you within 24-48 hours.</p>
            </div>
          </div>
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input id="email" type="email" placeholder="Your email" required />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <Input id="subject" placeholder="Subject of your inquiry" required />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <Textarea id="message" placeholder="Your question or message" rows={4} required />
            </div>
            
            <Button type="submit" className="w-full">Submit Question</Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default FaqPage;
