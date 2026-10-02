import React, { useState } from 'react';
import { PredictionGauge } from '../components/explainability/PredictionGauge';
import {
  ShapWaterfall,
  ShapFactor,
} from '../components/explainability/ShapWaterfall';
import { MitigationPlaybook } from '../components/explainability/MitigationPlaybook';
import { Button } from '../components/common/Button';
import { ArrowLeft, Cpu, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

export const Explainability: React.FC = () => {
  const navigate = useNavigate();

  const [shapFactors] = useState<ShapFactor[]>([
    {
      feature: 'Request Query Payload',
      value: "SELECT * FROM users WHERE '1'='1'",
      impact: 0.421,
      description:
        'High presence of raw SQL keywords inside authentication query parameter.',
    },
    {
      feature: 'Failed Auth Rate',
      value: '48 req/min',
      impact: 0.285,
      description:
        'Exceeds standard human authentication frequency by 12x threshold.',
    },
    {
      feature: 'HTTP Status Code',
      value: 500,
      impact: 0.112,
      description:
        'Server side database execution error triggered by malformed syntax.',
    },
    {
      feature: 'User Agent Signature',
      value: 'sqlmap/1.6#stable',
      impact: 0.089,
      description:
        'Known automated vulnerability scanning tool signature detected.',
    },
    {
      feature: 'Internal Network CIDR',
      value: '192.168.1.0/24',
      impact: -0.045,
      description:
        'Request originated within internal subnetwork reducing external risk factor slightly.',
    },
  ]);

  const [remediationSteps] = useState([
    {
      id: 'step-1',
      action: 'Block Source IP in Perimeter Firewall Rule',
      command: 'iptables -A INPUT -s 192.168.1.105 -j DROP',
      category: 'AUTOMATED' as const,
    },
    {
      id: 'step-2',
      action: 'Invalidate Active Web Application User Sessions',
      command:
        'redis-cli EVAL "return redis.call(\'del\', unpack(redis.call(\'keys\', \'session:192.168.1.105:*\')))" 0',
      category: 'AUTOMATED' as const,
    },
    {
      id: 'step-3',
      action: 'Trigger Parameterized Query Patch in Backend Endpoint',
      category: 'MANUAL' as const,
    },
  ]);

  const exportShapReport = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    // Header
    doc.setFillColor(5, 5, 5);
    doc.rect(0, 0, pageWidth, 32, 'F');

    doc.setTextColor(204, 255, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('CYBERNEX AI', 15, 14);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('ML MODEL DECISION EXPLAINABILITY REPORT', 15, 23);

    // Report metadata
    y = 45;

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('SECURITY ANALYSIS SUMMARY', 15, y);

    y += 9;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    doc.text('Target Event ID: log-101', 15, y);
    doc.text('Source IP: 192.168.1.105', 110, y);

    y += 7;

    doc.text('Model: XGBoost Classifier v2.1', 15, y);
    doc.text('Severity: CRITICAL', 110, y);

    y += 7;

    doc.text('Threat Probability: 94%', 15, y);
    doc.text('Attack Type: SQL Injection Attack', 110, y);

    // Divider
    y += 8;
    doc.setDrawColor(180, 180, 180);
    doc.line(15, y, pageWidth - 15, y);

    // SHAP section
    y += 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('SHAP FEATURE ATTRIBUTION', 15, y);

    y += 9;

    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(
      'Feature contributions explaining the model threat prediction:',
      15,
      y
    );

    y += 10;

    shapFactors.forEach((factor, index) => {
      if (y > pageHeight - 45) {
        doc.addPage();
        y = 20;
      }

      const impactText =
        factor.impact >= 0
          ? `+${factor.impact.toFixed(3)}`
          : factor.impact.toFixed(3);

      doc.setTextColor(25, 25, 25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);

      doc.text(`${index + 1}. ${factor.feature}`, 15, y);

      doc.setFont('helvetica', 'normal');
      doc.text(`Impact: ${impactText}`, 150, y);

      y += 6;

      doc.setTextColor(80, 80, 80);
      doc.setFontSize(9);

      const valueText = `Value: ${String(factor.value)}`;

      doc.text(valueText, 20, y);

      y += 5;

      const descriptionLines = doc.splitTextToSize(
        factor.description,
        pageWidth - 40
      );

      doc.text(descriptionLines, 20, y);

      y += descriptionLines.length * 4 + 8;
    });

    // Mitigation section
    if (y > pageHeight - 70) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(180, 180, 180);
    doc.line(15, y, pageWidth - 15, y);

    y += 12;

    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('AUTOMATED MITIGATION PLAYBOOK', 15, y);

    y += 10;

    remediationSteps.forEach((step, index) => {
      if (y > pageHeight - 50) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);

      doc.text(`${index + 1}. ${step.action}`, 15, y);

      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);

      doc.text(`Category: ${step.category}`, 20, y);

      if (step.command) {
        y += 6;

        const commandLines = doc.splitTextToSize(
          `Command: ${step.command}`,
          pageWidth - 40
        );

        doc.setTextColor(0, 120, 140);
        doc.text(commandLines, 20, y);

        y += commandLines.length * 4;
      }

      y += 8;
    });

    // Footer
    const totalPages = doc.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
      doc.setPage(page);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);

      doc.text(
        'CyberNex AI - Security Analytics Platform',
        15,
        pageHeight - 10
      );

      doc.text(
        `Page ${page} of ${totalPages}`,
        pageWidth - 40,
        pageHeight - 10
      );
    }

    doc.save('CyberNex_SHAP_Report_log-101.pdf');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0B0D] p-4 rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/dashboard')}
          >
            Back
          </Button>

          <div>
            <h1 className="text-xl font-extrabold font-mono text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#00F0FF]" />
              ML MODEL DECISION EXPLAINABILITY
            </h1>

            <p className="text-xs text-gray-400 mt-0.5">
              Target Event ID:{' '}
              <span className="font-mono text-white">log-101</span> • Source
              IP:{' '}
              <span className="font-mono text-[#CCFF00]">
                192.168.1.105
              </span>
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          icon={<Download className="w-3.5 h-3.5" />}
          onClick={exportShapReport}
        >
          Export SHAP Report (PDF)
        </Button>
      </div>

      {/* Top Explanation Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <PredictionGauge
            confidence={0.94}
            predictionLabel="SQL Injection Attack"
            severity="CRITICAL"
            modelName="XGBoost Classifier v2.1"
          />
        </div>

        <div className="lg:col-span-2">
          <ShapWaterfall
            factors={shapFactors}
            baseValue={0.05}
            outputValue={0.94}
          />
        </div>
      </div>

      {/* Playbook Section */}
      <MitigationPlaybook
        attackType="SQL Injection Attack"
        steps={remediationSteps}
        onExecuteRemediation={(id) =>
          alert(`Executing automated playbook step: ${id}`)
        }
      />
    </div>
  );
};