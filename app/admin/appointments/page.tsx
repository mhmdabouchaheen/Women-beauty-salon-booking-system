"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import AppointmentHeader from "@/src/components/admin/appointments/AppointmentHeader";
import AppointmentSearch from "@/src/components/admin/appointments/AppointmentSearch";
import AppointmentStatusTabs from "@/src/components/admin/appointments/AppointmentStatusTabs";
import AppointmentList from "@/src/components/admin/appointments/AppointmentList";
import AddAppointmentModal from "@/src/components/admin/appointments/AddAppointmentModal";

import { Appointment, apiRequest } from "@/src/types/admin-ui";

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [open, setOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const loadAppointments = useCallback(async () => {
    const data = await apiRequest<{ appointments: Array<{
      _id: string;
      userId: { name: string };
      serviceId: { name: string };
      staffId: { name: string };
      appointmentDate: string;
      appointmentTime: string;
      status: "booked" | "completed" | "cancelled";
    }> }>("/api/appointments");
    setAppointments(data.appointments.map((item) => ({
      id: item._id,
      customer: item.userId.name,
      status: item.status === "completed" ? "Completed" : item.status === "cancelled" ? "Cancelled" : "Scheduled",
      services: [{
        id: item._id,
        service: item.serviceId.name,
        staff: item.staffId.name,
        date: item.appointmentDate.slice(0, 10),
        time: item.appointmentTime,
      }],
    })));
  }, []);
  useEffect(() => {
    const timeout = window.setTimeout(() => void loadAppointments(), 0);
    return () => window.clearTimeout(timeout);
  }, [loadAppointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.services.some(
          (service) =>
            service.service
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            service.staff
              .toLowerCase()
              .includes(search.toLowerCase())
        );

      const matchesStatus =
        status === "All" ||
        appointment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, status]);

  return (
    <div className="space-y-6">

      <AppointmentHeader
        onAdd={() => {
          setSelectedAppointment(null);
          setOpen(true);
        }}
      />

      <AppointmentSearch
        value={search}
        onChange={setSearch}
      />

      <AppointmentStatusTabs
        selected={status}
        onSelect={setStatus}
      />

      <AppointmentList
        appointments={filteredAppointments}
        onEdit={(appointment) => {
          setSelectedAppointment(appointment);
          setOpen(true);
        }}
      />

      {open && <AddAppointmentModal
  open={open}
  appointment={selectedAppointment}
  editing={selectedAppointment !== null}
  title={
    selectedAppointment
      ? "Edit Appointment"
      : "Add Appointment"
  }
  onClose={() => {
    setOpen(false);
    setSelectedAppointment(null);
  }}
  onSaved={loadAppointments}
/>}

    </div>
  );
}
