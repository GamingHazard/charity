'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Eye, Share2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface BlogDetailProps {
  _id: string;
  title: string;
  excerpt: string;
  image: {
    url: string;
    public_id: string;
  };
  content: string;
  author: string;
  date: string;
  likes: string[];
  views: string[];
  comments: {
    name: string;
    comment: string;
    commentedOn: string;
  }[];
}

export function BlogDetail({ _id, title, excerpt, image, content, author, date, likes, views, comments }: BlogDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [comment, setComment] = useState('');
  const [displayComments, setDisplayComments] = useState(comments);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setDisplayComments([
        ...displayComments,
        {
          name: 'You',
          comment: comment,
          commentedOn: new Date().toLocaleDateString(),
        },
      ]);
      setComment('');
    }
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border py-2 px-3 sm:px-6 md:px-10">
        <Link href="/blog">
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-primary/10">
            <ArrowLeft size={20} />
            <span className="text-sm sm:text-base">Back to Blogs</span>
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64 sm:h-96 md:h-[500px] bg-muted">
        <Image
          src={image.url}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          {/* Title */}
          <h1
            style={{ fontFamily: 'Quicksand' }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-accent mb-4 leading-tight"
          >
            {title}
          </h1>

          {/* Excerpt */}
          <p style={{ fontFamily: 'Quicksand' }} className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 italic">
            {excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {author.charAt(0)}
              </div>
              <div>
                <p style={{ fontFamily: 'Quicksand' }} className="font-semibold text-sm sm:text-base text-accent">
                  {author}
                </p>
                <p style={{ fontFamily: 'Quicksand' }} className="text-xs sm:text-sm text-muted-foreground">
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground ml-0 sm:ml-auto">
              <span className="flex items-center gap-1">
                <Eye size={16} className="text-primary" />
                <span>{views.length} views</span>
              </span>
              <span className="flex items-center gap-1">
                <Heart size={16} className="text-primary" />
                <span>{likeCount} likes</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} className="text-primary" />
                <span>{displayComments.length}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Blog Content */}
        <div style={{ fontFamily: 'Quicksand' }} className="prose prose-sm sm:prose md:prose-lg max-w-none mb-12">
          {content.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed mb-6 text-justify"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Engagement Section */}
        <div className="border-t border-b border-border py-6 sm:py-8 mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                onClick={handleLike}
                variant="outline"
                className={`flex-1 sm:flex-none flex items-center gap-2 ${
                  isLiked ? 'bg-primary/10 border-primary text-primary' : ''
                }`}
              >
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                <span className="text-xs sm:text-sm">{likeCount} Likes</span>
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none flex items-center gap-2">
                <Share2 size={18} />
                <span className="text-xs sm:text-sm hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-8 md:mb-12">
          <h2 style={{ fontFamily: 'Quicksand' }} className="text-2xl sm:text-3xl font-bold text-accent mb-6">
            Comments ({displayComments.length})
          </h2>

          {/* Add Comment */}
          <div className="mb-8 p-4 sm:p-6 bg-card rounded-lg border border-border">
            <h3 style={{ fontFamily: 'Quicksand' }} className="text-base sm:text-lg font-semibold text-accent mb-4">
              Add Your Comment
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts on this article..."
              className="w-full p-3 sm:p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              rows={4}
            />
            <Button
              onClick={handleAddComment}
              className="mt-4 bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
            >
              Post Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {displayComments.length > 0 ? (
              displayComments.map((cmnt, index) => (
                <div key={index} className="p-4 sm:p-6 bg-card rounded-lg border border-border">
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                      {cmnt.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Quicksand' }} className="font-semibold text-sm sm:text-base text-accent">
                        {cmnt.name}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {cmnt.commentedOn}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Quicksand' }} className="text-sm sm:text-base text-foreground leading-relaxed">
                    {cmnt.comment}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ fontFamily: 'Quicksand' }} className="text-center text-muted-foreground py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className="mt-12 md:mt-16 p-6 sm:p-8 md:p-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <h3 style={{ fontFamily: 'Quicksand' }} className="text-xl sm:text-2xl md:text-3xl font-bold text-accent mb-3">
            Want to Read More Stories?
          </h3>
          <p style={{ fontFamily: 'Quicksand' }} className="text-sm sm:text-base text-muted-foreground mb-4">
            Explore more inspiring stories and updates from Seeds of Love Foundation.
          </p>
          <Link href="/blog">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
              Explore All Articles
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
