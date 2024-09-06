
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BlogCard({ post, onDelete }) {
  return (
    <div className="m-6">
      <Card className="flex flex-col h-[250px] w-[400px] mb-6 p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 truncate">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <div className="flex-grow h-full overflow-hidden">
            <p className="text-gray-700 mb-4 overflow-hidden text-ellipsis">{post.content.substring(0, 100)}...</p>
          </div>
          <div className="flex-shrink-0 mt-auto">
            <div className="flex justify-between items-center">

              {/* alerts before deleting any post */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="mr-12">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your post from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(post.id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="flex space-x-2">
                <Link href={`/edit/${post.id}`}>
                  <Button style={{ backgroundColor: 'rgb(59, 59, 59)' }} className="text-white">Edit</Button>
                </Link>
                <Link href={`/posts/${post.id}`}>
                  <Button className="classvariant-primary">Expand</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
