// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2UeK4":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0a8ecb283d214d75";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"bB7Pu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _onboarding = require("@metamask/onboarding");
var _onboardingDefault = parcelHelpers.interopDefault(_onboarding);
var Buffer = require("8af58b7db2d8478c").Buffer;
const player = document.querySelector(".success-anim");
const onboarding = new (0, _onboardingDefault.default)();
const btn = document.querySelector(".onboard");
const statusText = document.querySelector("h1");
const statusDesc = document.querySelector(".desc");
const loader = document.querySelector(".loader");
const upArrow = document.querySelector(".up");
const confetti = document.querySelector(".confetti");
const headerIdLogin = document.querySelector(".headerIdLogin");
const idLogin = document.querySelector(".idLogin");
const isMetaMaskInstalled = ()=>{
    const { ethereum: ethereum1 } = window;
    return Boolean(ethereum1 && ethereum1.isMetaMask);
};
let connected = (accounts, bearer)=>{
    statusText.innerHTML = "Connected!";
    statusDesc.classList.add("account");
    statusDesc.innerHTML = accounts[0];
    btn.style.display = "none";
    loader.style.display = "none";
    upArrow.style.display = "none";
    confetti.style.display = "block";
    player.play();
    statusDesc.classList.add("account");
    headerIdLogin.innerHTML = "Your login ID:";
    idLogin.innerHTML = bearer;
    idLogin.style.wordWrap = "break-word";
    idLogin.style.width = "688px";
    idLogin.style.cursor = "pointer";
};
async function connectWallet() {
    return await ethereum.request({
        method: "eth_accounts"
    });
}
const onClickInstallMetaMask = ()=>{
    onboarding.startOnboarding();
    loader.style.display = "block";
};
btn.addEventListener("click", async ()=>{
    btn.style.backgroundColor = "#cccccc";
    loader.style.display = "block";
    try {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts"
        });
        // Prompt user to sign a message
        let time = Math.floor(Date.now() / 1000);
        const message = "BoomBlock Login " + time + "!";
        const accountss = await ethereum.request({
            method: "personal_sign",
            params: [
                message,
                ethereum.selectedAddress
            ]
        });
        let bearer = encode(ethereum.selectedAddress, accountss, time);
        console.log("Signed message: ", accountss);
        console.log("Bearer: ", bearer);
        console.log("key: loginId_" + ethereum.selectedAddress);
        localStorage.setItem("loginId_" + ethereum.selectedAddress, bearer);
        connected(accounts, bearer);
    } catch (error) {
        console.error(error);
    }
});
idLogin.addEventListener("click", function() {
    copyToClipboard(idLogin.innerText);
});
function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Đ\xe3 sao ch\xe9p th\xe0nh c\xf4ng!");
}
const MetaMaskClientCheck = ()=>{
    if (!isMetaMaskInstalled()) {
        statusText.innerText = "You need to Install a Wallet";
        statusDesc.innerText = "We recommend the MetaMask wallet.";
        btn.innerText = "Install MetaMask";
        btn.onclick = onClickInstallMetaMask;
    } else connectWallet().then((accounts)=>{
        if (accounts && accounts[0] > 0) {
            let data = localStorage.getItem("loginId_" + ethereum.selectedAddress);
            console.log("key: loginId_" + ethereum.selectedAddress);
            if (data === null) signMessage(accounts);
            else connected(accounts, data);
        } else {
            statusText.innerHTML = "Connect your wallet";
            statusDesc.innerHTML = "To begin, please connect your MetaMask wallet.";
            btn.innerText = "Connect MetaMask";
            upArrow.style.display = "block";
        }
    });
};
async function signMessage(accounts) {
    // Ensure MetaMask is installed and connected
    if (typeof window.ethereum === "undefined") {
        console.error("MetaMask is not installed.");
        return;
    }
    try {
        // Request user's permission to access their accounts
        await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        // Prompt user to sign a message
        let time = Math.floor(Date.now() / 1000);
        const message = "BoomBlock Login " + time + "!";
        const accountss = await window.ethereum.request({
            method: "personal_sign",
            params: [
                message,
                window.ethereum.selectedAddress
            ]
        });
        let bearer = encode(window.ethereum.selectedAddress, accountss, time);
        localStorage.setItem("loginId_" + window.ethereum.selectedAddress, bearer);
        console.log("Signed message:", accountss);
        console.log("Bearer: ", bearer);
        connected(accounts, bearer);
    } catch (error) {
        console.error("Error:", error);
    }
}
function encode(userAdd, signature, duration) {
    const buf = {
        address: userAdd,
        signature: signature,
        duration: duration
    };
    let objJsonStr = JSON.stringify(buf);
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
    return objJsonB64;
}
MetaMaskClientCheck();

},{"8af58b7db2d8478c":"fCgem","@metamask/onboarding":"gSj9U","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fCgem":[function(require,module,exports) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ "use strict";
const base64 = require("9c62938f1dccc73c");
const ieee754 = require("aceacb6a4531a9d2");
const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
 ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
 : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
const K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192 // not used by this implementation
;
function from(value, encodingOrOffset, length) {
    if (typeof value === "string") return fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return Buffer.from(valueOf, encodingOrOffset, length);
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) return createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) return createBuffer(0);
        return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(obj.data);
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) length = 0;
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return Buffer.alloc(0);
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
            } else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;)switch(encoding){
        case "ascii":
        case "latin1":
        case "binary":
            return len;
        case "utf8":
        case "utf-8":
            return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return len * 2;
        case "hex":
            return len >>> 1;
        case "base64":
            return base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
            ;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) start = 0;
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) return "";
    if (end === undefined || end > this.length) end = this.length;
    if (end <= 0) return "";
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return "";
    if (!encoding) encoding = "utf8";
    while(true)switch(encoding){
        case "hex":
            return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
            return utf8Slice(this, start, end);
        case "ascii":
            return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
            return latin1Slice(this, start, end);
        case "base64":
            return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return utf16leSlice(this, start, end);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for(let i = 0; i < len; i += 2)swap(this, i, i + 1);
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for(let i = 0; i < len; i += 4){
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for(let i = 0; i < len; i += 8){
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
};
if (customInspectSymbol) Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) target = Buffer.from(target, target.offset, target.byteLength);
    if (!Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === undefined) start = 0;
    if (end === undefined) end = target ? target.length : 0;
    if (thisStart === undefined) thisStart = 0;
    if (thisEnd === undefined) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset // Coerce to Number.
    ;
    if (numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === "string") val = Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) return buf[i];
        else return buf.readUInt16BE(i * indexSize);
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            let found = true;
            for(let j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    const strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = "utf8";
        } else {
            encoding = length;
            length = undefined;
        }
    } else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for(;;)switch(encoding){
        case "hex":
            return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
            return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
            return asciiWrite(this, string, offset, length);
        case "base64":
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
    else return base64.fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) codePoint = firstByte;
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    let res = "";
    let i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    return res;
}
function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for(let i = start; i < end; ++i)out += hexSliceLookupTable[buf[i]];
    return out;
}
function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset + --byteLength];
    let mul = 1;
    while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
    return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const lo = first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 256 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = this[offset + 4] + this[offset + 5] * 256 + this[offset + 6] * 2 ** 16 + (last << 24 // Overflow
    );
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== "string") throw new TypeError("encoding must be a string");
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
        }
    } else if (typeof val === "number") val = val & 255;
    else if (typeof val === "boolean") val = Number(val);
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const errors = {};
function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
        constructor(){
            super();
            Object.defineProperty(this, "message", {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = `${this.name} [${sym}]`;
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack // eslint-disable-line no-unused-expressions
            ;
            // Reset the name to the actual name.
            delete this.name;
        }
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, "code", {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${sym}]: ${this.message}`;
        }
    };
}
E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) return `${name} is outside of buffer bounds`;
    return "Attempt to access memory outside buffer bounds";
}, RangeError);
E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
}, TypeError);
E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = addNumericalSeparator(String(input));
    else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = addNumericalSeparator(received);
        received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
}, RangeError);
function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for(; i >= start + 4; i -= 3)res = `_${val.slice(i - 3, i)}${res}`;
    return `${val.slice(0, i)}${res}`;
}
// CHECK FUNCTIONS
// ===============
function checkBounds(buf, offset, byteLength) {
    validateNumber(offset, "offset");
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) boundsError(offset, buf.length - (byteLength + 1));
}
function checkIntBI(value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength > 3) {
            if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
            else range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength + 1) * 8 - 1}${n}`;
        } else range = `>= ${min}${n} and <= ${max}${n}`;
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength);
}
function validateNumber(value, name) {
    if (typeof value !== "number") throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
}
function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
}
// HELPER FUNCTIONS
// ================
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + "=";
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error("Invalid code point");
    }
    return bytes;
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
}

},{"9c62938f1dccc73c":"eIiSV","aceacb6a4531a9d2":"cO95r"}],"eIiSV":[function(require,module,exports) {
"use strict";
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

},{}],"cO95r":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) value += rt / c;
        else value += rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
    buffer[offset + i - d] |= s * 128;
};

},{}],"gSj9U":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _bowser = require("bowser");
var _bowserDefault = parcelHelpers.interopDefault(_bowser);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var ONBOARDING_STATE = {
    INSTALLED: "INSTALLED",
    NOT_INSTALLED: "NOT_INSTALLED",
    REGISTERED: "REGISTERED",
    REGISTERING: "REGISTERING",
    RELOADING: "RELOADING"
};
var EXTENSION_DOWNLOAD_URL = {
    CHROME: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    FIREFOX: "https://addons.mozilla.org/firefox/addon/ether-metamask/",
    DEFAULT: "https://metamask.io"
};
// sessionStorage key
var REGISTRATION_IN_PROGRESS = "REGISTRATION_IN_PROGRESS";
// forwarder iframe id
var FORWARDER_ID = "FORWARDER_ID";
var Onboarding = /** @class */ function() {
    function Onboarding(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.forwarderOrigin, forwarderOrigin = _c === void 0 ? "https://fwd.metamask.io" : _c, _d = _b.forwarderMode, forwarderMode = _d === void 0 ? Onboarding.FORWARDER_MODE.INJECT : _d;
        this.forwarderOrigin = forwarderOrigin;
        this.forwarderMode = forwarderMode;
        this.state = Onboarding.isMetaMaskInstalled() ? ONBOARDING_STATE.INSTALLED : ONBOARDING_STATE.NOT_INSTALLED;
        var browser = Onboarding._detectBrowser();
        if (browser) this.downloadUrl = EXTENSION_DOWNLOAD_URL[browser];
        else this.downloadUrl = EXTENSION_DOWNLOAD_URL.DEFAULT;
        this._onMessage = this._onMessage.bind(this);
        this._onMessageFromForwarder = this._onMessageFromForwarder.bind(this);
        this._openForwarder = this._openForwarder.bind(this);
        this._openDownloadPage = this._openDownloadPage.bind(this);
        this.startOnboarding = this.startOnboarding.bind(this);
        this.stopOnboarding = this.stopOnboarding.bind(this);
        window.addEventListener("message", this._onMessage);
        if (forwarderMode === Onboarding.FORWARDER_MODE.INJECT && sessionStorage.getItem(REGISTRATION_IN_PROGRESS) === "true") Onboarding._injectForwarder(this.forwarderOrigin);
    }
    Onboarding.prototype._onMessage = function(event) {
        if (event.origin !== this.forwarderOrigin) // Ignoring non-forwarder message
        return undefined;
        if (event.data.type === "metamask:reload") return this._onMessageFromForwarder(event);
        console.debug("Unknown message from '" + event.origin + "' with data " + JSON.stringify(event.data));
        return undefined;
    };
    Onboarding.prototype._onMessageUnknownStateError = function(state) {
        throw new Error("Unknown state: '" + state + "'");
    };
    Onboarding.prototype._onMessageFromForwarder = function(event) {
        return __awaiter(this, void 0, void 0, function() {
            var _a;
            return __generator(this, function(_b) {
                switch(_b.label){
                    case 0:
                        _a = this.state;
                        switch(_a){
                            case ONBOARDING_STATE.RELOADING:
                                return [
                                    3 /*break*/ ,
                                    1
                                ];
                            case ONBOARDING_STATE.NOT_INSTALLED:
                                return [
                                    3 /*break*/ ,
                                    2
                                ];
                            case ONBOARDING_STATE.INSTALLED:
                                return [
                                    3 /*break*/ ,
                                    3
                                ];
                            case ONBOARDING_STATE.REGISTERING:
                                return [
                                    3 /*break*/ ,
                                    5
                                ];
                            case ONBOARDING_STATE.REGISTERED:
                                return [
                                    3 /*break*/ ,
                                    6
                                ];
                        }
                        return [
                            3 /*break*/ ,
                            7
                        ];
                    case 1:
                        console.debug("Ignoring message while reloading");
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 2:
                        console.debug("Reloading now to register with MetaMask");
                        this.state = ONBOARDING_STATE.RELOADING;
                        location.reload();
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 3:
                        console.debug("Registering with MetaMask");
                        this.state = ONBOARDING_STATE.REGISTERING;
                        return [
                            4 /*yield*/ ,
                            Onboarding._register()
                        ];
                    case 4:
                        _b.sent();
                        this.state = ONBOARDING_STATE.REGISTERED;
                        event.source.postMessage({
                            type: "metamask:registrationCompleted"
                        }, event.origin);
                        this.stopOnboarding();
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 5:
                        console.debug("Already registering - ignoring reload message");
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 6:
                        console.debug("Already registered - ignoring reload message");
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 7:
                        this._onMessageUnknownStateError(this.state);
                        _b.label = 8;
                    case 8:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /**
     * Starts onboarding by opening the MetaMask download page and the Onboarding forwarder
     */ Onboarding.prototype.startOnboarding = function() {
        sessionStorage.setItem(REGISTRATION_IN_PROGRESS, "true");
        this._openDownloadPage();
        this._openForwarder();
    };
    /**
     * Stops onboarding registration, including removing the injected forwarder (if any)
     *
     * Typically this function is not necessary, but it can be useful for cases where
     * onboarding completes before the forwarder has registered.
     */ Onboarding.prototype.stopOnboarding = function() {
        if (sessionStorage.getItem(REGISTRATION_IN_PROGRESS) === "true") {
            if (this.forwarderMode === Onboarding.FORWARDER_MODE.INJECT) {
                console.debug("Removing forwarder");
                Onboarding._removeForwarder();
            }
            sessionStorage.setItem(REGISTRATION_IN_PROGRESS, "false");
        }
    };
    Onboarding.prototype._openForwarder = function() {
        if (this.forwarderMode === Onboarding.FORWARDER_MODE.OPEN_TAB) window.open(this.forwarderOrigin, "_blank");
        else Onboarding._injectForwarder(this.forwarderOrigin);
    };
    Onboarding.prototype._openDownloadPage = function() {
        window.open(this.downloadUrl, "_blank");
    };
    /**
     * Checks whether the MetaMask extension is installed
     */ Onboarding.isMetaMaskInstalled = function() {
        return Boolean(window.ethereum && window.ethereum.isMetaMask);
    };
    Onboarding._register = function() {
        return window.ethereum.request({
            method: "wallet_registerOnboarding"
        });
    };
    Onboarding._injectForwarder = function(forwarderOrigin) {
        var container = document.body;
        var iframe = document.createElement("iframe");
        iframe.setAttribute("height", "0");
        iframe.setAttribute("width", "0");
        iframe.setAttribute("style", "display: none;");
        iframe.setAttribute("src", forwarderOrigin);
        iframe.setAttribute("id", FORWARDER_ID);
        container.insertBefore(iframe, container.children[0]);
    };
    Onboarding._removeForwarder = function() {
        var _a;
        (_a = document.getElementById(FORWARDER_ID)) === null || _a === void 0 || _a.remove();
    };
    Onboarding._detectBrowser = function() {
        var browserInfo = (0, _bowserDefault.default).parse(window.navigator.userAgent);
        if (browserInfo.browser.name === "Firefox") return "FIREFOX";
        else if ([
            "Chrome",
            "Chromium"
        ].includes(browserInfo.browser.name || "")) return "CHROME";
        return null;
    };
    Onboarding.FORWARDER_MODE = {
        INJECT: "INJECT",
        OPEN_TAB: "OPEN_TAB"
    };
    return Onboarding;
}();
exports.default = Onboarding;

},{"bowser":"5jYCf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5jYCf":[function(require,module,exports) {
!function(e, t) {
    module.exports = t();
}(this, function() {
    return function(e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var i = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
        }
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            });
        }, r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, r.t = function(e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for(var i in e)r.d(n, i, (function(t) {
                return e[t];
            }).bind(null, i));
            return n;
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return r.d(t, "a", t), t;
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, r.p = "", r(r.s = 90);
    }({
        17: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n = r(18), i = function() {
                function e() {}
                return e.getFirstMatch = function(e, t) {
                    var r = t.match(e);
                    return r && r.length > 0 && r[1] || "";
                }, e.getSecondMatch = function(e, t) {
                    var r = t.match(e);
                    return r && r.length > 1 && r[2] || "";
                }, e.matchAndReturnConst = function(e, t, r) {
                    if (e.test(t)) return r;
                }, e.getWindowsVersionName = function(e) {
                    switch(e){
                        case "NT":
                            return "NT";
                        case "XP":
                            return "XP";
                        case "NT 5.0":
                            return "2000";
                        case "NT 5.1":
                            return "XP";
                        case "NT 5.2":
                            return "2003";
                        case "NT 6.0":
                            return "Vista";
                        case "NT 6.1":
                            return "7";
                        case "NT 6.2":
                            return "8";
                        case "NT 6.3":
                            return "8.1";
                        case "NT 10.0":
                            return "10";
                        default:
                            return;
                    }
                }, e.getMacOSVersionName = function(e) {
                    var t = e.split(".").splice(0, 2).map(function(e) {
                        return parseInt(e, 10) || 0;
                    });
                    if (t.push(0), 10 === t[0]) switch(t[1]){
                        case 5:
                            return "Leopard";
                        case 6:
                            return "Snow Leopard";
                        case 7:
                            return "Lion";
                        case 8:
                            return "Mountain Lion";
                        case 9:
                            return "Mavericks";
                        case 10:
                            return "Yosemite";
                        case 11:
                            return "El Capitan";
                        case 12:
                            return "Sierra";
                        case 13:
                            return "High Sierra";
                        case 14:
                            return "Mojave";
                        case 15:
                            return "Catalina";
                        default:
                            return;
                    }
                }, e.getAndroidVersionName = function(e) {
                    var t = e.split(".").splice(0, 2).map(function(e) {
                        return parseInt(e, 10) || 0;
                    });
                    if (t.push(0), !(1 === t[0] && t[1] < 5)) return 1 === t[0] && t[1] < 6 ? "Cupcake" : 1 === t[0] && t[1] >= 6 ? "Donut" : 2 === t[0] && t[1] < 2 ? "Eclair" : 2 === t[0] && 2 === t[1] ? "Froyo" : 2 === t[0] && t[1] > 2 ? "Gingerbread" : 3 === t[0] ? "Honeycomb" : 4 === t[0] && t[1] < 1 ? "Ice Cream Sandwich" : 4 === t[0] && t[1] < 4 ? "Jelly Bean" : 4 === t[0] && t[1] >= 4 ? "KitKat" : 5 === t[0] ? "Lollipop" : 6 === t[0] ? "Marshmallow" : 7 === t[0] ? "Nougat" : 8 === t[0] ? "Oreo" : 9 === t[0] ? "Pie" : void 0;
                }, e.getVersionPrecision = function(e) {
                    return e.split(".").length;
                }, e.compareVersions = function(t, r, n) {
                    void 0 === n && (n = !1);
                    var i = e.getVersionPrecision(t), s = e.getVersionPrecision(r), a = Math.max(i, s), o = 0, u = e.map([
                        t,
                        r
                    ], function(t) {
                        var r = a - e.getVersionPrecision(t), n = t + new Array(r + 1).join(".0");
                        return e.map(n.split("."), function(e) {
                            return new Array(20 - e.length).join("0") + e;
                        }).reverse();
                    });
                    for(n && (o = a - Math.min(i, s)), a -= 1; a >= o;){
                        if (u[0][a] > u[1][a]) return 1;
                        if (u[0][a] === u[1][a]) {
                            if (a === o) return 0;
                            a -= 1;
                        } else if (u[0][a] < u[1][a]) return -1;
                    }
                }, e.map = function(e, t) {
                    var r, n = [];
                    if (Array.prototype.map) return Array.prototype.map.call(e, t);
                    for(r = 0; r < e.length; r += 1)n.push(t(e[r]));
                    return n;
                }, e.find = function(e, t) {
                    var r, n;
                    if (Array.prototype.find) return Array.prototype.find.call(e, t);
                    for(r = 0, n = e.length; r < n; r += 1){
                        var i = e[r];
                        if (t(i, r)) return i;
                    }
                }, e.assign = function(e) {
                    for(var t, r, n = e, i = arguments.length, s = new Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++)s[a - 1] = arguments[a];
                    if (Object.assign) return Object.assign.apply(Object, [
                        e
                    ].concat(s));
                    var o = function() {
                        var e = s[t];
                        "object" == typeof e && null !== e && Object.keys(e).forEach(function(t) {
                            n[t] = e[t];
                        });
                    };
                    for(t = 0, r = s.length; t < r; t += 1)o();
                    return e;
                }, e.getBrowserAlias = function(e) {
                    return n.BROWSER_ALIASES_MAP[e];
                }, e.getBrowserTypeByAlias = function(e) {
                    return n.BROWSER_MAP[e] || "";
                }, e;
            }();
            t.default = i, e.exports = t.default;
        },
        18: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.ENGINE_MAP = t.OS_MAP = t.PLATFORMS_MAP = t.BROWSER_MAP = t.BROWSER_ALIASES_MAP = void 0;
            t.BROWSER_ALIASES_MAP = {
                "Amazon Silk": "amazon_silk",
                "Android Browser": "android",
                Bada: "bada",
                BlackBerry: "blackberry",
                Chrome: "chrome",
                Chromium: "chromium",
                Electron: "electron",
                Epiphany: "epiphany",
                Firefox: "firefox",
                Focus: "focus",
                Generic: "generic",
                "Google Search": "google_search",
                Googlebot: "googlebot",
                "Internet Explorer": "ie",
                "K-Meleon": "k_meleon",
                Maxthon: "maxthon",
                "Microsoft Edge": "edge",
                "MZ Browser": "mz",
                "NAVER Whale Browser": "naver",
                Opera: "opera",
                "Opera Coast": "opera_coast",
                PhantomJS: "phantomjs",
                Puffin: "puffin",
                QupZilla: "qupzilla",
                QQ: "qq",
                QQLite: "qqlite",
                Safari: "safari",
                Sailfish: "sailfish",
                "Samsung Internet for Android": "samsung_internet",
                SeaMonkey: "seamonkey",
                Sleipnir: "sleipnir",
                Swing: "swing",
                Tizen: "tizen",
                "UC Browser": "uc",
                Vivaldi: "vivaldi",
                "WebOS Browser": "webos",
                WeChat: "wechat",
                "Yandex Browser": "yandex",
                Roku: "roku"
            };
            t.BROWSER_MAP = {
                amazon_silk: "Amazon Silk",
                android: "Android Browser",
                bada: "Bada",
                blackberry: "BlackBerry",
                chrome: "Chrome",
                chromium: "Chromium",
                electron: "Electron",
                epiphany: "Epiphany",
                firefox: "Firefox",
                focus: "Focus",
                generic: "Generic",
                googlebot: "Googlebot",
                google_search: "Google Search",
                ie: "Internet Explorer",
                k_meleon: "K-Meleon",
                maxthon: "Maxthon",
                edge: "Microsoft Edge",
                mz: "MZ Browser",
                naver: "NAVER Whale Browser",
                opera: "Opera",
                opera_coast: "Opera Coast",
                phantomjs: "PhantomJS",
                puffin: "Puffin",
                qupzilla: "QupZilla",
                qq: "QQ Browser",
                qqlite: "QQ Browser Lite",
                safari: "Safari",
                sailfish: "Sailfish",
                samsung_internet: "Samsung Internet for Android",
                seamonkey: "SeaMonkey",
                sleipnir: "Sleipnir",
                swing: "Swing",
                tizen: "Tizen",
                uc: "UC Browser",
                vivaldi: "Vivaldi",
                webos: "WebOS Browser",
                wechat: "WeChat",
                yandex: "Yandex Browser"
            };
            t.PLATFORMS_MAP = {
                tablet: "tablet",
                mobile: "mobile",
                desktop: "desktop",
                tv: "tv"
            };
            t.OS_MAP = {
                WindowsPhone: "Windows Phone",
                Windows: "Windows",
                MacOS: "macOS",
                iOS: "iOS",
                Android: "Android",
                WebOS: "WebOS",
                BlackBerry: "BlackBerry",
                Bada: "Bada",
                Tizen: "Tizen",
                Linux: "Linux",
                ChromeOS: "Chrome OS",
                PlayStation4: "PlayStation 4",
                Roku: "Roku"
            };
            t.ENGINE_MAP = {
                EdgeHTML: "EdgeHTML",
                Blink: "Blink",
                Trident: "Trident",
                Presto: "Presto",
                Gecko: "Gecko",
                WebKit: "WebKit"
            };
        },
        90: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(91)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            function a(e, t) {
                for(var r = 0; r < t.length; r++){
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
                }
            }
            var o = function() {
                function e() {}
                var t, r, n;
                return e.getParser = function(e, t) {
                    if (void 0 === t && (t = !1), "string" != typeof e) throw new Error("UserAgent should be a string");
                    return new i.default(e, t);
                }, e.parse = function(e) {
                    return new i.default(e).getResult();
                }, t = e, n = [
                    {
                        key: "BROWSER_MAP",
                        get: function() {
                            return s.BROWSER_MAP;
                        }
                    },
                    {
                        key: "ENGINE_MAP",
                        get: function() {
                            return s.ENGINE_MAP;
                        }
                    },
                    {
                        key: "OS_MAP",
                        get: function() {
                            return s.OS_MAP;
                        }
                    },
                    {
                        key: "PLATFORMS_MAP",
                        get: function() {
                            return s.PLATFORMS_MAP;
                        }
                    }
                ], r = null, n && a(t, n), e;
            }();
            t.default = o, e.exports = t.default;
        },
        91: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n = u(r(92)), i = u(r(93)), s = u(r(94)), a = u(r(95)), o = u(r(17));
            function u(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var d = function() {
                function e(e, t) {
                    if (void 0 === t && (t = !1), null == e || "" === e) throw new Error("UserAgent parameter can't be empty");
                    this._ua = e, this.parsedResult = {}, !0 !== t && this.parse();
                }
                var t = e.prototype;
                return t.getUA = function() {
                    return this._ua;
                }, t.test = function(e) {
                    return e.test(this._ua);
                }, t.parseBrowser = function() {
                    var e = this;
                    this.parsedResult.browser = {};
                    var t = o.default.find(n.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser;
                }, t.getBrowser = function() {
                    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
                }, t.getBrowserName = function(e) {
                    return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
                }, t.getBrowserVersion = function() {
                    return this.getBrowser().version;
                }, t.getOS = function() {
                    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
                }, t.parseOS = function() {
                    var e = this;
                    this.parsedResult.os = {};
                    var t = o.default.find(i.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os;
                }, t.getOSName = function(e) {
                    var t = this.getOS().name;
                    return e ? String(t).toLowerCase() || "" : t || "";
                }, t.getOSVersion = function() {
                    return this.getOS().version;
                }, t.getPlatform = function() {
                    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
                }, t.getPlatformType = function(e) {
                    void 0 === e && (e = !1);
                    var t = this.getPlatform().type;
                    return e ? String(t).toLowerCase() || "" : t || "";
                }, t.parsePlatform = function() {
                    var e = this;
                    this.parsedResult.platform = {};
                    var t = o.default.find(s.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform;
                }, t.getEngine = function() {
                    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
                }, t.getEngineName = function(e) {
                    return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
                }, t.parseEngine = function() {
                    var e = this;
                    this.parsedResult.engine = {};
                    var t = o.default.find(a.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine;
                }, t.parse = function() {
                    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
                }, t.getResult = function() {
                    return o.default.assign({}, this.parsedResult);
                }, t.satisfies = function(e) {
                    var t = this, r = {}, n = 0, i = {}, s = 0;
                    if (Object.keys(e).forEach(function(t) {
                        var a = e[t];
                        "string" == typeof a ? (i[t] = a, s += 1) : "object" == typeof a && (r[t] = a, n += 1);
                    }), n > 0) {
                        var a = Object.keys(r), u = o.default.find(a, function(e) {
                            return t.isOS(e);
                        });
                        if (u) {
                            var d = this.satisfies(r[u]);
                            if (void 0 !== d) return d;
                        }
                        var c = o.default.find(a, function(e) {
                            return t.isPlatform(e);
                        });
                        if (c) {
                            var f = this.satisfies(r[c]);
                            if (void 0 !== f) return f;
                        }
                    }
                    if (s > 0) {
                        var l = Object.keys(i), h = o.default.find(l, function(e) {
                            return t.isBrowser(e, !0);
                        });
                        if (void 0 !== h) return this.compareVersion(i[h]);
                    }
                }, t.isBrowser = function(e, t) {
                    void 0 === t && (t = !1);
                    var r = this.getBrowserName().toLowerCase(), n = e.toLowerCase(), i = o.default.getBrowserTypeByAlias(n);
                    return t && i && (n = i.toLowerCase()), n === r;
                }, t.compareVersion = function(e) {
                    var t = [
                        0
                    ], r = e, n = !1, i = this.getBrowserVersion();
                    if ("string" == typeof i) return ">" === e[0] || "<" === e[0] ? (r = e.substr(1), "=" === e[1] ? (n = !0, r = e.substr(2)) : t = [], ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? r = e.substr(1) : "~" === e[0] && (n = !0, r = e.substr(1)), t.indexOf(o.default.compareVersions(i, r, n)) > -1;
                }, t.isOS = function(e) {
                    return this.getOSName(!0) === String(e).toLowerCase();
                }, t.isPlatform = function(e) {
                    return this.getPlatformType(!0) === String(e).toLowerCase();
                }, t.isEngine = function(e) {
                    return this.getEngineName(!0) === String(e).toLowerCase();
                }, t.is = function(e, t) {
                    return void 0 === t && (t = !1), this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e);
                }, t.some = function(e) {
                    var t = this;
                    return void 0 === e && (e = []), e.some(function(e) {
                        return t.is(e);
                    });
                }, e;
            }();
            t.default = d, e.exports = t.default;
        },
        92: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            };
            var s = /version\/(\d+(\.?_?\d+)+)/i, a = [
                {
                    test: [
                        /googlebot/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Googlebot"
                        }, r = i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /opera/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /opr\/|opios/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera"
                        }, r = i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /SamsungBrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Samsung Internet for Android"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /Whale/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "NAVER Whale Browser"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /MZBrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "MZ Browser"
                        }, r = i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /focus/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Focus"
                        }, r = i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /swing/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Swing"
                        }, r = i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /coast/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera Coast"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /opt\/\d+(?:.?_?\d+)+/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera Touch"
                        }, r = i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /yabrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Yandex Browser"
                        }, r = i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /ucbrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "UC Browser"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /Maxthon|mxios/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Maxthon"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /epiphany/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Epiphany"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /puffin/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Puffin"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /sleipnir/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Sleipnir"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /k-meleon/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "K-Meleon"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /micromessenger/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "WeChat"
                        }, r = i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /qqbrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
                        }, r = i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /msie|trident/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Internet Explorer"
                        }, r = i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /\sedg\//i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Microsoft Edge"
                        }, r = i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /edg([ea]|ios)/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Microsoft Edge"
                        }, r = i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /vivaldi/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Vivaldi"
                        }, r = i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /seamonkey/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "SeaMonkey"
                        }, r = i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /sailfish/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Sailfish"
                        }, r = i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /silk/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Amazon Silk"
                        }, r = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /phantom/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "PhantomJS"
                        }, r = i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /slimerjs/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "SlimerJS"
                        }, r = i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /blackberry|\bbb\d+/i,
                        /rim\stablet/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "BlackBerry"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /(web|hpw)[o0]s/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "WebOS Browser"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /bada/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Bada"
                        }, r = i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /tizen/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Tizen"
                        }, r = i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /qupzilla/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "QupZilla"
                        }, r = i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /firefox|iceweasel|fxios/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Firefox"
                        }, r = i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /electron/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Electron"
                        }, r = i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /MiuiBrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Miui"
                        }, r = i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /chromium/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Chromium"
                        }, r = i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /chrome|crios|crmo/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Chrome"
                        }, r = i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /GSA/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Google Search"
                        }, r = i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: function(e) {
                        var t = !e.test(/like android/i), r = e.test(/android/i);
                        return t && r;
                    },
                    describe: function(e) {
                        var t = {
                            name: "Android Browser"
                        }, r = i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /playstation 4/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "PlayStation 4"
                        }, r = i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /safari|applewebkit/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Safari"
                        }, r = i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /.*/i
                    ],
                    describe: function(e) {
                        var t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
                        return {
                            name: i.default.getFirstMatch(t, e),
                            version: i.default.getSecondMatch(t, e)
                        };
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        },
        93: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            var a = [
                {
                    test: [
                        /Roku\/DVP/
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
                        return {
                            name: s.OS_MAP.Roku,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /windows phone/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.WindowsPhone,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /windows /i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e), r = i.default.getWindowsVersionName(t);
                        return {
                            name: s.OS_MAP.Windows,
                            version: t,
                            versionName: r
                        };
                    }
                },
                {
                    test: [
                        /Macintosh(.*?) FxiOS(.*?)\//
                    ],
                    describe: function(e) {
                        var t = {
                            name: s.OS_MAP.iOS
                        }, r = i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /macintosh/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."), r = i.default.getMacOSVersionName(t), n = {
                            name: s.OS_MAP.MacOS,
                            version: t
                        };
                        return r && (n.versionName = r), n;
                    }
                },
                {
                    test: [
                        /(ipod|iphone|ipad)/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
                        return {
                            name: s.OS_MAP.iOS,
                            version: t
                        };
                    }
                },
                {
                    test: function(e) {
                        var t = !e.test(/like android/i), r = e.test(/android/i);
                        return t && r;
                    },
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e), r = i.default.getAndroidVersionName(t), n = {
                            name: s.OS_MAP.Android,
                            version: t
                        };
                        return r && (n.versionName = r), n;
                    }
                },
                {
                    test: [
                        /(web|hpw)[o0]s/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e), r = {
                            name: s.OS_MAP.WebOS
                        };
                        return t && t.length && (r.version = t), r;
                    }
                },
                {
                    test: [
                        /blackberry|\bbb\d+/i,
                        /rim\stablet/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || i.default.getFirstMatch(/\bbb(\d+)/i, e);
                        return {
                            name: s.OS_MAP.BlackBerry,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /bada/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.Bada,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /tizen/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.Tizen,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /linux/i
                    ],
                    describe: function() {
                        return {
                            name: s.OS_MAP.Linux
                        };
                    }
                },
                {
                    test: [
                        /CrOS/
                    ],
                    describe: function() {
                        return {
                            name: s.OS_MAP.ChromeOS
                        };
                    }
                },
                {
                    test: [
                        /PlayStation 4/
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.PlayStation4,
                            version: t
                        };
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        },
        94: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            var a = [
                {
                    test: [
                        /googlebot/i
                    ],
                    describe: function() {
                        return {
                            type: "bot",
                            vendor: "Google"
                        };
                    }
                },
                {
                    test: [
                        /huawei/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/(can-l01)/i, e) && "Nova", r = {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Huawei"
                        };
                        return t && (r.model = t), r;
                    }
                },
                {
                    test: [
                        /nexus\s*(?:7|8|9|10).*/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Nexus"
                        };
                    }
                },
                {
                    test: [
                        /ipad/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Apple",
                            model: "iPad"
                        };
                    }
                },
                {
                    test: [
                        /Macintosh(.*?) FxiOS(.*?)\//
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Apple",
                            model: "iPad"
                        };
                    }
                },
                {
                    test: [
                        /kftt build/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Amazon",
                            model: "Kindle Fire HD 7"
                        };
                    }
                },
                {
                    test: [
                        /silk/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Amazon"
                        };
                    }
                },
                {
                    test: [
                        /tablet(?! pc)/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet
                        };
                    }
                },
                {
                    test: function(e) {
                        var t = e.test(/ipod|iphone/i), r = e.test(/like (ipod|iphone)/i);
                        return t && !r;
                    },
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/(ipod|iphone)/i, e);
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Apple",
                            model: t
                        };
                    }
                },
                {
                    test: [
                        /nexus\s*[0-6].*/i,
                        /galaxy nexus/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Nexus"
                        };
                    }
                },
                {
                    test: [
                        /[^-]mobi/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile
                        };
                    }
                },
                {
                    test: function(e) {
                        return "blackberry" === e.getBrowserName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "BlackBerry"
                        };
                    }
                },
                {
                    test: function(e) {
                        return "bada" === e.getBrowserName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile
                        };
                    }
                },
                {
                    test: function(e) {
                        return "windows phone" === e.getBrowserName();
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Microsoft"
                        };
                    }
                },
                {
                    test: function(e) {
                        var t = Number(String(e.getOSVersion()).split(".")[0]);
                        return "android" === e.getOSName(!0) && t >= 3;
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet
                        };
                    }
                },
                {
                    test: function(e) {
                        return "android" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile
                        };
                    }
                },
                {
                    test: function(e) {
                        return "macos" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.desktop,
                            vendor: "Apple"
                        };
                    }
                },
                {
                    test: function(e) {
                        return "windows" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.desktop
                        };
                    }
                },
                {
                    test: function(e) {
                        return "linux" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.desktop
                        };
                    }
                },
                {
                    test: function(e) {
                        return "playstation 4" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tv
                        };
                    }
                },
                {
                    test: function(e) {
                        return "roku" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tv
                        };
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        },
        95: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            var a = [
                {
                    test: function(e) {
                        return "microsoft edge" === e.getBrowserName(!0);
                    },
                    describe: function(e) {
                        if (/\sedg\//i.test(e)) return {
                            name: s.ENGINE_MAP.Blink
                        };
                        var t = i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
                        return {
                            name: s.ENGINE_MAP.EdgeHTML,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /trident/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.Trident
                        }, r = i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: function(e) {
                        return e.test(/presto/i);
                    },
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.Presto
                        }, r = i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: function(e) {
                        var t = e.test(/gecko/i), r = e.test(/like gecko/i);
                        return t && !r;
                    },
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.Gecko
                        }, r = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /(apple)?webkit\/537\.36/i
                    ],
                    describe: function() {
                        return {
                            name: s.ENGINE_MAP.Blink
                        };
                    }
                },
                {
                    test: [
                        /(apple)?webkit/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.WebKit
                        }, r = i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        }
    });
});

},{}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["2UeK4","bB7Pu"], "bB7Pu", "parcelRequire0cc3")

//# sourceMappingURL=index.3d214d75.js.map
