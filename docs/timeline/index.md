---
layout: timeline-index
title: Timeline
permalink: /timeline/
description: Curated timeline of verified milestones across science, space, cybersecurity, computing, war, and related topics.
---

# Timeline

This timeline is being rebuilt as a curated, source-backed reference focused on science, space, cybersecurity, computing, war, and related milestones.

Only verified entries are being migrated into the new structure. Each published event links to its own page and includes source references.

<section class="timeline-panel">
  <div class="timeline-intro-grid">
    <div>
      <h2>Browse Verified Events</h2>
      <p class="timeline-muted">
        Filter by topic, type, region, status, confidence, or search terms.
      </p>
    </div>
    <div class="timeline-stats" id="timeline-stats">
      Loading timeline index...
    </div>
  </div>

  <form class="timeline-filters" id="timeline-filters">
    <label>
      Search
      <input id="timeline-search" name="q" type="search" placeholder="Voyager, Apollo, nuclear, Stuxnet...">
    </label>

    <label>
      Topic
      <select id="timeline-topic" name="topic">
        <option value="">All topics</option>
      </select>
    </label>

    <label>
      Type
      <select id="timeline-type" name="type">
        <option value="">All types</option>
      </select>
    </label>

    <label>
      Region
      <select id="timeline-region" name="region">
        <option value="">All regions</option>
      </select>
    </label>

    <label>
      Status
      <select id="timeline-status" name="status">
        <option value="">All statuses</option>
      </select>
    </label>

    <label>
      Confidence
      <select id="timeline-confidence" name="confidence">
        <option value="">All confidence levels</option>
      </select>
    </label>
  </form>
</section>

<section class="timeline-results" id="timeline-results" aria-live="polite"></section>
