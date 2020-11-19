import React from 'react'

interface ComponentProps {
	children: React.ReactNode
	className?: string
	onVisibleChange: (isVisible: boolean) => void
}

const Observer: React.FC<ComponentProps> = ({
	children,
	className,
	onVisibleChange,
}: ComponentProps) => {
	const container = React.useRef<HTMLDivElement | null>(null)

	React.useEffect(() => {
		let io: IntersectionObserver | undefined
		if (container.current) {
			io = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
				onVisibleChange && onVisibleChange(entry.isIntersecting)
			})
			io.observe(container.current)
		}
		return () => io?.disconnect()
	}, [container, onVisibleChange])

	return (
		<div ref={container} className={className}>
			{children}
		</div>
	)
}

export default Observer
