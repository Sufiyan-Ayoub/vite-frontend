import { Button } from "@/ui/button";
import { ArrowRight } from "lucide-react";
import { PopAnim, SplitText } from "@/comps";
import { useAnim, useMounted } from "@/cores/hooks";
import { TRANSITION_CURVES, TRANSITIONS } from "@/comps/globals/Anim/enums";


const HeroSection = () => {
    const mounted = useMounted(1100)
    const anim = useAnim({
        transition: TRANSITIONS.SlideTop,
        curve: TRANSITION_CURVES.Bounce,
        when: mounted,
        duration: 1
    });

    return (
        <div className="flex-center flex-col flex-1 gap-7 px-4 md:px-0">
            <div className="relative z-4 scale-100">
                {/* <img src="/imgs/cards.svg" className="absolute w-10" />
                <img src="/imgs/voucher.svg" className="absolute w-10 bottom-0 right-0" />
                <img src="/imgs/landing_share.svg" className="absolute w-10 bottom-0" />
                <img src="/imgs/landing_share.svg" className="absolute w-10 top-0 right-0" /> */}
                <div style={anim()} className="relative m-auto flex h-80 w-[800px] items-center justify-center cloud">
                    {/* b4d1fe b0fcc6 */}
                    <div className="absolute z-1 h-[300px] w-[300px] rounded-[200px] bg-linear-to-b from-[var(--cloud-from)] to-[#54709a] cloud-1" />

                    <div className="absolute bottom-0 left-[30%] z-2 h-[200px] w-[200px] rounded-[200px] bg-linear-to-b from-[var(--cloud-from)] to-[#54709a] cloud-2" />

                    <div className="absolute bottom-[-50px] left-[28%] z-3 h-[220px] w-[220px] rounded-[200px] bg-[rgba(255,255,255,0.15)] blur-[50px] lightning" />

                    <div className="absolute -bottom-5 left-[60%] z-3 h-[220px] w-[220px] rounded-[200px] bg-[rgba(255,255,255,0.15)] blur-[50px] lightning2" />

                    <div className="absolute bottom-2.5 left-[40%] z-3 h-[200px] w-[200px] rounded-[200px] bg-linear-to-b from-[var(--cloud-from)] to-[#54709a] cloud-3" />

                    <div className="absolute bottom-[5px] left-[70%] z-2 h-[200px] w-[200px] rounded-[200px] bg-linear-to-b from-[var(--cloud-from)] to-[#54709a] cloud-4" />

                    <div className="absolute bottom-[5px] left-[80%] z-3 h-[100px] w-[100px] rounded-[200px] bg-linear-to-b from-[var(--cloud-from)] to-[#54709a] cloud-5" />

                    <img
                        src="/imgs/landing-boy.png"
                        className="absolute mt-[50px] w-[320px] z-[4] abc"
                        alt="Landing Boy"
                    />
                </div>
            </div>

            {/* <img
                style={anim()}
                src="/imgs/landing-boy.png"
                className="lboy max-w-[500px] w-full"
                alt="Landing Illustration"
            /> */}
            <div className="text-[45px] font-bold">
                <SplitText text="Sell faster and smart" when={mounted} delay={1.2} />
                <SplitText text="with our POS system" when={mounted} delay={2} />
            </div>
            <PopAnim delay={4}>
                <div className="-mt-4">
                    Manage Sales, inventory & analytics from any where.
                </div>
            </PopAnim>
            <PopAnim delay={4.5}>
                <Button className="mt-4 text-lg cursor-pointer font-bold flex items-center gap-1 group" size="lg">
                    Get Started
                    <ArrowRight className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Button>
            </PopAnim>
        </div>
    );
}

const Main = () => {
    return (
        <div className='landing flex-1 flex flex-col'>
            <div className="fixed bottom-0 left-0 right-0 h-[100px] overlfow-hidden z-1">
                <div className="absolute pointer-events-none h-[500px] --blur-mask"></div>
            </div>
            <HeroSection />
        </div>
    )
}

export default Main