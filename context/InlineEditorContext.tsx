import { createContext } from "react";

export const InlineEditorContext = createContext(false); // pass default value

interface InlineEditorContextProps {
  showInlineEditor: boolean;
  children: React.ReactNode;
}

export default function InlineEditorContextProvider({
  showInlineEditor,
  children,
}: InlineEditorContextProps) {
  return (
    <InlineEditorContext.Provider value={showInlineEditor}>
      {children}
    </InlineEditorContext.Provider>
  );
}
