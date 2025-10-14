import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { FC, useMemo, useRef, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/ui/card"
import { Anim, Cover, Password } from "@/comps"
import { Link, useNavigate } from "react-router-dom"
import { APP_NAME } from "@/config"
import { _, getData, toast, withPost } from "@/cores"
import { CircleCheckBig, TriangleAlert } from "lucide-react"
import { TRANSITION_CURVES, TRANSITIONS } from "@/comps/globals/Anim/enums"
import { useMounted } from "@/cores/hooks"
import { CoverHandler } from "@/comps/globals/cover/types"

const Signup: FC = () => {
    const form = useRef<HTMLDivElement>(null)
    const cover = useRef<CoverHandler>(null)

    const navigate = useNavigate()
    
    const mounted = useMounted()    
    const anim = useMemo(() => {
        if ( mounted ){
            cover.current?.close()
        }
        return ({
            transition: TRANSITIONS.SlideTop,
            curve: TRANSITION_CURVES.Bounce,
            when: mounted,
            duration: 1
        })
    }, [mounted]);

    const onSignup = () => {
        if (!form.current) return toast.error(`Something went wrong!`, TriangleAlert)
        const { nm, em, psw } = getData(form.current) as { nm?: string, em?: string, psw?: string }

        if (!nm || _(nm).isEmpty()) return toast.error(`Enter your full name.`, TriangleAlert);
        else if (!em || !_(em).isEmail()) return toast.error(`Enter a valid email address.`, TriangleAlert);
        else if (!psw || _(psw).isEmpty()) return toast.error(`Enter your password.`, TriangleAlert);
        else {
            cover.current?.open()
            withPost<{ message: string, token?: string }>(
                `/__/u/signup`,
                { p: `e`, nm, em, psw }
            )
                .then(({ message, token }) => {
                    cover.current?.close()
                    toast.success(message, CircleCheckBig)
                    if (token) {
                        return navigate(`/u/verify/${token}`)
                    }
                })
                .catch(err => {
                    cover.current?.close()
                    toast.error(err.message, TriangleAlert)
                })

        }

    }

    return (<>
        <Cover ref={cover} />
        <Anim fx={anim}>
            <div className={`min-w-80 sm:min-w-96 grid gap-6`}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Sign up</CardTitle>
                        <CardDescription>Continue with your preferred account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <Anim fx={anim}> */}
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full">
                                    <img src={`/facebook.svg`} className="w-[25px] h-[25px]" />
                                    Signup with Facebook
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <img src={`/apple.svg`} className="w-[20px] h-[20px]" />
                                    Signup with Apple
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <img src={`/google.svg`} className="w-[20px] h-[20px]" />
                                    Signup with Google
                                </Button>
                            </div>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div ref={form} className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="nm">Name</Label>
                                    <Input
                                        id="nm"
                                        name="nm"
                                        type="text"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="em"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Password />
                                    {/* <Input id="password" type="password"  /> */}
                                </div>
                                <Button onClick={onSignup} className="w-full">
                                    Sign up
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link to={`/u/signin`} className="underline underline-offset-4">
                                    Log in
                                </Link>
                            </div>
                        </div>
                        {/* </Anim> */}
                    </CardContent>
                </Card>

                <div
                    className="grid gap-2 font-medium text-muted-foreground 
                    [&>div>a]:underline 
                    [&>div>a]:underline-offset-4 
                    [&>div>a]:decoration-muted-foreground 
                    [&>div>a:hover]:text-primary 
                    [&>div>a:hover]:decoration-primary 
                    text-center text-sm text-balance"
                >
                    <div>
                        By clicking continue, you agree to our
                    </div>
                    <div>
                        <Link to="#">Terms of Service</Link>{" "}
                        and <Link to="#">Privacy Policy</Link>.
                    </div>
                </div>
                <div className="font-medium text-center text-xs text-balance text-muted-foreground ">© {APP_NAME} 2025. All rights reserved.</div>

            </div>
        </Anim>
    </>)
}
export default Signup;