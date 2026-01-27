# Branch Protection Rules

**Effective Date:** 2026-01-27  
**Authority:** Sentinel-Manager (Release & Repository Governance Agent)  
**Status:** ENFORCED

---

## 1. Purpose

This document establishes branch protection rules to enforce:
- **Phase 1 Freeze**: Prevent unauthorized modifications to Phase 1 baseline
- **Phase 2 Governance**: Ensure all Phase 2 work follows approved processes
- **Code Quality**: Maintain repository integrity through mandatory reviews

---

## 2. Protected Branches

### 2.1 `main` Branch

**Protection Level:** MAXIMUM

**Rules:**
- ❌ **No Direct Commits**: All changes must come via Pull Requests
- ✅ **Require PR Reviews**: Minimum 1 approval required
- ✅ **Require Status Checks**: All CI/CD checks must pass
- ✅ **Require Linear History**: No merge commits (rebase or squash only)
- ❌ **No Force Push**: History rewriting is prohibited
- ❌ **No Deletion**: Branch cannot be deleted

**Rationale:** The `main` branch represents the stable baseline. Phase 1 is frozen at tag `phase-1-final`. Only approved Phase 2 features may be merged after full review.

### 2.2 `feat/phase2-*` Branches

**Protection Level:** MODERATE

**Rules:**
- ✅ **Require PR Reviews**: Minimum 1 approval for merges to `main`
- ✅ **Require Status Checks**: Linting and tests must pass
- ⚠️ **Force Push Allowed**: Only for branch maintainers (use with caution)
- ❌ **No Direct Merge to Main**: Must go through PR process

**Rationale:** Feature branches allow iterative development but must maintain quality standards before integration.

---

## 3. GitHub Branch Protection Configuration

To configure these rules on GitHub:

### For `main` Branch:

1. Navigate to: **Settings → Branches → Add Rule**
2. Branch name pattern: `main`
3. Enable:
   - ☑ Require a pull request before merging
     - ☑ Require approvals (1)
     - ☑ Dismiss stale pull request approvals when new commits are pushed
   - ☑ Require status checks to pass before merging
     - ☑ Require branches to be up to date before merging
   - ☑ Require linear history
   - ☑ Do not allow bypassing the above settings
   - ☑ Restrict who can push to matching branches (Admins only)
4. Save changes

### For Feature Branches:

1. Branch name pattern: `feat/phase2-*`
2. Enable:
   - ☑ Require a pull request before merging
     - ☑ Require approvals (1)
   - ☑ Require status checks to pass before merging

---

## 4. Enforcement Checklist

- [x] `main` branch protection rules documented
- [x] Phase 1 frozen at tag `phase-1-final`
- [x] Phase 2 feature branch created: `feat/phase2-ai-assistant`
- [ ] GitHub branch protection configured (requires repository admin access)
- [ ] CI/CD pipeline configured for status checks
- [ ] Team members notified of new governance rules

---

## 5. Violation Response

**If unauthorized commits are detected on `main`:**

1. Immediately revert the commit
2. Notify the committer of governance violation
3. Require proper PR process for the change
4. Document the incident in governance logs

**If Phase 1 modules are modified:**

1. Reject the PR immediately
2. Require formal change request approval
3. Escalate to Sentinel-Manager for review

---

## 6. Review Schedule

These rules will be reviewed:
- At the end of Phase 2
- When transitioning to Phase 3
- Upon any major governance policy changes

---

**Approved By:**  
*Release & Repository Governance Agent*  
*Date: 2026-01-27*
