"use client";

import { useMemo, useState } from "react";

import AppointmentHeader from "@/src/components/admin/appointments/AppointmentHeader";
import AppointmentSearch from "@/src/components/admin/appointments/AppointmentSearch";
import AppointmentStatusTabs from "@/src/components/admin/appointments/AppointmentStatusTabs";
import AppointmentList from "@/src/components/admin/appointments/AppointmentList";
import AddAppointmentModal from "@/src/components/admin/appointments/AddAppointmentModal";

import {
  Appointment,
  appointments,
} from "@/src/data/appointments";

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [open, setOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

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
  }, [search, status]);

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

      <AddAppointmentModal
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
/>

    </div>
  );
}