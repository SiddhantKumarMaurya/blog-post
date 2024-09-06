"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const { toast } = useToast();

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false); // Data fetched, stop loading
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false); // Stop loading on error as well
      });
  }, []);

  const deletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));

        // notifies that the post has been deleted
        toast({
          title: "Delete Post",
          description: "Delete Successful",
        });
      })
      .catch(err => console.error('Error:', err));
  };

  return (
    <div className="container mx-auto p-8">
      <Header />
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">No Blog Posts Available</h1>
          <p className="text-lg text-gray-600 mb-6">
            It looks like there are no posts available at the moment. 
            This is the perfect opportunity for you to share your own stories, ideas, and experiences.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Add your memories, do journaling, take notes, and make this space truly yours. 
            Start creating your content now!
          </p>
          <Link href="/create">
            <Button className="primary">
              Create Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} onDelete={deletePost} />
          ))}
        </div>
      )}
    </div>
  );
}
