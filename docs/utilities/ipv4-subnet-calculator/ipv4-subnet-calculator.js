(function () {
  var SAFE_VISIBLE_SUBNET_LIMIT = 511;
  var form = document.getElementById("subnet-input-form");
  var input = document.getElementById("subnet-cidr-input");
  var status = document.getElementById("subnet-status");
  var treeRoot = document.getElementById("subnet-tree");
  var resetButton = document.getElementById("subnet-reset-button");
  var expandLevelButton = document.getElementById("subnet-expand-level-button");
  var collapseLevelButton = document.getElementById("subnet-collapse-level-button");

  if (!form || !input || !status || !treeRoot || !resetButton || !expandLevelButton || !collapseLevelButton) {
    return;
  }

  var state = {
    root: null,
    loadedNetwork: null,
    loadedPrefix: null,
    activeSiblingGroup: null
  };
  var nextNodeId = 0;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatCount(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function ipToBigInt(value) {
    var octets = value.split(".");
    var result = 0n;
    var i;

    for (i = 0; i < octets.length; i += 1) {
      result = (result << 8n) + BigInt(Number(octets[i]));
    }

    return result;
  }

  function bigIntToIp(value) {
    var remaining = value;
    var octets = [];
    var i;

    for (i = 0; i < 4; i += 1) {
      octets.unshift(Number(remaining & 255n));
      remaining >>= 8n;
    }

    return octets.join(".");
  }

  function subnetSize(prefix) {
    return 1n << BigInt(32 - prefix);
  }

  function networkAddress(address, prefix) {
    var size = subnetSize(prefix);
    return (address / size) * size;
  }

  function broadcastAddress(network, prefix) {
    return network + subnetSize(prefix) - 1n;
  }

  function usableAddressCount(prefix) {
    if (prefix === 32) {
      return 1n;
    }
    if (prefix === 31) {
      return 2n;
    }

    return subnetSize(prefix) - 2n;
  }

  function createNode(network, prefix) {
    nextNodeId += 1;

    return {
      id: "subnet-node-" + nextNodeId,
      network: network,
      prefix: prefix,
      children: null,
      isDetailsVisible: false
    };
  }

  function parseCidr(value) {
    var trimmed = String(value || "").trim();
    var match = trimmed.match(/^(\d{1,3}(?:\.\d{1,3}){3})\s*\/\s*(\d{1,2})$/);
    var octets;
    var prefix;
    var i;
    var hostAddress;
    var normalisedNetwork;

    if (!match) {
      return {
        error: "Enter a valid IPv4 CIDR such as 192.168.0.0/16."
      };
    }

    octets = match[1].split(".");
    for (i = 0; i < octets.length; i += 1) {
      if (!/^\d+$/.test(octets[i]) || Number(octets[i]) > 255) {
        return {
          error: "Each IPv4 octet must be between 0 and 255."
        };
      }
    }

    prefix = Number(match[2]);
    if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
      return {
        error: "The subnet prefix length must be between 0 and 32."
      };
    }

    hostAddress = ipToBigInt(match[1]);
    normalisedNetwork = networkAddress(hostAddress, prefix);

    return {
      hostAddress: hostAddress,
      prefix: prefix,
      network: normalisedNetwork,
      wasNormalised: normalisedNetwork !== hostAddress,
      enteredCidr: match[1] + "/" + prefix,
      normalisedCidr: bigIntToIp(normalisedNetwork) + "/" + prefix
    };
  }

  function nodeDetails(node) {
    var network = node.network;
    var prefix = node.prefix;
    var broadcast = broadcastAddress(network, prefix);
    var totalAddresses = subnetSize(prefix);
    var usableAddresses = usableAddressCount(prefix);
    var note = "";

    if (prefix === 31) {
      note = "RFC 3021 point-to-point subnet.";
    } else if (prefix === 32) {
      note = "Single-address route.";
    }

    return {
      cidr: bigIntToIp(network) + "/" + prefix,
      range: bigIntToIp(network) + " - " + bigIntToIp(broadcast),
      network: bigIntToIp(network),
      broadcast: bigIntToIp(broadcast),
      usableAddresses: formatCount(usableAddresses),
      usableLabel: prefix >= 31 ? "usable addresses" : "usable hosts",
      totalAddresses: formatCount(totalAddresses),
      note: note,
      canSplit: prefix < 32
    };
  }

  function findNode(node, nodeId) {
    var i;
    var result;

    if (!node) {
      return null;
    }

    if (node.id === nodeId) {
      return node;
    }

    if (!node.children) {
      return null;
    }

    for (i = 0; i < node.children.length; i += 1) {
      result = findNode(node.children[i], nodeId);
      if (result) {
        return result;
      }
    }

    return null;
  }

  function walkNodes(node, visitor) {
    var i;

    if (!node) {
      return;
    }

    visitor(node);

    if (!node.children) {
      return;
    }

    for (i = 0; i < node.children.length; i += 1) {
      walkNodes(node.children[i], visitor);
    }
  }

  function ensureChildren(node) {
    var halfSize;

    if (!node || node.children || node.prefix >= 32) {
      return false;
    }

    halfSize = subnetSize(node.prefix) / 2n;
    node.children = [
      createNode(node.network, node.prefix + 1),
      createNode(node.network + halfSize, node.prefix + 1)
    ];
    return true;
  }

  function visibleSubnetCount(node) {
    var count = 0;

    walkNodes(node, function () {
      count += 1;
    });

    return count;
  }

  function hasExpandableLeaves(node) {
    var found = false;

    walkNodes(node, function (current) {
      if (!current.children && current.prefix < 32) {
        found = true;
      }
    });

    return found;
  }

  function expandableLeaves(node) {
    var leaves = [];

    walkNodes(node, function (current) {
      if (!current.children && current.prefix < 32) {
        leaves.push(current);
      }
    });

    return leaves;
  }

  function canAddSubnetRows(additionalRows) {
    if (!state.root) {
      return true;
    }

    return visibleSubnetCount(state.root) + additionalRows <= SAFE_VISIBLE_SUBNET_LIMIT;
  }

  function setRootNode(node) {
    if (!node) {
      return;
    }

    state.loadedNetwork = node.network;
    state.loadedPrefix = node.prefix;
    state.root = buildRoot(node.network, node.prefix);
    state.activeSiblingGroup = null;
    input.value = bigIntToIp(node.network) + "/" + node.prefix;
    setStatus(
      "Now using " + bigIntToIp(node.network) + "/" + node.prefix + " as the root subnet.",
      "success"
    );
    renderTree();
  }

  function expansionLimitMessage() {
    return (
      "Expansion paused to keep the page responsive. Use one of the current subnets as the new root to continue. " +
      "Safe visible limit: " +
      formatCount(SAFE_VISIBLE_SUBNET_LIMIT) +
      " subnets."
    );
  }

  function maxExpandedDepth(node, depth) {
    var childDepth;
    var i;
    var maxDepth = depth;

    if (!node || !node.children) {
      return maxDepth;
    }

    for (i = 0; i < node.children.length; i += 1) {
      childDepth = maxExpandedDepth(node.children[i], depth + 1);
      if (childDepth > maxDepth) {
        maxDepth = childDepth;
      }
    }

    return maxDepth;
  }

  function hasDeeperExpandedLevel(node) {
    return !!node && maxExpandedDepth(node, 0) > 0;
  }

  function collapseDeepestLevel(node, depth, targetDepth) {
    var changed = false;
    var i;

    if (!node || !node.children) {
      return false;
    }

    if (depth === targetDepth - 1) {
      node.children = null;
      return true;
    }

    for (i = 0; i < node.children.length; i += 1) {
      if (collapseDeepestLevel(node.children[i], depth + 1, targetDepth)) {
        changed = true;
      }
    }

    return changed;
  }

  function renderNode(node, depth, isRoot, siblingGroup) {
    var details = nodeDetails(node);
    var detailsLabel = node.isDetailsVisible ? "Hide" : "Details";
    var splitLabel = node.children ? "[-]" : (details.canSplit ? "[+]" : "[ ]");
    var splitDisabled = !node.children && !details.canSplit;
    var splitClass = node.children ? " is-collapse" : " is-expand";
    var splitTitle = node.children ? "Merge subnet" : (details.canSplit ? "Split subnet" : "Smallest subnet");
    var rootTitle = isRoot ? "Current root subnet" : "Use this subnet as the new root";
    var badgeHtml = isRoot ? '<span class="subnet-node-badge">Root</span>' : "";
    var siblingAttributes = siblingGroup
      ? ' data-sibling-group="' + escapeHtml(siblingGroup) + '"'
      : "";
    var html =
      '<li class="subnet-outline-item">' +
      '<section class="subnet-node' + (isRoot ? " is-root" : "") + '" style="--subnet-depth:' + depth + ';"' + siblingAttributes + ">" +
      '<div class="subnet-node-row">' +
      '<div class="subnet-node-main">' +
      '<div class="subnet-node-heading">' +
      '<p class="subnet-node-cidr">' + escapeHtml(details.cidr) + "</p>" +
      badgeHtml +
      "</div>" +
      "</div>" +
      '<div class="subnet-node-actions">';

    html +=
      '<button type="button" class="subnet-action-button' + splitClass + '" data-action="split" data-node-id="' +
      escapeHtml(node.id) +
      '" title="' +
      escapeHtml(splitTitle) +
      '" aria-label="' +
      escapeHtml(splitTitle) +
      '"' +
      (splitDisabled ? " disabled" : "") +
      ">" +
      escapeHtml(splitLabel) +
      "</button>" +
      '<button type="button" class="subnet-action-button is-root-action" data-action="re-root" data-node-id="' +
      escapeHtml(node.id) +
      '" title="' +
      escapeHtml(rootTitle) +
      '" aria-label="' +
      escapeHtml(rootTitle) +
      '"' +
      (isRoot ? " disabled" : "") +
      ">Root</button>" +
      '<button type="button" class="subnet-details-button is-details" data-action="details" data-node-id="' +
      escapeHtml(node.id) +
      '" title="' +
      escapeHtml(node.isDetailsVisible ? "Hide details" : "Show details") +
      '" aria-label="' +
      escapeHtml(node.isDetailsVisible ? "Hide details" : "Show details") +
      '">' +
      escapeHtml(detailsLabel) +
      "</button>" +
      "</div>" +
      "</div>";

    if (node.isDetailsVisible) {
      html +=
        '<div class="subnet-node-details">' +
        "<p><strong>Range:</strong> " + escapeHtml(details.range) + "</p>" +
        "<p><strong>Network:</strong> " + escapeHtml(details.network) + "</p>" +
        "<p><strong>Broadcast:</strong> " + escapeHtml(details.broadcast) + "</p>" +
        "<p><strong>" + escapeHtml(details.usableLabel) + ":</strong> " + escapeHtml(details.usableAddresses) + "</p>" +
        "<p><strong>Total addresses:</strong> " + escapeHtml(details.totalAddresses) + "</p>";

      if (details.note) {
        html += "<p><strong>Note:</strong> " + escapeHtml(details.note) + "</p>";
      }

      html += "</div>";
    }

    html += "</section>";

    if (node.children) {
      html += '<ul class="subnet-outline-children">';
      html += renderNode(node.children[0], depth + 1, false, node.id);
      html += renderNode(node.children[1], depth + 1, false, node.id);
      html += "</ul>";
    }

    html += "</li>";
    return html;
  }

  function renderTree() {
    if (!state.root) {
      treeRoot.innerHTML =
        '<p class="subnet-tree-empty">Load an IPv4 CIDR to display the subnet tree.</p>';
      resetButton.disabled = true;
      expandLevelButton.disabled = true;
      collapseLevelButton.disabled = true;
      return;
    }

    treeRoot.innerHTML = '<ul class="subnet-outline">' + renderNode(state.root, 0, true, null) + "</ul>";
    resetButton.disabled = false;
    expandLevelButton.disabled = !hasExpandableLeaves(state.root);
    collapseLevelButton.disabled = !hasDeeperExpandedLevel(state.root);
    syncActiveSiblingGroup();
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.className = "subnet-status" + (type ? " is-" + type : "");
  }

  function siblingNodes(groupId) {
    if (!groupId) {
      return [];
    }

    return Array.prototype.slice.call(
      treeRoot.querySelectorAll('.subnet-node[data-sibling-group="' + groupId + '"]')
    );
  }

  function clearSiblingClass(className) {
    var nodes = treeRoot.querySelectorAll(".subnet-node." + className);
    var i;

    for (i = 0; i < nodes.length; i += 1) {
      nodes[i].classList.remove(className);
    }
  }

  function setSiblingClass(groupId, className) {
    var nodes = siblingNodes(groupId);
    var i;

    for (i = 0; i < nodes.length; i += 1) {
      nodes[i].classList.add(className);
    }
  }

  function syncActiveSiblingGroup() {
    clearSiblingClass("is-sibling-active");

    if (state.activeSiblingGroup) {
      if (siblingNodes(state.activeSiblingGroup).length) {
        setSiblingClass(state.activeSiblingGroup, "is-sibling-active");
      } else {
        state.activeSiblingGroup = null;
      }
    }
  }

  function buildRoot(network, prefix) {
    nextNodeId = 0;
    return createNode(network, prefix);
  }

  function loadTree(parsed) {
    state.loadedNetwork = parsed.network;
    state.loadedPrefix = parsed.prefix;
    state.root = buildRoot(parsed.network, parsed.prefix);
    state.activeSiblingGroup = null;
    input.value = parsed.normalisedCidr;

    if (parsed.wasNormalised) {
      setStatus(
        "Normalised " + parsed.enteredCidr + " to " + parsed.normalisedCidr + ".",
        "success"
      );
    } else {
      setStatus("Loaded network " + parsed.normalisedCidr + ".", "success");
    }

    renderTree();
  }

  function resetTree() {
    if (state.loadedNetwork === null || state.loadedPrefix === null) {
      return;
    }

    state.root = buildRoot(state.loadedNetwork, state.loadedPrefix);
    state.activeSiblingGroup = null;
    setStatus("Reset to " + bigIntToIp(state.loadedNetwork) + "/" + state.loadedPrefix + ".", "success");
    renderTree();
  }

  function expandOneLevel() {
    var changed = false;
    var leaves;
    var i;
    var additionalRows;

    if (!state.root) {
      return;
    }

    leaves = expandableLeaves(state.root);
    additionalRows = leaves.length * 2;

    if (!canAddSubnetRows(additionalRows)) {
      setStatus(expansionLimitMessage(), "error");
      renderTree();
      return;
    }

    for (i = 0; i < leaves.length; i += 1) {
      if (ensureChildren(leaves[i])) {
        changed = true;
      }
    }

    if (changed) {
      setStatus("Expanded the current level by one step.", "success");
    } else {
      setStatus("No further expansion is available.", "success");
    }

    renderTree();
  }

  function collapseOneLevel() {
    var deepestDepth;
    var changed;

    if (!state.root) {
      return;
    }

    deepestDepth = maxExpandedDepth(state.root, 0);
    if (deepestDepth <= 0) {
      setStatus("There is no deeper level to collapse.", "success");
      renderTree();
      return;
    }

    changed = collapseDeepestLevel(state.root, 0, deepestDepth);

    if (changed) {
      setStatus("Collapsed the deepest level.", "success");
    } else {
      setStatus("There is no deeper level to collapse.", "success");
    }

    renderTree();
  }

  function loadExampleCidr(value) {
    var parsed = parseCidr(value);

    if (parsed.error) {
      setStatus(parsed.error, "error");
      return;
    }

    input.value = value;
    loadTree(parsed);
  }

  form.addEventListener("click", function (event) {
    var exampleButton = event.target.closest("[data-cidr-example]");

    if (!exampleButton) {
      return;
    }

    loadExampleCidr(exampleButton.getAttribute("data-cidr-example"));
  });

  form.addEventListener("submit", function (event) {
    var parsed;

    event.preventDefault();
    parsed = parseCidr(input.value);

    if (parsed.error) {
      setStatus(parsed.error, "error");
      return;
    }

    loadTree(parsed);
  });

  treeRoot.addEventListener("click", function (event) {
    var button = event.target.closest("[data-action][data-node-id]");
    var row = event.target.closest(".subnet-node-row");
    var rowNode;
    var siblingGroup;
    var action;
    var node;

    if (!state.root) {
      return;
    }

    if (!button && row) {
      rowNode = row.parentElement;
      siblingGroup = rowNode ? rowNode.getAttribute("data-sibling-group") : "";
      if ((siblingGroup || null) === state.activeSiblingGroup) {
        state.activeSiblingGroup = null;
      } else {
        state.activeSiblingGroup = siblingGroup || null;
      }
      syncActiveSiblingGroup();
      return;
    }

    if (!button) {
      state.activeSiblingGroup = null;
      syncActiveSiblingGroup();
      return;
    }

    action = button.getAttribute("data-action");
    node = findNode(state.root, button.getAttribute("data-node-id"));

    if (!node) {
      return;
    }

    if (action === "split") {
      if (node.children) {
        node.children = null;
      } else {
        if (!canAddSubnetRows(2)) {
          setStatus(expansionLimitMessage(), "error");
          renderTree();
          return;
        }
        ensureChildren(node);
      }
    } else if (action === "re-root") {
      setRootNode(node);
      return;
    } else if (action === "details") {
      node.isDetailsVisible = !node.isDetailsVisible;
    }

    renderTree();
  });

  treeRoot.addEventListener("mouseover", function (event) {
    var row = event.target.closest(".subnet-node-row");
    var rowNode;
    var siblingGroup;

    if (!row) {
      return;
    }

    rowNode = row.parentElement;
    siblingGroup = rowNode ? rowNode.getAttribute("data-sibling-group") : "";
    clearSiblingClass("is-sibling-hover");

    if (siblingGroup) {
      setSiblingClass(siblingGroup, "is-sibling-hover");
    }
  });

  treeRoot.addEventListener("mouseout", function (event) {
    var related = event.relatedTarget;

    if (related && treeRoot.contains(related)) {
      return;
    }

    clearSiblingClass("is-sibling-hover");
  });

  treeRoot.addEventListener("mouseleave", function () {
    clearSiblingClass("is-sibling-hover");
  });

  resetButton.addEventListener("click", function () {
    resetTree();
  });

  expandLevelButton.addEventListener("click", function () {
    expandOneLevel();
  });

  collapseLevelButton.addEventListener("click", function () {
    collapseOneLevel();
  });

  (function initialise() {
    var parsed = parseCidr(input.value);

    if (parsed.error) {
      setStatus(parsed.error, "error");
      renderTree();
      return;
    }

    loadTree(parsed);
  }());
}());
