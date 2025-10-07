export interface Contact {
  id: number;
  name: string;
  company: string;
  title: string;
  source: string;
  metAt: string;
  avatar: string;
  priority: "high" | "medium" | "low";
}
