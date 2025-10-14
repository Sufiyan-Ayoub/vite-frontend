import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { FC, useMemo } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/ui/card"
import { Link } from "react-router-dom"
import { Anim } from "@/comps"
import useMounted from "@/cores/hooks/useMounted"
import { TRANSITION_CURVES, TRANSITIONS } from "@/comps/globals/Anim/enums"

const Recover: FC = () => {
    const mounted = useMounted()

    const anim = useMemo(() => ({
        transition: TRANSITIONS.SlideTop,
        curve: TRANSITION_CURVES.Bounce,
        when: mounted,
        duration: 1
    }), [mounted]);

    return (
        <Anim fx={anim}>
            <div className="w-full h-full flex justify-center items-center">
                <div className={`min-w-80 sm:min-w-96 grid gap-6`}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Reset your password</CardTitle>
                            <CardDescription>Enter your email to receive reset instructions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="em"
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    
                                    <Button type="submit" className="w-full">
                                        Continue
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link to={`/u/signup`} className="underline underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Anim>
    )
}
export default Recover;