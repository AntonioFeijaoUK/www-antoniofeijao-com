---
layout: utilities-tool
title: IPv4 subnet calculator
permalink: /utilities/ipv4-subnet-calculator/
description: Browser-based IPv4 subnet calculator with automatic network normalisation and interactive subnet splitting.
utility_stylesheet: /utilities/ipv4-subnet-calculator/ipv4-subnet-calculator.css
utility_script: /utilities/ipv4-subnet-calculator/ipv4-subnet-calculator.js
main_class: subnet-calculator-page
---

<section class="subnet-tool-intro">
  <p>
    Enter an IPv4 CIDR such as <code>192.168.0.0/16</code>. Host addresses are normalised automatically to their
    parent network. The calculator shows the network range, broadcast address, and usable address count, follows RFC
    3021 semantics for <code>/31</code>, and lets you split or merge subnets in place.
  </p>
</section>

<section class="subnet-tool-panel" aria-labelledby="subnet-tool-form-title">
  <h2 id="subnet-tool-form-title" class="visually-hidden">Subnet input</h2>

  <form class="subnet-input-form" id="subnet-input-form" novalidate>
    <label class="subnet-input-label" for="subnet-cidr-input">IPv4 CIDR</label>
    <div class="subnet-input-row">
      <input
        id="subnet-cidr-input"
        name="cidr"
        type="text"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        placeholder="192.168.0.0/16"
        value="192.168.0.0/16"
        aria-describedby="subnet-input-help subnet-status"
      >
      <button type="submit">Load network</button>
    </div>
    <div class="small-note subnet-example-panel" id="subnet-input-help">
      <p class="subnet-example-intro">Try one of these common or educational examples:</p>
      <div class="subnet-example-groups">
        <section class="subnet-example-group" aria-label="Private ranges">
          <p class="subnet-example-group-title">Private ranges</p>
          <div class="subnet-example-list">
            <button class="subnet-example-button" type="button" data-cidr-example="10.0.0.0/8">
              <span class="subnet-example-label">RFC 1918 private range 10/8</span>
              <code>10.0.0.0/8</code>
            </button>
            <button class="subnet-example-button" type="button" data-cidr-example="172.16.0.0/16">
              <span class="subnet-example-label">RFC 1918 private range 172.16/12</span>
              <code>172.16.0.0/16</code>
            </button>
            <button class="subnet-example-button" type="button" data-cidr-example="192.168.0.0/24">
              <span class="subnet-example-label">RFC 1918 private range 192.168/16</span>
              <code>192.168.0.0/24</code>
            </button>
          </div>
        </section>

        <section class="subnet-example-group" aria-label="AWS examples">
          <p class="subnet-example-group-title">AWS examples</p>
          <div class="subnet-example-list">
            <button class="subnet-example-button" type="button" data-cidr-example="10.0.0.0/16">
              <span class="subnet-example-label">AWS largest IPv4 VPC or subnet</span>
              <code>10.0.0.0/16</code>
            </button>
            <button class="subnet-example-button" type="button" data-cidr-example="10.0.0.0/28">
              <span class="subnet-example-label">AWS smallest IPv4 VPC or subnet</span>
              <code>10.0.0.0/28</code>
            </button>
            <button class="subnet-example-button" type="button" data-cidr-example="172.31.0.0/16">
              <span class="subnet-example-label">AWS default VPC IPv4 range</span>
              <code>172.31.0.0/16</code>
            </button>
          </div>
        </section>

        <section class="subnet-example-group" aria-label="Common real-world examples">
          <p class="subnet-example-group-title">Common real-world examples</p>
          <div class="subnet-example-list">
            <button class="subnet-example-button" type="button" data-cidr-example="192.168.1.0/24">
              <span class="subnet-example-label">Typical home LAN subnet</span>
              <code>192.168.1.0/24</code>
            </button>
            <button class="subnet-example-button" type="button" data-cidr-example="10.0.10.0/24">
              <span class="subnet-example-label">Typical server or VLAN subnet</span>
              <code>10.0.10.0/24</code>
            </button>
          </div>
        </section>

        <section class="subnet-example-group" aria-label="Special cases">
          <p class="subnet-example-group-title">Special cases</p>
          <div class="subnet-example-list">
            <button class="subnet-example-button" type="button" data-cidr-example="198.51.100.0/29">
              <span class="subnet-example-label">Documentation subnet example</span>
              <code>198.51.100.0/29</code>
            </button>
            <button class="subnet-example-button" type="button" data-cidr-example="192.0.2.0/31">
              <span class="subnet-example-label">RFC 3021 point-to-point link</span>
              <code>192.0.2.0/31</code>
            </button>
          </div>
        </section>
      </div>
    </div>
    <p class="subnet-status" id="subnet-status" aria-live="polite"></p>
  </form>
</section>

<section class="subnet-tree-section" aria-labelledby="subnet-tree-title">
  <div class="subnet-tree-header">
    <h2 id="subnet-tree-title">Subnet outline</h2>
    <div class="subnet-tree-actions">
      <button class="subnet-expand-level-button" id="subnet-expand-level-button" type="button">[+] 1 level</button>
      <button class="subnet-collapse-level-button" id="subnet-collapse-level-button" type="button">[-] 1 level</button>
      <button class="subnet-reset-button" id="subnet-reset-button" type="button">[ ] Reset</button>
    </div>
  </div>

  <div class="subnet-tree" id="subnet-tree"></div>
</section>
