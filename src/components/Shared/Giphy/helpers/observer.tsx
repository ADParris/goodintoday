import React, { FC, ReactNode, useEffect, useRef } from 'react'

interface ComponentProps {
	children: ReactNode
	onVisibleChange: (isVisible: boolean) => void
	className?: string
}

const Observer: FC<ComponentProps> = ({
	children,
	className,
	onVisibleChange,
}: ComponentProps) => {
	const container = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		let io: IntersectionObserver | undefined
		if (container.current) {
			io = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
				if (onVisibleChange) onVisibleChange(entry.isIntersecting)
			})
			io.observe(container.current)
		}
		return () => io?.disconnect()
	}, [onVisibleChange, container])
	return (
		<div ref={container} className={className}>
			{children}
		</div>
	)
}

export default Observer
