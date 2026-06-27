export default function ProductEditorPage({ params }: { params: { id: string } }) {
  return (
    <h1 style={{ fontSize: "var(--text-headline-lg)", fontWeight: 600, color: "var(--color-on-surface)" }}>
      Product Editor — {params.id}
    </h1>
  );
}