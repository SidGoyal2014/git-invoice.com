// eslint-disable-next-line next/no-html-link-for-pages

"use client";
import { Star } from "lucide-react";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, LogOut } from "lucide-react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import Link from "next/link"; // Import Link from Next.js

export function NavbarComponent() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-border text-primary">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <DocumentIcon className="w-10 h-10" />
              <span className="text-xl font-bold text-black">Git Invoice</span>
            </div>
          </Link>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 text-black"
          onClick={() =>
            window.open(
              "https://github.com/ezzcodeezzlife/git-invoice.com",
              "_blank",
            )
          }
        >
          <Star className="w-4 h-4 hover:text-primary" />
          <span>Star on GitHub</span>
        </Button>

        {/*
        <div className="flex items-center space-x-4">
          {!session ? (
            <Button
              onClick={() => signIn("github")}
              
              className="flex items-center space-x-2 bg-black"
            >
              <Github className="w-5 h-5" />
              <span>Sign in with GitHub</span>
            </Button>
          ) : (
            <div className="flex items-center space-x-1">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name || "User"}
                />
                <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-sm text-primary"
              >
                <LogOut className="w-4 h-4 mr-2 text-primary" />
                Logout
              </Button>
            </div>
          )}
        </div>
         */}
      </div>
    </nav>
  );
}
