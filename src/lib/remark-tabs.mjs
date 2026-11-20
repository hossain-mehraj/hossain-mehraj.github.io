/**
 * Splits a project body into tab panels.
 *
 *   <!-- tab: engineering -->   ...content...   <!-- tab: enterprise -->   ...content...
 *
 * Each marker starts a <section class="tab-panel" data-tab="id">. The matching tab
 * (label, hero, stats) is defined in the project's frontmatter `tabs` list.
 */
const MARK = /^<!--\s*tab:\s*([\w-]+)\s*-->$/;

export default function remarkTabs() {
  return (tree) => {
    if (!tree.children.some((n) => n.type === 'html' && MARK.test(n.value.trim()))) return;
    const out = [];
    let panel = null;
    for (const node of tree.children) {
      const m = node.type === 'html' && node.value.trim().match(MARK);
      if (m) {
        panel = {
          type: 'tabPanel',
          data: { hName: 'section', hProperties: { className: ['tab-panel'], dataTab: m[1], id: `panel-${m[1]}`, role: 'tabpanel', ariaLabelledby: `tab-${m[1]}` } },
          children: [],
        };
        out.push(panel);
      } else if (panel) panel.children.push(node);
      else out.push(node);
    }
    tree.children = out;
  };
}
