"use client"
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import { Button } from '@/components/ui/button';

export default function ViewPost() {
    const [post, setPost] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const pathName = usePathname();
    const router = useRouter();
    const id = pathName.split('/').pop();
    
    // Fetch all posts to find next/previous posts
    useEffect(() => {
        fetch('http://localhost:5000/posts')
            .then(response => response.json())
            .then(data => setAllPosts(data.posts))
            .catch(err => console.error('Error fetching all posts:', err));
    }, []);

    // Fetch individual post based on current ID
    useEffect(() => {
        fetch(`http://localhost:5000/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data.post))
            .catch(err => console.error('Error fetching post:', err));
    }, [id]);

    // Find index of current post
    const currentIndex = allPosts.findIndex(p => p.id === parseInt(id));

    // Determine next and previous post IDs
    const nextPostId = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1]?.id : null;
    const prevPostId = currentIndex > 0 ? allPosts[currentIndex - 1]?.id : null;

    // to show loading untill the fetch has completed
    if (!post) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-6 ">
            <Header />
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <h1 className="break-words text-2xl font-bold mb-4 text-center">
                    {post.title}
                </h1>
                <pre className="break-words text-gray-700 whitespace-pre-wrap font-sans">
                    {post.content}
                </pre>
                <div className="flex justify-between mt-6">
                    {prevPostId && (
                        <Button onClick={() => router.push(`/posts/${prevPostId}`)}>
                            &lt;-
                        </Button>
                    )}
                    <Button onClick={() => router.push('/')}>
                        Home
                    </Button>
                    {nextPostId && (
                        <Button onClick={() => router.push(`/posts/${nextPostId}`)}>
                            -&gt;
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
