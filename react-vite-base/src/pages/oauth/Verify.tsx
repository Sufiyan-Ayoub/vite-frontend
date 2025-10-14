import { FC, useMemo, useRef, useState } from "react"
import { Button } from "@/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/ui/input-otp"
import { useNavigate, useParams } from "react-router-dom"
import { _, toast, withPost } from "@/cores"
import { TRANSITION_CURVES, TRANSITIONS } from '@/comps/globals/Anim/enums'
import useMounted from "@/cores/hooks/useMounted"
import { Anim, Cover, CoverHandler } from "@/comps"
import { CircleCheckBig, TriangleAlert } from "lucide-react"

const Verify: FC = () => {
    const [value, setValue] = useState("")
    const cover = useRef<CoverHandler>(null)

    const navigate = useNavigate()
    const { token } = useParams()
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
    
    const onSubmit = () => {
        if ( !value || _(value).isEmpty() ) return toast.error(`Otp is required!`);
        else {
            cover.current?.open()
            withPost<{ message: string }>(
                `/__/u/verify`,
                { token, otp: value }
            )
            .then(({ message }) => {
                cover.current?.close()
                toast.success(message, CircleCheckBig)
                navigate(`/`)
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
            <div className="w-full h-full flex justify-center items-center">
                <div className={`min-w-80 sm:min-w-96 grid gap-6 select-none`}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Verify your OTP</CardTitle>
                            <CardDescription>Enter the code sent to your email to continue.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid place-items-center gap-6">
                                    <InputOTP
                                        maxLength={6}
                                        value={value}
                                        onChange={(value) => setValue(value)}
                                    >
                                        <InputOTPGroup>
                                            {Array.from({ length: 6}).map((_, i) => <InputOTPSlot key={`vrf-otp-${i}`} index={i} />)}
                                        </InputOTPGroup>
                                    </InputOTP>
                                
                                    <Button onClick={onSubmit} className="px-10">
                                        Continue
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t receive the code?{" "}
                                    <button className="underline underline-offset-4 hover:text-primary">Resend OTP</button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Anim>
    </>)
}
export default Verify;