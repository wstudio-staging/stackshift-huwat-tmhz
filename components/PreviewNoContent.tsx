export function PreviewNoContent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="inline-block px-2 py-1 text-xs font-semibold tracking-widest text-white uppercase bg-blue-600 rounded-full">
        Preview Mode
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mt-2">Empty Page</h1>
      <p className="text-gray-600">
        You are seeing this preview because you have not added any sections to
        your page.
      </p>
    </div>
  );
}
