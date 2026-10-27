# Existing service-page proposals — review only

**No source patch was applied and no page was published.** These changes improve customer information flow; neither is represented as a proven cure for body-page exclusion. Title, description, H1, canonical, URL, schema, Arabic content, repair capability claims and existing redirect rules are preserved.

| Proposal | Exact diff | Why / expected benefit | Risk / approval |
|---|---|---|---|
| S1 Body enquiry clarity | [mercedes-body-enquiry-minimal.patch](mercedes-body-enquiry-minimal.patch); one WhatsApp message property in the existing English body content override, and one body-specific branch for the existing final CTA | Asks model/year, affected panels, known previous repair, sensor warning and clear photos. Explains that inspection determines final scope/price. Aligns three body CTA drafts with the page's existing assessment process; may reduce missing details in enquiries. Ranking/indexing benefit is unknown. | Low code scope; WhatsApp text must remain encoded to the existing number, without sending a message during QA. Requires approval to apply and separate approval to publish. |
| S2 Optional contextual inbound link | [general-body-to-mercedes-context-link.patch](general-body-to-mercedes-context-link.patch); appends one link to the existing English general-bodywork paragraph | Gives a visitor with a Mercedes a direct route to its existing bodywork scope. Current live general body page lacks that edge, although the Mercedes owner already has other crawlable inbounds. Discovery/ranking impact likely modest and unproven. | Low scope; verify exact existing destination and English-only branch, natural paragraph flow and keyboard focus. Approve independently from S1. |

The proposed S1 message is a draft opened by an existing CTA, not an automatic message, upload or booking:

```text
Hi Digi-Tec, I would like a Mercedes bodywork assessment.

Model/year:
Affected panels:
Previous paint or repair (if known):
Sensor warning (if any):
I can attach clear photos of the damage.
```

The new final CTA sentence restates the current hero/process/FAQ: photos support the initial discussion and final scope/price follows inspection. No price, completion time, insurance arrangement, certification, manufacturer authorization, ADAS-calibration capability or guarantee is added.

Validation is saved in [proposal-validation.json](proposal-validation.json) and [context-link-validation.json](context-link-validation.json). Both `git apply --check` commands pass without application; all three proposed TS/TSX files parse with zero syntax diagnostics; original source SHA256 values remain unchanged. Proposed copies are under `proposed/` for S1 and `optional-context-link/` for S2. No full typecheck, build, SSR or visual implementation test is claimed: a repository build can update generated files and belongs in a separately authorized isolated implementation copy.

After approval, verify the changed sentences and three encoded body CTA drafts in initial HTML, unchanged protected metadata and Arabic output, one direct 200 link destination, responsive text/focus/accordion behavior and the protected redirect behavior. Publication and any indexing submission require their own authorized scope.

Do not add a body-repair case or photo caption until the operator supplies an identifiable real job, what was actually repaired, diagnostic/inspection findings, agreed scope, verification, image provenance and consent. Existing G63 conversion photographs can substantiate that conversion only. Do not repurpose them as accident-repair outcomes, manufacture a reviewer/certificate, or imply a specific sensor calibration was performed. A later approved case should enrich this existing owner page rather than create another service URL.
