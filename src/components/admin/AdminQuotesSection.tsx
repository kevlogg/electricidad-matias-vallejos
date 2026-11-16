'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Plus,
  Trash2,
  Share2,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  Copy,
  Zap,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { ClientItem } from '@/app/api/admin/clients/route';

interface QuoteItem {
  id: string;
  description: string;
  type: 'Mano de Obra' | 'Material IRAM';
  quantity: number;
  unitPrice: number;
}

interface AdminQuotesSectionProps {
  initialClient?: ClientItem | null;
}

export const AdminQuotesSection: React.FC<AdminQuotesSectionProps> = ({
  initialClient,
}) => {
  // Quote header data
  const [quoteNumber, setQuoteNumber] = useState('MV-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [validityDays, setValidityDays] = useState(15);

  // Client Data
  const [clientName, setClientName] = useState(initialClient?.name || 'Mariano Benítez');
  const [clientPhone, setClientPhone] = useState(initialClient?.phone || '+5492235123456');
  const [clientAddress, setClientAddress] = useState(initialClient?.address || 'Güemes 2840, Piso 4 B');
  const [clientLocality, setClientLocality] = useState(initialClient?.locality || 'Mar del Plata');

  // Items
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: '1',
      description: 'Mano de obra: Desmonte y armado de tablero seccional nuevo con peinado prolijo',
      type: 'Mano de Obra',
      quantity: 1,
      unitPrice: 45000,
    },
    {
      id: '2',
      description: 'Disyuntor diferencial bipolar 25A 30mA norma IRAM (Schneider / Siemens)',
      type: 'Material IRAM',
      quantity: 1,
      unitPrice: 32000,
    },
    {
      id: '3',
      description: 'Termomagnéticas bipolares curva C 16A y 20A normalizadas',
      type: 'Material IRAM',
      quantity: 3,
      unitPrice: 8500,
    },
    {
      id: '4',
      description: 'Protector automático de sobre y baja tensión digital programable',
      type: 'Material IRAM',
      quantity: 1,
      unitPrice: 28000,
    },
  ]);

  const [discountPct, setDiscountPct] = useState<number>(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  // Quick preset templates
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'urgencia':
        setItems([
          {
            id: '1',
            description: 'Guardia de Urgencia: Diagnóstico y detección de falla/cortocircuito en el día con instrumental True RMS',
            type: 'Mano de Obra',
            quantity: 1,
            unitPrice: 30000,
          },
          {
            id: '2',
            description: 'Reparación de línea afectada, saneamiento de fuga y recambio de componentes dañados',
            type: 'Mano de Obra',
            quantity: 1,
            unitPrice: 22000,
          },
        ]);
        break;

      case 'aire':
        setItems([
          {
            id: '1',
            description: 'Mano de obra: Tendido de cañería y cableado de línea exclusiva para Aire Acondicionado hasta tablero',
            type: 'Mano de Obra',
            quantity: 1,
            unitPrice: 38000,
          },
          {
            id: '2',
            description: 'Conductor unipolar de cobre ignífugo 2.5mm² IRAM NM 247-3 (Fase, Neutro y P.A.T.)',
            type: 'Material IRAM',
            quantity: 25,
            unitPrice: 1200,
          },
          {
            id: '3',
            description: 'Llave termomagnética bipolar 16A + toma reforzado de 20A para unidad interior',
            type: 'Material IRAM',
            quantity: 1,
            unitPrice: 14500,
          },
        ]);
        break;

      case 'pat':
        setItems([
          {
            id: '1',
            description: 'Instalación y clavado de jabalina de puesta a tierra con caja de inspección normalizada',
            type: 'Mano de Obra',
            quantity: 1,
            unitPrice: 35000,
          },
          {
            id: '2',
            description: 'Jabalina cobreada IRAM 2309 1.5m 5/8" con tomacable de bronce',
            type: 'Material IRAM',
            quantity: 1,
            unitPrice: 26000,
          },
          {
            id: '3',
            description: 'Conductor verde-amarillo de 10mm² y medición de resistencia con telurímetro (< 5 Ohms)',
            type: 'Material IRAM',
            quantity: 1,
            unitPrice: 18000,
          },
        ]);
        break;

      default:
        break;
    }
  };

  const addItem = () => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      description: '',
      type: 'Mano de Obra',
      quantity: 1,
      unitPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const subtotal = items.reduce(
    (acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0
  );
  const discountAmount = (subtotal * (Number(discountPct) || 0)) / 100;
  const total = subtotal - discountAmount;

  // Generate PDF with jsPDF
  const generatePDF = () => {
    try {
      setIsGeneratingPdf(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      let y = 15;

      // Dark header banner
      doc.setFillColor(11, 11, 12); // #0B0B0C
      doc.rect(0, 0, pageWidth, 42, 'F');

      // Accent yellow line
      doc.setFillColor(255, 230, 0); // #FFE600
      doc.rect(0, 42, pageWidth, 2.5, 'F');

      // Header Brand
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('MV ELECTRICIDAD', 14, 18);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(255, 230, 0);
      doc.text('MATÍAS VALLEJOS • SERVICIO ELÉCTRICO PROFESIONAL', 14, 24);

      doc.setTextColor(161, 161, 170); // #A1A1AA
      doc.setFontSize(8);
      doc.text('Mar del Plata • Batán • Miramar • Santa Clara del Mar • Mar de Cobo', 14, 30);
      doc.text('Tel / Urgencias WhatsApp: +54 9 223 682-1209  |  contacto@mvelectricidad.com.ar', 14, 35);

      // Quote badge on top right
      doc.setTextColor(255, 230, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('PRESUPUESTO FORMAL', pageWidth - 14, 18, { align: 'right' });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`N°: ${quoteNumber}`, pageWidth - 14, 25, { align: 'right' });
      doc.setTextColor(161, 161, 170);
      doc.setFontSize(8);
      doc.text(`Fecha: ${date}`, pageWidth - 14, 31, { align: 'right' });
      doc.text(`Validez: ${validityDays} días`, pageWidth - 14, 36, { align: 'right' });

      y = 52;

      // Client Box
      doc.setFillColor(245, 245, 247);
      doc.setDrawColor(220, 220, 225);
      doc.roundedRect(14, y, pageWidth - 28, 24, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 30, 35);
      doc.text('DATOS DEL CLIENTE', 18, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`Cliente: ${clientName}`, 18, y + 12);
      doc.text(`Teléfono: ${clientPhone}`, 18, y + 18);

      doc.text(`Dirección: ${clientAddress}`, 110, y + 12);
      doc.text(`Localidad: ${clientLocality}`, 110, y + 18);

      y += 32;

      // Table Header
      doc.setFillColor(20, 20, 22);
      doc.rect(14, y, pageWidth - 28, 7.5, 'F');

      doc.setTextColor(255, 230, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('DESCRIPCIÓN DEL TRABAJO / MATERIAL', 18, y + 5);
      doc.text('TIPO', 118, y + 5);
      doc.text('CANT.', 143, y + 5);
      doc.text('P. UNITARIO', 160, y + 5);
      doc.text('SUBTOTAL', pageWidth - 18, y + 5, { align: 'right' });

      y += 8;

      // Items Rows
      items.forEach((item, index) => {
        const itemSubtotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
        const rowBg = index % 2 === 0 ? 255 : 248;
        doc.setFillColor(rowBg, rowBg, rowBg);
        doc.setDrawColor(230, 230, 235);
        doc.rect(14, y, pageWidth - 28, 9, 'FD');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(30, 30, 35);

        // Truncate description if too long
        const descText = item.description || 'Ítem sin descripción';
        const truncatedDesc = descText.length > 58 ? descText.substring(0, 56) + '...' : descText;
        doc.text(truncatedDesc, 18, y + 5.5);

        doc.setFontSize(7.5);
        doc.setTextColor(100, 100, 110);
        doc.text(item.type, 118, y + 5.5);

        doc.setFontSize(8);
        doc.setTextColor(30, 30, 35);
        doc.text(String(item.quantity), 147, y + 5.5, { align: 'center' });
        doc.text(`$ ${item.unitPrice.toLocaleString('es-AR')}`, 160, y + 5.5);
        doc.setFont('helvetica', 'bold');
        doc.text(`$ ${itemSubtotal.toLocaleString('es-AR')}`, pageWidth - 18, y + 5.5, {
          align: 'right',
        });

        y += 9;
      });

      y += 4;

      // Summary Block (Right Aligned)
      const summaryX = 125;
      const summaryWidth = pageWidth - 14 - summaryX;

      doc.setFillColor(245, 245, 248);
      doc.setDrawColor(220, 220, 225);
      doc.roundedRect(summaryX, y, summaryWidth, 24, 2, 2, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(70, 70, 80);
      doc.text('Subtotal:', summaryX + 4, y + 6);
      doc.text(`$ ${subtotal.toLocaleString('es-AR')}`, pageWidth - 18, y + 6, {
        align: 'right',
      });

      if (discountPct > 0) {
        doc.text(`Bonificación (${discountPct}%):`, summaryX + 4, y + 12);
        doc.setTextColor(180, 50, 50);
        doc.text(`- $ ${discountAmount.toLocaleString('es-AR')}`, pageWidth - 18, y + 12, {
          align: 'right',
        });
      }

      // Total Final
      doc.setFillColor(11, 11, 12);
      doc.roundedRect(summaryX, y + 14, summaryWidth, 10, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(255, 230, 0);
      doc.text('TOTAL:', summaryX + 4, y + 21);
      doc.text(`$ ${total.toLocaleString('es-AR')}`, pageWidth - 18, y + 21, {
        align: 'right',
      });

      y += 32;

      // Terms & Conditions Block
      doc.setFillColor(250, 250, 252);
      doc.setDrawColor(230, 230, 235);
      doc.roundedRect(14, y, pageWidth - 28, 30, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(30, 30, 35);
      doc.text('CONDICIONES DE CONTRATACIÓN Y NORMAS TÉCNICAS:', 18, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(80, 80, 90);
      doc.text('1. Cumplimiento riguroso de normas de seguridad AEA 90364 y materiales certificados con sello IRAM.', 18, y + 12);
      doc.text('2. Todos los trabajos cuentan con garantía escrita de 6 meses sobre mano de obra ejecutada.', 18, y + 17);
      doc.text(`3. Presupuesto válido por ${validityDays} días corridos. Medios de pago: Efectivo, Transferencia Bancaria y Mercado Pago.`, 18, y + 22);
      doc.text('4. Pruebas de funcionamiento y medición True RMS incluidas antes de dar por finalizada la obra.', 18, y + 27);

      y += 38;

      // Signature Block
      doc.setDrawColor(180, 180, 185);
      doc.line(25, y + 10, 85, y + 10);
      doc.line(pageWidth - 85, y + 10, pageWidth - 25, y + 10);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(30, 30, 35);
      doc.text('Matías Vallejos', 55, y + 15, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(110, 110, 120);
      doc.text('Técnico Electricista Profesional', 55, y + 19, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(30, 30, 35);
      doc.text('Conformidad del Cliente', pageWidth - 55, y + 15, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(110, 110, 120);
      doc.text('Firma y Aclaración', pageWidth - 55, y + 19, { align: 'center' });

      // Save document
      const fileNameSafe = clientName.replace(/[^a-zA-Z0-9]/g, '_');
      doc.save(`Presupuesto_${quoteNumber}_${fileNameSafe}.pdf`);

      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 4000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Hubo un error al generar el PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const getWhatsAppShareText = () => {
    const itemsList = items
      .map(
        (it) =>
          `• ${it.description} (${it.quantity}x) = $ ${(
            (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0)
          ).toLocaleString('es-AR')}`
      )
      .join('\n');

    return `*PRESUPUESTO FORMAL DE SERVICIO ELÉCTRICO*
*MV Electricidad • Matías Vallejos*
_N°: ${quoteNumber} | Fecha: ${date}_

*Cliente:* ${clientName}
*Dirección:* ${clientAddress} (${clientLocality})

*Detalle de Trabajos y Materiales:*
${itemsList}

*Subtotal:* $ ${subtotal.toLocaleString('es-AR')}
${discountPct > 0 ? `*Bonificación (${discountPct}%):* -$ ${discountAmount.toLocaleString('es-AR')}\n` : ''}*TOTAL A ABONAR:* $ ${total.toLocaleString('es-AR')}

*Condiciones:*
✓ Garantía escrita sobre mano de obra
✓ Materiales normalizados IRAM / AEA
✓ Válido por ${validityDays} días corridos

_Cualquier duda quedo a tu entera disposición para coordinar día y horario._`;
  };

  const handleShareWhatsApp = () => {
    const cleanPhone = clientPhone.replace(/[^0-9]/g, '');
    const url = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(getWhatsAppShareText())}`
      : `https://wa.me/?text=${encodeURIComponent(getWhatsAppShareText())}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#FFE600]" />
            Generador de Presupuestos Formales (PDF)
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Confeccioná presupuestos detallados con membrete oficial, descargalos en PDF o compartilos por WhatsApp.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs sm:text-sm font-bold border border-emerald-500/30 transition-all"
          >
            <Share2 className="w-4 h-4" />
            WhatsApp
          </button>

          <button
            onClick={generatePDF}
            disabled={isGeneratingPdf}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFE600] text-[#0B0B0C] font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,230,0,0.35)] hover:shadow-[0_0_30px_rgba(255,230,0,0.6)] hover:bg-[#FFF04D] transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            {isGeneratingPdf ? 'Generando...' : 'Descargar PDF Formal'}
          </button>
        </div>
      </div>

      {pdfSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡PDF generado y descargado con éxito! Listo para enviar al cliente.</span>
        </div>
      )}

      {/* Quick Presets Bar */}
      <div className="p-4 rounded-2xl bg-[#141416] border border-[#26262A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase text-[#A1A1AA] flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#FFE600]" /> Cargar Plantilla Rápida:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset('urgencia')}
            className="px-3 py-1.5 rounded-lg bg-[#0B0B0C] border border-[#26262A] hover:border-[#FFE600] text-xs font-semibold text-white transition-colors"
          >
            Urgencia / Corto
          </button>
          <button
            onClick={() => applyPreset('aire')}
            className="px-3 py-1.5 rounded-lg bg-[#0B0B0C] border border-[#26262A] hover:border-[#FFE600] text-xs font-semibold text-white transition-colors"
          >
            Línea Aire Acondicionado
          </button>
          <button
            onClick={() => applyPreset('pat')}
            className="px-3 py-1.5 rounded-lg bg-[#0B0B0C] border border-[#26262A] hover:border-[#FFE600] text-xs font-semibold text-white transition-colors"
          >
            Puesta a Tierra (Jabalina)
          </button>
        </div>
      </div>

      {/* Quote & Client Config Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Metadata & Client info */}
        <div className="lg:col-span-12 p-5 rounded-2xl bg-[#141416] border border-[#26262A] space-y-4">
          <h3 className="text-sm font-bold uppercase text-[#FFE600] tracking-wider">
            1. Cabecera y Datos del Cliente
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#A1A1AA] mb-1">
                N° Presupuesto
              </label>
              <input
                type="text"
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs font-mono focus:border-[#FFE600]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#A1A1AA] mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#A1A1AA] mb-1">
                Validez (días)
              </label>
              <input
                type="number"
                value={validityDays}
                onChange={(e) => setValidityDays(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#A1A1AA] mb-1">
                Localidad
              </label>
              <input
                type="text"
                value={clientLocality}
                onChange={(e) => setClientLocality(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#A1A1AA] mb-1">
                Nombre del Cliente
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#A1A1AA] mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#A1A1AA] mb-1">
                Dirección / Inmueble
              </label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
              />
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="lg:col-span-12 p-5 rounded-2xl bg-[#141416] border border-[#26262A] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase text-[#FFE600] tracking-wider">
              2. Detalle de Trabajos y Materiales
            </h3>

            <button
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFE600]/10 text-[#FFE600] hover:bg-[#FFE600]/20 text-xs font-bold border border-[#FFE600]/30 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" /> Agregar Fila
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => {
              const rowTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] flex flex-col md:flex-row items-start md:items-center gap-3"
                >
                  <span className="font-mono text-xs font-bold text-[#71717A] w-6 shrink-0">
                    #{idx + 1}
                  </span>

                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Descripción detallada de la tarea o material..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#141416] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
                    />
                  </div>

                  <div className="w-full md:w-36 shrink-0">
                    <select
                      value={item.type}
                      onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#141416] border border-[#26262A] text-white text-xs focus:border-[#FFE600]"
                    >
                      <option value="Mano de Obra">Mano de Obra</option>
                      <option value="Material IRAM">Material IRAM</option>
                    </select>
                  </div>

                  <div className="w-20 shrink-0">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg bg-[#141416] border border-[#26262A] text-white text-xs text-center font-mono focus:border-[#FFE600]"
                    />
                  </div>

                  <div className="w-32 shrink-0">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                      placeholder="$ Unitario"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#141416] border border-[#26262A] text-white text-xs font-mono text-right focus:border-[#FFE600]"
                    />
                  </div>

                  <div className="w-28 text-right font-mono text-xs font-bold text-[#FFE600] shrink-0">
                    $ {rowTotal.toLocaleString('es-AR')}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-[#71717A] hover:text-red-400 transition-colors shrink-0"
                    title="Eliminar fila"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Totals & Discounts */}
          <div className="pt-4 border-t border-[#26262A] flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#A1A1AA] font-bold uppercase">
                Bonificación / Descuento (%):
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPct}
                onChange={(e) => setDiscountPct(Number(e.target.value))}
                className="w-16 px-2.5 py-1.5 rounded-lg bg-[#0B0B0C] border border-[#26262A] text-white text-xs text-center font-mono focus:border-[#FFE600]"
              />
            </div>

            <div className="text-right space-y-1">
              <div className="text-xs text-[#A1A1AA]">
                Subtotal: <span className="font-mono text-white">$ {subtotal.toLocaleString('es-AR')}</span>
              </div>
              {discountPct > 0 && (
                <div className="text-xs text-red-400">
                  Descuento ({discountPct}%): -${discountAmount.toLocaleString('es-AR')}
                </div>
              )}
              <div className="text-lg sm:text-xl font-heading font-black text-[#FFE600]">
                TOTAL: $ {total.toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
