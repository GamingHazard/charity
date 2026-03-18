'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { mockBlogs } from '@/lib/mock-data';
import { Eye, MessageCircle, Share2, User } from 'lucide-react';

 
export default function Programs() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <section className="relative z-10 min-h-screen mb-10 w-full flex items-center justify-center overflow-hidden pt-16">
            {/* Background Image */}
            <Image
              src="https://png.pngtree.com/thumb_back/fh260/background/20260121/pngtree-morning-routine-with-newspaper-and-coffee-image_21182000.webp"
              alt="Children learning in classroom"
              fill
              className="object-cover w-full"
              priority
            />
      
            {/* Overlay */}
            <div className="absolute inset-0 bg-green-900/70"></div>
      
            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                {/* Left: Text */}
                <div className="w-full  lg:text-left space-y-6 lg:space-y-8">
                  <div className="space-y-3 lg:space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg">
                    Our News
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto lg:mx-0 text-balance drop-shadow-md">
                    Stay informed about our latest initiatives, success stories, and upcoming events as we continue to make a positive impact in communities around the world.
                    </p>
                  </div>
      
                  
                </div>
      
             
              </div>
            </div>
      
            <img src='/circle-left.png' className='absolute hidden sm:inline-block -left-70 top-20 -mr-4'/>
            <img src='/object-1-2.png' className='absolute hidden sm:inline-block bottom-0 '/>
          </section>
      <section className="flex-1 py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Latest Programs and Impact
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover how our programs are making a difference in the lives of those we serve, and learn about the tangible impact we are creating together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mockBlogs.map((post) => (
            <Card key={post._id} className="  bg-card cursor-pointer p-0 h-auto border-border hover:shadow-lg transition-shadow">
              <img
                src={`${post.image.url}`}
                alt={post.title}
                
                className="object-cover w-full  h-48 rounded-md  "
              />
              <span>
                <p className="text-lg font-semibold my-auto text-foreground p-2">
                {post.title}
              </p>
              <p className="text-muted-foreground text-wrap truncate line-clamp-2 p-2">
                {post.excerpt}
              </p>
                <span className='w-full flex'>
                    <span className="flex w-1/2    items-center gap-2 text-sm text-foreground/70 p-2">
                  <p className="text-muted-foreground flex items-center text-sm p-2">
                <User className="inline-block w-4 h-4 mr-1" />
                {post.author}
              </p>
                </span>
                <span className='flex flex-1 items-center justify-evenly'>
                  <p className="text-muted-foreground flex items-center text-sm p-2">
                <Eye className="inline-block w-4 h-4 mr-1" />
                0
                  </p>
                   
                  <p className="text-muted-foreground flex items-center text-sm p-2">
                <Share2 className="inline-block w-4 h-4 mr-1" />
                0
              </p><p className="text-muted-foreground flex items-center text-sm p-2">
                <MessageCircle className="inline-block w-4 h-4 mr-1" />
                0
              </p>
                </span>
                </span>
              </span>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
