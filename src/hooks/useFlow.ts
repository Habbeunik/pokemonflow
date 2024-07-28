import { getId } from '@/helpers';
import nodeStore from '@/store';
import { CustomNodeTypes, PokemonTask } from '@/types';
import { useNodesState, useEdgesState } from '@xyflow/react';

const initalNodeId = '23323';

export const useAdminPokemonFlow = () => {
	const updateNodeEntry = (id: string, task: PokemonTask) => {
		setNodes((nds: any) => {
			const newNodes: any = nds.map((n: any) =>
				n.id === id ? { ...n, data: { ...n.data, task } } : n
			);
			nodeStore.saveNodes(newNodes);
			return newNodes;
		});
	};

	const generateNewLastNode = (id: string, lastNode: any) => {
		return {
			id,
			position: {
				x: lastNode.position.x + 500,
				y: lastNode.position.y + 100,
			},
			type: CustomNodeTypes.Entry,
			selectable: true,
			dragHandle: true,
			task: {},
			data: {
				onSubmit: saveNodeEntry,
			},
		};
	};

	const updateLastNode = (nds: any[], task: PokemonTask) => {
		const lastNode = nds[nds.length - 1];
		return nds.map((n: any) =>
			n.id === lastNode.id
				? {
						...n,
						type: CustomNodeTypes.Display,
						data: {
							task,
							onSubmit: (t: PokemonTask) => {
								updateNodeEntry(n.id, t);
							},
						},
				  }
				: n
		);
	};

	const generateNewLastEdge = (id: string, lastEdge: any) => {
		return {
			id,
			target: id,
			source: lastEdge?.id ?? initalNodeId,
			animated: true,
		};
	};

	const saveNodeEntry = (task: PokemonTask) => {
		const id = getId();
		setNodes((nds: any) => {
			const lastNode = nds[nds.length - 1];
			const newLastNode = generateNewLastNode(id, lastNode);
			const newNodes = updateLastNode(nds, task).concat(
				task.isLastTask ? [] : ([newLastNode] as any)
			);
			nodeStore.saveNodes(newNodes);
			return newNodes;
		});

		setEdges((eds: any) => {
			const lastEdge = eds[eds.length - 1];
			const newEdges = eds.concat([generateNewLastEdge(id, lastEdge)] as any);
			nodeStore.saveEdges(newEdges);

			return newEdges;
		});
	};

	const initialNodes = [
		{
			id: initalNodeId,
			type: CustomNodeTypes.Entry,
			position: { x: 100, y: 200 },
			data: {
				onSubmit: saveNodeEntry,
			},
		},
	];
	const addOnSubmitHandlerToStoreNodes = (nodes: any[]) => {
		return nodes.map((n: any) => ({
			...n,
			data: {
				...n.data,
				onSubmit: (t: PokemonTask) => {
					n.type === CustomNodeTypes.Entry
						? saveNodeEntry(t)
						: updateNodeEntry(n.id, t);
				},
			},
		}));
	};

	const hasNodesInStore = !!nodeStore.nodes.length;
	const [nodes, setNodes] = useNodesState(
		hasNodesInStore
			? addOnSubmitHandlerToStoreNodes(nodeStore.nodes)
			: initialNodes
	);
	const [edges, setEdges] = useEdgesState(nodeStore.edges);

	return { nodes, edges, defaultViewport: { x: 0, y: 0, zoom: 1 } };
};
