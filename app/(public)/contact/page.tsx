'use client';

import { useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <section className="flex-1 py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Contact Us
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get in touch with our team. We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">Our Contact Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">Email</h4>
                <p className="text-foreground/70">hello@seedsoflove.org</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Phone</h4>
                <p className="text-foreground/70">+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Office</h4>
                <p className="text-foreground/70">123 Main Street<br />New York, NY 10001</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border-border text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border-border text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border-border text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 bg-background border border-border rounded-md text-foreground resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
