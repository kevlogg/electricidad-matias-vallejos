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
  Eye,
  ChevronRight,
  DollarSign,
  UserPlus,
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
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);

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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3" /> Completado
          </span>
        );
      case 'en_proceso':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 whitespace-nowrap">
            <Clock className="w-3 h-3" /> En Proceso
          </span>
        );
      case 'presupuestado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30 whitespace-nowrap">
            <FileText className="w-3 h-3" /> Presupuestado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 whitespace-nowrap">
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
            Listado de Clientes
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Gestión en lista compacta. Hacé clic en cualquier cliente para ver sus detalles o presupuestar.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFE600] text-[#0B0B0C] font-extrabold text-sm shadow-[0_0_15px_rgba(255,230,0,0.3)] hover:shadow-[0_0_25px_rgba(255,230,0,0.6)] hover:bg-[#FFF04D] transition-all shrink-0"
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

      {/* Compact List View */}
      {loading ? (
        <div className="text-center py-16 text-[#A1A1AA] text-sm">
          Cargando listado de clientes...
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#141416] border border-[#26262A] flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#0B0B0C] border border-[#26262A] flex items-center justify-center text-[#FFE600] mb-3">
            <UserPlus className="w-7 h-7" />
          </div>
          <p className="text-white font-bold text-base">No hay clientes registrados aún</p>
          <p className="text-xs text-[#A1A1AA] mt-1 max-w-md">
            El sistema se encuentra limpio sin datos de ejemplo. Creá el primer cliente con el botón &ldquo;Nuevo Cliente&rdquo;.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-[#FFE600] text-[#0B0B0C] text-xs font-black"
          >
            + Agregar Primer Cliente
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#141416] border border-[#26262A] overflow-hidden">
          {/* Table Header (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-[#101012] border-b border-[#26262A] text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
            <div className="col-span-3">Cliente</div>
            <div className="col-span-3">Localidad / Dirección</div>
            <div className="col-span-2">Servicio</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#26262A]">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-4 sm:px-5 hover:bg-[#18181c] cursor-pointer transition-colors items-center group"
              >
                {/* Col 1: Nombre & Tel */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B0B0C] border border-[#26262A] group-hover:border-[#FFE600] flex items-center justify-center text-xs font-bold text-[#FFE600] shrink-0 transition-colors">
                    {client.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FFE600] transition-colors truncate">
                      {client.name}
                    </h4>
                    <p className="text-xs text-[#71717A] truncate">
                      {client.phone || 'Sin teléfono'}
                    </p>
                  </div>
                </div>

                {/* Col 2: Localidad & Dirección */}
                <div className="lg:col-span-3 text-xs text-[#A1A1AA] flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#FFE600] shrink-0" />
                  <span className="truncate">
                    <strong className="text-white">{client.locality}</strong>
                    {client.address ? ` • ${client.address}` : ''}
                  </span>
                </div>

                {/* Col 3: Servicio */}
                <div className="lg:col-span-2 text-xs text-white/90 truncate">
                  {client.serviceType}
                </div>

                {/* Col 4: Estado & Monto */}
                <div className="lg:col-span-2 flex items-center gap-2">
                  {getStatusBadge(client.status)}
                  {client.estimatedAmount && client.estimatedAmount > 0 && (
                    <span className="font-mono text-xs font-bold text-[#FFE600] hidden xl:inline">
                      ${client.estimatedAmount.toLocaleString('es-AR')}
                    </span>
                  )}
                </div>

                {/* Col 5: Botones de Acción */}
                <div
                  className="lg:col-span-2 flex items-center justify-end gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {client.phone && (
                    <a
                      href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hola ${client.name}, te escribe Matías Vallejos de MV Electricidad sobre tu trabajo de ${client.serviceType}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs transition-colors"
                      title="Escribir por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}

                  {onSelectClientForQuote && (
                    <button
                      onClick={() => onSelectClientForQuote(client)}
                      className="p-2 rounded-lg bg-[#FFE600]/10 text-[#FFE600] hover:bg-[#FFE600]/20 text-xs transition-colors"
                      title="Presupuestar formalmente en PDF"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedClient(client)}
                    className="p-2 rounded-lg bg-[#0B0B0C] border border-[#26262A] text-[#A1A1AA] hover:text-white text-xs transition-colors flex items-center gap-1"
                    title="Ver detalle completo"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-[11px] font-bold hidden sm:inline">Ver</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drawer / Modal: Ver Detalle Completo del Cliente */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#141416] border border-[#26262A] p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-5 right-5 text-[#71717A] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {getStatusBadge(selectedClient.status)}
                <span className="text-xs text-[#71717A] flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {selectedClient.date}
                </span>
              </div>
              <h3 className="font-heading text-xl font-black text-white">
                {selectedClient.name}
              </h3>
              <p className="text-xs text-[#FFE600] font-semibold mt-0.5">
                {selectedClient.serviceType}
              </p>
            </div>

            {/* Details Box */}
            <div className="p-4 rounded-2xl bg-[#0B0B0C] border border-[#26262A] space-y-2.5 text-xs text-[#A1A1AA]">
              <div className="flex items-center justify-between">
                <span>Localidad:</span>
                <strong className="text-white">{selectedClient.locality}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Dirección / Barrio:</span>
                <strong className="text-white">{selectedClient.address || 'No especificada'}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Teléfono:</span>
                <strong className="text-white">{selectedClient.phone || 'No registrado'}</strong>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#26262A]">
                <span>Monto estimado / acordado:</span>
                <strong className="text-base font-mono text-[#FFE600]">
                  {selectedClient.estimatedAmount && selectedClient.estimatedAmount > 0
                    ? `$ ${selectedClient.estimatedAmount.toLocaleString('es-AR')}`
                    : 'Sin cotizar'}
                </strong>
              </div>
            </div>

            {/* Notes */}
            {selectedClient.notes && (
              <div>
                <span className="text-[11px] font-bold uppercase text-[#71717A] block mb-1.5">
                  Notas / Observaciones del Trabajo:
                </span>
                <div className="p-3 rounded-xl bg-[#0B0B0C] border border-[#26262A] text-xs text-[#A1A1AA] italic leading-relaxed">
                  &ldquo;{selectedClient.notes}&rdquo;
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              {selectedClient.phone && (
                <a
                  href={`https://wa.me/${selectedClient.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hola ${selectedClient.name}, te contacto desde MV Electricidad.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Escribir por WhatsApp
                </a>
              )}

              {onSelectClientForQuote && (
                <button
                  onClick={() => {
                    const c = selectedClient;
                    setSelectedClient(null);
                    onSelectClientForQuote(c);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFE600] text-[#0B0B0C] text-xs font-black shadow-[0_0_15px_rgba(255,230,0,0.3)] hover:bg-[#FFF04D] flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText className="w-4 h-4" /> Generar Presupuesto PDF
                </button>
              )}
            </div>
          </div>
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
                  placeholder="Ej: Güemes 2800"
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
                    placeholder="Ej: 50000"
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
