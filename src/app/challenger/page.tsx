'use client';

import nodeStore from '@/store';
import { ReactFlow, Controls, Handle, Position, MiniMap } from '@xyflow/react';
import Link from 'next/link';
import '@xyflow/react/dist/style.css';
import { ChallengerTaskCard } from '@/components/task-card';
import { PokemonTask } from '@/types';

const defaultViewport = { x: 0, y: 0, zoom: 1 };

const NodeDisplay = ({
	data,
}: {
	data: { task: PokemonTask; isComplete: boolean; onComplete: () => void };
}) => {
	return (
		<>
			<Handle type="target" position={Position.Left} id="3" />
			<ChallengerTaskCard isComplete={false} task={data.task} />
			<Handle type="source" position={Position.Right} id="4" />
		</>
	);
};
const nodeTypes = {
	nodeDisplay: NodeDisplay,
};

export default function UserPage() {
	return (
		<div className="min-h-screen">
			<header className="text-xl font-semibold flex items-center gap-x-3 p-6 border-b border-slate-100 border-solid">
				<Link href={'/'}>
					<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
						&lt;-
					</span>
				</Link>
				<h3>Challenger</h3>
			</header>
			<main className="w-full flex-1  h-[calc(100vh-77px)] bg-slate-50">
				<ReactFlow
					nodes={nodeStore.nodes.filter((n: any) => n.type !== 'nodeEntry')}
					edges={nodeStore.edges}
					defaultViewport={defaultViewport}
					nodeTypes={nodeTypes}
					attributionPosition="bottom-left">
					<MiniMap />
					<Controls />
				</ReactFlow>
			</main>
		</div>
	);
}
