import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

const DESTACADAS_BG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791085360/Recurso_44_jelhfu.png";
const CARD_IMG =
  "https://res.cloudinary.com/da1hje3a1/image/upload/v1791077318/3d_fq961d.jpg";

const cards = [
  {
    front: "Inclinómetros",
    back: 'Somos representante oficial en el en el norte del país, de Inclinómetros ARBIP, "Descargas seguras”.',
    image: CARD_IMG,
  },
  {
    front: "kit hidráulico",
    back: "provision de kit hidráulico para bateas",
    image: CARD_IMG,
  },
  {
    front: "Repuestos",
    back: "Repuestos",
    image: CARD_IMG,
  },
  {
    front: "Elementos de izaje",
    back: "Elementos de izaje",
    image: CARD_IMG,
  },
];

/**
 * Tarjeta con revelado en fundido: hover en PC, tap en mobile.
 * @param {{ card: { front: string, back: string, image: string } }} props
 */
function RevealCard({ card }) {
  const [isMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );
  const [open, setOpen] = useState(false);

  /* En PC el contenido se muestra con hover; en mobile con tap */
  const toggle = () => {
    if (isMobile) setOpen((v) => !v);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={open}
      aria-label={`${card.front} — ver más`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-3xl shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trebol-400 md:h-72 md:cursor-default"
    >
      {/* Frente: título sobre la foto */}
      <div
        className={`fade-anim absolute inset-0 transition-opacity duration-500 ${
          open ? "opacity-0" : "opacity-100"
        } group-hover:opacity-0`}
      >
        <img
          src={getImageUrl(card.image)}
          alt={card.front}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <h3 className="absolute inset-x-0 bottom-0 p-6 font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
          {card.front}
        </h3>
        {/* Indicador mobile: hay más contenido para leer */}
        <span className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur md:hidden">
          <ChevronUp className="h-5 w-5" />
        </span>
      </div>

      {/* Contenido: misma foto con blur + descripción */}
      <div
        className={`fade-anim absolute inset-0 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100`}
      >
        <img
          src={getImageUrl(card.image)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/60" />
        <p className="relative grid h-full place-items-center p-6 pb-14 pt-10 text-center text-sm font-semibold leading-relaxed tracking-tight text-white md:pb-6 md:text-base">
          {card.back}
        </p>
        {/* Indicador mobile: volver */}
        <span className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur md:hidden">
          <ChevronDown className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

export default function Destacadas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="destacadas"
      className="relative overflow-hidden py-32 md:py-20 px-4"
    >
      {/* Background: imagen con patrón */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${getImageUrl(DESTACADAS_BG)})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-black leading-[1.05]">
            Repuestos <span className=" font-bold text-white">/ otros</span>
          </h2>
        </motion.div>

        {/* Tarjetas: 2 columnas en PC, 1 en mobile */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          {cards.map((card) => (
            <RevealCard key={card.front} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
