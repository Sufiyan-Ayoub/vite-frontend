"use client"
import Link from "next/link";
import { Bolt } from "@/app/comps/Icons";
import { Box, Image, Text, css, useDelayed } from "@zuzjs/ui";
import { SplitText, SplitLines, PopElement, BoltWrap } from "@/app/anim-utils";

const HeroSection = () => {
    const mounted = useDelayed(2700)
    return (
        <Box as={`minh:100vh h:100vh flex aic jcc cols gap:20 pt:$header snapScroll`}>
            <PopElement when={1}>
                <Box as={`flex aic gap:8 r:8,24,24,8`}>
                    <Image src={`/imgs/coin.webp`} as={`h:24`} />
                    <Text as={`bg:f3f2ff! p:6,12,6,6 bold r:8,24,24,8`}>
                        Investment With No Limits
                    </Text>
                </Box>
            </PopElement>
            <Box as={`s:52 bold `}>
                <SplitText text="Trade globally with" />
                <SplitText text="a multi-asset broker" when={.7} />
            </Box>
            <Box as={`s:17 tac`}>
                <SplitLines text="Assets hundreds of CFD trading instruments, including" when={2} />
                <SplitLines text="Forex, Stocks, Indices, Metals and more." when={2.3} />
            </Box>
            <Box as={`flex aic gap:24`}>
                <PopElement when={2.5}>
                    <Link className={css(`r:12 c:fff! bg:6438d6! p:10,18 s:16! tdn`)} href={`#`}>
                        Invest Now
                    </Link>
                </PopElement>
                <Box as={`flex aic gap:12`}>
                    <Box>
                        <BoltWrap when={mounted}>
                            <Bolt color={`#6438d6`} size={20} />
                            <Text as={`s:20 bold lh:.8 fade-text`}>10</Text>
                        </BoltWrap>
                    </Box>
                    <Box>
                        <SplitLines text="years of" when={2.5} />
                        <SplitLines text="reliability" when={2.7} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default HeroSection