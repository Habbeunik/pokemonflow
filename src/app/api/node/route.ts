import store from '../../../store';

export async function POST(req: Request) {
	const body = await req.json();
	const { tasks } = body;

	store.saveNodes(tasks);

	return new Response(JSON.stringify({ message: 'Nodes saved' }), {
		status: 200,
	});
}

export async function GET() {
	return new Response(
		JSON.stringify({ message: 'Nodes saved', nodes: store.state.nodes }),
		{
			status: 200,
		}
	);
}
