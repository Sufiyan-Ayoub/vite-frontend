import { useMemo } from "react"
import { Link } from "react-router-dom"

const Header = () => {
	const nav = useMemo(() => [
		{ label: `Home`, uri: `/` },
		{ label: `Features`, uri: `/features` },
		{ label: `Pricing`, uri: `/pricing` },
		{ label: `About`, uri: `/about` },
		{ label: `Support`, uri: `/support` },
	],[])

	return (
		<div className="app-header w-screen h-[70px] flex items-center border-2">
			<div className="flex-1">
				Cloud POS
			</div>
			<div className="flex-2 flex items-center justify-center">
				{
					nav.map(
						(o, i) => <Link key={`--nav-${i}-${o.uri}`} to={o.uri}>
							{o.label}
						</Link>
					)
				}
			</div>
			<div className="flex-1 flex items-center justify-end">
				<div className="--u flex items-center">
					<Link to={`/u/signin`}>Login</Link>
					<Link to={`/u/signup`}>Create Account</Link>
				</div>
			</div>
		</div>
	)
}

export default Header