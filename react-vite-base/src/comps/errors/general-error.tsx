

// import { useNavigate, useRouter } from '@tanstack/react-router'
import { cn } from '@/cores'
import { Button } from '@/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
	minimal?: boolean
}

export default function GeneralError({
	className,
	minimal = false,
}: GeneralErrorProps) {
	const navigate = useNavigate()
	const location = useLocation()
	const isHome = location.pathname === "/"
	const canGoBack = window.history.length > 1 && !isHome

	return (
		<div className={cn('h-svh w-full', className)}>
			<div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
				{!minimal && (
					<h1 className='text-[7rem] leading-tight font-bold'>500</h1>
				)}
				<span className='font-medium'>Oops! Something went wrong {`:')`}</span>
				<p className='text-muted-foreground text-center'>
					We apologize for the inconvenience. <br /> Please try again later.
				</p>
				{!minimal && (
					<div className='mt-6 flex gap-4'>
						{canGoBack && <Button variant='outline' onClick={() => history.go(-1)}>
							Go Back
						</Button>}
						{!isHome && <Button onClick={() => navigate("/")}>Back to Home</Button>}
					</div>
				)}
			</div>
		</div>
	)
}
