import { Children, cloneElement, FC, isValidElement, ReactNode } from "react";
import { useAnim } from "@/cores/hooks";
import { FX } from "./types";

const Anim: FC<{ fx: FX, children: ReactNode }> = ({ fx , children }) => {
	
	const anim = useAnim(fx);

	const inject = (nodes: ReactNode): ReactNode => {
		return Children.map(nodes, (child, index) => {
			if (!isValidElement(child)) return child;
			const childDelay = index * (fx.delay || 0.1);
			const childProps = child.props as Record<string, any>;

			const _props = { ...childProps, style: anim(childDelay) }
			return cloneElement(child, _props, inject(childProps.children))
		})
	}

	return (
		<> {inject(children)} </>
	);
}

export default Anim;
