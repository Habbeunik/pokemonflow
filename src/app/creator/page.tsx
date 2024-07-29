"use client";

import { ReactFlow, Controls } from "@xyflow/react";
import Link from "next/link";

import "@xyflow/react/dist/style.css";
import { NodeDisplay, NodeEntry } from "@/components/node";
import { useAdminPokemonFlow } from "@/hooks/useFlow";

const nodeTypes = {
  nodeEntry: NodeEntry,
  nodeDisplay: NodeDisplay,
};

export default function AdminPage() {
  const { nodes, edges, defaultViewport } = useAdminPokemonFlow();

  return (
    <div className="min-h-screen">
      <header className="text-xl font-semibold flex items-center gap-x-3 p-6 border-b border-slate-100 border-solid">
        <Link href={"/"}>
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
          attributionPosition="bottom-left"
        >
          <Controls />
        </ReactFlow>
      </main>
    </div>
  );
}
