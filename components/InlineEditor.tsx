import React from "react";
import dynamic from "next/dynamic";

const DynamicInlineEditorContainer = dynamic(
  () => import("./InlineEditorContainer"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export interface InlineEditorProps {
  document: {
    id: string;
    type: string;
  };
  showInlineEditor: boolean;
  children: React.ReactNode;
}

export default function InlineEditor({
  showInlineEditor = false,
  ...rest
}: InlineEditorProps) {
  if (showInlineEditor) {
    return <DynamicInlineEditorContainer {...rest} showInlineEditor />;
  }

  return <>{rest.children}</>;
}
