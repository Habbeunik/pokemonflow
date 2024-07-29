"use client";

import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import AddTaskForm from "@/components/add-task-form";
import { Card } from "antd";
import TaskCard from "@/components/task-card";
import { PokemonTask } from "@/types";

export const NodeEntry = memo(({ data }: any) => {
  return (
    <>
      <Handle type="target" position={Position.Left} id="1" />
      <Card style={{ width: 350 }}>
        <AddTaskForm onSubmit={data.onSubmit} />
      </Card>
      <Handle type="source" position={Position.Right} id="2" />
    </>
  );
});
NodeEntry.displayName = "NodeEntry";

export const NodeDisplay = memo(
  ({
    data,
  }: {
    data: { task: PokemonTask; onSubmit: (v: PokemonTask) => void };
  }) => {
    return (
      <>
        <Handle type="target" position={Position.Left} id="3" />
        <TaskCard task={data.task} onSubmit={data.onSubmit} />
        <Handle type="source" position={Position.Right} id="4" />
      </>
    );
  }
);
NodeDisplay.displayName = "NodeDisplay";
