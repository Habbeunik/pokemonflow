import { ReactFlowProvider } from '@xyflow/react';

export default function CreatorLayout(props) {
	return <ReactFlowProvider>{props.children}</ReactFlowProvider>;
}
