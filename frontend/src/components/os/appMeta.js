import { User, Server, Gauge as GaugeIcon, ScrollText, Ticket, Images, Activity } from "lucide-react";

export const APPS = [
  { id: "sobre", title: "sobre.txt", label: "Sobre", icon: User, w: 520, h: 640 },
  { id: "servicos", title: "projetos/", label: "Projetos", icon: Server, w: 780, h: 640 },
  { id: "metricas", title: "competencias.txt", label: "Competências", icon: GaugeIcon, w: 740, h: 640 },
  { id: "telemetria", title: "evidencias.dashboard", label: "Telemetria", icon: Activity, w: 990, h: 700 },
  { id: "carreira", title: "carreira.log", label: "Carreira", icon: ScrollText, w: 760, h: 580 },
  { id: "ticket", title: "contato.mail", label: "Contato", icon: Ticket, w: 640, h: 680 },
  { id: "galeria", title: "bastidores/", label: "Galeria", icon: Images, w: 820, h: 600 },
];

export const APP = Object.fromEntries(APPS.map((a) => [a.id, a]));
