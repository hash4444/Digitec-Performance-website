# Inconclusive HTTP transport attempt — R1

The first R1 checkpoint was executed in the default filesystem/network sandbox at 2026-10-26 07:16:10 UTC (11:16:10 Asia/Dubai). Every attempted request failed with `fetch failed: ENOTFOUND` and recorded status `0`, including the unrelated homepage, protected English oil route, robots.txt and sitemap.xml.

- 106 intended cases; 108 fetch attempts; **zero actual HTTP responses**.
- 342 assertions: 17 pass, 325 fail because no HTTP responses were available.
- The 17 positive assertions are negative-header checks on empty responses and must not be interpreted as production success.
- The raw failure evidence is retained unchanged in this directory.

This run cannot establish whether R1 works or fails. It reports a verifier network/DNS access failure, not an observed HTTP redirect regression. The operator was immediately asked to stop further activations pending valid HTTP verification. No configuration edits, retries or rollback were performed by the verifier agent.

R1 information supplied by the operator: rule ID `b835ca6b88b448d6809f01271dba491b`; creation submitted at 2026-10-26T07:15:45.190Z; enabled dashboard state observed at 2026-10-26T07:15:52.800Z. This note does not independently authenticate the dashboard state.
