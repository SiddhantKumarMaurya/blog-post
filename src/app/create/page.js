"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handles case: when user submits without title and description 
    if (!title || !content) {
      toast({
        title: "Validation Error",
        description: "Both title and content are required.",
        // variant: "error",
      });
      return;
    }
    
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then(response => response.json())
      .then(() => {
        // Notifies that the post has been created
        toast({
          title: "Post Created",
          description: "Your post has been successfully created.",
        });
        router.push('/');
      })
      .catch(err => console.error('Error:', err));
  };

  return (
    <div className="container mx-auto p-8 ">
      <Header />
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4 w-full">
            <label className="text-center block text-sm font-medium text-gray-700 mb-2">Title</label>
            <Input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full shadow-inner"
            />
          </div>
          <div className="mb-4 w-full h-[500px]">
            <label className="text-center block text-sm font-medium text-gray-700 mb-2">Content</label>
            <Textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              rows={6}
              className="w-full shadow-inner h-full"
            />
          </div>
          <div className="flex justify-center w-full mt-4">
            <Button type="submit" classvariant="primary">
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
