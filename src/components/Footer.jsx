import { Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold">GitHub Repo Analyzer</h3>
          <p className="text-sm text-gray-200 mt-1">
            Built for developers to explore GitHub repository data visually.
          </p>
        </div>

        <div className="flex space-x-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Github size={22} />
          </a>
          <a href="mailto:hussainayan9897@gmail.com" className="hover:text-gray-300">
            <Mail size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} GitHub Analyzer. All rights reserved.
      </div>
    </footer>
  );
}
