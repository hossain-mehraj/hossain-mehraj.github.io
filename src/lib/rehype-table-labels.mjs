/**
 * Copies each table header's text onto its column's cells as data-label="…",
 * so on narrow screens tables can stack into labelled cards (see global.css).
 */
const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));
const kids = (n, tag) => (n.children || []).filter((c) => c.type === 'element' && c.tagName === tag);

export default function rehypeTableLabels() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'table') {
        const thead = kids(node, 'thead')[0];
        const labels = thead ? kids(kids(thead, 'tr')[0] || {}, 'th').map((th) => text(th).trim()) : [];
        for (const tbody of kids(node, 'tbody')) {
          for (const tr of kids(tbody, 'tr')) {
            kids(tr, 'td').forEach((td, i) => {
              if (labels[i]) td.properties = { ...td.properties, dataLabel: labels[i] };
            });
          }
        }
        return;
      }
      (node.children || []).forEach(visit);
    };
    visit(tree);
  };
}
