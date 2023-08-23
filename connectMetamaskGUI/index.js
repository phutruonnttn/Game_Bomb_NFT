import MetaMaskOnboarding from "@metamask/onboarding";

const player = document.querySelector(".success-anim");

const onboarding = new MetaMaskOnboarding();
const btn = document.querySelector(".onboard");
const statusText = document.querySelector("h1");
const statusDesc = document.querySelector(".desc");
const loader = document.querySelector(".loader");
const upArrow = document.querySelector(".up");
const confetti = document.querySelector(".confetti");
const headerIdLogin = document.querySelector(".headerIdLogin");
const idLogin = document.querySelector(".idLogin");

const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

let connected = (accounts, bearer) => {
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
  return await ethereum.request({ method: "eth_accounts" });
}

const onClickInstallMetaMask = () => {
  onboarding.startOnboarding();
  loader.style.display = "block";
};

btn.addEventListener("click", async () => {
  btn.style.backgroundColor = "#cccccc";
  loader.style.display = "block";

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    // Prompt user to sign a message
    let time = Math.floor(Date.now() / 1000);
    const message = "BoomBlock Login " + time + "!";
    const accountss = await ethereum.request({
      method: "personal_sign",
      params: [message, ethereum.selectedAddress],
    });

    let bearer = encode(ethereum.selectedAddress, accountss, time);
    console.log("Signed message: ", accountss);
    console.log("Bearer: ", bearer);
    console.log("key: " + "loginId_" + ethereum.selectedAddress)

    localStorage.setItem("loginId_" + ethereum.selectedAddress, bearer);

    connected(accounts, bearer);
  } catch (error) {
    console.error(error);
  }
});

idLogin.addEventListener("click", function () {
  copyToClipboard(idLogin.innerText);
});

function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Đã sao chép thành công!");
}

const MetaMaskClientCheck = () => {
  if (!isMetaMaskInstalled()) {
    statusText.innerText = "You need to Install a Wallet";
    statusDesc.innerText = "We recommend the MetaMask wallet.";
    btn.innerText = "Install MetaMask";
    btn.onclick = onClickInstallMetaMask;
  } else {
    connectWallet().then((accounts) => {
      if (accounts && accounts[0] > 0) {
        let data = localStorage.getItem("loginId_" + ethereum.selectedAddress);
        console.log("key: " + "loginId_" + ethereum.selectedAddress)

        if (data === null) {
          signMessage(accounts);
        } else {
          connected(accounts, data);
        }
      } else {
        statusText.innerHTML = "Connect your wallet";
        statusDesc.innerHTML = "To begin, please connect your MetaMask wallet.";
        btn.innerText = "Connect MetaMask";
        upArrow.style.display = "block";
      }
    });
  }
};

async function signMessage(accounts) {
  // Ensure MetaMask is installed and connected
  if (typeof window.ethereum === "undefined") {
    console.error("MetaMask is not installed.");
    return;
  }

  try {
    // Request user's permission to access their accounts
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Prompt user to sign a message
    let time = Math.floor(Date.now() / 1000);
    const message = "BoomBlock Login " + time + "!";
    const accountss = await window.ethereum.request({
      method: "personal_sign",
      params: [message, window.ethereum.selectedAddress],
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
