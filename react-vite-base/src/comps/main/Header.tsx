import { Button } from "@/ui/button";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const nav = useMemo(() => [
		{ label: `Home`, uri: `/` },
		{ label: `Features`, uri: `/features` },
		{ label: `Pricing`, uri: `/pricing` },
		{ label: `About`, uri: `/about` },
		{ label: `Support`, uri: `/support` },
	],[])
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<div className="app-header w-screen h-[70px] flex items-center justify-between px-4 bg-background border-b border-border sticky top-0 z-50">
			{/* Logo Section */}
			<div className="flex-1">
				<div className="text-xl font-bold  cursor-pointer transition-colors">
					Cloud POS
				</div>
			</div>

			{/* Desktop Navigation Section - Hidden on mobile */}
			<div className="hidden md:flex flex-1 items-center justify-center space-x-8">
				{nav.map((o, i) => (
					<Link
						key={`nav-${i}-${o.uri}`}
						to={o.uri}
						className=" text-sm font-medium px-3 py-2 transition-colors rounded-md hover:bg-[var(--primary-color)]/5"
					>
						{o.label}
					</Link>
				))}
			</div>

			{/* Desktop User Actions Section - Hidden on mobile */}
			<div className="hidden md:flex flex-1 items-center justify-end">
				<div className="flex items-center space-x-4">
					<Link
						to="/u/signin"
						className=" text-sm font-medium hover:text-[var(--primary-color)] px-3 py-2 transition-colors"
					>
						Login
					</Link>
					<Button
						onClick={() => { navigate(`/u/signup`);setIsMobileMenuOpen(false)}}							>
						Create Account
					</Button>
				</div>
			</div>

			{/* Mobile Hamburger Button */}
			<div className="md:hidden flex flex-1 justify-end">
				<button
					onClick={toggleMobileMenu}
					className="focus:outline-none transition-colors"
					aria-label="Toggle menu"
				>
					<Menu size={24} strokeWidth={2} />
				</button>
			</div>

			{/* Mobile Menu - Full screen overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 bg-background z-40 md:hidden flex flex-col items-center justify-center space-y-6 p-4">
					<button
						onClick={toggleMobileMenu}
						className="absolute top-4 right-4 focus:outline-none transition-colors"
					>
						<X size={24} strokeWidth={2} />
					</button>
					<div className="space-y-4 w-full max-w-md">
						{nav.map((o, i) => (
							<Link
								key={`nav-${i}-${o.uri}`}
								to={o.uri}
								className="block text-lg font-medium py-2 text-center transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{o.label}
							</Link>
						))}
						<div className="flex flex-col space-y-4 pt-4 border-t">
							<Link
								to="/u/signin"
								className=" text-lg font-medium py-2 text-center transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Login
							</Link>
							<Button
								onClick={() => { navigate(`/u/signup`);setIsMobileMenuOpen(false)}}							>
								Create Account
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;