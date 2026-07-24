export interface AdminService {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  featured: boolean;
  image: string;
}

export interface StaffMember {
  id: string;
  name: string;
  specialty: string;
  image: string;
  services: string[];
  serviceIds: string[];
  workingDays: string[];
  startHour: string;
  endHour: string;
  active: boolean;
  holidays: Array<{ date: string; reason?: string }>;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  image: string;
  appointments: number;
  lastAppointment: string;
}

export interface Appointment {
  id: string;
  customer: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  services: Array<{ id: string; service: string; staff: string; date: string; time: string }>;
}

export async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const body = await response.json() as T & { message?: string };
  if (!response.ok) throw new Error(body.message ?? "Request failed");
  return body;
}
