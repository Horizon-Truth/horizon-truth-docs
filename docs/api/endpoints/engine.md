---
sidebar_position: 3
---

# Engine API

The Core Analytics Engine powers the automated evaluation of claims on the Horizon Truth platform. These endpoints are mainly utilized internally, but some are exposed for advanced verification workflows.

---

## 🚀 Evaluate Claim

Triggers the engine to process a specific claim, calculate consensus, and assign an automated truth score.

**Endpoint**: `POST /api/engine/evaluate`

**Access Control**: Admin / System Only.

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `claimId` | `string` | Yes | UUID of the claim to process. |
| `forceRecalculate` | `boolean` | No | Ignores cache and re-runs the entire pipeline. |

```json title="Example Request"
{
  "claimId": "uuid-claim-1234",
  "forceRecalculate": true
}
```

### Response
**200 OK**
Returns the engine's detailed analysis report.
```json
{
  "jobId": "e3b0c442...",
  "status": "COMPLETED",
  "result": {
    "finalScore": 87.5,
    "confidenceInterval": "+/- 2.1",
    "sourcesAnalyzed": 14,
    "verdict": "MOSTLY_TRUE"
  }
}
```

**403 Forbidden**
Insufficient permissions (requires `ADMIN` role).

**404 Not Found**
Claim does not exist.

---

## 🚀 Get Engine Metrics

Fetches high-level operational metrics for the analytics engine.

**Endpoint**: `GET /api/engine/metrics`

**Access Control**: Admin only.

### Response
**200 OK**
```json
{
  "totalProcessedClaims": 10542,
  "averageProcessingTimeMs": 245,
  "activeJobs": 12,
  "lastRunTimestamp": "2023-01-01T14:30:00.000Z"
}
```
