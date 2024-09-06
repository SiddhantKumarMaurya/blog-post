
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-md rounded-lg mb-6 hover:shadow-2xl transition-shadow duration-300">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/" className="text-white hover:text-gray-400">My Blogs</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link href="/create" className="text-white hover:text-gray-400">Create</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
