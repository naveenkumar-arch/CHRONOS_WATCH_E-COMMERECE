# 🎧 Windows Bluetooth & AirPods Diagnostic Tool

[![PowerShell Version](https://img.shields.io/badge/PowerShell-5.1%20%7C%207.x-blue.svg?style=for-the-badge&logo=powershell&logoColor=white)](https://microsoft.com/powershell)
[![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-0078d4.svg?style=for-the-badge&logo=windows&logoColor=white)](https://microsoft.com/windows)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![GitHub PRs](https://img.shields.io/badge/PRs-welcome-orange.svg?style=for-the-badge)](https://github.com/naveenkumar-arch/voice/pulls)

A modern, lightweight, and robust PowerShell command-line diagnostic utility designed to troubleshoot and repair Bluetooth connection issues on Windows systems. Optimized specifically for diagnosing connection issues with **Apple AirPods** and other Bluetooth audio devices.

---

## 🔍 Why This Project?

Windows Bluetooth connectivity—especially when paired with Apple AirPods or other high-fidelity Bluetooth audio equipment—can often be temperamental. Issues typically stem from:
* Stopped or hung system services (e.g., `bthserv`).
* Unresponsive hardware adapters or outdated device registry records.
* Incomplete pairing profiles in the Windows Registry.
* Misconfigured audio routing and default playback endpoints.

This project was built to address these problems by consolidating multiple system-level diagnostics into a **single, dependency-free executable PowerShell script**. It enables recruiters, IT professionals, and power users to diagnose, isolate, and repair Bluetooth anomalies in seconds rather than digging through Windows Device Manager, Services, or Registry Editor manually.

---

## ✨ Features

* **🖥️ System Verification:** Automatically inspects and displays operating system names, build versions, and architecture.
* **⚙️ Service Health Monitoring:** Checks the operational status of core Bluetooth services (`bthserv` and `BluetoothUserService`).
* **🔌 Adapter Diagnostics:** Scans and reports details on active hardware adapters (Intel, Realtek, MediaTek, USB, etc.).
* **🔑 Registry Scan:** Directly queries the Windows Registry (`HKLM:\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices`) to read paired devices and identify MAC addresses.
* **🍎 AirPods/Apple Audio Optimization:** Detects if any AirPods or Apple audio devices are paired and flags them with enhanced visual indicators.
* **🔊 Audio Endpoint Audit:** Verifies active Pnp Media/Audio hardware endpoints to confirm Bluetooth audio profiles are active.
* **🛡️ Smart Privileges Support:** Provides warning recommendations to relaunch as Administrator to enable automated service restarts.

---

## 🛠️ Tech Stack & Architecture

| Technology / API | Purpose | Benefits |
| :--- | :--- | :--- |
| **PowerShell Core / Desktop** | Execution environment | Built-in, high performance, cross-version compatibility. |
| **CIM/WMI (Win32_OperatingSystem)** | System queries | Lightweight querying of operating system parameters. |
| **PnpDevice APIs (`Get-PnpDevice`)** | Hardware audits | Interfaces directly with Windows Device Manager APIs. |
| **Windows Registry Integration** | Paired device discovery | Queries binary registry keys to convert bytes to UTF-8 friendly names. |

---

## 🚀 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/naveenkumar-arch/voice.git
   cd voice
   ```

2. **Adjust Execution Policy (if needed):**
   PowerShell restricts script execution by default. To allow execution for the current session:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
   ```

---

## 💻 Usage

For a basic diagnostic audit, simply execute the script:
```powershell
.\BluetoothTroubleshooter.ps1
```

### Run as Administrator (Recommended)
For full diagnostic resolution and service restarts, run PowerShell as **Administrator** and execute:
```powershell
.\BluetoothTroubleshooter.ps1
```

### 📋 Diagnostic Run Breakdown

<details>
<summary><b>Click to expand typical diagnostic console output</b></summary>

```text
=========================================================
    Windows Bluetooth & AirPods Diagnostic Tool
=========================================================

[1] Checking System Information...
  - Operating System: Microsoft Windows 11 Pro
  - Windows Version:  10.0.22631

[2] Checking Bluetooth Services...
  - Bluetooth Support Service (bthserv): Running
  - Bluetooth User Support Service_12345 (BluetoothUserService_12345): Running

[3] Checking Bluetooth Adapter...
  - Found Adapter: Intel(R) Wireless Bluetooth(R)
    Instance ID:   USB\VID_8087&PID_0026\5&2C6D1F1C&0&10
    Status:        OK

[4] Scanning Paired Bluetooth Devices...
  - Paired Device: Naveen's AirPods Pro (MAC: 2811a5b892c4)
  - Paired Device: MX Master 3S (MAC: e0c4f8d22384)

[5] Checking Audio Output Devices...
  - Active Audio Device: AirPods Pro Hands-Free AG Audio
  - Active Audio Device: AirPods Pro Stereo

=========================================================
  Diagnostic complete! Run as Administrator to unlock service restarts.
=========================================================
```
</details>

---

## 📁 Project Structure

```text
voice/
│
├── BluetoothTroubleshooter.ps1   # Core PowerShell diagnostic script
└── README.md                     # Project documentation & information
```

---

## 🖼️ Screenshots & Demos

| Terminal Interface | AirPods Active Connection State |
| :---: | :---: |
| ![Diagnostic Audit Demo](https://placehold.co/600x300/1e1e2e/cdd6f4?text=Terminal+Diagnostic+Output) | ![AirPods Connected Status](https://placehold.co/600x300/1e1e2e/cdd6f4?text=AirPods+Bluetooth+Status) |

---

## 🧠 Learning Outcomes

Developing this system provided deep hands-on experience with:
1. **Windows PNP Device Management:** Querying hardware information programmatically using Device Manager API layers within PowerShell.
2. **Registry Byte-Parsing:** Decoding UTF8 string values stored as binary arrays inside system registry paths.
3. **PowerShell Service Lifecycle APIs:** Tracking service dependencies and learning self-healing recovery commands in automated diagnostic runs.

---

## 🔮 Future Enhancements

* 🚀 **Automatic Device Re-pairing:** Implement automated removal and re-pairing functions via PowerShell commands.
* 🖥️ **GUI Interface:** Add a lightweight WPF (Windows Presentation Foundation) desktop GUI wrapper.
* 📊 **Logging & Reporting:** Support exporting diagnostic data directly to `.json` or `.csv` files for IT fleet management.

---

## 🤝 Contributing

Contributions are welcome! If you would like to submit improvements:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Naveen Kumar**
* **GitHub:** [@naveenkumar-arch](https://github.com/naveenkumar-arch)
* **Email:** [7pokemon@gmail.com](mailto:7pokemon@gmail.com)
