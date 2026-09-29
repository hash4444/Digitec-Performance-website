import { FileBlob, SpreadsheetFile } from "file:///C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const paths = process.argv.slice(2);
for (const path of paths) {
  const blob = await FileBlob.load(path);
  const workbook = await SpreadsheetFile.importXlsx(blob);
  const overview = await workbook.inspect({
    kind: "workbook,sheet,table",
    maxChars: 20000,
    tableMaxRows: 12,
    tableMaxCols: 12,
    tableMaxCellChars: 120,
  });
  console.log(JSON.stringify({ path, overview: overview.ndjson }));

  const chart = workbook.worksheets.getItem("Chart").getUsedRange(true).values;
  const rows = chart.slice(1).map(([date, clicks, impressions, ctr, position]) => ({
    date: String(date), clicks: Number(clicks) || 0, impressions: Number(impressions) || 0,
    ctr: Number(ctr) || 0, position: Number(position) || 0,
  }));
  const periods = [
    ["2026-06-17", "2026-07-16"],
    ["2026-07-17", "2026-08-15"],
    ["2026-08-16", "2026-09-16"],
    ["2026-08-20", "2026-09-16"],
  ];
  const summary = periods.map(([start, end]) => {
    const selected = rows.filter(r => r.date >= start && r.date <= end);
    const clicks = selected.reduce((a, r) => a + r.clicks, 0);
    const impressions = selected.reduce((a, r) => a + r.impressions, 0);
    const weightedPosition = impressions ? selected.reduce((a, r) => a + r.position * r.impressions, 0) / impressions : null;
    return { start, end, clicks, impressions, ctr: impressions ? clicks / impressions : null, weightedPosition };
  });
  console.log(JSON.stringify({ path, periodSummary: summary }));
}
