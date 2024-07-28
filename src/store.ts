let nodes: any = [];
class NodeStore {
	private key = 'nodes';
	private edgeKey = 'edges';

	get nodes() {
		if (typeof window !== 'undefined') {
			const value = localStorage.getItem(this.key);
			return value ? JSON.parse(value as string) : [];
		}
		return [];
	}

	get edges() {
		if (typeof window !== 'undefined') {
			const value = localStorage.getItem(this.edgeKey);
			return value ? JSON.parse(value as string) : [];
		}
		return [];
	}

	saveNodes(n: any) {
		if (typeof window !== 'undefined') {
			localStorage.setItem(this.key, JSON.stringify(n));
		}
	}

	saveEdges(e: any) {
		if (typeof window !== 'undefined') {
			localStorage.setItem(this.edgeKey, JSON.stringify(e));
		}
	}
}
const nodeStore = new NodeStore();
export default nodeStore;
