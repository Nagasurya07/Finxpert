import { Button } from "@/components/ui/button";
import { PenBox, LayoutDashboard, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="group relative flex items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-300"></div>
            <div className="relative flex items-center bg-white rounded-lg p-1 shadow-md">
              <Image
                src={"/finxpert.svg"}
                alt="FinXerpt Logo"
                width={200}
                height={60}
                className="h-12 w-auto object-contain z-10"
              />
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <Sparkles size={16} className="relative text-blue-600" />
              </span>
            </div>
          </div>
          <div className="ml-2 hidden md:block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-xl">
              Finance Assistant
            </span>
            <div className="text-xs text-gray-500 font-medium">Manage your finances smartly</div>
          </div>
        </Link>

        {/* Navigation Links for Signed-Out Users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Features
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            {/* Dashboard Button */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200"
              >
                <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            {/* Add Transaction Button */}
            <a href="/transaction/create">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                <PenBox size={18} className="animate-pulse" />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>

          {/* Login Button for Signed-Out Users */}
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="hover:bg-blue-50 transition-colors duration-200">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          {/* User Profile Button */}
          <SignedIn>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm opacity-75"></div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 relative z-10",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
