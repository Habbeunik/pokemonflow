import { ReactFlowProvider } from "@xyflow/react";

export default function CreatorLayout(props: any) {
  return <ReactFlowProvider>{props.children}</ReactFlowProvider>;
}
