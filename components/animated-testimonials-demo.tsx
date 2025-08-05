import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Kidus Production took our sound mixing to a whole new level. Every detail was crisp and perfectly balanced—our music has never sounded so professional!",
      name: "Sarah Chen",
      designation: "Singer-Songwriter",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The sound mixing from Kidus Production brought out the best in our band. The clarity and punch in every track blew us away!",
      name: "Michael Rodriguez",
      designation: "Band Leader, The Innovators",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "We needed a fresh look for our album and Kidus Production’s graphic design team delivered beyond our expectations. The cover art is stunning and truly represents our sound.",
      name: "Emily Watson",
      designation: "Indie Artist",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Mastering with Kidus Production gave our single the polish it needed for radio play. The difference in loudness and clarity was instantly noticeable!",
      name: "James Kim",
      designation: "Producer",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Recording at Kidus Production was a fantastic experience. The team made me feel comfortable and the final takes were crystal clear! Highly recommended.",
      name: "Lisa Thompson",
      designation: "Voiceover Artist",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
