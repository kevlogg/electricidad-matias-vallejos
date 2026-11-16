'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  MessageCircle,
} from 'lucide-react';
import { ClientItem } from '@/app/api/admin/clients/route';

interface AdminClientsSectionProps {
  onSelectClientForQuote?: (client: ClientItem) => void;
}

export const AdminClientsSection: React.FC<AdminClientsSectionProps> = ({
  onSelectClientForQuote,
}) => {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New client form state
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    address: '',
    locality: 'Mar del Plata',
    serviceType: 'Urgencias / Cortocircuito',
    status: 'nuevo' as const,
    estimatedAmount: '',
    notes: '',
  });

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name.trim()) return;

    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newClient,
          estimatedAmount: Number(newClient.estimatedAmount) || 0,
        }),
      });

      if (res.ok) {
        setIsAddModalOpen(false);
        setNewClient({
          name: '',
          phone: '',
          address: '',
          locality: 'Mar del Plata',
          serviceType: 'Urgencias / Cortocircuito',
          status: 'nuevo',
          estimatedAmount: '',
          notes: '',
        });
        fetchClients();
      }
    } catch (err) {
      console.error('Error adding client:', err);
    }
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase()) ||
      c.locality.toLowerCase().includes(search.toLowerCase()) ||
      c.serviceType.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'todos' || c.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ClientItem['status']) => {
    switch (status) {
      case 'completado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Completado
          </span>
        );
      case 'en_proceso':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" /> En Proceso
          </span>
        );
      case 'presupuestado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30">
            <FileText className="w-3 h-3" /> Presupuestado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <AlertCircle className="w-3 h-3" /> Nuevo
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#FFE600]" />
            Gestión de Clientes
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Registro y seguimiento de clientes, obras, reparaciones y presupuestos en la costa.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFE600] text-[#0B0B0C] font-extrabold text-sm shadow-[0_0_15px_rgba(255,230,0,0.3)] hover:shadow-[0_0_25px_rgba(255,230,0,0.6)] hover:bg-[#FFF04D] transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Nuevo Cliente
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#141416] border border-[#26262A]">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente, zona o servicio..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-xs sm:text-sm placeholder-[#71717A] focus:outline-none focus:border-[#FFE600]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['todos', 'nuevo', 'presupuestado', 'en_proceso', 'completado'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors shrink-0 ${
                filterStatus === st
                  ? 'bg-[#FFE600] text-[#0B0B0C]'
                  : 'bg-[#0B0B0C] text-[#A1A1AA] hover:text-white border border-[#26262A]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      {loading ? (
        <div className="text-center py-16 text-[#A1A1AA] text-sm">
          Cargando clientes...
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#141416] border border-[#26262A]">
          <p className="text-white font-bold text-base">No se encontraron clientes</p>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Probá ajustando la búsqueda o agregá un nuevo cliente con el botón superior.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="p-5 rounded-2xl bg-[#141416] border border-[#26262A] hover:border-[#FFE600]/50 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      {client.name}
                    </h3>
                    <p className="text-xs text-[#FFE600] font-medium mt-0.5">
                      {client.serviceType}
                    </p>
                  </div>
                  {getStatusBadge(client.status)}
                </div>

                <div className="space-y-1.5 text-xs text-[#A1A1AA] mt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FFE600] shrink-0" />
                    <span>{client.address} • <strong className="text-white">{client.locality}</strong></span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#FFE600] shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#FFE600] shrink-0" />
                    <span>Fecha: {client.date}</span>
                  </div>
                </div>

                {client.notes && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#0B0B0C] border border-[#26262A] text-xs text-[#A1A1AA] italic">
                    &ldquo;{client.notes}&rdquo;
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#26262A] flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-white">
                  {client.estimatedAmount && client.estimatedAmount > 0
                    ? `$ ${client.estimatedAmount.toLocaleString('es-AR')}`
                    : 'Sin cotizar'}
                </span>

                <div className="flex items-center gap-2">
                  {client.phone && (
                    <a
                      href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hola ${client.name}, te escribe Matías Vallejos de MV Electricidad sobre tu trabajo de ${client.serviceType}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  )}

                  {onSelectClientForQuote && (
                    <button
                      onClick={() => onSelectClientForQuote(client)}
                      className="px-3 py-1.5 rounded-lg bg-[#FFE600]/10 text-[#FFE600] hover:bg-[#FFE600]/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> Presupuestar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Agregar Cliente */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#141416] border border-[#26262A] p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#71717A] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-lg font-black text-white mb-1">
              Agregar Nuevo Cliente
            </h3>
            <p className="text-xs text-[#A1A1AA] mb-5">
              Completá los datos del contacto y el requerimiento eléctrico.
            </p>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#A1A1AA] mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Ej: Marcelo Fernández"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-sm focus:outline-none focus:border-[#FFE600]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A1A1AA] mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="+54 9 223..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-sm focus:outline-none focus:border-[#FFE600]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A1A1AA] mb-1.5">
                    Localidad
                  </label>
                  <select
                    value={newClient.locality}
                    onChange={(e) => setNewClient({ ...newClient, locality: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-sm focus:outline-none focus:border-[#FFE600]"
                  >
                    <option value="Mar del Plata">Mar del Plata</option>
                    <option value="Batán">Batán</option>
                    <option value="Miramar">Miramar</option>
                    <option value="Santa Clara del Mar">Santa Clara del Mar</option>
                    <option value="Mar de Cobo">Mar de Cobo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A1A1AA] mb-1.5">
                  Dirección / Barrio
                </label>
                <input
                  type="text"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  placeholder="Ej: Av. Colón 1950, 3ro A"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-sm focus:outline-none focus:border-[#FFE600]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A1A1AA] mb-1.5">
                    Tipo de Trabajo
                  </label>
                  <select
                    value={newClient.serviceType}
                    onChange={(e) => setNewClient({ ...newClient, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-sm focus:outline-none focus:border-[#FFE600]"
                  >
                    <option value="Urgencias / Cortocircuito">Urgencias / Cortocircuito</option>
                    <option value="Tableros y Protecciones">Tableros y Protecciones</option>
                    <option value="Instalaciones Nuevas / Obra">Instalaciones Nuevas / Obra</option>
                    <option value="Iluminación LED">Iluminación LED</option>
                    <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
                    <option value="Puesta a Tierra y Jabalina">Puesta a Tierra y Jabalina</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A1A1AA] mb-1.5">
                    Monto Estimado ($)
                  </label>
                  <input
                    type="number"
                    value={newClient.estimatedAmount}
                    onChange={(e) => setNewClient({ ...newClient, estimatedAmount: e.target.value })}
                    placeholder="Ej: 65000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-sm focus:outline-none focus:border-[#FFE600]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#A1A1AA] mb-1.5">
                  Notas u Observaciones
                </label>
                <textarea
                  rows={2}
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  placeholder="Detalles sobre materiales, disponibilidad o requisitos..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-white text-sm focus:outline-none focus:border-[#FFE600]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0B0B0C] text-[#A1A1AA] hover:text-white text-sm font-bold border border-[#26262A]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FFE600] text-[#0B0B0C] text-sm font-extrabold shadow-[0_0_15px_rgba(255,230,0,0.3)] hover:bg-[#FFF04D]"
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
