# 🛡️ CyberNex AI

### AI-Powered Cyber Threat Intelligence & Security Analytics Platform

CyberNex AI is a modern cybersecurity analytics platform that combines **Artificial Intelligence, Machine Learning, Explainable AI, and security telemetry analysis** to help identify and investigate potential cyber threats.

The platform provides a centralized security command center with threat prediction, log analysis, network visualization, AI-assisted investigation, and SHAP-based explainability.

---

## 🚀 Key Features

- 🛡️ **Cybersecurity Command Center**
- 🤖 **AI/ML Threat Prediction**
- 📊 **Security Analytics Dashboard**
- 🧠 **Explainable AI with SHAP**
- 🌐 **Interactive Network Threat Graph**
- 💬 **AI Security Analyst**
- 📁 **Security Log Analysis**
- 🚨 **Threat Severity Classification**
- 📄 **SHAP PDF Report Generation**
- ⚡ **FastAPI ML Backend**
- 📡 **WebSocket Security Log Streaming**
- 🎨 **Modern Cybersecurity Dark UI**
- 🧪 **Synthetic Cybersecurity Telemetry**
- 🔍 **Threat Investigation Workflow**

---

## 🧠 Machine Learning

CyberNex AI uses an **XGBoost Classifier** to estimate the probability that a telemetry event represents a security threat.

### Model Features

The model analyzes:

- Failed login attempts
- Payload length
- SQL keyword frequency
- Internal IP indicator
- HTTP status code

### Model Output

The prediction API returns:

```text
Threat Probability
Threat Severity
SHAP Feature Contributions