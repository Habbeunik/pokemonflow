'use client';

import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { getId } from '@/helpers';
import nodeStore from '@/store';
import '@xyflow/react/dist/style.css';
import { NodeDisplay, NodeEntry } from '@/components/node';

const nodeTypes = {
	nodeEntry: NodeEntry,
	nodeDisplay: NodeDisplay,
};
const initalNodeId = '23323';

const defaultViewport = { x: 0, y: 0, zoom: 1 };

export default function AdminPage() {
	const updateNodeEntry = (id: string, task: PokemonTask) => {
		setNodes((nds: any) => {
			const newNodes: any = nds.map((n: any) =>
				n.id === id ? { ...n, data: { ...n.data, task } } : n
			);
			nodeStore.saveNodes(newNodes);
			return newNodes;
		});
	};

	const saveNodeEntry = (task: PokemonTask) => {
		const id = getId();
		setNodes((nds: any) => {
			const lastNode = nds[nds.length - 1];
			const newNode = {
				id,
				position: {
					x: lastNode.position.x + 500,
					y: lastNode.position.y + 100,
				},
				type: 'nodeEntry',
				task: {},
				data: {
					onSubmit: saveNodeEntry,
				},
			};
			const newNodes = nds
				.map((n: any) =>
					n.id === lastNode.id
						? {
								...n,
								type: 'nodeDisplay',
								data: {
									task,
									onSubmit: (t: PokemonTask) => {
										updateNodeEntry(n.id, t);
									},
								},
						  }
						: n
				)
				.concat(task.isLastTask ? [] : ([newNode] as any));
			nodeStore.saveNodes(newNodes);
			return newNodes;
		});

		setEdges((eds: any) => {
			const lastEdge = eds[eds.length - 1];
			const newEdges = eds.concat([
				{
					id,
					target: id,
					source: lastEdge?.id ?? initalNodeId,
				},
			] as any);
			nodeStore.saveEdges(newEdges);

			return newEdges;
		});
	};

	const initialNodes = [
		{
			id: initalNodeId,
			type: 'nodeEntry',
			position: { x: 100, y: 200 },
			data: {
				onSubmit: saveNodeEntry,
			},
		},
	];

	const [nodes, setNodes] = useNodesState(
		!!nodeStore.nodes.length
			? nodeStore.nodes.map((n: any, idx: number) => ({
					...n,
					data: {
						...n.data,
						onSubmit: (t: PokemonTask) => {
							nodeStore.nodes?.length - 1 === idx
								? saveNodeEntry(t)
								: updateNodeEntry(n.id, t);
						},
					},
			  }))
			: initialNodes
	);
	const [edges, setEdges] = useEdgesState(nodeStore.edges);

	return (
		<div className="min-h-screen">
			<header className="text-xl font-semibold flex items-center gap-x-3 p-6 border-b border-slate-100 border-solid">
				<Link href={'/'}>
					<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
						&lt;-
					</span>
				</Link>
				<h3>Administrator</h3>
			</header>
			<main className="w-full flex-1  h-[calc(100vh-77px)] bg-slate-50">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					defaultViewport={defaultViewport}
					nodeTypes={nodeTypes}
				/>
			</main>
		</div>
	);
}
