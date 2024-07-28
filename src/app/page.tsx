import Link from 'next/link';

import '@xyflow/react/dist/style.css';
import store from '@/store';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="w-full max-w-[500px]">
				<NavItem
					title="Administrator"
					subText="View app as administrator to create and edit pokemon flows"
					href="/creator"
				/>
				<NavItem
					title="Challenger"
					subText="View app as challenger to see and complete pokemon challenges"
					href="/challenger"
				/>
			</div>
		</main>
	);
}

const NavItem = (props: { href: string; title: string; subText: string }) => {
	const { href, title, subText } = props;

	return (
		<Link
			className="w-full group bg-transparent transition-all ease-in-out rounded-md hover:bg-slate-50 p-6 block"
			href={href}>
			<div className="w-full flex justify-between items-center  text-2xl font-semibold mb-3">
				<h2>{title}</h2>
				<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
					-&gt;
				</span>
			</div>
			<p className="m-0 text-sm opacity-50">{subText}</p>
		</Link>
	);
};
