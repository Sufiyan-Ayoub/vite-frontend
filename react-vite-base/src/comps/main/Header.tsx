import { Cloud, Home } from 'lucide-react'
import  { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/cores'
import { useAnim, useMounted } from '@/cores/hooks'
import { TRANSITION_CURVES, TRANSITIONS } from '../globals/Anim/enums'

const Header = () => {
	const { pathname } = useLocation();
	const mounted = useMounted();
	const anim = useAnim({
		transition: TRANSITIONS.SlideTop,
		curve: TRANSITION_CURVES.Bounce,
		when: mounted,
		duration: 1
	});

	const anchorCss = `nav-anchor absolute -bottom-2 left-1/2 w-[20px] h-[2px] bg-muted-foreground opacity-0 rounded -translate-x-1/2 translate-y-0 transition-none group-hover:transition-all duration-500 ease-bounce
		group-hover:-translate-y-1 group-hover:h-[4px] group-hover:opacity-100
		group-[.active]:-translate-y-1 group-[.active]:h-[4px] group-[.active]:opacity-100 group-[.active]:bg-primary`;
	const navCss = `group relative flex flex-col items-center transition-all duration-500`
	const navLabel = `transition-all duration-500 font-medium group-[.active]:font-bold text-foreground group-[.active]:text-primary`;

	const nav = useMemo(() => [
		{ label: `Home`, uri: `/`, icon: Home },
		{ label: `Pricing`, uri: `/pricing` },
		{ label: `Features`, uri: `/features` },
		{ label: `About`, uri: `/about` },
		{ label: `Support`, uri: `/support` },
	], [])

	return (
		<div className="flex z-50 text-primary items-center px-[60px] py-[15px] h-[50px]">
			<div className="--logo flex-1 flex items-center">
				<Link style={anim()} to="/" className="font-black flex items-center gap-2 text-xl">
					<Cloud className='size-7' />
					Cloud POS
				</Link>
			</div>
				
			<div className="--nav flex-1 text-foreground flex items-center justify-center gap-6 relative">
				{nav.map((o, i) => (
					<Link
						key={`nav-${i}-${o.uri}`}
						to={o.uri}
						style={anim(i == 0 ? 1.25 * i : 0.15 * i)}
						className={`${navCss} ${pathname == o.uri ? `active`: ``}`}
					>
						<span className={navLabel}>
							{o.label}
						</span>

						<span
							aria-hidden="true"
							className={anchorCss}
						></span>
					</Link>
				))}
			</div>

			<div className="--user flex-1 flex items-center justify-end">
					<div className="flex items-center space-x-4">
						<Link
							to={`/u/signin`}
							style={anim(0.5)}
							className={cn(navCss, `transition-transform`)}
						>
							<span className={navLabel}>
								Login
							</span>

							<span
								aria-hidden="true"
								className={anchorCss}
							></span>
						</Link>
						{/* <Button style={anim(.55)}>Create Account</Button> */}
						<Link to={`/u/signup`} style={anim(.6)} className='btn-link'>Create Account</Link>
					</div>
			</div>
		</div>
	)
}

export default Header